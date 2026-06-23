import * as vscode from 'vscode';

interface DeprecatedSchemaHoverProviderOptions {
	schemas: any;
}

interface PropertyAtPosition {
	key: string;
	path: string[];
	range: vscode.Range;
}

export class DeprecatedSchemaHoverProvider implements vscode.HoverProvider {
	constructor(private readonly options: DeprecatedSchemaHoverProviderOptions) {}

	public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
		const property = this.getPropertyAtPosition(document, position);
		if (!property) {
			return undefined;
		}

		const schemaNode = this.schemaNodeAtPath(property.path);
		if (!schemaNode?.deprecated) {
			return undefined;
		}

		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.supportThemeIcons = true;
		markdown.appendMarkdown('$(warning) **Warning: deprecated property.**');

		return new vscode.Hover(markdown, property.range);
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

	private schemaNodeAtPath(path: string[]): any | undefined {
		let current = this.resolveRef(this.options.schemas);

		for (const segment of path) {
			current = this.resolveRef(current);
			if (!current) {
				return undefined;
			}

			if (current.properties?.[segment]) {
				current = current.properties[segment];
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

		return this.resolveRef(current);
	}

	private resolveRef(schemaNode: any): any {
		if (!schemaNode?.$ref) {
			return schemaNode;
		}

		const refKey = String(schemaNode.$ref).split('/').pop();
		return refKey ? this.options.schemas.$defs?.[refKey] ?? schemaNode : schemaNode;
	}
}
