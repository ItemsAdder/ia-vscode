import * as vscode from 'vscode';

import { definitionKindsForPath, normalizeDefinitionId, splitNamespacedReference } from './definitionReferences';
import { displayWorkspacePath } from './pathDisplay';
import { IndexedDefinition, ProjectAssetIndex } from './projectAssetIndex';
import { getYamlParentPathFromText } from './yamlPath';

interface DefinitionReferenceHoverProviderOptions {
	assetIndex: ProjectAssetIndex;
}

interface ScalarValue {
	startCharacter: number;
	endCharacter: number;
	value: string;
}

export class DefinitionReferenceHoverProvider implements vscode.HoverProvider {
	constructor(private readonly options: DefinitionReferenceHoverProviderOptions) {}

	public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
		if (document.uri.scheme !== 'file') {
			return undefined;
		}

		const text = document.getText();
		const namespace = this.readNamespace(text, document.uri.fsPath);
		if (!namespace) {
			return undefined;
		}

		const line = document.lineAt(position.line).text;
		const scalar = this.readScalarValue(line);
		if (!scalar || position.character < scalar.startCharacter || position.character > scalar.endCharacter) {
			return undefined;
		}

		const yamlPath = getYamlParentPathFromText(text, {
			line: position.line,
			character: scalar.startCharacter
		});
		const kinds = definitionKindsForPath(yamlPath);
		if (!kinds.length) {
			return undefined;
		}

		const reference = splitNamespacedReference(scalar.value, namespace);
		if (!reference || reference.namespace === 'minecraft') {
			return undefined;
		}

		let found: IndexedDefinition | undefined;
		for (const kind of kinds) {
			found = this.options.assetIndex.findDefinition(kind, reference.namespace, normalizeDefinitionId(kind, reference.id));
			if (found) {
				break;
			}
		}

		if (!found) {
			return undefined;
		}

		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.isTrusted = true;
		markdown.appendMarkdown(`Found ItemsAdder ${found.kind.replace('_', ' ')}: \`${found.namespace}:${found.id}\``);
		markdown.appendMarkdown(`\n\nFile: \`${displayWorkspacePath(found.fullPath)}\``);
		const args = encodeURIComponent(JSON.stringify([found.fullPath]));
		markdown.appendMarkdown(`\n\n[Open source](command:ia-vscode.openAssetSource?${args})`);
		return new vscode.Hover(markdown, new vscode.Range(position.line, scalar.startCharacter, position.line, scalar.endCharacter));
	}

	private readScalarValue(line: string): ScalarValue | undefined {
		const keyValueMatch = line.match(/^(\s*[^:#][^:]*:\s*)(.+)$/);
		const arrayMatch = line.match(/^(\s*-\s+)(.+)$/);
		const prefixLength = keyValueMatch?.[1].length ?? arrayMatch?.[1].length;
		const rawValue = keyValueMatch?.[2] ?? arrayMatch?.[2];
		if (prefixLength === undefined || rawValue === undefined) {
			return undefined;
		}

		let value = rawValue.trim();
		if (!value) {
			return undefined;
		}

		let startCharacter = prefixLength + rawValue.indexOf(value);
		let endCharacter = startCharacter + value.length;
		if (
			value.length >= 2 &&
			((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
		) {
			value = value.slice(1, -1);
			startCharacter++;
			endCharacter--;
		}

		return { startCharacter, endCharacter, value };
	}

	private readNamespace(text: string, filePath: string): string | undefined {
		const infoNamespace = text.match(/^\s*namespace:\s*["']?([^"'\s]+)["']?/m)?.[1];
		if (infoNamespace) {
			return infoNamespace;
		}

		const pathParts = filePath.replace(/\\/g, '/').split('/');
		const contentsIndex = pathParts.lastIndexOf('contents');
		return contentsIndex === -1 ? undefined : pathParts[contentsIndex + 1];
	}
}
