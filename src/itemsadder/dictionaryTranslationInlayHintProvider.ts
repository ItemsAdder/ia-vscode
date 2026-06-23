import * as vscode from 'vscode';

import { findDictionaryReferenceRanges } from './dictionaryReferences';
import { ItemsAdderDictionaryIndex } from './itemsAdderDictionaryIndex';
import { findMinecraftTextColorTokens, formatMinecraftTextPreviewParts } from './minecraftTextColors';

export class DictionaryTranslationInlayHintProvider implements vscode.InlayHintsProvider, vscode.Disposable {
	private readonly changeEmitter = new vscode.EventEmitter<void>();
	private readonly dictionarySubscription: vscode.Disposable;

	public readonly onDidChangeInlayHints = this.changeEmitter.event;

	constructor(private readonly dictionaryIndex: ItemsAdderDictionaryIndex) {
		this.dictionarySubscription = this.dictionaryIndex.onDidChange(() => this.changeEmitter.fire());
	}

	public provideInlayHints(document: vscode.TextDocument, range: vscode.Range): vscode.InlayHint[] {
		const hints: vscode.InlayHint[] = [];
		for (const reference of findDictionaryReferenceRanges(document.getText())) {
			if (!range.intersection(new vscode.Range(reference.line, reference.startCharacter, reference.line, reference.endCharacter))) {
				continue;
			}

			const entry = reference.kind === 'minecraft_lang'
				? this.dictionaryIndex.lookupMinecraftLang(reference.key)
				: this.dictionaryIndex.lookup(reference.key);
			if (!entry) {
				continue;
			}
			if (findMinecraftTextColorTokens(entry.value).length > 0) {
				continue;
			}

			const previewText = formatMinecraftTextPreviewParts(entry.value).map(part => part.text).join('');
			if (!previewText) {
				continue;
			}

			const spacer = new vscode.InlayHintLabelPart('    ');
			const label = new vscode.InlayHintLabelPart(previewText);
			label.tooltip = this.tooltipFor(reference.kind, reference.key, entry.sourcePath);
			if (entry.sourcePath) {
				label.command = {
					title: 'Open translation source',
					command: 'ia-vscode.openTranslationSource',
					arguments: [entry.sourcePath]
				};
			}

			const hint = new vscode.InlayHint(
				new vscode.Position(reference.line, reference.endCharacter),
				[spacer, label],
				vscode.InlayHintKind.Type
			);
			hint.paddingLeft = false;
			hints.push(hint);
		}

		return hints;
	}

	public dispose(): void {
		this.dictionarySubscription.dispose();
		this.changeEmitter.dispose();
	}

	private tooltipFor(kind: 'dictionary' | 'minecraft_lang', key: string, sourcePath?: string): vscode.MarkdownString {
		const tooltip = new vscode.MarkdownString(undefined, true);
		tooltip.isTrusted = true;
		tooltip.appendMarkdown(`${kind === 'minecraft_lang' ? 'Minecraft lang' : 'Dictionary'} key \`${key}\``);
		if (sourcePath) {
			const args = encodeURIComponent(JSON.stringify([sourcePath]));
			tooltip.appendMarkdown(`\n\n[Open translation source](command:ia-vscode.openTranslationSource?${args})`);
		}
		return tooltip;
	}
}
