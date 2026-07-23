import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';

import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';

suite('Project asset index', () => {
	test('indexes ItemsAdder definitions and writes workspace cache', () => {
		const workspacePath = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-index-'));
		const namespacePath = path.join(workspacePath, 'contents', 'test');
		fs.mkdirSync(path.join(namespacePath, 'scripts'), { recursive: true });
		fs.writeFileSync(path.join(namespacePath, 'items.yml'), [
			'info:',
			'  namespace: test',
			'items:',
			'  sword: {}',
			'sounds:',
			'  my_sound: {}',
			'recipes:',
			'  crafting_table:',
			'    sword_recipe: {}'
		].join('\n'));
		fs.writeFileSync(path.join(namespacePath, 'scripts', 'globe_spin.java'), 'class globe_spin {}');

		const index = new ProjectAssetIndex(() => [{
			uri: vscode.Uri.file(workspacePath),
			name: 'workspace',
			index: 0
		}]);

		try {
			assert.ok(index.findDefinition('item', 'test', 'sword'));
			assert.ok(index.findDefinition('sound', 'test', 'my_sound'));
			assert.ok(index.findDefinition('recipe', 'test', 'sword_recipe'));
			assert.ok(index.findDefinition('script', 'test', 'globe_spin'));
			assert.ok(fs.existsSync(path.join(workspacePath, '.vscode', 'itemsadder-index.json')));
		} finally {
			index.dispose();
		}
	});

	test('does not write cache for non ItemsAdder workspace', () => {
		const workspacePath = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-index-non-ia-'));
		fs.writeFileSync(path.join(workspacePath, 'package.json'), '{"name":"not-itemsadder"}');

		const index = new ProjectAssetIndex(() => [{
			uri: vscode.Uri.file(workspacePath),
			name: 'workspace',
			index: 0
		}]);

		try {
			assert.ok(!fs.existsSync(path.join(workspacePath, '.vscode', 'itemsadder-index.json')));
		} finally {
			index.dispose();
		}
	});

	test('ignores embedded ItemsAdder assets in another project and removes stale cache', () => {
		const workspacePath = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-index-embedded-'));
		const embeddedPath = path.join(workspacePath, 'src', 'main', 'resources', 'contents', 'effects', 'configs');
		const cachePath = path.join(workspacePath, '.vscode', 'itemsadder-index.json');
		fs.mkdirSync(embeddedPath, { recursive: true });
		fs.mkdirSync(path.dirname(cachePath), { recursive: true });
		fs.writeFileSync(path.join(embeddedPath, 'effects.yml'), 'info:\n  namespace: effects\nfont_images:\n  fullscreen: {}\n');
		fs.writeFileSync(cachePath, '{"version":1}');

		const index = new ProjectAssetIndex(() => [{
			uri: vscode.Uri.file(workspacePath),
			name: 'workspace',
			index: 0
		}]);

		try {
			assert.strictEqual(index.findDefinition('font_image', 'effects', 'fullscreen'), undefined);
			assert.ok(!fs.existsSync(cachePath));
		} finally {
			index.dispose();
		}
	});
});
