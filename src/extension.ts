import * as fs from 'fs';
import * as https from 'https';
import * as vscode from 'vscode';

import { DefinitionReferenceHoverProvider } from './itemsadder/definitionReferenceHoverProvider';
import { EditorDecorationController } from './itemsadder/editorDecorationController';
import { ItemsAdderDictionaryIndex } from './itemsadder/itemsAdderDictionaryIndex';
import { ItemsAdderCompletionProvider } from './itemsadder/itemsAdderCompletionProvider';
import { ItemsAdderSoundCodeLensProvider, ItemsAdderSoundHoverProvider, ItemsAdderSoundPlayer } from './itemsadder/itemsAdderSoundPlayer';
import { JavaScriptSupportConfigurator } from './itemsadder/javaScriptSupportConfigurator';
import { ProjectAssetIndex } from './itemsadder/projectAssetIndex';
import { SchemaHoverProvider } from './itemsadder/schemaHoverProvider';
import { ScriptPathHoverProvider } from './itemsadder/scriptPathHoverProvider';
import { VANILLA_MINECRAFT_ASSETS_VERSION, VANILLA_TEXTURES_API_ROOT } from './itemsadder/vanillaMinecraftAssets';
import { isItemsAdderPluginConfig, itemsAdderPluginConfigSchema } from './itemsAdderPluginConfig';
import { registerJsppLanguageFeatures } from './jspp';
import { schemas } from './schemas';
import { items as vscodeItemsSuggestions } from './vscodeSuggestions';

const DEBUG = false;
const SCHEME = 'itemsadder';
const RESOURCE_SCHEMA_URI = `${SCHEME}://schema/itemsadder-resource`;
const PLUGIN_CONFIG_SCHEMA_URI = `${SCHEME}://schema/itemsadder-plugin-config`;
const JSON_SCHEMA = JSON.stringify(stripSchemaHoverMetadata(schemas));
const ITEMSADDER_PLUGIN_CONFIG_SCHEMA = JSON.stringify(stripSchemaHoverMetadata(itemsAdderPluginConfigSchema));
const DOWNLOAD_VANILLA_TEXTURES_LIST = false;
const ITEMSADDER_CONTEXT_KEY = 'ia-vscode.itemsAdderResourceConfig';

let activeEditor: vscode.TextEditor | undefined;
let timeout: ReturnType<typeof setTimeout> | undefined;
let lastAutoSuggestKey: string | undefined;
let decorationController: EditorDecorationController | undefined;
let javaScriptSupportConfigurator: JavaScriptSupportConfigurator | undefined;
let itemsAdderStatusBarItem: vscode.StatusBarItem | undefined;

const config = vscode.workspace.getConfiguration('ia-vscode');
let neverWarnAboutCopilot = config.get<boolean>('neverWarnAboutCopilot');
let originalWordBasedSuggestionsEnabled: any = null;
let originalCopilotEnabled: boolean | undefined = undefined;
let vanillaTexturePaths: string[] = [];

interface ItemsAdderExtensionSettings {
	enableDecorations: boolean;
	enableDiagnostics: boolean;
	enableIndexing: boolean;
	enableCustomReferenceAutocomplete: boolean;
	enableImplicitNamespaceHints: boolean;
	enableTextPreviews: boolean;
	enableHoverProviders: boolean;
	enableSoundTools: boolean;
	enableAutoSuggestionsOnEmptyLine: boolean;
	enableStatusBar: boolean;
}

function getExtensionSettings(): ItemsAdderExtensionSettings {
	const currentConfig = vscode.workspace.getConfiguration('ia-vscode');
	return {
		enableDecorations: currentConfig.get<boolean>('enableDecorations', true),
		enableDiagnostics: currentConfig.get<boolean>('enableDiagnostics', true),
		enableIndexing: currentConfig.get<boolean>('enableIndexing', true),
		enableCustomReferenceAutocomplete: currentConfig.get<boolean>('enableCustomReferenceAutocomplete', true),
		enableImplicitNamespaceHints: currentConfig.get<boolean>('enableImplicitNamespaceHints', true),
		enableTextPreviews: currentConfig.get<boolean>('enableTextPreviews', true),
		enableHoverProviders: currentConfig.get<boolean>('enableHoverProviders', true),
		enableSoundTools: currentConfig.get<boolean>('enableSoundTools', true),
		enableAutoSuggestionsOnEmptyLine: currentConfig.get<boolean>('enableAutoSuggestionsOnEmptyLine', true),
		enableStatusBar: currentConfig.get<boolean>('enableStatusBar', true)
	};
}

