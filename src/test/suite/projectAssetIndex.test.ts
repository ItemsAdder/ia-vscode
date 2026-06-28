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
});
