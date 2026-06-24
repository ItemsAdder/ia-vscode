import * as fs from 'fs';
import * as path from 'path';

export type ScriptLanguage = 'jspp' | 'java';

export interface ScriptResolution {
	found: boolean;
	scriptPath?: string;
	language?: ScriptLanguage;
	candidates: string[];
}

export interface ScriptPathResolverOptions {
	workspaceFolders: string[];
	documentPath: string;
	fileNamespace: string;
}

const SCRIPT_EXTENSIONS: Record<ScriptLanguage, string> = {
	jspp: '.jspp',
	java: '.java'
};

export class ScriptPathResolver {
	constructor(private readonly options: ScriptPathResolverOptions) {}

	public isDocumentInWorkspace(): boolean {
		return this.options.workspaceFolders.some(folder => {
			const relative = path.relative(folder, this.options.documentPath);
			return !relative.startsWith('..') && !path.isAbsolute(relative);
		});
	}

	public resolve(scriptPath: string | undefined): ScriptResolution {
		const relativePath = normalizeScriptPath(scriptPath);
		if (!relativePath) {
			return { found: false, candidates: [] };
		}

		const candidates = this.candidates(relativePath);
		for (const candidate of candidates) {
			if (fs.existsSync(candidate)) {
				return {
					found: true,
					scriptPath: candidate,
					language: languageFromPath(candidate),
					candidates
				};
			}
		}

		return { found: false, candidates };
	}

	private candidates(relativePath: string): string[] {
		const namespaceRoots = this.namespaceRoots();
		const paths = expandScriptExtensions(relativePath).flatMap(scriptPath =>
			namespaceRoots.map(root => path.join(root, scriptPath))
		);

		return Array.from(new Set(paths));
	}

	private namespaceRoots(): string[] {
		const roots = [
			namespaceRootFromDocument(this.options.documentPath, this.options.fileNamespace),
			...this.options.workspaceFolders.flatMap(folder => {
				const roots = [path.join(folder, this.options.fileNamespace)];
				if (path.basename(folder) !== 'contents') {
					roots.push(path.join(folder, 'contents', this.options.fileNamespace));
				}
				return roots;
			})
		].filter((root): root is string => Boolean(root));

		return Array.from(new Set(roots));
	}
}

function normalizeScriptPath(scriptPath: string | undefined): string | undefined {
	const value = scriptPath?.trim().replace(/\\/g, '/').replace(/^\/+/, '');
	return value || undefined;
}

function expandScriptExtensions(scriptPath: string): string[] {
	const extension = path.extname(scriptPath).toLowerCase();
	if (extension === SCRIPT_EXTENSIONS.jspp || extension === SCRIPT_EXTENSIONS.java) {
		return [scriptPath];
	}

	return [scriptPath + SCRIPT_EXTENSIONS.jspp, scriptPath + SCRIPT_EXTENSIONS.java];
}

function languageFromPath(scriptPath: string): ScriptLanguage | undefined {
	const extension = path.extname(scriptPath).toLowerCase();
	if (extension === SCRIPT_EXTENSIONS.jspp) {
		return 'jspp';
	}
	if (extension === SCRIPT_EXTENSIONS.java) {
		return 'java';
	}
	return undefined;
}

function namespaceRootFromDocument(documentPath: string, fileNamespace: string): string | undefined {
	const normalized = documentPath.replace(/\\/g, '/');
	const parts = normalized.split('/');
	const contentsIndex = parts.lastIndexOf('contents');
	if (contentsIndex !== -1 && parts[contentsIndex + 1] === fileNamespace) {
		return parts.slice(0, contentsIndex + 2).join('/') || path.sep;
	}

	const namespaceIndex = parts.lastIndexOf(fileNamespace);
	if (namespaceIndex !== -1) {
		return parts.slice(0, namespaceIndex + 1).join('/') || path.sep;
	}

	return undefined;
}
