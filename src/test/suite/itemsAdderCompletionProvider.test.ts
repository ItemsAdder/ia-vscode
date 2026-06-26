import * as assert from 'assert';
import * as vscode from 'vscode';

import { ItemsAdderCompletionProvider } from '../../itemsadder/itemsAdderCompletionProvider';
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
});
