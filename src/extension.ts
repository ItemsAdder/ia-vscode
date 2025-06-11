import * as vscode from 'vscode';
import { Uri } from 'vscode';
import {schemas} from "./schemas";
import {items as vscodeItemsSuggestions} from "./vscodeSuggestions";
import * as YAML from 'yaml';

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

import { registerJsppLanguageFeatures } from './jspp';

const DEBUG = false;

const SCHEME = "itemsadder";
const JSON_SCHEMA = JSON.stringify(schemas);

const VANILLA_TEXTURES_API_ROOT = 'https://assets.mcasset.cloud/1.21.4/assets/minecraft/textures';
const DOWNLOAD_VANILLA_TEXTURES_LIST = false; // Set it true when you want to update the list.

let activeEditor : vscode.TextEditor;
let extContext : vscode.ExtensionContext;

let timeout: NodeJS.Timer | undefined = undefined;

const config = vscode.workspace.getConfiguration('ia-vscode');
let neverWarnAboutCopilot = config.get('neverWarnAboutCopilot');

let originalWordBasedSuggestionsEnabled : any = null;
let originalCopilotEnabled : any = null;

let activeDecorationsTextures: vscode.TextEditorDecorationType[] = [];

const VANILLA_TEXTURES_PATHS : any = [];

function getYamlParentPath(document: vscode.TextDocument, position: vscode.Position): string[] {
	const text = document.getText();
	const lines = text.split("\n");

	let path: string[] = [];
	let indentStack: { indent: number; key: string }[] = [];
	let currentIndent = position.character;

	for (let i = position.line; i >= 0; i--) {
		const line = lines[i];

		// Handle list elements
		const arrayMatch = line.match(/^(\s*)-\s+/);
		if (arrayMatch) {
			const indent = arrayMatch[1].length;
			if (indent < currentIndent) {
				currentIndent = indent;
			}
			continue;
		}

		// Handle `key: value` elements
		const keyMatch = line.match(/^(\s*)([^:]+):/);
		if (keyMatch) {
			const indent = keyMatch[1].length;
			const key = keyMatch[2];

			if (indent < currentIndent) {
				indentStack.push({ indent, key });
				currentIndent = indent;
			}
		}
	}

	path = indentStack.reverse().map(item => item.key);

	// Add the current key if the cursor is on a value line or inside an array
	const currentLine = lines[position.line];
	const valueMatch = currentLine.match(/^(\s*)([^:]+):\s*(.*)/);
	if (valueMatch && valueMatch[3].trim() === '') {
		path.push(valueMatch[2]);
	} else if (currentLine.trim().startsWith('-')) {
		// Find the main key of the array
		for (let j = position.line - 1; j >= 0; j--) {
			const lastKeyMatch = lines[j].match(/^(\s*)([^:]+):/);
			if (lastKeyMatch && !lines[j].trim().startsWith('-')) {
				path.push(lastKeyMatch[2]);
				break;
			}
		}
	}

	return path;
}

function getYamlSameLevelProperties(document: vscode.TextDocument, position: vscode.Position): string[] {
	const text = document.getText();
	const lines = text.split("\n");

	let properties: string[] = [];
	let currentIndent = position.character;

	for (let i = position.line; i >= 0; i--) {
		const line = lines[i];

		const match = line.match(/^(\s*)([^:]+):/);
		if (match) {
			const indent = match[1].length;
			const key = match[2];
			// Only add keys that are on the same indentation level
			if (indent === currentIndent) {
				properties.push(key);
			} else if (indent < currentIndent) {
				// Stop when a property with a lower indentation level is found
				break;
			}
		}
	}

	return properties;
}

