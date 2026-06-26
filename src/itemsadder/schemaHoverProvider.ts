import * as vscode from 'vscode';

import { isItemsAdderPluginConfigText } from '../itemsAdderPluginConfig';

interface SchemaHoverProviderOptions {
	schemas: any;
	pluginConfigSchema?: any;
}

interface PropertyAtPosition {
	key: string;
	path: string[];
	range: vscode.Range;
}

export class SchemaHoverProvider implements vscode.HoverProvider {
	constructor(private readonly options: SchemaHoverProviderOptions) {}

	public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
		const property = this.getPropertyAtPosition(document, position);
		if (!property) {
			return undefined;
		}

		const schema = isItemsAdderPluginConfigText(document.getText())
			? this.options.pluginConfigSchema ?? this.options.schemas
			: this.options.schemas;
		const schemaNode = this.schemaNodeAtPath(property.path, schema);
		if (!schemaNode) {
			return undefined;
		}

		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.isTrusted = true;
		markdown.supportThemeIcons = true;

		if (schemaNode.deprecated) {
			markdown.appendMarkdown('$(warning) **Warning: deprecated property.**');
		}

		const description = this.descriptionFor(schemaNode);
		if (description) {
			if (schemaNode.deprecated) {
				markdown.appendMarkdown('\n\n---\n\n');
			}
			markdown.appendMarkdown(this.rewriteMarkdownLinks(description));
		}

		return markdown.value ? new vscode.Hover(markdown, property.range) : undefined;
	}

	private getPropertyAtPosition(document: vscode.TextDocument, position: vscode.Position): PropertyAtPosition | undefined {
		const line = document.lineAt(position.line).text;
		const match = line.match(/^(\s*)([^:#][^:]*):/);
		if (!match) {
			return undefined;
		}

		const keyStart = match[1].length;
		const key = match[2].trimEnd();
		const keyEnd = keyStart + key.length;
		if (position.character < keyStart || position.character > keyEnd) {
			return undefined;
		}

		return {
			key,
			path: [...this.getParentPath(document, position.line, keyStart), key],
			range: new vscode.Range(position.line, keyStart, position.line, keyEnd)
		};
	}

	private getParentPath(document: vscode.TextDocument, lineIndex: number, keyIndent: number): string[] {
		const parents: { indent: number; key: string }[] = [];
		let currentIndent = keyIndent;
		for (let index = lineIndex - 1; index >= 0; index--) {
			const match = document.lineAt(index).text.match(/^(\s*)([^:#][^:]*):/);
			if (!match) {
				continue;
			}

			const indent = match[1].length;
			if (indent < currentIndent) {
				parents.push({ indent, key: match[2].trimEnd() });
				currentIndent = indent;
			}
		}

		return parents.reverse().map(parent => parent.key);
	}

	private schemaNodeAtPath(path: string[], schema: any): any | undefined {
		let current = this.resolveRef(schema, schema);
		for (const segment of path) {
			current = this.resolveRef(current, schema);
			if (!current) {
				return undefined;
			}

			if (current.properties?.[segment]) {
				current = current.properties[segment];
				continue;
			}

			const patternSchema = this.patternSchemaFor(current, segment);
			if (patternSchema) {
				current = patternSchema;
				continue;
			}

			if (current.additionalProperties) {
				current = current.additionalProperties;
				continue;
			}

			if (current.items) {
				current = current.items;
				continue;
			}

			return undefined;
		}

		return this.resolveRef(current, schema);
	}

	private patternSchemaFor(schemaNode: any, segment: string): any | undefined {
		const patterns = schemaNode?.patternProperties;
		if (!patterns) {
			return undefined;
		}

		for (const [pattern, value] of Object.entries(patterns)) {
			if (new RegExp(pattern).test(segment)) {
				return value;
			}
		}

		return undefined;
	}

	private resolveRef(schemaNode: any, rootSchema: any): any {
		if (!schemaNode?.$ref) {
			return schemaNode;
		}

		const refKey = String(schemaNode.$ref).split('/').pop();
		return refKey ? rootSchema.$defs?.[refKey] ?? schemaNode : schemaNode;
	}

	private descriptionFor(schemaNode: any): string {
		return typeof schemaNode.markdownDescription === 'string'
			? schemaNode.markdownDescription
			: typeof schemaNode.description === 'string'
				? schemaNode.description
				: '';
	}

	private rewriteMarkdownLinks(markdown: string): string {
		const withMarkdownLinks = markdown.replace(/\[([^\]]+)]\((https?:\/\/[^)\s]+)\)/g, (_match, label: string, url: string) =>
			`[${label}](${this.commandUriForUrl(url)})`
		);

		return withMarkdownLinks.replace(/(^|[\s(])(https?:\/\/[^\s)]+)/g, (_match, prefix: string, url: string) => {
			const cleanUrl = url.replace(/[.,;:!?]+$/g, '');
			const trailing = url.slice(cleanUrl.length);
			return `${prefix}[${cleanUrl}](${this.commandUriForUrl(cleanUrl)})${trailing}`;
		});
	}

	private commandUriForUrl(url: string): string {
		return `command:ia-vscode.openUrlInVscode?${encodeURIComponent(JSON.stringify([url]))}`;
	}
}
