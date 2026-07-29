import * as assert from 'assert';
import * as vscode from 'vscode';

import { ItemsAdderCompletionProvider } from '../../itemsadder/itemsAdderCompletionProvider';
import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';
import { itemsAdderPluginConfigSchema } from '../../itemsAdderPluginConfig';
import { schemas } from '../../schemas';

suite('ItemsAdder completion provider', () => {
	test('suggests item display names from entry id', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  ruby_sword:',
				'    name:'
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: [],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(4, 9));

		assert.ok(items.some(item => item.label === 'Ruby Sword'));
	});

	test('suggests vanilla textures for graphics.texture', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  gem:',
				'    graphics:',
				'      texture:'
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: ['item/diamond.png'],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(5, 14));

		assert.ok(items.some(item => item.label === 'minecraft:item/diamond.png'));
	});

	test('suggests textures for Elytra texture properties', async () => {
		for (const property of ['wings_texture', 'broken_item_texture']) {
			const document = await vscode.workspace.openTextDocument({
				language: 'yaml',
				content: [
					'info:',
					'  namespace: test',
					'items:',
					'  sky_elytra:',
					'    elytra:',
					`      ${property}:`
				].join('\n')
			});
			const provider = new ItemsAdderCompletionProvider({
				schemas,
				itemTemplates: [],
				vanillaTexturePaths: ['entity/equipment/wings/elytra.png'],
				getDevMode: () => false
			});

			const items = provider.provideCompletionItems(document, new vscode.Position(5, document.lineAt(5).text.length));

			assert.ok(items.some(item => item.label === 'minecraft:entity/equipment/wings/elytra.png'), property);
		}
	});

	test('does not duplicate normal schema property suggestions', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  sword:',
				'    resource:',
				'      material: DIAMOND_SWORD',
				'      '
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: [],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(6, 6));

		assert.ok(!items.some(item => item.label === 'generate'));
		assert.ok(!items.some(item => item.label === 'model_path'));
	});

	test('suggests plugin config boolean values from schema', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'resource-pack:',
				'  uuid: test',
				'recipes:',
				'  show-no-permission-chat-message:'
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			pluginConfigSchema: itemsAdderPluginConfigSchema,
			itemTemplates: [],
			vanillaTexturePaths: [],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(3, 35));

		assert.ok(items.some(item => item.label === 'true'));
		assert.ok(items.some(item => item.label === 'false'));
	});

	test('suggests plugin config enum values from schema', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'resource-pack:',
				'  uuid: test',
				'cooldown_bars:',
				'  bossbar:',
				'    color:'
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			pluginConfigSchema: itemsAdderPluginConfigSchema,
			itemTemplates: [],
			vanillaTexturePaths: [],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(4, 11));

		assert.ok(items.some(item => item.label === 'WHITE'));
		assert.ok(items.some(item => item.label === 'PURPLE'));
	});

	test('suggests plugin config missing properties from schema', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'resource-pack:',
				'  uuid: test',
				'recipes:',
				'  crafting:',
				'    '
			].join('\n')
		});
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			pluginConfigSchema: itemsAdderPluginConfigSchema,
			itemTemplates: [],
			vanillaTexturePaths: [],
			getDevMode: () => false
		});

		const items = provider.provideCompletionItems(document, new vscode.Position(4, 4));

		assert.ok(items.some(item => item.label === 'enabled'));
	});

	test('suggests custom indexed items and blocks before typing namespace', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'recipes:',
				'  crafting_table:',
				'    carton_box:',
				'      ingredients:',
				'        O: '
			].join('\n')
		});
		const assetIndex = {
			listDefinitions(kind: string) {
				if (kind === 'block') {
					return [
						{ kind: 'block', namespace: 'test', id: 'block3', fullPath: '/workspace/contents/test/blocks.yml' },
						{ kind: 'block', namespace: 'other', id: 'block4', fullPath: '/workspace/contents/other/blocks.yml' }
					];
				}
				return [];
			}
		} as ProjectAssetIndex;
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: [],
			assetIndex,
			getDevMode: () => false
		});
		const items = provider.provideCompletionItems(document, new vscode.Position(6, 11));

		assert.ok(items.some(item => item.label === 'block3'));
		assert.ok(items.some(item => item.label === 'other:block4'));
	});

	test('shows custom texture preview in completion documentation', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  bug_medal:',
				'    resource:',
				'      generate: true',
				'      textures:',
				'        - '
			].join('\n')
		});
		const assetIndex = {
			list(kind: string) {
				if (kind === 'texture') {
					return [{ kind: 'texture', namespace: 'test', path: 'item/bug_medal.png', fullPath: '/workspace/contents/test/textures/item/bug_medal.png' }];
				}
				return [];
			}
		} as ProjectAssetIndex;
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: [],
			assetIndex,
			getDevMode: () => false
		});
		const items = provider.provideCompletionItems(document, new vscode.Position(7, 10));
		const item = items.find(item => item.label === 'item/bug_medal');
		const documentation = item?.documentation as vscode.MarkdownString | undefined;

		assert.strictEqual(item?.insertText, 'item/bug_medal');
		assert.ok(documentation?.value.includes('Texture: `item/bug_medal`'));
		assert.ok(documentation?.value.includes('![Texture Preview]('));
		assert.ok(documentation?.value.includes('File: `contents/test/textures/item/bug_medal.png`'));
		assert.ok(!documentation?.value.includes('File: `/workspace/'));
	});

	test('suggests textures from other namespaces while typing namespace prefix', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: iageneric',
				'items:',
				'  bug_medal:',
				'    resource:',
				'      generate: true',
				'      textures:',
				'        - iafestivities:'
			].join('\n')
		});
		const assetIndex = {
			list(kind: string) {
				if (kind === 'texture') {
					return [{ kind: 'texture', namespace: 'iafestivities', path: 'item/candy_cane.png', fullPath: '/workspace/contents/iafestivities/textures/item/candy_cane.png' }];
				}
				return [];
			}
		} as ProjectAssetIndex;
		const provider = new ItemsAdderCompletionProvider({
			schemas,
			itemTemplates: [],
			vanillaTexturePaths: [],
			assetIndex,
			getDevMode: () => false
		});
		const items = provider.provideCompletionItems(document, new vscode.Position(7, 24));
		const item = items.find(item => item.label === 'iafestivities:item/candy_cane');

		assert.strictEqual(item?.insertText, 'iafestivities:item/candy_cane');
		assert.deepStrictEqual((item?.range as vscode.Range | undefined)?.start, new vscode.Position(7, 10));
		assert.deepStrictEqual((item?.range as vscode.Range | undefined)?.end, new vscode.Position(7, 24));
	});
});
