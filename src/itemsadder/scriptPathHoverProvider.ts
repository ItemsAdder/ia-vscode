import * as vscode from 'vscode';

import { displayWorkspacePath } from './pathDisplay';
import { ScriptPathResolver } from './scriptPathResolver';
import { getYamlParentPathFromText } from './yamlPath';

interface ScalarValue {
	startCharacter: number;
	endCharacter: number;
	value: string;
}

export class ScriptPathHoverProvider implements vscode.HoverProvider {
	public provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.Hover> {
		if (document.uri.scheme !== 'file') {
			return undefined;
		}

		const text = document.getText();
		const namespace = readNamespace(text);
		if (!namespace) {
			return undefined;
		}

		const line = document.lineAt(position.line).text;
		const keyMatch = /^(\s*)path\s*:/.exec(line);
		if (!keyMatch) {
			return undefined;
		}

		const parentPath = getYamlParentPathFromText(text, {
			line: position.line,
			character: keyMatch[1].length
		});
		if (!isScriptPath(parentPath)) {
			return undefined;
		}

		const scalar = readScalarValue(line, keyMatch[0].length);
		if (!scalar || position.character < scalar.startCharacter || position.character > scalar.endCharacter) {
			return undefined;
		}

		const resolver = new ScriptPathResolver({
			workspaceFolders: vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath) ?? [],
			documentPath: document.uri.fsPath,
			fileNamespace: namespace
		});
		const resolution = resolver.resolve(scalar.value);
		if (!resolution.scriptPath) {
			return undefined;
		}

		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.isTrusted = true;
		markdown.appendMarkdown(`Found ${resolution.language ?? 'script'} script: \`${displayWorkspacePath(resolution.scriptPath)}\``);
		const args = encodeURIComponent(JSON.stringify([resolution.scriptPath]));
		markdown.appendMarkdown(`\n\n[Open script source](command:ia-vscode.openAssetSource?${args})`);
		return new vscode.Hover(markdown);
	}
}

function isScriptPath(parentPath: string[]): boolean {
	return parentPath[parentPath.length - 1] === 'script';
}

function readNamespace(text: string): string | undefined {
	const match = /^info:\s*$[\s\S]*?^\s+namespace:\s*['"]?([^'"\s#]+)['"]?/m.exec(text);
	return match?.[1];
}

function readScalarValue(line: string, valueStart: number): ScalarValue | undefined {
	const rawValue = line.slice(valueStart);
	const commentStart = rawValue.search(/\s+#/);
	const valueText = (commentStart === -1 ? rawValue : rawValue.slice(0, commentStart));
	const leadingWhitespace = valueText.search(/\S/);
	if (leadingWhitespace === -1) {
		return undefined;
	}

	const trailingWhitespace = valueText.length - valueText.trimEnd().length;
	let startCharacter = valueStart + leadingWhitespace;
	let endCharacter = valueStart + valueText.length - trailingWhitespace;
	let value = line.slice(startCharacter, endCharacter);

	if (
		value.length >= 2 &&
		((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
	) {
		startCharacter += 1;
		endCharacter -= 1;
		value = value.slice(1, -1);
	}

	return { startCharacter, endCharacter, value };
}
