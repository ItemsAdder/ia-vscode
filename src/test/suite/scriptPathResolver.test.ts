import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { ScriptPathResolver } from '../../itemsadder/scriptPathResolver';

suite('Script path resolver', () => {
	test('resolves jspp scripts relative to namespace folder', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-scripts-'));
		const scriptPath = path.join(root, 'contents', 'test', 'scripts', 'globe_spin.jspp');
		fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
		fs.writeFileSync(scriptPath, 'msg($player, "ok");');

		const resolver = new ScriptPathResolver({
			workspaceFolders: [path.join(root, 'contents')],
			documentPath: path.join(root, 'contents', 'test', 'items.yml'),
			fileNamespace: 'test'
		});

		assert.deepStrictEqual(resolver.resolve('scripts/globe_spin'), {
			found: true,
			scriptPath,
			language: 'jspp',
			candidates: [
				path.join(root, 'contents', 'test', 'scripts', 'globe_spin.jspp'),
				path.join(root, 'contents', 'test', 'scripts', 'globe_spin.java')
			]
		});
	});

	test('resolves java scripts when jspp is not present', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-scripts-'));
		const scriptPath = path.join(root, 'contents', 'test', 'scripts', 'globe_spin.java');
		fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
		fs.writeFileSync(scriptPath, 'class GlobeSpin {}');

		const resolver = new ScriptPathResolver({
			workspaceFolders: [root],
			documentPath: path.join(root, 'contents', 'test', 'configs', 'items.yml'),
			fileNamespace: 'test'
		});

		const resolution = resolver.resolve('scripts/globe_spin');

		assert.strictEqual(resolution.found, true);
		assert.strictEqual(resolution.scriptPath, scriptPath);
		assert.strictEqual(resolution.language, 'java');
	});

	test('honors explicit java extension', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-scripts-'));
		const scriptPath = path.join(root, 'contents', 'test', 'scripts', 'globe_spin.java');
		fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
		fs.writeFileSync(scriptPath, 'class GlobeSpin {}');

		const resolver = new ScriptPathResolver({
			workspaceFolders: [root],
			documentPath: path.join(root, 'contents', 'test', 'items.yml'),
			fileNamespace: 'test'
		});

		assert.deepStrictEqual(resolver.resolve('scripts/globe_spin.java'), {
			found: true,
			scriptPath,
			language: 'java',
			candidates: [path.join(root, 'contents', 'test', 'scripts', 'globe_spin.java')]
		});
	});
});