function stripSchemaHoverMetadata(schema: any): any {
	const cloned = JSON.parse(JSON.stringify(schema));
	stripSchemaNodeHoverMetadata(cloned);
	return cloned;
}

function stripSchemaNodeHoverMetadata(node: any): void {
	if (!node || typeof node !== 'object') {
		return;
	}

	if (Array.isArray(node)) {
		node.forEach(stripSchemaNodeHoverMetadata);
		return;
	}

	delete node.markdownDescription;
	delete node.description;
	delete node.title;
	delete node.deprecationMessage;
	delete node.markdownDeprecationMessage;
	delete node.deprecated;

	for (const value of Object.values(node)) {
		stripSchemaNodeHoverMetadata(value);
	}
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	activeEditor = vscode.window.activeTextEditor;
	originalWordBasedSuggestionsEnabled = getOriginalYamlWordSuggestions();
	originalCopilotEnabled = getCopilotYaml();

	registerJsppLanguageFeatures(context);
	await registerYamlSchema();
	vanillaTexturePaths = await loadVanillaTexturePaths(context);
	const assetIndex = getExtensionSettings().enableIndexing
		? new ProjectAssetIndex(() => vscode.workspace.workspaceFolders, () => getExtensionSettings().enableIndexing)
		: undefined;
	if (assetIndex) {
		context.subscriptions.push(assetIndex);
		context.subscriptions.push(assetIndex.onDidRebuild(() => {
			if (activeEditor && isItemsAdderManagedConfig(activeEditor.document)) {
				triggerUpdateDecorations(true);
			}
		}));
	}
	const dictionaryIndex = new ItemsAdderDictionaryIndex();
	context.subscriptions.push(dictionaryIndex);
	const soundPlayer = new ItemsAdderSoundPlayer();
	context.subscriptions.push(soundPlayer);
	javaScriptSupportConfigurator = new JavaScriptSupportConfigurator();

	const diagnostics = vscode.languages.createDiagnosticCollection('ia_diagnostics');
	context.subscriptions.push(diagnostics);
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.outdentWithoutAcceptingSuggestion', async () => {
		await vscode.commands.executeCommand('hideSuggestWidget');
		await vscode.commands.executeCommand('editor.action.outdentLines');
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.openTranslationSource', async (sourcePath: string) => {
		if (!sourcePath) {
			return;
		}

		const document = await vscode.workspace.openTextDocument(vscode.Uri.file(sourcePath));
		await vscode.window.showTextDocument(document);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.openAssetSource', async (sourcePath: string) => {
		if (!sourcePath) {
			return;
		}

		await vscode.commands.executeCommand('vscode.open', vscode.Uri.file(sourcePath));
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.openUrlInVscode', async (url: string) => {
		if (!url) {
			return;
		}

		try {
			await vscode.commands.executeCommand('workbench.action.newGroupRight');
			await vscode.commands.executeCommand('simpleBrowser.show', url);
		} catch {
			await vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.configureJavaScriptSupport', async () => {
		await javaScriptSupportConfigurator?.configureWorkspace();
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.cleanJavaLanguageServerWorkspace', async () => {
		try {
			await vscode.commands.executeCommand('java.clean.workspace');
		} catch {
			void vscode.window.showWarningMessage('Java extension command not available. Install or activate Extension Pack for Java.');
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.showItemsAdderMenu', async () => {
		const action = await vscode.window.showQuickPick(
			[
				{
					label: '$(settings-gear) Configure Java Script Support',
					description: 'Setup Paper API and ItemsAdder API autocomplete'
				},
				{
					label: '$(trash) Clean Java Language Server Workspace',
					description: 'Clear Java LS cache and reload project metadata'
				}
			],
			{ placeHolder: 'ItemsAdder' }
		);
		if (action?.label.includes('Configure Java Script Support')) {
			await vscode.commands.executeCommand('ia-vscode.configureJavaScriptSupport');
		} else if (action?.label.includes('Clean Java Language Server Workspace')) {
			await vscode.commands.executeCommand('ia-vscode.cleanJavaLanguageServerWorkspace');
		}
	}));
	if (getExtensionSettings().enableStatusBar) {
		itemsAdderStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
		itemsAdderStatusBarItem.text = '$(symbol-misc) ItemsAdder';
		itemsAdderStatusBarItem.tooltip = 'ItemsAdder tools';
		itemsAdderStatusBarItem.command = 'ia-vscode.showItemsAdderMenu';
		itemsAdderStatusBarItem.show();
		context.subscriptions.push(itemsAdderStatusBarItem);
	}
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.playSound', (soundPath: string, label?: string) => {
		soundPlayer.play(soundPath, label);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('ia-vscode.stopSound', () => {
		soundPlayer.stop();
	}));

	const completionProvider = new ItemsAdderCompletionProvider({
		schemas,
		pluginConfigSchema: itemsAdderPluginConfigSchema,
		itemTemplates: vscodeItemsSuggestions,
		vanillaTexturePaths,
		assetIndex,
		getDevMode: () => Boolean(vscode.workspace.getConfiguration('ia-vscode').get('devMode')),
		getEnableCustomReferenceAutocomplete: () => {
			const settings = getExtensionSettings();
			return settings.enableIndexing && settings.enableCustomReferenceAutocomplete;
		}
	});
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider({ language: 'yaml' }, completionProvider, ':', ' ', '-'));
	if (getExtensionSettings().enableHoverProviders) {
		context.subscriptions.push(vscode.languages.registerHoverProvider(
			{ language: 'yaml' },
			new SchemaHoverProvider({ schemas, pluginConfigSchema: itemsAdderPluginConfigSchema })
		));
		context.subscriptions.push(vscode.languages.registerHoverProvider(
			{ language: 'yaml' },
			new ScriptPathHoverProvider()
		));
		if (assetIndex) {
			context.subscriptions.push(vscode.languages.registerHoverProvider(
				{ language: 'yaml' },
				new DefinitionReferenceHoverProvider({ assetIndex })
			));
		}
	}
	if (getExtensionSettings().enableSoundTools) {
		context.subscriptions.push(vscode.languages.registerCodeLensProvider(
			{ language: 'yaml' },
			new ItemsAdderSoundCodeLensProvider({ assetIndex, vanillaTexturePaths })
		));
		context.subscriptions.push(vscode.languages.registerHoverProvider(
			{ language: 'yaml' },
			new ItemsAdderSoundHoverProvider({ assetIndex, vanillaTexturePaths })
		));
	}
	decorationController = new EditorDecorationController({
		context,
		schemas,
		vanillaTexturePaths,
		diagnostics,
		assetIndex,
		dictionaryIndex,
		getSettings: getExtensionSettings
	});
	context.subscriptions.push(decorationController);

	for (const document of vscode.workspace.textDocuments) {
		await handleDocumentRefresh(document);
	}

	if (activeEditor && isItemsAdderManagedConfig(activeEditor.document)) {
		triggerUpdateDecorations();
	}
	await updateItemsAdderContext(activeEditor);

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
		if (DEBUG) {
			console.log('Document changed.');
		}

		if (activeEditor && event.document === activeEditor.document && isItemsAdderManagedConfig(event.document)) {
			triggerUpdateDecorations(true);
			if (isItemsAdderManagedConfig(event.document)) {
				maybeTriggerSuggestionsOnEmptyLine(activeEditor);
			}
		}
		if (activeEditor && event.document === activeEditor.document) {
			void updateItemsAdderContext(activeEditor);
		}
	}));

	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(event => {
		if (event.textEditor === activeEditor) {
			maybeTriggerSuggestionsOnEmptyLine(event.textEditor);
			if (isItemsAdderResourceConfig(event.textEditor.document)) {
				decorationController?.updateTextPreviews(event.textEditor);
			}
		}
	}));

	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(async document => {
		if (DEBUG) {
			console.log('Document opened.');
		}
		await handleDocumentRefresh(document);
	}));

	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(document => {
		if (document.languageId === 'yaml' || document.fileName.endsWith('.yml') || document.fileName.endsWith('.yaml')) {
			dictionaryIndex.scheduleRebuild();
		}
	}));
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
		if (!event.affectsConfiguration('ia-vscode')) {
			return;
		}
		if (getExtensionSettings().enableStatusBar) {
			itemsAdderStatusBarItem?.show();
		} else {
			itemsAdderStatusBarItem?.hide();
		}
		assetIndex?.rebuild();
		if (activeEditor && isItemsAdderManagedConfig(activeEditor.document)) {
			decorationController?.clear(activeEditor);
			triggerUpdateDecorations();
		}
	}));

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(async editor => {
		activeEditor = editor;
		if (!editor) {
			decorationController?.clear();
			await updateItemsAdderContext(undefined);
			return;
		}
		await updateItemsAdderContext(editor);

		if (isItemsAdderManagedConfig(editor.document)) {
			await setWordBasedSuggestions(false);
			if (isItemsAdderResourceConfig(editor.document)) {
				await setCopilot(false);
			}
			maybeTriggerSuggestionsOnEmptyLine(editor);
			triggerUpdateDecorations();
			return;
		}

		decorationController?.clear(editor);
		await restoreOriginalSettings();
	}));

	context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(async document => {
		if (isItemsAdderManagedConfig(document)) {
			await restoreOriginalSettings();
		}
	}));
}

