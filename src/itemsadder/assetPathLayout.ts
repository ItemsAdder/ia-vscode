export type AssetKind = 'texture' | 'model' | 'sound';

export interface NormalizedAssetPath {
	namespace: string;
	path: string;
}

export function normalizeNamespacedAssetPath(
	assetPath: string | undefined,
	defaultNamespace: string,
	extension: '.png' | '.json' | '.ogg'
): NormalizedAssetPath | undefined {
	if (!assetPath) {
		return undefined;
	}

	let normalizedPath = assetPath.trim();
	if (!normalizedPath) {
		return undefined;
	}

	if (!normalizedPath.endsWith(extension)) {
		normalizedPath += extension;
	}

	const separatorIndex = normalizedPath.indexOf(':');
	if (separatorIndex === -1) {
		return { namespace: defaultNamespace, path: normalizedPath };
	}

	return {
		namespace: normalizedPath.slice(0, separatorIndex),
		path: normalizedPath.slice(separatorIndex + 1)
	};
}

export function assetKindToDirectory(kind: AssetKind): 'textures' | 'models' | 'sounds' {
	if (kind === 'texture') {
		return 'textures';
	}
	return kind === 'model' ? 'models' : 'sounds';
}

export function assetKindToExtension(kind: AssetKind): '.png' | '.json' | '.ogg' {
	if (kind === 'texture') {
		return '.png';
	}
	return kind === 'model' ? '.json' : '.ogg';
}
