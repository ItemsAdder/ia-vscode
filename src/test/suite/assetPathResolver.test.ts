import * as assert from 'assert';

import { AssetPathResolver } from '../../itemsadder/assetPathResolver';
import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';

suite('Asset path resolver', () => {
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