async function updateItemsAdderContext(editor: vscode.TextEditor | undefined): Promise<void> {
	await vscode.commands.executeCommand(
		'setContext',
		ITEMSADDER_CONTEXT_KEY,
		Boolean(editor && isItemsAdderResourceConfig(editor.document))
	);
}

export function deactivate(): void {
	decorationController?.dispose();
	void restoreOriginalSettings();
}

async function registerYamlSchema(): Promise<void> {
	const vscodeYaml = vscode.extensions.getExtension('redhat.vscode-yaml');
	if (!vscodeYaml) {
		return;
	}

	const yamlExtensionAPI = await vscodeYaml.activate();
	yamlExtensionAPI.registerContributor(
		SCHEME,
		(resource: string) => {
			if (!resource.endsWith('.yml') && !resource.endsWith('.yaml')) {
				return undefined;
			}

			const document = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === resource);
			if (document) {
				if (isItemsAdderPluginConfig(document)) {
					return PLUGIN_CONFIG_SCHEMA_URI;
				}

				if (isItemsAdderResourceConfig(document)) {
					return RESOURCE_SCHEMA_URI;
				}
			}

			return undefined;
		},
		(schemaUri: string) => {
			if (!schemaUri.startsWith(`${SCHEME}://`)) {
				return undefined;
			}

			if (schemaUri === PLUGIN_CONFIG_SCHEMA_URI) {
				return Promise.resolve(ITEMSADDER_PLUGIN_CONFIG_SCHEMA);
			}

			if (schemaUri === RESOURCE_SCHEMA_URI) {
				return Promise.resolve(JSON_SCHEMA);
			}

			return undefined;
		},
		'ItemsAdder'
	);

	console.log('Registered YAML schemas for ItemsAdder.');
}

