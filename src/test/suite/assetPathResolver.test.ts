import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { AssetPathResolver } from '../../itemsadder/assetPathResolver';
import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';

suite('Asset path resolver', () => {
	test('resolves assets from the contents folder containing the document', () => {
		const workspacePath = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-resolver-'));
		const documentPath = path.join(workspacePath, 'run', 'server', 'plugins', 'ItemsAdder', 'contents', 'test', 'configs', 'items.yml');
		const texturePath = path.join(workspacePath, 'run', 'server', 'plugins', 'ItemsAdder', 'contents', 'test', 'resourcepack', 'assets', 'test', 'textures', 'item', 'gem.png');
		fs.mkdirSync(path.dirname(texturePath), { recursive: true });
		fs.writeFileSync(texturePath, '');

		const resolver = new AssetPathResolver({
			workspaceFolders: [workspacePath],
			documentPath,
			fileNamespace: 'test',
			vanillaTexturePaths: []
		});

		assert.deepStrictEqual(resolver.resolveTexture('item/gem'), { found: true, assetPath: texturePath });
	});

	test('uses project asset index before filesystem probing', () => {
		const assetIndex = {
			find(kind: string, namespace: string, assetPath: string) {
				if (kind === 'texture' && namespace === 'test' && assetPath === 'item/gem.png') {
					return {
						kind: 'texture',
						namespace,
						path: assetPath,
						fullPath: '/workspace/test/assets/test/textures/item/gem.png'
					};
				}
				return undefined;
			}
		} as ProjectAssetIndex;

		const resolver = new AssetPathResolver({
			workspaceFolders: ['/workspace'],
			documentPath: '/workspace/test/config.yml',
			fileNamespace: 'test',
			vanillaTexturePaths: [],
			assetIndex
		});

		assert.deepStrictEqual(resolver.resolveTexture('item/gem'), {
			found: true,
			assetPath: '/workspace/test/assets/test/textures/item/gem.png'
		});
	});

	test('resolves sound assets from project asset index', () => {
		const assetIndex = {
			find(kind: string, namespace: string, assetPath: string) {
				if (kind === 'sound' && namespace === 'test' && assetPath === 'creepy3.ogg') {
					return { kind: 'sound', namespace, path: assetPath, fullPath: '/workspace/test/sounds/creepy3.ogg' };
				}
				return undefined;
			}
		} as ProjectAssetIndex;
		const resolver = new AssetPathResolver({
			workspaceFolders: ['/workspace'],
			documentPath: '/workspace/test/config.yml',
			fileNamespace: 'test',
			vanillaTexturePaths: [],
			assetIndex
		});

		assert.deepStrictEqual(resolver.resolveSound('creepy3'), {
			found: true,
			assetPath: '/workspace/test/sounds/creepy3.ogg'
		});
	});
});