export async function activate(context: vscode.ExtensionContext) {
	activeEditor = vscode.window.activeTextEditor as vscode.TextEditor;
	extContext = context;
	{
		const settings = vscode.workspace.getConfiguration("[yaml]");
		const wordBasedSuggestions = settings.inspect("editor.wordBasedSuggestions");
		originalWordBasedSuggestionsEnabled = wordBasedSuggestions?.globalValue
			?? wordBasedSuggestions?.workspaceValue
			?? wordBasedSuggestions?.workspaceFolderValue
			?? wordBasedSuggestions?.defaultValue;
	}

	originalCopilotEnabled = getCopilotYaml();

	registerJsppLanguageFeatures(context);

	const vscodeYaml = vscode.extensions.getExtension("redhat.vscode-yaml");
	if(vscodeYaml)
	{
		const yamlExtensionAPI = await vscodeYaml.activate();
		yamlExtensionAPI.registerContributor(SCHEME, (resource : string) => {
			if(!resource.endsWith('.yml')) {
				return undefined;
			}
			const document = vscode.workspace.textDocuments.find(doc => doc.uri.toString() === resource);
			if (document && !isItemsAdderResourceConfig(document)) {
				return undefined;
			}
			return `${SCHEME}://schema/itemsadder-resource`;
		}, (schemaUri : string) => {
			const parsedUri = Uri.parse(schemaUri);
			if (parsedUri.scheme !== SCHEME) {
				return undefined;
			}
			if (!parsedUri.path || !parsedUri.path.startsWith('/')) {
				return undefined;
			}
			return Promise.resolve(JSON_SCHEMA);
		}, "ItemsAdder Resource");

		console.log("Registered YAML schema for ItemsAdder Resources.");
	}

	try {
		const vanillaTexturesListJsonPath = context.asAbsolutePath('images/vanilla_textures.json').replace(/\\/g, "/");
		if (fs.existsSync(vanillaTexturesListJsonPath)) {
			console.log('Vanilla textures paths already downloaded.');
			const textures = JSON.parse(fs.readFileSync(vanillaTexturesListJsonPath).toString());
			textures.forEach((texture: string) => {
				if (texture.endsWith('.png')) {
					VANILLA_TEXTURES_PATHS.push(texture);
				}
			});
			console.log('Vanilla textures paths loaded from:', vanillaTexturesListJsonPath);
		} else {
			if (!DOWNLOAD_VANILLA_TEXTURES_LIST) {
				vscode.window.showErrorMessage('Wtf? did you forget to ship the textures list?');
			}
		}

		if (DOWNLOAD_VANILLA_TEXTURES_LIST) {
			vscode.window.showInformationMessage('Downloading vanilla 1.21.4 textures list...');

			const texturesRoots = await fetchJson(`${VANILLA_TEXTURES_API_ROOT}/_list.json`);
			console.log('JSON scaricato:', texturesRoots);

			async function fetchTexturesRecursively(baseUrl: string, directories: string[]) {
				for (const dir of directories) {
					// Include only item, block, entity, gui. I think the other ones are useless.
					if (!['item', 'block', 'entity', 'gui'].includes(dir)) {
						continue;
					}

					const url = `${baseUrl}/${dir}/_list.json`;
					const textures = await fetchJson(url);
					console.log(`Textures for ${dir}:`, textures);

					textures.files.forEach((texture: string) => {
						let fullPath = texture.includes("/") ? texture : `${dir}/${texture}`;
						// Extract previous directories from baseUrl, after "textures/"
						const previousDirectories = baseUrl.split('textures/')[1];
						// Add the previous directories to the texture path
						fullPath = previousDirectories ? `${previousDirectories}/${fullPath}` : fullPath;
						console.log('Texture:', fullPath);

						if (fullPath.endsWith('.png')) {
							VANILLA_TEXTURES_PATHS.push(fullPath);
						}
					});

					if (textures.directories && textures.directories.length > 0) {
						await fetchTexturesRecursively(`${baseUrl}/${dir}`, textures.directories);
					}
				}
			}

			await fetchTexturesRecursively(VANILLA_TEXTURES_API_ROOT, texturesRoots.directories);

			// Save it to the vscode temp folder
			fs.writeFileSync(vanillaTexturesListJsonPath, JSON.stringify(VANILLA_TEXTURES_PATHS));
			console.log('Vanilla Textures paths saved to:', vanillaTexturesListJsonPath);
			vscode.window.showInformationMessage('Vanilla Textures paths saved to:', vanillaTexturesListJsonPath);
		}
	} catch (error) {
		vscode.window.showErrorMessage(`Errore: ${error}`);
	}

	function addEntrySuggestion(name: string, description: string, completionItems: vscode.CompletionItem[], addNewLine = true, kind = vscode.CompletionItemKind.Property) {
		const item = new vscode.CompletionItem(name, kind);
		item.detail = description;
		if(addNewLine) {
			item.insertText = `${name}:\n  `;
		}
		else {
			item.insertText = `${name}: `;
		}
		completionItems.push(item);
	}

	function addTextSuggestion(name: string, description: string, completionItems: vscode.CompletionItem[]) {
		const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Text);
		item.detail = description;
		item.insertText = `${name}`;
		completionItems.push(item);
	}

	const provider = vscode.languages.registerCompletionItemProvider(
		{ language: 'yaml' },
		{
			provideCompletionItems(document, position, token, context) {
				const completionItems: vscode.CompletionItem[] = [];
				const keyPath = getYamlParentPath(document, position);

				console.log("Current YAML Path:", keyPath);

				// Handle dynamic suggestions of array-like stuff. I don't like YAML array of objects,
				// so I allow users to add entries by adding a parent with a custom name.
				// I think this has a cleaner look compared to the array of objects.
				// This allows adding custom naming to entries without an extra property, useful for debug and error logging.
				// This is also beginner-friendly, as it's easier to understand and manage.
				//
				// Example:
				// custom_array:
				//   entry1:
				//     name: "Entry"
				//     description: "Description"
				//   entry2:
				//     name: "Entry"
				//     description: "Description"
				//
				// Usual YAML array of objects:
				// custom_array:
				//   - name: "Entry"
				//     description: "Description"
				//   - name: "Entry"
				//     description: "Description"
				function addNestedSuggestions(properties: any, parentPath: string[], currentPath: string[]) {
					// Ensure the full path matches before suggesting anything
					if (!arraysEqual(parentPath, currentPath)) {
						return;
					}

					// Fixes the fact that it suggests the entry on sub-entries, making no sense.
					if (arraysEqual(parentPath, currentPath) && currentPath.length > 0) {
						return;
					}

					Object.keys(properties).forEach((key) => {
						const newPath = [...currentPath, key];

						// @ts-ignore
						const subProperties = properties[key]?.properties;
						if (subProperties) {
							addNestedSuggestions(subProperties, parentPath, newPath);
						} else {
							if (!key.startsWith("my_")) {
								return;
							}
							let markdownDescription = "New entry.";
							let newKey = key + "_1";
							// @ts-ignore
							const ref = properties[key]?.$ref;
							if (ref) {
								const refKey = ref.split("/").pop();
								// @ts-ignore
								markdownDescription = schemas.$defs[refKey]?.markdownDescription ? schemas.$defs[refKey].markdownDescription : markdownDescription;
							}

							// Check if the key was already added to the yaml, in this case append a number to the key.
							const alreadyUsedKeys = getYamlSameLevelProperties(document, position);
							console.log("Already used keys:", alreadyUsedKeys);
							let i = 1;
							while (alreadyUsedKeys.includes(newKey)) {
								newKey = `${key}_${i}`;
								i++;
							}

							addEntrySuggestion(newKey, markdownDescription, completionItems);
						}
					});
				}

				// Function to compare two paths
				function arraysEqual(arr1: string[], arr2: string[]): boolean {
					if (arr1.length !== arr2.length) {
						return false;
					}
					return arr1.every((value, index) => value === arr2[index]);
				}

				// Ensure that properties are suggested only when the full path matches
				function suggestPropertiesForPath(properties: any, yamlPath: string[]) {
					if (yamlPath.length === 0) {
						addNestedSuggestions(properties, [], []);
						return;
					}

					// TODO also handle item actions that have dynamic properties names,
					// for example `actions.play_sound`, `actions.play_sound_1`, `actions.play_sound_custom_xxx` etc...
					// This is currently limited as it can't do suggestions for dynamic parents.
					// In this case I hack it manually because I am lazy and this is a limitation of the current implementation.

					function addSuggestionAvoidDuplicate(key: string) {
						let markdownDescription = "New Entry.";
						let newKey = key;
						// @ts-ignore
						const ref = properties[key]?.$ref;
						if (ref) {
							const refKey = ref.split("/").pop();
							// @ts-ignore
							markdownDescription = schemas.$defs[refKey]?.markdownDescription ? schemas.$defs[refKey].markdownDescription : markdownDescription;
						}

						// Check if the key was already added to the yaml, in this case append a number to the key.
						const alreadyUsedKeys = getYamlSameLevelProperties(document, position);
						console.log("Already used keys:", alreadyUsedKeys);
						let i = 1;
						while (alreadyUsedKeys.includes(newKey)) {
							newKey = `${key}_${i}`;
							i++;
						}

						addEntrySuggestion(newKey, markdownDescription, completionItems);
					}

					function isKeyAlreadyUsed(key: string) {
						// Check if the key was already added to the yaml, in this case append a number to the key.
						const alreadyUsedKeys = getYamlSameLevelProperties(document, position);
						return alreadyUsedKeys.includes(key);
					}

					if (yamlPath.length === 4 && yamlPath[0] === "items" && yamlPath[2] === "consumable" && yamlPath[3] === "effects") {
						addSuggestionAvoidDuplicate("apply_status_effects");
						addSuggestionAvoidDuplicate("remove_status_effects");
						addSuggestionAvoidDuplicate("play_sound");
					}

					if (yamlPath.length === 2 && yamlPath[0] === "sounds") {
						addSuggestionAvoidDuplicate("variant");
					}

					// Suggest example strings for the item name.
					if (yamlPath.length === 3 && yamlPath[0] === "items" && yamlPath[2] === "name") {
						const entryId = yamlPath[1];
						// Normalize the entry id to be used as a name. Capitalize each word.
						const name = entryId.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
						addTextSuggestion(name, "Name shown in the inventory tooltip.", completionItems);
						addTextSuggestion("item-" + entryId, "Name shown in the inventory tooltip. Uses a dictionary entry, for easier multi-language compatibility.", completionItems);
						addTextSuggestion("Item", "Name shown in the inventory tooltip.", completionItems);
					}

					if (yamlPath.length === 2 && yamlPath[0] === "items") {
						if (!isKeyAlreadyUsed("name")) {
							// Normalize the entry id to be used as a name. Capitalize each word.
							const entryId = yamlPath[1];
							const name = entryId.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
							addTextSuggestion("name: " + name, "Name shown in the inventory tooltip.", completionItems);
						}
					}

					if (yamlPath.length === 1 && yamlPath[0] === "items") {
						vscodeItemsSuggestions.forEach((element: any) => {
							if (element.devMode && !config.get('devMode')) {
								return;
							}
							const item = new vscode.CompletionItem(element.label, vscode.CompletionItemKind.Class);
							item.sortText = "~" + element.label;
							item.detail = element.detail ? element.detail : element.label;
							item.insertText = YAML.stringify(element.object);
							completionItems.push(item);
						});
					}

					// Suggest textures
					if (yamlPath.length === 4 && yamlPath[0] === "items" && yamlPath[2] === "resource" && yamlPath[3] === "texture" || yamlPath[3] === "textures") {
						// Check if the current line value stars by minecraft:, to avoid pollution of the suggestions.
						VANILLA_TEXTURES_PATHS.forEach((element: any) => {
							const elementNoExt = `minecraft:${element}`;
							const suggestion = new vscode.CompletionItem(element, vscode.CompletionItemKind.File);
							suggestion.detail = "Vanilla texture";
							suggestion.label = elementNoExt;
							suggestion.insertText = elementNoExt;
							// Check if previous line is an array entry, then add the - in front of the suggestion
							if (position.line > 0 && !document.lineAt(position.line).text.trim().includes("-") && document.lineAt(position.line - 1).text.trim().startsWith("-")) {
								suggestion.insertText = "- " + suggestion.insertText;
							}

							const fullPath = VANILLA_TEXTURES_API_ROOT + "/" + element;
							suggestion.documentation = new vscode.MarkdownString(`\`assets/minecraft/textures/${element}\`\n\n![Texture Preview](${vscode.Uri.parse(fullPath)}|width=100)`);
							completionItems.push(suggestion);
						});

						if (!isProjectFile()) {
							return;
						}

						const currentFilePath = document.uri.fsPath;
						const result = getWorkspacePathAndNamespaceFromFilePath(currentFilePath);
						if (!result) {
							return;
						}
						const { workspacePath, namespace } = result;

						// Find all textures in the current project
						const possiblePaths = [
							path.join(workspacePath, namespace, 'textures'),
							path.join(workspacePath, namespace, `assets`, namespace, 'textures'),
							path.join(workspacePath, namespace, `assets`, 'textures'),

							path.join(workspacePath, namespace, `resourcepack`, `assets`, namespace, 'textures'),
							path.join(workspacePath, namespace, `resourcepack`, namespace, 'textures'),
							path.join(workspacePath, namespace, `resourcepack`, 'textures'),

							path.join(workspacePath, namespace, `resource_pack`, `assets`, namespace, 'textures'),
							path.join(workspacePath, namespace, `resource_pack`, namespace, 'textures'),
							path.join(workspacePath, namespace, `resource_pack`, 'textures'),
						];

						if (DEBUG) {
							console.log("Possible paths:", possiblePaths);
						}

						function addTexturesFromDirectory(directory: string) {
							if (fs.existsSync(directory)) {
								const files = fs.readdirSync(directory);
								files.forEach((file: any) => {
									const fullPath = path.join(directory, file);
									if (fs.statSync(fullPath).isDirectory()) {
										addTexturesFromDirectory(fullPath);
									} else if (file.endsWith('.png')) {
										const suggestion = new vscode.CompletionItem(file, vscode.CompletionItemKind.File);
										const suggestionText = fullPath.replace(/\\/g, "/").split("textures/")[1];
										suggestion.label = "- " + suggestionText;
										suggestion.insertText = suggestionText;
										// Check if previous line is an array entry, then add the - in front of the suggestion
										if (position.line > 0 && !document.lineAt(position.line).text.trim().includes("-") && document.lineAt(position.line - 1).text.trim().startsWith("-")) {
											suggestion.insertText = "- " + suggestion.insertText;
										}

										const relativePath = path.relative(workspacePath, fullPath);
										suggestion.documentation = new vscode.MarkdownString(`\`${relativePath}\`\n\n![Texture Preview](${vscode.Uri.file(fullPath)}|width=100)`);

										completionItems.push(suggestion);
									}
								});
							}
						}

						possiblePaths.forEach((element: any) => {
							addTexturesFromDirectory(element);
						});
					}

					// Suggest models
					if (yamlPath.length === 4 && yamlPath[0] === "items" && yamlPath[2] === "resource" && yamlPath[3] === "model_path") {

						// Todo: suggest vanilla models. Might be useless.

						if (!isProjectFile()) {
							return;
						}


						const currentFilePath = document.uri.fsPath;

						// Get the namespace of the file and workspace path
						const result = getWorkspacePathAndNamespaceFromFilePath(currentFilePath);
						if (!result) {
							return;
						}
						const { workspacePath, namespace } = result;


						// Find all textures in the current project
						const possiblePaths = [
							path.join(workspacePath, namespace, 'models'),
							path.join(workspacePath, namespace, `assets`, namespace, 'models'),
							path.join(workspacePath, namespace, `assets`, 'models'),

							path.join(workspacePath, namespace, `resourcepack`, `assets`, namespace, 'models'),
							path.join(workspacePath, namespace, `resourcepack`, namespace, 'models'),
							path.join(workspacePath, namespace, `resourcepack`, 'models'),

							path.join(workspacePath, namespace, `resource_pack`, `assets`, namespace, 'models'),
							path.join(workspacePath, namespace, `resource_pack`, namespace, 'models'),
							path.join(workspacePath, namespace, `resource_pack`, 'models'),
						];

						if (DEBUG) {
							console.log("Possible paths:", possiblePaths);
						}

						function addModelsFromDirectory(directory: string) {
							if (fs.existsSync(directory)) {
								const files = fs.readdirSync(directory);
								files.forEach((file: any) => {
									const fullPath = path.join(directory, file);
									if (fs.statSync(fullPath).isDirectory()) {
										addModelsFromDirectory(fullPath);
									} else if (file.endsWith('.json')) {
										const suggestion = new vscode.CompletionItem(file, vscode.CompletionItemKind.File);
										const suggestionText = fullPath.replace(/\\/g, "/").split("models/")[1].replace(".json", "");
										suggestion.label = suggestionText;
										suggestion.insertText = suggestionText;
										// Check if previous line is an array entry, then add the - in front of the suggestion
										if (position.line > 0 && !document.lineAt(position.line).text.trim().includes("-") && document.lineAt(position.line - 1).text.trim().startsWith("-")) {
											suggestion.insertText = "- " + suggestion.insertText;
										}

										const relativePath = path.relative(workspacePath, fullPath);
										suggestion.documentation = new vscode.MarkdownString(`\`${relativePath}\``);

										completionItems.push(suggestion);
									}
								});
							}
						}

						possiblePaths.forEach((element: any) => {
							addModelsFromDirectory(element);
						});
					}

					// TODO: handle sounds files suggestions

					// If under return_items.replace, suggest the keys of the item to replace
					if (yamlPath.length >= 5 && yamlPath[0] === "recipes" && yamlPath[1] === "crafting_table" && yamlPath[3] === "return_items" && yamlPath[4] === "replace") {
						// Check if current line is not a key, for example STONE: xxxx
						const currentLine = document.lineAt(position.line).text;
						if (currentLine.includes(": ") || currentLine.endsWith(":")) {
							return;
						}

						schemas.$defs.bukkit_materials.enum.forEach((element: any) => {
							addEntrySuggestion(element, "Material to replace.", completionItems, false, vscode.CompletionItemKind.EnumMember);
						});
						// TODO Also suggest custom items.
					}

					// Todo also add the same for
					// - "actions" property
					// - "triggers" property of HUDS
					const [currentKey, ...remainingPath] = yamlPath;
					// @ts-ignore
					if (Object.prototype.hasOwnProperty.call(properties, currentKey)) {
						const subProperties = properties[currentKey]?.properties;
						if (subProperties) {
							suggestPropertiesForPath(subProperties, remainingPath);
						} else {
							addNestedSuggestions(properties, yamlPath, yamlPath);
						}
					}
				}

				suggestPropertiesForPath(schemas.properties, keyPath);

				return completionItems;
			}
		},
		''
	);

	context.subscriptions.push(provider);

	const templateTextDeco = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/template.png').replace(/\\/g, "/"),
		color: 'aqua',
	});
	const variantTextDeco = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/variant.png').replace(/\\/g, "/"),
		color: '#B6A102',
	});
	const resourceTextDeco = vscode.window.createTextEditorDecorationType({
		color: '#B6A102',
	});
	const actionTextDeco = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/flash.png').replace(/\\/g, "/"),
		color: '#B6A102',
		gutterIconSize: "contain",
	});
	const behaviourTextDeco = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/cog.png').replace(/\\/g, "/"),
		color: '#B6A102',
		gutterIconSize: "contain",
	});
	const grayTextDeco = vscode.window.createTextEditorDecorationType({
		color: "#444444"
	});
	const greenTextDeco = vscode.window.createTextEditorDecorationType({
		color: "#20812d"
	});
	const grayAreaDecoType = vscode.window.createTextEditorDecorationType({
		backgroundColor: "rgba(0, 0, 0, 0.3)",
		opacity: "0.7",
		isWholeLine: true,
	});

	const diagnostics = vscode.languages.createDiagnosticCollection('ia_diagnostics');
	let diagnosticsArr : vscode.Diagnostic[] = [];
	
	let typesDecos : any = {
		entities : {
			decos: [],
			data: []
		},
		materials : {
			decos: [],
			data: []
		}
	};

	if (Array.isArray(schemas.$defs.bukkit_entity_type.anyOf)) {
		schemas.$defs.bukkit_entity_type.anyOf.forEach((entry: any) => {
			const element = entry.const;
			if (!element) return;
			typesDecos.entities.decos[element] = vscode.window.createTextEditorDecorationType({
				gutterIconPath: vscode.Uri.parse(`https://raw.githubusercontent.com/LoneDev6/mc-entities-icons/master/icons/${element}.gif`),
				gutterIconSize: "contain",
				overviewRulerColor: 'blue',
				overviewRulerLane: vscode.OverviewRulerLane.Right,
				light: {
					color: '#886c99',
				},
				dark: {
					color: '#886c99',
				},
			});
			typesDecos.entities.data[element] = [];
		});
	}

	schemas.$defs.bukkit_materials.enum.forEach(element => {
		let fileName = element.toLowerCase().replace(/_/g, '-');
		typesDecos.materials.decos[element] = vscode.window.createTextEditorDecorationType({
			gutterIconPath: vscode.Uri.parse(`https://raw.githubusercontent.com/LoneDev6/crafting-icons/master/32/${fileName}/${fileName}.png`),
			gutterIconSize: "contain",
			overviewRulerColor: 'blue',
			overviewRulerLane: vscode.OverviewRulerLane.Right,
			light: {
				color: '#886c99',
			},
			dark: {
				color: '#886c99',
			},
		});
		typesDecos.materials.data[element] = [];
	});
	
	function updateDecorations() {
		if (!activeEditor) {
			return;
		}
		
		const text = activeEditor.document.getText();
		const doc = YAML.parseDocument(text);

		decorateGenericTexts(activeEditor, "Template item", /    template\: true/g, templateTextDeco);
		decorateGenericTexts(activeEditor, "Variant item", /    variant_of\:/g, variantTextDeco);

		decorateGenericTexts(activeEditor, "The graphical part of the item", /    resource\:/g, resourceTextDeco);
		decorateGenericTexts(activeEditor, "Events called by the item", /    events\:/g, actionTextDeco);
		decorateGenericTexts(activeEditor, "Predefined behaviours of the item", /    behaviours\:/g, behaviourTextDeco);

		// NOTE: ACACIA_BOAT causes issues because it's available on both materials and entities.
		// For this reason it doesn't show at all.
		decorateEnums(doc, text, activeEditor, "Vanilla material", schemas.$defs.bukkit_materials.enum, typesDecos.materials);
		decorateAnyOfEnumLike(doc, text, activeEditor, "Vanilla entity type", schemas.$defs.bukkit_entity_type.anyOf, typesDecos.entities);
	
		decorateGenericTexts(activeEditor, "This property is **enabled**", / true/g, greenTextDeco);
	
		decorateGenericTexts(activeEditor, "This property is **disabled**", / false/g, grayTextDeco);
	
		decorateBackgroundTextBlocks(activeEditor, "### This element is disabled.", `enabled: false`, grayAreaDecoType);
		decorateBackgroundItemsAlternated(activeEditor);

		handleForcedDiagnostics(doc, text, activeEditor, diagnostics, diagnosticsArr);
	}
	
	function triggerUpdateDecorations(throttle = false) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		if (throttle) {
			timeout = setTimeout(updateDecorations, 500);
		} else {
			updateDecorations();
		}
	}

	if (activeEditor) {
		triggerUpdateDecorations();
	}

	vscode.workspace.textDocuments.forEach(document => {
		handleDocumentRefresh(document);
	});

	// High frequency event!
	vscode.workspace.onDidChangeTextDocument(function(e) {
		if(DEBUG) {
			console.log("Document changed!");
		}
		handleDocumentRefresh(e.document);
    });

	vscode.workspace.onDidOpenTextDocument(function(document) {
		if(DEBUG) {
			console.log("Document opened!");
		}
		handleDocumentRefresh(document);
	});

	async function handleDocumentRefresh(document: vscode.TextDocument) {
		if(isItemsAdderResourceConfig(document)) {
			await setWordBasedSuggestions(false);
			await setCopilot(false);
		}
	}

	vscode.window.onDidChangeActiveTextEditor(async editor => {
		console.log("Active editor changed!");
		activeEditor = editor as vscode.TextEditor;
		if (editor) {
			if(isItemsAdderResourceConfig(editor.document)) {
				setWordBasedSuggestions(false);
				setCopilot(false);
				triggerUpdateDecorations();
			} else {
				restoreOriginalSettings();
			}
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			if(isItemsAdderResourceConfig(event.document)) {
				triggerUpdateDecorations(true);
			}
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidCloseTextDocument(async document => {
		if(isItemsAdderResourceConfig(document)) {
			restoreOriginalSettings();
		}
	}, null, context.subscriptions);
}

export function deactivate() {
	restoreOriginalSettings();
}

function isProjectFile() {
	// Check if the current file is part of a vscode directory project or not
	if (!vscode.workspace.name) {
		return false;
	}
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		console.warn('No workspace open.');
		return false;
	}

	// Check if the currently opened file is part of the project/workspace, because I might also have opened some files that are not in the current project.
	const currentFilePath = activeEditor.document.uri.fsPath;
	let isFileInWorkspace = false;
	for (const folder of workspaceFolders) {
		const relative = path.relative(folder.uri.fsPath, currentFilePath);
		if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
			isFileInWorkspace = true;
			break;
		}
	}

	return isFileInWorkspace;
}