async function loadVanillaTexturePaths(context: vscode.ExtensionContext): Promise<string[]> {
	const vanillaTexturesListJsonPath = context.asAbsolutePath('images/vanilla_textures.json').replace(/\\/g, '/');
	const loadedPaths: string[] = [];

	try {
		if (fs.existsSync(vanillaTexturesListJsonPath)) {
			const textures = JSON.parse(fs.readFileSync(vanillaTexturesListJsonPath).toString()) as string[];
			for (const texture of textures) {
				if (texture.endsWith('.png')) {
					loadedPaths.push(texture);
				}
			}
			console.log('Vanilla textures paths loaded from:', vanillaTexturesListJsonPath);
		} else if (!DOWNLOAD_VANILLA_TEXTURES_LIST) {
			vscode.window.showErrorMessage('Missing bundled vanilla texture list.');
		}

		if (DOWNLOAD_VANILLA_TEXTURES_LIST) {
			vscode.window.showInformationMessage(`Downloading vanilla ${VANILLA_MINECRAFT_ASSETS_VERSION} textures list...`);
			const texturesRoots = await fetchJson(`${VANILLA_TEXTURES_API_ROOT}/_list.json`);
			await fetchTexturesRecursively(VANILLA_TEXTURES_API_ROOT, texturesRoots.directories, loadedPaths);
			fs.writeFileSync(vanillaTexturesListJsonPath, JSON.stringify(loadedPaths));
			vscode.window.showInformationMessage('Vanilla textures paths saved to:', vanillaTexturesListJsonPath);
		}
	} catch (error) {
		vscode.window.showErrorMessage(`Texture list error: ${error}`);
	}

	return loadedPaths;
}

