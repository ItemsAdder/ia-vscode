import { AssetKind } from './assetPathLayout';

export function displayWorkspacePath(filePath: string | undefined, preferredKind?: AssetKind): string {
	if (!filePath) {
		return '';
	}

	const normalizedPath = filePath.replace(/\\/g, '/');
	const contentsIndex = normalizedPath.indexOf('/contents/');
	if (contentsIndex !== -1) {
		return normalizedPath.slice(contentsIndex + 1);
	}

	const directories = preferredKind
		? [assetDirectory(preferredKind)]
		: ['textures', 'models', 'sounds', 'scripts', 'resourcepack', 'resource_pack'];
	for (const directory of directories) {
		const directoryIndex = normalizedPath.indexOf(`/${directory}/`);
		if (directoryIndex !== -1) {
			return normalizedPath.slice(directoryIndex + 1);
		}
	}

	return normalizedPath;
}

function assetDirectory(kind: AssetKind): string {
	if (kind === 'texture') {
		return 'textures';
	}

	return kind === 'model' ? 'models' : 'sounds';
}
