import * as vscode from 'vscode';
import { Uri } from 'vscode';
import {schemas} from "./schemas";
import * as YAML from 'yaml';

const SCHEME = "itemsadder";
const JSON_SCHEMA = JSON.stringify(schemas);

let activeEditor : vscode.TextEditor | undefined = undefined;

let cachedIsIaFile: string[] = [];
let timeout: NodeJS.Timer | undefined = undefined;

const config = vscode.workspace.getConfiguration('ia-vscode');
let neverWarnAboutCopilot = config.get('neverWarnAboutCopilot');

let wasWordBasedSuggestionsEnabled : any = null;
let wasCopilotEnabled : any = null;

function getYamlParentPath(document: vscode.TextDocument, position: vscode.Position): string[] {
	const text = document.getText();
	const lines = text.split("\n");

	let path: string[] = [];
	let indentStack: { indent: number; key: string }[] = [];
	let currentIndent = position.character;

	for (let i = position.line; i >= 0; i--) {
			const line = lines[i];

			const match = line.match(/^(\s*)([^:]+):/);
			if (match) {
					const indent = match[1].length;
					const key = match[2];
					// Only add keys that are actual parents based on indentation
					if (indent < currentIndent) {
							indentStack.push({ indent, key });
							currentIndent = indent;
					}
			}
	}

	// Extract only keys from the stack and reverse to get the correct order
	path = indentStack.reverse().map(item => item.key);
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
	activeEditor = vscode.window.activeTextEditor;
	wasWordBasedSuggestionsEnabled = vscode.workspace.getConfiguration('editor').get('wordBasedSuggestions');
	wasCopilotEnabled = getCopilot();

	const vscodeYaml = vscode.extensions.getExtension("redhat.vscode-yaml");
	if(vscodeYaml)
	{
		const yamlExtensionAPI = await vscodeYaml.activate();
		yamlExtensionAPI.registerContributor(SCHEME, (resource : string) => {
			if(!resource.endsWith('.yml')) {
				return undefined;
			}
			if(!cachedIsIaFile.includes(decodeURI(resource))) {
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

	function addSuggestion(name: string, description: string, completionItems: vscode.CompletionItem[]) {
		const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
		item.detail = description;
		item.insertText = `${name}:\n  `;
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
						if(arraysEqual(parentPath, currentPath) && currentPath.length > 0) {
							return;
						}
				
						Object.keys(properties).forEach((key) => {
								const newPath = [...currentPath, key];
				
								// @ts-ignore
								const subProperties = properties[key]?.properties;
								if (subProperties) {
										addNestedSuggestions(subProperties, parentPath, newPath);
								} else {
										if(!key.startsWith("my_")) {
											return;
										}
										let markdownDescription = "New entry.";
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

										addSuggestion(newKey, markdownDescription, completionItems);
								}
						});
					}
				
					// Function to compare two paths
					function arraysEqual(arr1: string[], arr2: string[]): boolean {
							if (arr1.length !== arr2.length) return false;
							return arr1.every((value, index) => value === arr2[index]);
					}
					
					// Ensure that properties are suggested only when the full path matches
					function suggestPropertiesForPath(properties: any, path: string[]) {
							if (path.length === 0) {
									addNestedSuggestions(properties, [], []);
									return;
							}
					
							// TODO also handle item actions that have dynamic properties names,
							// for example `actions.play_sound`, `actions.play_sound_1`, `actions.play_sound_custom_xxx` etc...
							// This is currently limited as it can't do suggestions for dynamic parents.
							// In this case I hack it manually because I am lazy and this is a limitation of the current implementation.

							function addSuggestionAvoidDuplicate(key : string) {
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

								addSuggestion(newKey, markdownDescription, completionItems);
							}

							if(path.length === 4 && path[0] === "items" && path[2] === "consumable" && path[3] === "effects") {
								addSuggestionAvoidDuplicate("apply_status_effects");
								addSuggestionAvoidDuplicate("remove_status_effects");
								addSuggestionAvoidDuplicate("play_sound");
							}

							// Todo also add the same for
							// - "actions" property
							// - "triggers" property of HUDS
							const [currentKey, ...remainingPath] = path;
							// @ts-ignore
							if (Object.prototype.hasOwnProperty.call(properties, currentKey)) {
									const subProperties = properties[currentKey]?.properties;
									if (subProperties) {
											suggestPropertiesForPath(subProperties, remainingPath);
									} else {
											addNestedSuggestions(properties, path, path);
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
	schemas.$defs.bukkit_entity_type.enum.forEach(element => {
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
		decorateEnums(doc, text, activeEditor, "Vanilla entity type", schemas.$defs.bukkit_entity_type.enum, typesDecos.entities);
	
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
		console.log("Document changed!");
		handleDocumentRefresh(e.document);
    });

	vscode.workspace.onDidOpenTextDocument(function(document) {
		console.log("Document opened!");
		handleDocumentRefresh(document);
	});

	async function handleDocumentRefresh(document: vscode.TextDocument) {
		// Vscode triggered this shit when I edit an editor config. I have no other way to identify that.
		if(document.fileName.endsWith('settings.json') && document.uri.scheme === 'file' && document.uri.path.includes('Code')) {
			return;
		}
		const uri = decodeURI(document.uri.toString());
			// Very hacky
			if(document.lineCount > 0 && document.lineAt(0).text.includes("info:")) {
				setWordBasedSuggestions(false);
				await setCopilot(false);

				if(!cachedIsIaFile.includes(uri)) {
					vscode.window.showInformationMessage('Detected ItemsAdder yml configuration!');
					cachedIsIaFile.push(uri);
				}
			} else {
				// Remove from array
				cachedIsIaFile = cachedIsIaFile.filter(function(a){return a !== uri;});
			}
	}

	vscode.window.onDidChangeActiveTextEditor(async editor => {
		console.log("Active editor changed!");
		activeEditor = editor;
		if (editor) {
			if(isIaFile(editor.document)) {
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
			if(isIaFile(event.document)) {
				triggerUpdateDecorations(true);
			}
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidCloseTextDocument(async document => {
		if(isIaFile(document)) {
			restoreOriginalSettings();
		}
	}, null, context.subscriptions);
}

export function deactivate() {
	restoreOriginalSettings();
}

async function setCopilot(val : boolean) {
	// Check if it exists
	const copilotEnable = vscode.workspace.getConfiguration('github.copilot').get<any>('enable');
	if(copilotEnable) {
		copilotEnable["yaml"] = val;
		vscode.workspace.getConfiguration('github.copilot').update('enable', copilotEnable, true);
	}

	if(val) {
		//vscode.window.showInformationMessage('GitHub Copilot re-enabled for YAML!');
		console.log('GitHub Copilot re-enabled for YAML!');
	} else {
		if(!neverWarnAboutCopilot) {
			const result = await vscode.window.showInformationMessage(
				'[!] GitHub Copilot temporarily disabled for ItemsAdder YAML.\nCopilot causes only issues and suggestions are not correct. Please use the CTRL+SPACE shortcut to allow ia-vscode to provide proper autocomplete suggestions.',
				"OK",
				"Never Show Again"
			);
	
			if (result === "Never Show Again") {
				await config.update('neverWarnAboutCopilot', true, vscode.ConfigurationTarget.Global);
				neverWarnAboutCopilot = true;
			}
			return;
		}

		console.log('GitHub Copilot temporarily disabled for ItemsAdder YAML.');
	}
}

function getCopilot() : boolean {
	// Check if it exists
	const copilotEnable = vscode.workspace.getConfiguration('github.copilot').get<any>('enable');
	if(copilotEnable) {
		if(copilotEnable["yaml"]) {
			return copilotEnable["yaml"];
		} else {
			return true;
		}
	}
	
	return false;
}

async function setWordBasedSuggestions(val : boolean) {
	// This is an hack to avoid the editor to fill the autocomplete list with words from the document which make
  // YAML schema entries hard to find in the autocomplete words list.
	// Disable this function and try to edit a file to understand what I mean (edit the "resource" YAML section of an item and press CTRL+SPACE).
	if(wasWordBasedSuggestionsEnabled !== null) {
		// Global
		await vscode.workspace.getConfiguration('editor').update('wordBasedSuggestions', val, true);
		// If it's in a workspace
		if(vscode.workspace.name) {
			// Workspace
			await vscode.workspace.getConfiguration('editor').update('wordBasedSuggestions', val, false);
		}
	}
}

async function restoreOriginalSettings() {
	if(wasWordBasedSuggestionsEnabled !== null) {
		setWordBasedSuggestions(wasWordBasedSuggestionsEnabled);
	}

	if(wasCopilotEnabled !== null) {
		await setCopilot(wasCopilotEnabled);
	}
}

/**
 * Check if the file is registered
 * @param document
 * @returns 
 */
function isIaFile(document: vscode.TextDocument) {
	if(cachedIsIaFile.length === 0) {
		return false;
	}
	const uri = decodeURI(document.uri.toString());
	return cachedIsIaFile.includes(uri);
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
		});
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

			// Iterate through lines until we find a line with the same indentation as the parent
			for (let i = startPos.line + 1; i < lines.length; i++) {
					const currentIndentation = lines[i].match(/^\s*/)?.[0].length ?? 0;

					// Skip empty lines (they don't count as block delimiters)
					if (lines[i].trim() === '') {
						continue;
					}

					// If a line has the same indentation as the parent, stop there
					if (currentIndentation === parentIndentation) {
							endPos = new vscode.Position(i - 1, 0);
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