import * as fs from 'fs';
import * as vscode from 'vscode';
import * as YAML from 'yaml';

export interface DictionaryEntry {
	key: string;
	value: string;
	sourcePath?: string;
	language?: string;
	priority: number;
}

export interface MinecraftLangEntry extends DictionaryEntry {
	languages: string[];
	priority: number;
}

export class ItemsAdderDictionaryIndex implements vscode.Disposable {
	private readonly entries = new Map<string, DictionaryEntry>();
	private readonly minecraftLangEntries = new Map<string, MinecraftLangEntry>();
	private readonly changeEmitter = new vscode.EventEmitter<void>();
	private readonly watcher: vscode.FileSystemWatcher;
	private rebuildTimeout: ReturnType<typeof setTimeout> | undefined;
	private disposed = false;

	public readonly onDidChange = this.changeEmitter.event;

	constructor() {
		this.watcher = vscode.workspace.createFileSystemWatcher('**/*.{yml,yaml}');
		this.watcher.onDidCreate(() => this.scheduleRebuild());
		this.watcher.onDidChange(() => this.scheduleRebuild());
		this.watcher.onDidDelete(() => this.scheduleRebuild());
		void this.rebuild();
	}

	public lookup(key: string): DictionaryEntry | undefined {
		return this.entries.get(key);
	}

	public lookupMinecraftLang(key: string): MinecraftLangEntry | undefined {
		return this.minecraftLangEntries.get(key);
	}

	public async rebuild(): Promise<void> {
		if (this.disposed) {
			return;
		}

		const nextEntries = new Map<string, DictionaryEntry>();
		const nextMinecraftLangEntries = new Map<string, MinecraftLangEntry>();
		const files = await vscode.workspace.findFiles('**/*.{yml,yaml}', '**/{node_modules,.git,out}/**');
		for (const file of files) {
			for (const entry of collectDictionaryEntries(fs.readFileSync(file.fsPath, 'utf8'), file.fsPath)) {
				const previous = nextEntries.get(entry.key);
				if (!previous || entry.priority < previous.priority) {
					nextEntries.set(entry.key, entry);
				}
			}
			for (const entry of collectMinecraftLangEntries(fs.readFileSync(file.fsPath, 'utf8'), file.fsPath)) {
				const previous = nextMinecraftLangEntries.get(entry.key);
				if (!previous || entry.priority < previous.priority) {
					nextMinecraftLangEntries.set(entry.key, entry);
				}
			}
		}

		this.entries.clear();
		for (const [key, entry] of nextEntries) {
			this.entries.set(key, entry);
		}
		this.minecraftLangEntries.clear();
		for (const [key, entry] of nextMinecraftLangEntries) {
			this.minecraftLangEntries.set(key, entry);
		}
		this.changeEmitter.fire();
	}

	public scheduleRebuild(): void {
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}
		this.rebuildTimeout = setTimeout(() => {
			void this.rebuild();
		}, 250);
	}

	public dispose(): void {
		this.disposed = true;
		if (this.rebuildTimeout) {
			clearTimeout(this.rebuildTimeout);
		}
		this.watcher.dispose();
		this.changeEmitter.dispose();
	}
}

export function collectDictionaryEntries(text: string, sourcePath?: string): DictionaryEntry[] {
	const doc = YAML.parseDocument(text);
	const dictionaryNode = doc.get('dictionary', true);
	if (!YAML.isMap(dictionaryNode)) {
		return [];
	}

	const language = readInfoDictionaryLanguage(doc);
	const priority = dictionaryLanguagePriority(language);
	const entries: DictionaryEntry[] = [];
	for (const item of dictionaryNode.items) {
		if (!YAML.isPair(item) || !YAML.isScalar(item.key) || !YAML.isScalar(item.value)) {
			continue;
		}

		const key = String(item.key.value ?? '').trim();
		const value = String(item.value.value ?? '').trim();
		if (!key) {
			continue;
		}

		entries.push({ key, value, sourcePath, language, priority });
	}

	return entries;
}

export function collectMinecraftLangEntries(text: string, sourcePath?: string): MinecraftLangEntry[] {
	const doc = YAML.parseDocument(text);
	const rootNode = doc.get('minecraft_lang_overwrite', true);
	if (!YAML.isMap(rootNode)) {
		return [];
	}

	const entries: MinecraftLangEntry[] = [];
	for (const overwriteItem of rootNode.items) {
		if (!YAML.isPair(overwriteItem) || !YAML.isMap(overwriteItem.value)) {
			continue;
		}

		const languages = readStringArray(overwriteItem.value.get('languages', true));
		const priority = languagePriority(languages);
		const entriesNode = overwriteItem.value.get('entries', true);
		if (!YAML.isMap(entriesNode)) {
			continue;
		}

		for (const entryItem of entriesNode.items) {
			if (!YAML.isPair(entryItem) || !YAML.isScalar(entryItem.key) || !YAML.isScalar(entryItem.value)) {
				continue;
			}

			const key = String(entryItem.key.value ?? '').trim();
			const value = String(entryItem.value.value ?? '').trim();
			if (!key) {
				continue;
			}

			entries.push({ key, value, sourcePath, languages, priority });
		}
	}

	return entries;
}

function readStringArray(node: unknown): string[] {
	if (YAML.isSeq(node)) {
		return node.items
			.filter(YAML.isScalar)
			.map(item => String(item.value ?? '').trim())
			.filter(Boolean);
	}

	if (YAML.isScalar(node) && node.value) {
		return [String(node.value).trim()];
	}

	return [];
}

function languagePriority(languages: string[]): number {
	const normalized = languages.map(language => language.toLowerCase());
	if (normalized.includes('all')) {
		return 0;
	}
	if (normalized.includes('en_us')) {
		return 1;
	}
	return 2;
}

function readInfoDictionaryLanguage(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): string | undefined {
	const infoNode = doc.get('info', true);
	if (!YAML.isMap(infoNode)) {
		return undefined;
	}

	const languageNode = infoNode.get('dictionary-lang', true);
	if (YAML.isScalar(languageNode) && languageNode.value) {
		return String(languageNode.value).trim();
	}

	return undefined;
}

function dictionaryLanguagePriority(language: string | undefined): number {
	if (!language) {
		return 1;
	}

	return language.toLowerCase() === 'en' ? 0 : 1;
}
