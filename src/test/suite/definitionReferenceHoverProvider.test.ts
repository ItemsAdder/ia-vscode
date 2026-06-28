import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

import { DefinitionReferenceHoverProvider } from '../../itemsadder/definitionReferenceHoverProvider';
import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';

suite('Definition reference hover provider', () => {
	test('shows source file for indexed custom references', async () => {
		const filePath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'ia-hover-')), 'recipe.yml');
		fs.writeFileSync(filePath, [
			'info:',
			'  namespace: test',
			'recipes:',
			'  crafting_table:',
			'    carton_box:',
			'      ingredients:',
			'        O: test:block3'
		].join('\n'));
		const document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
		const assetIndex = {
			findDefinition(kind: string, namespace: string, id: string) {
				if (kind === 'block' && namespace === 'test' && id === 'block3') {
					return { kind: 'block', namespace, id, fullPath: '/workspace/contents/test/blocks.yml' };
				}
				return undefined;
			}
		} as ProjectAssetIndex;
		const hover = await new DefinitionReferenceHoverProvider({ assetIndex }).provideHover(document, new vscode.Position(6, 17));
		const markdown = hover?.contents[0] as vscode.MarkdownString;

		assert.ok(markdown.value.includes('Found ItemsAdder block: `test:block3`'));
		assert.ok(markdown.value.includes('contents/test/blocks.yml'));
		assert.ok(!markdown.value.includes('File: `/workspace/'));
		assert.ok(markdown.value.includes('command:ia-vscode.openAssetSource'));
	});
});