async function fetchTexturesRecursively(baseUrl: string, directories: string[], output: string[]): Promise<void> {
	for (const directory of directories) {
		if (!['item', 'block', 'entity', 'gui'].includes(directory)) {
			continue;
		}

		const url = `${baseUrl}/${directory}/_list.json`;
		const textures = await fetchJson(url);
		for (const texture of textures.files ?? []) {
			let fullPath = texture.includes('/') ? texture : `${directory}/${texture}`;
			const previousDirectories = baseUrl.split('textures/')[1];
			fullPath = previousDirectories ? `${previousDirectories}/${fullPath}` : fullPath;
			if (fullPath.endsWith('.png')) {
				output.push(fullPath);
			}
		}

		if (textures.directories?.length) {
			await fetchTexturesRecursively(`${baseUrl}/${directory}`, textures.directories, output);
		}
	}
}

function triggerUpdateDecorations(throttle = false): void {
	if (timeout) {
		clearTimeout(timeout);
		timeout = undefined;
	}

	if (throttle) {
		timeout = setTimeout(updateDecorations, 500);
		return;
	}

	updateDecorations();
}

function updateDecorations(): void {
	if (!activeEditor || !isItemsAdderManagedConfig(activeEditor.document)) {
		return;
	}

	decorationController?.update(activeEditor);
}

function maybeTriggerSuggestionsOnEmptyLine(editor: vscode.TextEditor): void {
	const position = editor.selection.active;
	if (
		!getExtensionSettings().enableAutoSuggestionsOnEmptyLine ||
		!isItemsAdderManagedConfig(editor.document) ||
		editor.document.lineAt(position.line).text.trim() !== ''
	) {
		lastAutoSuggestKey = undefined;
		return;
	}

	const key = `${editor.document.uri.toString()}:${editor.document.version}:${position.line}`;
	if (lastAutoSuggestKey === key) {
		return;
	}

	lastAutoSuggestKey = key;
	setTimeout(() => {
		if (
			vscode.window.activeTextEditor === editor &&
			editor.document.lineAt(editor.selection.active.line).text.trim() === ''
		) {
			void vscode.commands.executeCommand('editor.action.triggerSuggest');
		}
	}, 50);
}

async function handleDocumentRefresh(document: vscode.TextDocument): Promise<void> {
	await javaScriptSupportConfigurator?.maybePromptForJavaScript(document);

	if (!isItemsAdderManagedConfig(document)) {
		return;
	}

	await setWordBasedSuggestions(false);
	if (isItemsAdderResourceConfig(document)) {
		await setCopilot(false);
	}
}

function isItemsAdderResourceConfig(document: vscode.TextDocument): boolean {
	if (document.fileName.endsWith('settings.json') && document.uri.scheme === 'file' && document.uri.path.includes('Code')) {
		return false;
	}

	const uri = decodeURI(document.uri.toString());
	if (uri.startsWith(`${SCHEME}://`)) {
		return true;
	}

	for (let index = 0; index < Math.min(document.lineCount, 10); index++) {
		const line = document.lineAt(index).text.trim();
		if (!line) {
			continue;
		}
		return line === 'info:' || line.startsWith('info:');
	}

	return false;
}

function isItemsAdderManagedConfig(document: vscode.TextDocument): boolean {
	return isItemsAdderResourceConfig(document) || isItemsAdderPluginConfig(document);
}

async function fetchJson(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		https.get(url, response => {
			if (response.statusCode !== 200) {
				reject(new Error(`Download failed: ${response.statusCode}`));
				return;
			}

			let data = '';
			response.on('data', chunk => data += chunk);
			response.on('end', () => {
				try {
					resolve(JSON.parse(data));
				} catch (error) {
					reject(new Error('JSON parse failed'));
				}
			});
		}).on('error', reject);
	});
}