/**
 * Check if the file is a ItemsAdder resource configuration.
 * @param document
 * @returns 
 */
function isItemsAdderResourceConfig(document: vscode.TextDocument) : boolean {
	// Vscode triggered this shit when I edit an editor config. I have no other way to identify that.
	if (document.fileName.endsWith('settings.json') && document.uri.scheme === 'file' && document.uri.path.includes('Code')) {
		return false;
	}

	const uri = decodeURI(document.uri.toString());
	// TODO: Might be outdated info. In case I remove the info line during editing the file would be still considered an ItemsAdder config.
	if (uri.startsWith(`${SCHEME}://`)) {
		return true;
	}
	return (document.lineCount > 0 && document.lineAt(0).text.includes("info:"));
}

/**
 * This function handles customized rules to hint about errors that are not handled by the YAML schema.
 * @param activeEditor the editor
 * @param diagnostics the diagnostics object
 * @param diagnosticsArr the diagnostics array
 */
function handleForcedDiagnostics(doc: YAML.Document.Parsed<any, true>, text: string, activeEditor: vscode.TextEditor, diagnostics: vscode.DiagnosticCollection, diagnosticsArr: vscode.Diagnostic[]) {
	diagnostics.clear();
	diagnosticsArr = [];

	const fileNamespace = (doc.get('info') as any)?.get("namespace");
	if(!fileNamespace) {
		return;
	}

	activeDecorationsTextures.forEach(decoration => decoration.dispose());
	activeDecorationsTextures = [];

	const decorations: vscode.DecorationOptions[] = [];

	const node = doc.get('items', true);

	if (node && YAML.isCollection(node)) {
		node.items.forEach((pair: any) => {
			if (!YAML.isPair(pair) || !YAML.isMap(pair.value)) {
				return;
			}

			const item = pair.value; // Prendi il valore effettivo del Pair (l'oggetto)

			const resourceNode = item.get('resource'); // Non serve il secondo argomento
			if (!resourceNode || !YAML.isMap(resourceNode)) {
				return;
			}

			const specificPropertiesNode = item.get('specific_properties');

			const hasTexture = resourceNode.has('texture');
			const hasTextures = resourceNode.has('textures');
			const hasModelPath = resourceNode.has('model_path');

			if (hasTexture && hasTextures) {
				if (resourceNode.range) {
					const startPos = activeEditor.document.positionAt(resourceNode.range[0]);
					const endPos = activeEditor.document.positionAt(resourceNode.range[1]);
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(startPos, endPos),
						"Use either `texture` or `textures` property, not both.",
						vscode.DiagnosticSeverity.Error
					);
					diagnosticsArr.push(diagnostic);
				}
			}

			if (hasModelPath && (hasTexture || hasTextures)) {
				if (resourceNode.range) {
					const startPos = activeEditor.document.positionAt(resourceNode.range[0]);
					const endPos = activeEditor.document.positionAt(resourceNode.range[1]);
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(startPos, endPos),
						"Do not use `texture` or `textures` property when `model_path` is specified.",
						vscode.DiagnosticSeverity.Error
					);
					diagnosticsArr.push(diagnostic);
				}
			}

			const armorNode = YAML.isMap(specificPropertiesNode) ? specificPropertiesNode.get('armor', true) : null;

			// `material` property is mandatory. Only if the item is a legacy armor piece, the `material` property is not mandatory.
			if (!resourceNode.has("material") && !armorNode) {
				if (resourceNode.range) {
					const startPos = activeEditor.document.positionAt(resourceNode.range[0]);
					const endPos = activeEditor.document.positionAt(resourceNode.range[1]);
					const diagnostic = new vscode.Diagnostic(
						new vscode.Range(startPos, endPos),
						"Missing `material` property!",
						vscode.DiagnosticSeverity.Error
					);
					diagnosticsArr.push(diagnostic);
				}
			}

			checkTextureExistence(resourceNode, fileNamespace, diagnosticsArr);
			checkModelExistence(resourceNode, fileNamespace, diagnosticsArr);
		});
	}

	function checkTextureExistence(resourceNode: any, fileNamespace: string, diagnosticsArr: vscode.Diagnostic[]){
		
		if(!isProjectFile()) {
			return;
		}

		const textureNode = resourceNode.get('texture', true);
		const texturesNode = resourceNode.get('textures', true);

		const checkPath = (texturePath: string) => {
			if(!texturePath || texturePath === "") {
				return undefined;
			}
			if (!texturePath.endsWith('.png')) {
				texturePath += '.png';
			}
			const textureNamespace = texturePath.includes(":") ? texturePath.split(":")[0] : fileNamespace;
			let texturePathWithoutNamespace = texturePath.includes(":") ? texturePath.split(":")[1] : texturePath;

			if(textureNamespace === "minecraft") {
				// Check if the texture actually exists, if it returns 404 I will show the missing texture icon.
				if(VANILLA_TEXTURES_PATHS.includes(texturePathWithoutNamespace)) {
					return vscode.Uri.parse(`https://assets.mcasset.cloud/1.21.4/assets/minecraft/textures/${texturePathWithoutNamespace}`);
				}
				return undefined;
			}
			const result = getWorkspacePathAndNamespaceFromFilePath(activeEditor.document.uri.fsPath);
			if (!result) {
				return undefined;
			}
			const { workspacePath, } = result;

			const possiblePaths = [
				path.join(workspacePath, fileNamespace, `textures`, `${texturePathWithoutNamespace}`),
				path.join(workspacePath, fileNamespace, `assets`, textureNamespace, `textures`, `${texturePathWithoutNamespace}`),
				path.join(workspacePath, fileNamespace, `resourcepack`, `assets`, textureNamespace, `textures`, `${texturePathWithoutNamespace}`),
				path.join(workspacePath, fileNamespace, `resourcepack`, textureNamespace, `textures`, `${texturePathWithoutNamespace}`),
				path.join(workspacePath, fileNamespace, `resource_pack`, `assets`, textureNamespace, `textures`, `${texturePathWithoutNamespace}`),
				path.join(workspacePath, fileNamespace, `resource_pack`, textureNamespace, `textures`, `${texturePathWithoutNamespace}`)
			];

			if(DEBUG) {
				console.log("Possible paths:", possiblePaths);
				console.log("workspacePath:", workspacePath);
			}

			for (const filePath of possiblePaths) {
				if (fs.existsSync(filePath)) {
					console.log("Texture found:", filePath);
					return vscode.Uri.file(filePath);
				}
			}

			return undefined;
		};

		const isFileSaved = !activeEditor.document.isDirty;

		if (textureNode) {
			const texturePath = textureNode.value as string;
			const foundUri = checkPath(texturePath);
			const startPos = activeEditor.document.positionAt(textureNode.range[0]);
			const endPos = activeEditor.document.positionAt(textureNode.range[1]);
			let decoration;
			if (!foundUri) {
				diagnosticsArr.push(new vscode.Diagnostic(
					new vscode.Range(startPos, endPos),
					"Texture not found!",
					isFileSaved ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
				));
				decoration = vscode.window.createTextEditorDecorationType({
					gutterIconPath: extContext.asAbsolutePath('images/missing.png').replace(/\\/g, "/"),
					gutterIconSize: 'contain'
				});
			} else {
				decoration = vscode.window.createTextEditorDecorationType({
					gutterIconPath: foundUri,
					gutterIconSize: 'contain'
				});
			}

			decorations.push({ range: new vscode.Range(startPos, endPos) });
			activeEditor.setDecorations(decoration, decorations);
			activeDecorationsTextures.push(decoration);
		} else {
			if (texturesNode && YAML.isSeq(texturesNode) && texturesNode.range) {
				texturesNode.items.forEach((item: any) => {
					const texturePath = item.value as string;
					const foundUri = checkPath(texturePath);
					const startPos = activeEditor.document.positionAt(item.range[0]);
					const endPos = activeEditor.document.positionAt(item.range[1]);
					let decoration;
					if (!foundUri) {
						diagnosticsArr.push(new vscode.Diagnostic(
							new vscode.Range(startPos, endPos),
							"Texture not found!",
							isFileSaved ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
						));
						decoration = vscode.window.createTextEditorDecorationType({
							gutterIconPath: extContext.asAbsolutePath('images/missing.png').replace(/\\/g, "/"),
							gutterIconSize: 'contain'
						});
					} else {
						decoration = vscode.window.createTextEditorDecorationType({
							gutterIconPath: foundUri,
							gutterIconSize: 'contain'
						});
					}

					decorations.push({ range: new vscode.Range(startPos, endPos) });
					activeEditor.setDecorations(decoration, decorations);
					activeDecorationsTextures.push(decoration);
				});
			}
		}
		return;
	}

	function checkModelExistence(resourceNode: any, fileNamespace: string, diagnosticsArr: vscode.Diagnostic[]){
		
		if(!isProjectFile()) {
			return;
		}

		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			console.warn('No workspace open.');
			return;
		}

		const workspacePath = workspaceFolders[0].uri.fsPath; // Assume the first workspace

		const modelNode = resourceNode.get('model_path', true);

		const checkPath = (filePath: string) => {
			if(!filePath || filePath === "") {
				return undefined;
			}
			if (!filePath.endsWith('.json')) {
				filePath += '.json';
			}
			const namespace = filePath.includes(":") ? filePath.split(":")[0] : fileNamespace;
			let fileNoNamespace = filePath.includes(":") ? filePath.split(":")[1] : filePath;

			if(namespace === "minecraft") {
				return "minecraft"; // Shit
			}
			const result = getWorkspacePathAndNamespaceFromFilePath(activeEditor.document.uri.fsPath);
			if (!result) {
				return undefined;
			}
			const { workspacePath,  } = result;

			const possiblePaths = [
				path.join(workspacePath, fileNamespace, `models`, `${fileNoNamespace}`),
				path.join(workspacePath, fileNamespace, `assets`, namespace, `models`, `${fileNoNamespace}`),
				path.join(workspacePath, fileNamespace, `resourcepack`, `assets`, namespace, `models`, `${fileNoNamespace}`),
				path.join(workspacePath, fileNamespace, `resourcepack`, namespace, `models`, `${fileNoNamespace}`),
				path.join(workspacePath, fileNamespace, `resource_pack`, `assets`, namespace, `models`, `${fileNoNamespace}`),
				path.join(workspacePath, fileNamespace, `resource_pack`, namespace, `models`, `${fileNoNamespace}`)
			];

			console.log("Possible paths:", possiblePaths);
			console.log("workspacePath:", workspacePath);

			for (const filePath of possiblePaths) {
				if (fs.existsSync(filePath)) {
					console.log("Asset found:", filePath);
					return vscode.Uri.file(filePath);
				}
			}

			return undefined;
		};

		const isFileSaved = !activeEditor.document.isDirty;

		if (modelNode) {
			const modelPathProperty = modelNode.value as string;
			const foundUri = checkPath(modelPathProperty);
			const startPos = activeEditor.document.positionAt(modelNode.range[0]);
			const endPos = activeEditor.document.positionAt(modelNode.range[1]);
			let decoration;
			if (!foundUri) {
				diagnosticsArr.push(new vscode.Diagnostic(
					new vscode.Range(startPos, endPos),
					"Model not found!",
					isFileSaved ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
				));
				decoration = vscode.window.createTextEditorDecorationType({
					gutterIconPath: extContext.asAbsolutePath('images/missing.png').replace(/\\/g, "/"),
					gutterIconSize: 'contain'
				});
			} else {
				if(foundUri === "minecraft") {
					return;
				}
				decoration = vscode.window.createTextEditorDecorationType({
					gutterIconPath: foundUri,
					gutterIconSize: 'contain'
				});
			}

			decorations.push({ range: new vscode.Range(startPos, endPos) });
			activeEditor.setDecorations(decoration, decorations);
			activeDecorationsTextures.push(decoration);
		}
		return;
	}

	//#region Handle `flow` and allow only one flow rule. 
	let regEx = new RegExp("(.*)flow:", "g");
	let allLines = text.split("\n");
	regexLines(text, regEx, (entry) => {
		if (!entry) {
			return false;
		}

		let lines = allLines.slice(entry.line);
		let count = 0;
		for (let i = 1; i < lines.length; i++) {
			let line = lines[i];
			if (new RegExp("(.*)(skip|stop)_if(.*)(_success|_fail):", "g").test(line)) {
				count++;
			} else {
				// To detect if reached the end of the current action.
				if (count > 0) {
					break;
				}
			}
		}

		if (count > 1) {
			const range = activeEditor.document.lineAt(entry.line).range;
			const diagnostic = new vscode.Diagnostic(
				new vscode.Range(range.start.translate(0, entry.text.search(/\S/)), range.end),
				"Multiple `stop_` or `skip_` flow attributes found in action.\nUse only one of them for this action.",
				vscode.DiagnosticSeverity.Error
			);
			diagnosticsArr.push(diagnostic);
			return false;
		}

		return false;
	});
	//#endregion

	diagnostics.set(activeEditor.document.uri, diagnosticsArr);
}

