import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { AssetKind, assetKindToDirectory, assetKindToExtension } from './assetPathLayout';

export interface IndexedAsset {
	kind: AssetKind;
	namespace: string;
	path: string;
	fullPath: string;
}

export class ProjectAssetIndex implements vscode.Disposable {
	private readonly assetsByKey = new Map<string, IndexedAsset>();
	private readonly watcher: vscode.FileSystemWatcher;
	private rebuildTimeout: ReturnType<typeof setTimeout> | undefined;

	constructor(private readonly workspaceFoldersProvider: () => readonly vscode.WorkspaceFolder[] | undefined) {
		this.watcher = vscode.workspace.createFileSystemWatcher('**/*.{png,json,mcmeta,ogg}');
		this.watcher.onDidCreate(() => this.scheduleRebuild());
		this.watcher.onDidChange(() => this.scheduleRebuild());
		this.watcher.onDidDelete(() => this.scheduleRebuild());
		this.rebuild();
	}

	public list(kind: AssetKind, namespace: string): IndexedAsset[] {
		return Array.from(this.assetsByKey.values())
			.filter(asset => asset.kind === kind && asset.namespace === namespace)
			.sort((a, b) => a.path.localeCompare(b.path));
	}

	public find(kind: AssetKind, namespace: string, assetPath: string): IndexedAsset | undefined {
		return this.assetsByKey.get(this.key(kind, namespace, assetPath));
	}

	public rebuild(): void {
		this.assetsByKey.clear();
		const workspaceFolders = this.workspaceFoldersProvider() ?? [];
		for (const folder of workspaceFolders) {
			this.scanDirectory(folder.uri.fsPath);
		}
	}

	public dispose(): void {
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}
		this.watcher.dispose();
	}

	private scheduleRebuild(): void {
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}

		this.rebuildTimeout = setTimeout(() => this.rebuild(), 250);
	}

	private scanDirectory(directory: string): void {
		let entries: fs.Dirent[];
		try {
			entries = fs.readdirSync(directory, { withFileTypes: true });
		} catch {
			return;
		}

		for (const entry of entries) {
			const fullPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'out' || entry.name === '.vscode-test') {
					continue;
				}
				this.scanDirectory(fullPath);
				continue;
			}

			if (!entry.isFile()) {
				continue;
			}

			const asset = this.assetFromPath(fullPath);
			if (asset) {
				this.assetsByKey.set(this.key(asset.kind, asset.namespace, asset.path), asset);
			}
		}
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
		return `${kind}:${namespace}:${assetPath}`;
	}
}