async function setCopilot(val: boolean): Promise<void> {
	const workspaceConfig = vscode.workspace.getConfiguration();
	const inspect = workspaceConfig.inspect<any>('github.copilot.enable');
	const current = inspect?.globalValue
		?? inspect?.workspaceValue
		?? inspect?.workspaceFolderValue
		?? inspect?.defaultValue
		?? {};

	await workspaceConfig.update('github.copilot.enable', { ...current, yaml: val }, vscode.ConfigurationTarget.Global);

	if (val || neverWarnAboutCopilot) {
		return;
	}

	const result = await vscode.window.showWarningMessage(
		'GitHub Copilot temporarily disabled for ItemsAdder YAML.\nUse CTRL+SPACE to get ItemsAdder autocomplete suggestions.',
		'OK',
		'Never Show Again'
	);

	if (result === 'Never Show Again') {
		await config.update('ia-vscode.neverWarnAboutCopilot', true, vscode.ConfigurationTarget.Global);
		neverWarnAboutCopilot = true;
	}
}

function getCopilotYaml(): boolean | undefined {
	const inspect = vscode.workspace.getConfiguration('github.copilot').inspect<any>('enable');
	const current = inspect?.globalValue
		?? inspect?.workspaceValue
		?? inspect?.workspaceFolderValue
		?? inspect?.defaultValue;

	return typeof current?.yaml === 'boolean' ? current.yaml : undefined;
}

function getOriginalYamlWordSuggestions(): any {
	const settings = vscode.workspace.getConfiguration('[yaml]');
	const wordBasedSuggestions = settings.inspect('editor.wordBasedSuggestions');
	return wordBasedSuggestions?.globalValue
		?? wordBasedSuggestions?.workspaceValue
		?? wordBasedSuggestions?.workspaceFolderValue
		?? wordBasedSuggestions?.defaultValue;
}

async function setWordBasedSuggestions(val: boolean): Promise<void> {
	const workspaceConfig = vscode.workspace.getConfiguration();
	const yamlSettings = workspaceConfig.get<{ [key: string]: any }>('[yaml]') ?? {};

	if (!val) {
		yamlSettings['editor.wordBasedSuggestions'] = 'off';
	} else if (originalWordBasedSuggestionsEnabled !== null) {
		yamlSettings['editor.wordBasedSuggestions'] = originalWordBasedSuggestionsEnabled;
	} else {
		delete yamlSettings['editor.wordBasedSuggestions'];
	}

	await workspaceConfig.update('[yaml]', yamlSettings, vscode.ConfigurationTarget.Global);
}

async function restoreOriginalSettings(): Promise<void> {
	const workspaceConfig = vscode.workspace.getConfiguration();
	const yamlSettings = workspaceConfig.get<{ [key: string]: any }>('[yaml]') ?? {};

	if (originalWordBasedSuggestionsEnabled !== null) {
		yamlSettings['editor.wordBasedSuggestions'] = originalWordBasedSuggestionsEnabled;
	} else {
		delete yamlSettings['editor.wordBasedSuggestions'];
	}
	await workspaceConfig.update('[yaml]', yamlSettings, vscode.ConfigurationTarget.Global);

	const inspect = workspaceConfig.inspect<any>('github.copilot.enable');
	if (inspect) {
		if (originalCopilotEnabled !== undefined && originalCopilotEnabled !== null) {
			await workspaceConfig.update(
				'github.copilot.enable',
				{ ...inspect.globalValue, yaml: originalCopilotEnabled },
				vscode.ConfigurationTarget.Global
			);
		} else {
			const updatedValue = { ...inspect.globalValue };
			delete updatedValue.yaml;

			if (JSON.stringify(updatedValue) === JSON.stringify(inspect.defaultValue)) {
				await workspaceConfig.update('github.copilot.enable', undefined, vscode.ConfigurationTarget.Global);
			} else {
				await workspaceConfig.update('github.copilot.enable', updatedValue, vscode.ConfigurationTarget.Global);
			}
		}
	}

	console.log('Restored original settings for YAML.');
}
