import * as fs from 'fs';
import * as path from 'path';

import { normalizeNamespacedAssetPath } from './assetPathLayout';
import { ProjectAssetIndex } from './projectAssetIndex';
import { vanillaTextureUrl } from './vanillaMinecraftAssets';

export interface AssetResolution {
	found: boolean;
	assetPath?: string;
	remoteUrl?: string;
	skipped?: boolean;
}

export interface AssetPathResolverOptions {
	workspaceFolders: string[];
	documentPath: string;
	fileNamespace: string;
	vanillaTexturePaths: string[];
	assetIndex?: ProjectAssetIndex;
}

export class AssetPathResolver {
	constructor(private readonly options: AssetPathResolverOptions) {}

	public isDocumentInWorkspace(): boolean {
		return this.options.workspaceFolders.some(folder => {
			const relative = path.relative(folder, this.options.documentPath);
			return !relative.startsWith('..') && !path.isAbsolute(relative);
		});
	}

	public resolveTexture(texturePath: string | undefined): AssetResolution {
		const normalized = normalizeNamespacedAssetPath(texturePath, this.options.fileNamespace, '.png');
		if (!normalized) {
			return { found: false };
		}

		if (normalized.namespace === 'minecraft') {
			if (this.options.vanillaTexturePaths.includes(normalized.path)) {
				return {
					found: true,
					remoteUrl: vanillaTextureUrl(normalized.path)
				};
			}

			return { found: false };
		}

		const indexedAsset = this.options.assetIndex?.find('texture', normalized.namespace, normalized.path);
		if (indexedAsset) {
			return { found: true, assetPath: indexedAsset.fullPath };
		}

		return this.findInWorkspace(this.textureCandidates(normalized.namespace, normalized.path));
	}

	public resolveModel(modelPath: string | undefined): AssetResolution {
		const normalized = normalizeNamespacedAssetPath(modelPath, this.options.fileNamespace, '.json');
		if (!normalized) {
			return { found: false };
		}

		if (normalized.namespace === 'minecraft') {
			return { found: true, skipped: true };
		}

		const indexedAsset = this.options.assetIndex?.find('model', normalized.namespace, normalized.path);
		if (indexedAsset) {
			return { found: true, assetPath: indexedAsset.fullPath };
		}

		return this.findInWorkspace(this.modelCandidates(normalized.namespace, normalized.path));
	}

	public resolveSound(soundPath: string | undefined): AssetResolution {
		const normalized = normalizeNamespacedAssetPath(soundPath, this.options.fileNamespace, '.ogg');
		if (!normalized) {
			return { found: false };
		}

		const indexedAsset = this.options.assetIndex?.find('sound', normalized.namespace, normalized.path);
		if (indexedAsset) {
			return { found: true, assetPath: indexedAsset.fullPath };
		}

		return this.findInWorkspace(this.soundCandidates(normalized.namespace, normalized.path));
	}

	private findInWorkspace(candidates: string[]): AssetResolution {
		const assetPath = candidates.find(candidate => fs.existsSync(candidate));
		if (!assetPath) {
			return { found: false };
		}

		return { found: true, assetPath };
	}

	private textureCandidates(textureNamespace: string, texturePath: string): string[] {
		return this.options.workspaceFolders.flatMap(workspacePath => [
			path.join(workspacePath, this.options.fileNamespace, 'textures', texturePath),
			path.join(workspacePath, this.options.fileNamespace, 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'resourcepack', 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'resourcepack', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'resource_pack', 'assets', textureNamespace, 'textures', texturePath),
			path.join(workspacePath, textureNamespace, 'resource_pack', textureNamespace, 'textures', texturePath)
		]);
	}

	private modelCandidates(modelNamespace: string, modelPath: string): string[] {
		return this.options.workspaceFolders.flatMap(workspacePath => [
			path.join(workspacePath, this.options.fileNamespace, 'models', modelPath),
			path.join(workspacePath, this.options.fileNamespace, 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', modelNamespace, 'models', modelPath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'resourcepack', 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'resourcepack', modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'resource_pack', 'assets', modelNamespace, 'models', modelPath),
			path.join(workspacePath, modelNamespace, 'resource_pack', modelNamespace, 'models', modelPath)
		]);
	}

	private soundCandidates(soundNamespace: string, soundPath: string): string[] {
		return this.options.workspaceFolders.flatMap(workspacePath => [
			path.join(workspacePath, this.options.fileNamespace, 'sounds', soundPath),
			path.join(workspacePath, this.options.fileNamespace, 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, this.options.fileNamespace, 'resourcepack', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, this.options.fileNamespace, 'resource_pack', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'resourcepack', 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'resourcepack', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'resource_pack', 'assets', soundNamespace, 'sounds', soundPath),
			path.join(workspacePath, soundNamespace, 'resource_pack', soundNamespace, 'sounds', soundPath)
		]);
	}
}
