import * as vscode from 'vscode';
import * as YAML from 'yaml';

import { firstFramePngPath } from './animatedPngFirstFrame';
import { AssetPathResolver } from './assetPathResolver';
import { ItemsAdderDiagnosticsProvider, ItemsAdderDiagnosticSeverity } from './itemsAdderDiagnostics';
import { ProjectAssetIndex } from './projectAssetIndex';
import { ScriptPathResolver } from './scriptPathResolver';

export interface EditorDiagnosticsControllerOptions {
	extensionContext: vscode.ExtensionContext;
	vanillaTexturePaths: string[];
	assetIndex?: ProjectAssetIndex;
}

export class EditorDiagnosticsController {
	private readonly provider = new ItemsAdderDiagnosticsProvider();

	constructor(private readonly options: EditorDiagnosticsControllerOptions) {}

	public update(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		text: string,
		editor: vscode.TextEditor,
		diagnostics: vscode.DiagnosticCollection,
		previousDecorations: vscode.TextEditorDecorationType[]
	): vscode.TextEditorDecorationType[] {
		diagnostics.clear();
		previousDecorations.forEach(decoration => decoration.dispose());

		const workspaceFolders = vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath) ?? [];
		const fileNamespace = this.readNamespace(doc);
		const assetResolver = fileNamespace
			? new AssetPathResolver({
				workspaceFolders,
				documentPath: editor.document.uri.fsPath,
				fileNamespace,
				vanillaTexturePaths: this.options.vanillaTexturePaths,
				assetIndex: this.options.assetIndex
			})
			: undefined;
		const scriptResolver = fileNamespace
			? new ScriptPathResolver({
				workspaceFolders,
				documentPath: editor.document.uri.fsPath,
				fileNamespace
			})
			: undefined;

		const result = this.provider.collect(doc, text, {
			isDocumentDirty: editor.document.isDirty,
			assetResolver,
			scriptResolver,
			expectedNamespace: this.readNamespaceFromPath(editor.document.uri.fsPath)
		});

		diagnostics.set(editor.document.uri, result.issues.map(issue => this.toVsCodeDiagnostic(issue, editor.document)));
		return result.assetDecorations.map(decoration => {
			const decorationType = vscode.window.createTextEditorDecorationType({
				gutterIconPath: this.resolveGutterIconPath(decoration),
				gutterIconSize: 'contain'
			});
			editor.setDecorations(decorationType, [{
				range: this.toVsCodeRange(decoration.range.start, decoration.range.end, editor.document),
				hoverMessage: this.assetHoverMessage(decoration.resolution?.assetPath)
			}]);
			return decorationType;
		});
	}

	private toVsCodeDiagnostic(issue: { range: { start: number; end: number }; message: string; severity: ItemsAdderDiagnosticSeverity }, document: vscode.TextDocument): vscode.Diagnostic {
		return new vscode.Diagnostic(
			this.toVsCodeRange(issue.range.start, issue.range.end, document),
			issue.message,
			issue.severity === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
		);
	}

	private toVsCodeRange(startOffset: number, endOffset: number, document: vscode.TextDocument): vscode.Range {
		return new vscode.Range(document.positionAt(startOffset), document.positionAt(endOffset));
	}

	private resolveGutterIconPath(decoration: { missing: boolean; resolution?: { assetPath?: string; remoteUrl?: string } }): vscode.Uri {
		if (decoration.missing || !decoration.resolution) {
			return vscode.Uri.file(this.options.extensionContext.asAbsolutePath('images/missing.png').replace(/\\/g, '/'));
		}

		if (decoration.resolution.remoteUrl) {
			return vscode.Uri.parse(decoration.resolution.remoteUrl);
		}

		return vscode.Uri.file(firstFramePngPath(
			decoration.resolution.assetPath as string,
			this.options.extensionContext.globalStorageUri.fsPath
		));
	}

	private assetHoverMessage(assetPath: string | undefined): vscode.MarkdownString | undefined {
		if (!assetPath) {
			return undefined;
		}

		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.isTrusted = true;
		markdown.appendMarkdown(`Found file: \`${assetPath}\``);
		const args = encodeURIComponent(JSON.stringify([assetPath]));
		markdown.appendMarkdown(`\n\n[Open asset source](command:ia-vscode.openAssetSource?${args})`);
		return markdown;
	}

	private readNamespaceFromPath(filePath: string): string | undefined {
		const parts = filePath.replace(/\\/g, '/').split('/');
		const contentsIndex = parts.lastIndexOf('contents');
		return contentsIndex === -1 ? undefined : parts[contentsIndex + 1];
	}

	private readNamespace(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): string | undefined {
		const infoNode = doc.get('info', true);
		if (!YAML.isMap(infoNode)) {
			return undefined;
		}

		const namespaceNode = infoNode.get('namespace', true);
		if (YAML.isScalar(namespaceNode) && typeof namespaceNode.value === 'string') {
			return namespaceNode.value;
		}

		return typeof namespaceNode === 'string' ? namespaceNode : undefined;
	}
}
