import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import * as YAML from 'yaml';

import { AssetKind, assetKindToDirectory, assetKindToExtension } from './assetPathLayout';

export interface IndexedAsset {
	kind: AssetKind;
	namespace: string;
	path: string;
	fullPath: string;
}

export type IndexedDefinitionKind =
	| 'item'
	| 'block'
	| 'armor'
	| 'recipe'
	| 'sound'
	| 'font_image'
	| 'entity'
	| 'loot'
	| 'tree'
	| 'script'
	| 'category'
	| 'hud';

export interface IndexedDefinition {
	kind: IndexedDefinitionKind;
	namespace: string;
	id: string;
	fullPath: string;
}

interface IndexedFileSnapshot {
	mtimeMs: number;
	size: number;
}

interface ProjectAssetIndexCache {
	version: 1;
	files: Record<string, IndexedFileSnapshot>;
	assets: IndexedAsset[];
	definitions: IndexedDefinition[];
}

const CACHE_VERSION = 1;
const CACHE_FILE = path.join('.vscode', 'itemsadder-index.json');
const WATCHED_EXTENSIONS = new Set(['.png', '.json', '.mcmeta', '.ogg', '.yml', '.yaml', '.java', '.jspp']);
const SKIPPED_DIRECTORIES = new Set(['.git', '.gradle', '.vscode', '.vscode-test', 'node_modules', 'out', 'dist']);

const TOP_LEVEL_DEFINITIONS: Array<[string, IndexedDefinitionKind]> = [
	['items', 'item'],
	['blocks', 'block'],
	['armors', 'armor'],
	['sounds', 'sound'],
	['font_images', 'font_image'],
	['entities', 'entity'],
	['loots', 'loot'],
	['trees', 'tree'],
	['categories', 'category'],
	['huds', 'hud']
];

export class ProjectAssetIndex implements vscode.Disposable {
	private readonly assetsByKey = new Map<string, IndexedAsset>();
	private readonly definitionsByKey = new Map<string, IndexedDefinition>();
	private readonly rebuildEmitter = new vscode.EventEmitter<void>();
	public readonly onDidRebuild = this.rebuildEmitter.event;
	private readonly watcher: vscode.FileSystemWatcher;
	private rebuildTimeout: ReturnType<typeof setTimeout> | undefined;

	constructor(
		private readonly workspaceFoldersProvider: () => readonly vscode.WorkspaceFolder[] | undefined,
		private readonly enabledProvider: () => boolean = () => true
	) {
		this.watcher = vscode.workspace.createFileSystemWatcher('**/*.{png,json,mcmeta,ogg,yml,yaml,java,jspp}');
		this.watcher.onDidCreate(() => this.scheduleRebuild());
		this.watcher.onDidChange(() => this.scheduleRebuild());
		this.watcher.onDidDelete(() => this.scheduleRebuild());
		this.rebuild();
	}

	public list(kind: AssetKind, namespace?: string): IndexedAsset[] {
		return Array.from(this.assetsByKey.values())
			.filter(asset => asset.kind === kind && (!namespace || asset.namespace === namespace))
			.sort((a, b) => `${a.namespace}:${a.path}`.localeCompare(`${b.namespace}:${b.path}`));
	}

	public find(kind: AssetKind, namespace: string, assetPath: string): IndexedAsset | undefined {
		return this.assetsByKey.get(this.key(kind, namespace, assetPath));
	}

	public listDefinitions(kind: IndexedDefinitionKind, namespace?: string): IndexedDefinition[] {
		return Array.from(this.definitionsByKey.values())
			.filter(definition => definition.kind === kind && (!namespace || definition.namespace === namespace))
			.sort((a, b) => `${a.namespace}:${a.id}`.localeCompare(`${b.namespace}:${b.id}`));
	}

	public findDefinition(kind: IndexedDefinitionKind, namespace: string, id: string): IndexedDefinition | undefined {
		return this.definitionsByKey.get(this.definitionKey(kind, namespace, id));
	}

	public rebuild(): void {
		this.assetsByKey.clear();
		this.definitionsByKey.clear();
		if (!this.enabledProvider()) {
			this.rebuildEmitter.fire();
			return;
		}

		for (const folder of this.workspaceFoldersProvider() ?? []) {
			const workspacePath = folder.uri.fsPath;
			const files = this.collectWorkspaceFiles(workspacePath);
			if (!this.isItemsAdderWorkspace(workspacePath, files)) {
				continue;
			}

			const snapshot = this.snapshotFiles(files);
			const cached = this.readCache(workspacePath);
			if (cached && this.sameSnapshot(cached.files, snapshot)) {
				this.loadFromCache(cached);
				continue;
			}

			const assets: IndexedAsset[] = [];
			const definitions: IndexedDefinition[] = [];
			for (const fullPath of files) {
				this.scanFile(fullPath, assets, definitions);
			}

			this.addAssets(assets);
			this.addDefinitions(definitions);
			this.writeCache(workspacePath, { version: CACHE_VERSION, files: snapshot, assets, definitions });
		}

		this.rebuildEmitter.fire();
	}