function decorateGenericTexts(activeEditor : vscode.TextEditor, description : string, regEx : RegExp, decorationType : vscode.TextEditorDecorationType) {
	const appliedDecorations: vscode.DecorationOptions[] = [];
	const text = activeEditor.document.getText();
	let match;
	while ((match = regEx.exec(text))) {
		const startPos = activeEditor.document.positionAt(match.index);
		const endPos = activeEditor.document.positionAt(match.index + match[0].length);
		const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
		appliedDecorations.push(decoration);
	}

	activeEditor.setDecorations(decorationType, appliedDecorations);
}

function decorateAnyOfEnumLike(
	doc: YAML.Document.Parsed<any, true>,
	text: string,
	activeEditor: vscode.TextEditor,
	description: string,
	enumsAnyOfSchema: any[],
	decos: any
) {
	// Extract all possible values from anyOf (objects with "const" property)
	const values = enumsAnyOfSchema
		.map(entry => entry && typeof entry === "object" && "const" in entry ? entry.const : undefined)
		.filter((v): v is string => typeof v === "string");

	values.forEach(element => {
		decos.data[element] = [];
		// Space is important to match the property after : only and not random texts containing the enum.
		// For example it will match `property: ZOMBIE` and not `RANDOMSTRINGZOMBIE1234`.
		var regEx = new RegExp(`^\\s*\\w+\\s*:\\s*${element}\\b`, 'gm');
		let match;
		while ((match = regEx.exec(text))) {
			const startPos = activeEditor.document.positionAt(match.index + 1);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
			decos.data[element].push(decoration);
		}
		activeEditor.setDecorations(decos.decos[element], decos.data[element]);
	});
}

