import { IndexedDefinitionKind } from './projectAssetIndex';

export function definitionKindsForPath(path: string[]): IndexedDefinitionKind[] {
	const last = path[path.length - 1];
	const parent = path[path.length - 2];

	if (last === 'script' || (last === 'path' && parent === 'script')) {
		return ['script'];
	}

	if (last === 'song' && path.includes('jukebox_disc')) {
		return ['sound'];
	}

	if (last === 'name' && path.includes('play_sound')) {
		return ['sound'];
	}

	if ((last === 'log' || last === 'leaves') && path[0] === 'trees') {
		return ['block'];
	}

	if (last === 'item' || last === 'icon' || last === 'items' || parent === 'ingredients') {
		return ['item', 'block'];
	}

	if (last === 'sound') {
		return ['sound'];
	}

	if (last === 'entity') {
		return ['entity'];
	}

	if (last === 'font_image' || last === 'font-image') {
		return ['font_image'];
	}

	return [];
}

export function isDefinitionDeclarationPath(path: string[]): boolean {
	return path.length === 2 && [
		'items',
		'blocks',
		'armors',
		'sounds',
		'font_images',
		'entities',
		'loots',
		'trees',
		'categories',
		'huds'
	].includes(path[0]);
}

export function allowsVanillaMaterial(kinds: IndexedDefinitionKind[]): boolean {
	return kinds.includes('item') || kinds.includes('block');
}

export function normalizeDefinitionId(kind: IndexedDefinitionKind, id: string): string {
	return kind === 'script' ? id.replace(/\.(java|jspp)$/i, '') : id;
}

export function definitionKindLabel(kinds: IndexedDefinitionKind[]): string {
	return kinds.map(kind => kind.replace('_', ' ')).join(' or ');
}

export function splitNamespacedReference(value: string, defaultNamespace: string): { namespace: string; id: string } | undefined {
	const trimmed = value.trim();
	if (!trimmed) {
		return undefined;
	}

	const separatorIndex = trimmed.indexOf(':');
	if (separatorIndex === -1) {
		return { namespace: defaultNamespace, id: trimmed };
	}

	const namespace = trimmed.slice(0, separatorIndex);
	const id = trimmed.slice(separatorIndex + 1);
	return namespace && id ? { namespace, id } : undefined;
}
