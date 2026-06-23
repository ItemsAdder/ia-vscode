import * as assert from 'assert';
import * as vscode from 'vscode';

import { DictionaryTranslationInlayHintProvider } from '../../itemsadder/dictionaryTranslationInlayHintProvider';

suite('Dictionary translation inlay hint provider', () => {
	test('creates clickable hint for resolved dictionary entry', async () => {
		const dictionaryIndex = {
			onDidChange: () => ({ dispose() {} }),
			lookup: (key: string) => key === 'display-name-test'
				? { key, value: 'Display Name', sourcePath: '/workspace/lang.yml', priority: 0 }
				: undefined,
			lookupMinecraftLang: () => undefined
		};
		const provider = new DictionaryTranslationInlayHintProvider(dictionaryIndex as any);
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: 'name: display-name-test'
		});

		const hints = provider.provideInlayHints(document, new vscode.Range(0, 0, 0, 100));

		assert.strictEqual(hints.length, 1);
		assert.strictEqual(hints[0].position.character, 23);
		const label = hints[0].label as vscode.InlayHintLabelPart[];
		assert.strictEqual(label[0].value, '    ');
		assert.strictEqual(label[0].command, undefined);
		assert.strictEqual(label[1].value, 'Display Name');
		assert.strictEqual(label[1].command?.command, 'ia-vscode.openTranslationSource');
		provider.dispose();
	});
});