function decorateEnums(doc: YAML.Document.Parsed<any, true>, text: string, activeEditor : vscode.TextEditor, description : string, enumsSchema: any[], decos : any) {
	// This is dirty and has false positives but it is the fastest way to avoid iterating through the whole entries of the YAML structure.
	enumsSchema.forEach(element => {
		decos.data[element] = [];
		// Space is important to match the property after : only and not random texts containing the enum.
		// For example it will match `property: ZOMBIE` and not `RANDOMSTRINGZOMBIE1234`.
		// var regEx = new RegExp(" " + element + "\n", 'g');
		var regEx = new RegExp(`^\\s*\\w+\\s*:\\s*${element}\\b`, 'gm');
		let match;
		while ((match = regEx.exec(text))) {
	
			const startPos = activeEditor.document.positionAt(match.index + 1);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
	
			decos.data[element].push(decoration);
		}

		activeEditor.setDecorations(decos.decos[element], decos.data[element]);
	});
}

function decorateBackgroundTextBlocks(activeEditor: vscode.TextEditor, description: string, textToMatch: string, decorationType : vscode.TextEditorDecorationType) {
	const appliedDecorations: vscode.DecorationOptions[] = [];
	const text = activeEditor.document.getText();
	const regEx = new RegExp(textToMatch, 'g');
	let match;

	while ((match = regEx.exec(text))) {
		let startPos = activeEditor.document.positionAt(match.index);
		const lines = text.split('\n');

		// Ensure we have a valid starting line
		if (startPos.line >= lines.length) {
			continue;
		}

		// Get the indentation of the matched line
		const initialIndentation = lines[startPos.line].match(/^\s*/)?.[0].length ?? 0;

		// Find the parent indentation level and update startPos
		let parentIndentation = initialIndentation;
		for (let i = startPos.line - 1; i >= 0; i--) {
			const lineIndentation = lines[i].match(/^\s*/)?.[0].length ?? 0;
			if (lineIndentation < initialIndentation && lines[i].trim() !== '') {
				parentIndentation = lineIndentation;

				// Debug: print parent and the matched property
				console.log(lines[i].trim() + " -> " + lines[startPos.line].trim());

				startPos = new vscode.Position(i, 0); // Move startPos to the parent
				break;
			}
		}

		let endPos = activeEditor.document.positionAt(text.length); // Default to end of file

		// Iterate through lines until we find a line with the same or lower indentation as the parent
		for (let i = startPos.line + 1; i < lines.length; i++) {
			const currentIndentation = lines[i].match(/^\s*/)?.[0].length ?? 0;

			// Skip empty lines (they don't count as block delimiters)
			if (lines[i].trim() === '') {
				continue;
			}

			// If a line has the same or lower indentation as the parent, stop there
			if (currentIndentation <= parentIndentation) {
				endPos = new vscode.Position(i - 1, lines[i - 1].length);
				break;
			}
		}

		const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
		appliedDecorations.push(decoration);
	}

	activeEditor.setDecorations(decorationType, appliedDecorations);
} 