	public dispose(): void {
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}
		this.watcher.dispose();
		this.rebuildEmitter.dispose();
	}

	private scheduleRebuild(): void {
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}
		this.rebuildTimeout = setTimeout(() => {
			this.rebuildTimeout = undefined;
			this.rebuild();
		}, 500);
	}

	private collectWorkspaceFiles(workspacePath: string): string[] {
		const files: string[] = [];
		const visit = (directory: string): void => {
			let entries: fs.Dirent[];
			try {
				entries = fs.readdirSync(directory, { withFileTypes: true });
			} catch {
				return;
			}

			for (const entry of entries) {
				if (entry.isDirectory()) {
					if (!SKIPPED_DIRECTORIES.has(entry.name)) {
						visit(path.join(directory, entry.name));
					}
					continue;
				}

				if (entry.isFile() && WATCHED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
					files.push(path.join(directory, entry.name));
				}
			}
		};

		visit(workspacePath);
		return files.sort();
	}

	private isItemsAdderWorkspace(workspacePath: string, files: string[]): boolean {
		if (this.pathContainsContents(workspacePath)) {
			return true;
		}

		return files.some(fullPath => this.pathContainsContents(fullPath) || this.isItemsAdderYamlFile(fullPath));
	}

	private pathContainsContents(filePath: string): boolean {
		return filePath.replace(/\\/g, '/').split('/').includes('contents');
	}

	private isItemsAdderYamlFile(fullPath: string): boolean {
		const extension = path.extname(fullPath).toLowerCase();
		if (extension !== '.yml' && extension !== '.yaml') {
			return false;
		}

		try {
			const text = fs.readFileSync(fullPath, 'utf8');
			return (
				/^\s*info:\s*$/m.test(text) && /^\s*namespace:\s*["']?[^"'\s]+/m.test(text)
			) || /^\s*(items|blocks|armors|sounds|font_images|entities|loots|trees|categories|huds|recipes):\s*$/m.test(text);
		} catch {
			return false;
		}
	}

	private snapshotFiles(files: string[]): Record<string, IndexedFileSnapshot> {
		const snapshot: Record<string, IndexedFileSnapshot> = {};
		for (const fullPath of files) {
			try {
				const stat = fs.statSync(fullPath);
				snapshot[fullPath] = { mtimeMs: stat.mtimeMs, size: stat.size };
			} catch {
				// Ignore files deleted while indexing. The watcher will schedule a new pass.
			}
		}
		return snapshot;
	}

	private sameSnapshot(left: Record<string, IndexedFileSnapshot>, right: Record<string, IndexedFileSnapshot>): boolean {
		const leftKeys = Object.keys(left);
		const rightKeys = Object.keys(right);
		if (leftKeys.length !== rightKeys.length) {
			return false;
		}

		return leftKeys.every(key => left[key]?.mtimeMs === right[key]?.mtimeMs && left[key]?.size === right[key]?.size);
	}

	private readCache(workspacePath: string): ProjectAssetIndexCache | undefined {
		try {
			const parsed = JSON.parse(fs.readFileSync(this.cachePath(workspacePath), 'utf8')) as ProjectAssetIndexCache;
			return parsed.version === CACHE_VERSION ? parsed : undefined;
		} catch {
			return undefined;
		}
	}

	private writeCache(workspacePath: string, cache: ProjectAssetIndexCache): void {
		try {
			const cachePath = this.cachePath(workspacePath);
			fs.mkdirSync(path.dirname(cachePath), { recursive: true });
			fs.writeFileSync(cachePath, `${JSON.stringify(cache)}\n`);
		} catch {
			// Cache is an optimization; indexing still works if it cannot be written.
		}
	}

	private cachePath(workspacePath: string): string {
		return path.join(workspacePath, CACHE_FILE);
	}

	private loadFromCache(cache: ProjectAssetIndexCache): void {
		this.addAssets(cache.assets);
		this.addDefinitions(cache.definitions);
	}

	private scanFile(fullPath: string, assets: IndexedAsset[], definitions: IndexedDefinition[]): void {
		const asset = this.assetFromPath(fullPath);
		if (asset) {
			assets.push(asset);
		}

		const extension = path.extname(fullPath).toLowerCase();
		if (extension === '.yml' || extension === '.yaml') {
			definitions.push(...this.definitionsFromYaml(fullPath));
		} else if (extension === '.java' || extension === '.jspp') {
			const script = this.scriptDefinitionFromPath(fullPath);
			if (script) {
				definitions.push(script);
			}
		}
	}

	private addAssets(assets: IndexedAsset[]): void {
		for (const asset of assets) {
			this.assetsByKey.set(this.key(asset.kind, asset.namespace, asset.path), asset);
		}
	}

	private addDefinitions(definitions: IndexedDefinition[]): void {
		for (const definition of definitions) {
			this.definitionsByKey.set(this.definitionKey(definition.kind, definition.namespace, definition.id), definition);
		}
	}

	private definitionsFromYaml(fullPath: string): IndexedDefinition[] {
		let doc: YAML.Document.Parsed<YAML.ParsedNode, true>;
		try {
			doc = YAML.parseDocument(fs.readFileSync(fullPath, 'utf8')) as YAML.Document.Parsed<YAML.ParsedNode, true>;
		} catch {
			return [];
		}

		const namespace = this.namespaceFromYaml(doc) ?? this.namespaceFromContentsPath(fullPath);
		if (!namespace) {
			return [];
		}

		const definitions: IndexedDefinition[] = [];
		for (const [topLevelKey, kind] of TOP_LEVEL_DEFINITIONS) {
			this.collectMapDefinitions(doc.get(topLevelKey, true) as YAML.Node | null | undefined, kind, namespace, fullPath, definitions);
		}

		this.collectRecipeDefinitions(doc.get('recipes', true) as YAML.Node | null | undefined, namespace, fullPath, definitions);
		return definitions;
	}

	private collectMapDefinitions(
		node: YAML.Node | null | undefined,
		kind: IndexedDefinitionKind,
		namespace: string,
		fullPath: string,
		definitions: IndexedDefinition[]
	): void {
		if (!YAML.isMap(node)) {
			return;
		}

		for (const pair of node.items) {
			if (YAML.isPair(pair) && YAML.isScalar(pair.key) && typeof pair.key.value === 'string') {
				definitions.push({ kind, namespace, id: pair.key.value, fullPath });
			}
		}
	}

	private collectRecipeDefinitions(
		node: YAML.Node | null | undefined,
		namespace: string,
		fullPath: string,
		definitions: IndexedDefinition[]
	): void {
		if (!YAML.isMap(node)) {
			return;
		}

		for (const categoryPair of node.items) {
			if (!YAML.isPair(categoryPair) || !YAML.isMap(categoryPair.value)) {
				continue;
			}

			for (const recipePair of categoryPair.value.items) {
				if (YAML.isPair(recipePair) && YAML.isScalar(recipePair.key) && typeof recipePair.key.value === 'string') {
					definitions.push({ kind: 'recipe', namespace, id: recipePair.key.value, fullPath });
				}
			}
		}
	}

	private namespaceFromYaml(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): string | undefined {
		const namespace = doc.getIn(['info', 'namespace'], true);
		return YAML.isScalar(namespace) && typeof namespace.value === 'string' ? namespace.value : undefined;
	}

	private scriptDefinitionFromPath(fullPath: string): IndexedDefinition | undefined {
		const normalizedPath = fullPath.replace(/\\/g, '/');
		const scriptsMarker = '/scripts/';
		const scriptsIndex = normalizedPath.lastIndexOf(scriptsMarker);
		const namespace = this.namespaceFromContentsPath(fullPath);
		if (!namespace || scriptsIndex === -1) {
			return undefined;
		}

		const extension = path.extname(fullPath);
		const id = normalizedPath.slice(scriptsIndex + scriptsMarker.length, normalizedPath.length - extension.length);
		return id ? { kind: 'script', namespace, id, fullPath } : undefined;
	}

	private namespaceFromContentsPath(fullPath: string): string | undefined {
		const parts = fullPath.replace(/\\/g, '/').split('/');
		const contentsIndex = parts.lastIndexOf('contents');
		return contentsIndex === -1 ? undefined : parts[contentsIndex + 1];
	}

	private assetFromPath(fullPath: string): IndexedAsset | undefined {
		const normalizedPath = fullPath.replace(/\\/g, '/');
		for (const kind of ['texture', 'model', 'sound'] as const) {
			const extension = assetKindToExtension(kind);
			if (!normalizedPath.endsWith(extension)) {
				continue;
			}

			const directory = assetKindToDirectory(kind);
			const marker = `/${directory}/`;
			const markerIndex = normalizedPath.lastIndexOf(marker);
			if (markerIndex === -1) {
				continue;
			}

			const assetPath = normalizedPath.slice(markerIndex + marker.length);
			const namespace = this.namespaceFromPath(normalizedPath, markerIndex);
			if (!namespace) {
				continue;
			}

			return {
				kind,
				namespace,
				path: assetPath,
				fullPath
			};
		}

		return undefined;
	}

	private namespaceFromPath(normalizedPath: string, markerIndex: number): string | undefined {
		const beforeMarker = normalizedPath.slice(0, markerIndex);
		const segments = beforeMarker.split('/').filter(Boolean);
		const assetsIndex = segments.lastIndexOf('assets');
		if (assetsIndex !== -1 && segments[assetsIndex + 1]) {
			return segments[assetsIndex + 1];
		}

		return segments[segments.length - 1];
	}

	private key(kind: AssetKind, namespace: string, assetPath: string): string {
		return `asset:${kind}:${namespace}:${assetPath}`;
	}

	private definitionKey(kind: IndexedDefinitionKind, namespace: string, id: string): string {
		return `definition:${kind}:${namespace}:${id}`;
	}
}