const prevDecorationsAlternated: vscode.TextEditorDecorationType[] = [];

function decorateBackgroundItemsAlternated(activeEditor: vscode.TextEditor) {
	if (!activeEditor) {
			return;
	}

	// Dispose of the previous decorations
	prevDecorationsAlternated.forEach(decoration => decoration.dispose());

	const text = activeEditor.document.getText();
	const lines = text.split('\n');

	// Find the line where "items:" is declared
	const itemsLine = lines.findIndex(line => line.trim() === 'items:');
	if (itemsLine === -1) {
			return;
	}

	// Find all the lines with the indentation level of "  ". Save them in an array with start and end.
	const itemsRanges: { start: number, end: number }[] = [];
	let currentIndentation = 0;
	let currentItemStart = -1;

	for (let i = itemsLine + 1; i < lines.length; i++) {
		const line = lines[i];
		const lineIndentation = line.match(/^(\s*)/)?.[0].length ?? 0;

		if (lineIndentation === 2 && currentItemStart !== -1) {
			itemsRanges.push({ start: currentItemStart, end: i });
			currentItemStart = i;
		} else if (lineIndentation === 2) {
			currentItemStart = i;
		} else if (lineIndentation < 2 && currentItemStart !== -1) {
			itemsRanges.push({ start: currentItemStart, end: i });
			currentItemStart = -1;
		}
	}

	// If there's an open item at the end of the document, close it
	if (currentItemStart !== -1) {
		itemsRanges.push({ start: currentItemStart, end: lines.length });
	}

	const decorationsA: vscode.DecorationOptions[] = [];
	const decorationsB: vscode.DecorationOptions[] = [];

	const isLightTheme = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light;
	const decorationTypeA = vscode.window.createTextEditorDecorationType({
		backgroundColor: isLightTheme ? "rgba(255, 0, 170, 0.2)" : "rgba(255, 0, 170, 0.03)",
		isWholeLine: true,
	});
	const decorationTypeB = vscode.window.createTextEditorDecorationType({
		backgroundColor: isLightTheme ? "rgba(132, 0, 255, 0.2)" : "rgba(0, 238, 255, 0.03)",
		isWholeLine: true,
	});

	prevDecorationsAlternated.push(decorationTypeA, decorationTypeB);

	// Apply decorations to every other item with alternating colors
	itemsRanges.forEach((entry, index) => {
		for (let i = entry.start; i < entry.end; i++) {
			const lineText = lines[i];
			const firstNonWhitespaceIndex = lineText.search(/\S/);
			const startPos = new vscode.Position(i, firstNonWhitespaceIndex !== -1 ? firstNonWhitespaceIndex : 0);
			const endPos = new vscode.Position(i, lineText.length);
			const decoration = { range: new vscode.Range(startPos, endPos) };
			if(index % 2 === 0) {
				decorationsA.push(decoration);
			} else {
				decorationsB.push(decoration);
			}
		}

		activeEditor.setDecorations(decorationTypeA, decorationsA);
		activeEditor.setDecorations(decorationTypeB, decorationsB);
	});
}

function regexLines(str : string, re : RegExp, x: (obj : any) => boolean) {
	let finishAll = false;
	return str.split(/\r?\n/).map(function (text, i) {
		// Shit, but there is no other way to stop the map function.
		if(finishAll) {
			return;
		}
		
		const match = re.exec(text);
		if(match) {
			finishAll = x({
				text: text,
				line: i,
				match: match[0]
			});
		}
	});
};

async function fetchJson(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		https.get(url, (response) => {
			if (response.statusCode !== 200) {
				return reject(new Error(`Errore nel download: ${response.statusCode}`));
			}

			let data = '';
			response.on('data', (chunk) => (data += chunk));
			response.on('end', () => {
				try {
					const jsonData = JSON.parse(data);
					resolve(jsonData);
				} catch (error) {
					reject(new Error('Errore nel parsing JSON'));
				}
			});
		}).on('error', reject);
	});
}

async function setCopilot(val: boolean) {
	const config = vscode.workspace.getConfiguration();
	const inspect = config.inspect<any>('github.copilot.enable');

	const current = inspect?.globalValue
		?? inspect?.workspaceValue
		?? inspect?.workspaceFolderValue
		?? inspect?.defaultValue
		?? {};

	const newValue = { ...current, yaml: val };
	await config.update('github.copilot.enable', newValue, vscode.ConfigurationTarget.Global);

	if (!val) {
		if (!neverWarnAboutCopilot) {
			const result = await vscode.window.showWarningMessage(
				'GitHub Copilot temporarily disabled for ItemsAdder YAML.\nCopilot causes only issues and suggestions are not correct.\nUse CTRL+SPACE to get proper autocomplete suggestions by the ItemsAdder extension.\nYou can still use Copilot chat if you really need that.',
				'OK',
				'Never Show Again'
			);

			if (result === 'Never Show Again') {
				await config.update('ia-vscode.neverWarnAboutCopilot', true, vscode.ConfigurationTarget.Global);
				neverWarnAboutCopilot = true;
			}
		} else {
			console.log('GitHub Copilot temporarily disabled for ItemsAdder YAML.');
		}
	}
}

function getCopilotYaml() : boolean | undefined {
	const inspect = vscode.workspace.getConfiguration('github.copilot').inspect<any>('enable');
	if(inspect) {
		if(!inspect?.globalValue?.yaml) {
			return undefined;
		}
		return inspect.globalValue.yaml;
	}
	return undefined;
}

async function setWordBasedSuggestions(val : boolean) {
	// This is an hack to avoid the editor to fill the autocomplete list with words from the document which make
  // YAML schema entries hard to find in the autocomplete words list.
	// Disable this function and try to edit a file to understand what I mean (edit the "resource" YAML section of an item and press CTRL+SPACE).
	const config = vscode.workspace.getConfiguration();
	const yamlSettings = config.get<{ [key: string]: any }>("[yaml]") ?? {};
	if(!val) {
		yamlSettings["editor.wordBasedSuggestions"] = "off";
	} else {
		if(originalWordBasedSuggestionsEnabled !== null) {
			yamlSettings["editor.wordBasedSuggestions"] = originalWordBasedSuggestionsEnabled;
		} else {
			delete yamlSettings["editor.wordBasedSuggestions"]; // To fallback to default value
		}
	}
	await config.update("[yaml]", yamlSettings, vscode.ConfigurationTarget.Global);
}

async function restoreOriginalSettings() {
	{
		const config = vscode.workspace.getConfiguration();
		const yamlSettings = config.get<{ [key: string]: any }>("[yaml]") ?? {};
		if(originalWordBasedSuggestionsEnabled !== null) {
			yamlSettings["editor.wordBasedSuggestions"] = originalWordBasedSuggestionsEnabled;
		} else {
			delete yamlSettings["editor.wordBasedSuggestions"]; // To fallback to default value
		}
		await config.update("[yaml]", yamlSettings, vscode.ConfigurationTarget.Global);
	}

	{
		const config = vscode.workspace.getConfiguration();
		const inspect = config.inspect<any>('github.copilot.enable');
		if(inspect) {
			if(originalCopilotEnabled !== undefined && originalCopilotEnabled !== null) {
				await config.update('github.copilot.enable', {
					...inspect.globalValue,
					yaml: originalCopilotEnabled
				}, vscode.ConfigurationTarget.Global);
			} else {
				// If properties are equal to the default ones, I remove the whole property to fallback to the default value.
				const updatedValue = { ...inspect.globalValue };
				delete updatedValue.yaml;
				if (JSON.stringify(updatedValue) === JSON.stringify(inspect.defaultValue)) {
					await config.update('github.copilot.enable', undefined, vscode.ConfigurationTarget.Global);
				} else {
					delete updatedValue.yaml;
					await config.update('github.copilot.enable', updatedValue, vscode.ConfigurationTarget.Global);
				}
			}
		}
	}
	console.log('Restored original settings for YAML!');
}

function getWorkspacePathAndNamespaceFromFilePath(filePath: string): { workspacePath: string, namespace: string } | undefined {
	const splitContentsResult = filePath.split("contents\\");
	if (splitContentsResult.length < 2) {
		console.warn('No path "contents" found in the file path.');
		return undefined;
	}
	return {
		workspacePath: splitContentsResult[0] + "\\contents",
		namespace: splitContentsResult[1].split("\\")[0]
	};
}
