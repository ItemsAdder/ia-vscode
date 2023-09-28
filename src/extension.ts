import * as vscode from 'vscode';
import { Uri } from 'vscode';
import {schemas} from "./schemas";
const yaml = require('js-yaml');

const SCHEMA = "ia-schema";
let activeEditor : vscode.TextEditor | undefined = undefined;
let schemaJSON = "";
let iaDocuments: string[] = [];
let origWordBasedSuggestions : any = 1337;
let timeout: NodeJS.Timer | undefined = undefined;

export async function activate(context: vscode.ExtensionContext) {
	activeEditor = vscode.window.activeTextEditor;
	origWordBasedSuggestions = vscode.workspace.getConfiguration('editor').get('wordBasedSuggestions');

	schemaJSON = JSON.stringify(schemas);
	const vscodeYaml = vscode.extensions.getExtension("redhat.vscode-yaml");
	if(vscodeYaml)
	{
		const yamlExtensionAPI = await vscodeYaml.activate();
		yamlExtensionAPI.registerContributor(SCHEMA, onRequestSchemaURI, onRequestSchemaContent);
	}

	const templateItemDecorationType = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/template.png'),
		color: 'aqua',
	});
	const templateTextDecorationType = vscode.window.createTextEditorDecorationType({
		color: 'aqua',
	});
	const variantItemDecorationType = vscode.window.createTextEditorDecorationType({
		gutterIconPath: context.asAbsolutePath('images/variant.png'),
		color: '#B6A102',
	});
	const variantTextDecorationType = vscode.window.createTextEditorDecorationType({
		color: '#B6A102',
	});
	const grayTextDecoType = vscode.window.createTextEditorDecorationType({
		color: "#444444"
	});
	const greenTextDecoType = vscode.window.createTextEditorDecorationType({
		color: "#20812d"
	});
	const grayAreaDecoType = vscode.window.createTextEditorDecorationType({
		backgroundColor: "#121212"
	});
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

	const diagnostics = vscode.languages.createDiagnosticCollection('ia_diagnostics');
	let diagnosticsArr : vscode.Diagnostic[] = [];

	schemas.$defs.vanilla_entity_types.enum.forEach(element => {
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
	schemas.$defs.vanilla_materials.enum.forEach(element => {

		let fileName = element.toLowerCase().replace(/_/g, '-')

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
		const templateItemsDecorations: vscode.DecorationOptions[] = [];
		const templateTextsDecorations: vscode.DecorationOptions[] = [];
	
		const largeNumbers: vscode.DecorationOptions[] = [];
	
		const variantItemsDecorations: vscode.DecorationOptions[] = [];
		const variantTextsDecorations: vscode.DecorationOptions[] = [];
	
		const greenTextsDecorations: vscode.DecorationOptions[] = [];
		const grayTextsDecorations: vscode.DecorationOptions[] = [];
	
		const grayAreasDecorations: vscode.DecorationOptions[] = [];

		handleText(activeEditor, "Template item", /    template\: true/g, templateItemsDecorations, templateTextsDecorations);
		activeEditor.setDecorations(templateItemDecorationType, templateItemsDecorations);
		activeEditor.setDecorations(templateTextDecorationType, templateTextsDecorations);
	
		handleText(activeEditor, "Variant item", /    variant_of\:/g, variantItemsDecorations, variantTextsDecorations);
		activeEditor.setDecorations(variantTextDecorationType, variantTextsDecorations);
		activeEditor.setDecorations(variantItemDecorationType, variantItemsDecorations);
	
		handleTextEnum(activeEditor, "Vanilla entity type", schemas.$defs.vanilla_entity_types.enum, typesDecos.entities);
		handleTextEnum(activeEditor, "Vanilla material", schemas.$defs.vanilla_materials.enum, typesDecos.materials);
	
		handleGenericProperty(activeEditor, "TRUE", / true/g, greenTextsDecorations);
		activeEditor.setDecorations(greenTextDecoType, greenTextsDecorations);
	
		handleGenericProperty(activeEditor, "FALSE", / false/g, grayTextsDecorations);
		activeEditor.setDecorations(grayTextDecoType, grayTextsDecorations);
	
		handleGenericArea(activeEditor, "Disabled properties block", /    enabled: false/g, grayAreasDecorations);
		activeEditor.setDecorations(grayAreaDecoType, grayAreasDecorations);

		handleForcedDiagnostics(activeEditor, diagnostics, diagnosticsArr);
	
		//activeEditor.setDecorations(largeNumberDecorationType, largeNumbers);
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

	vscode.workspace.onDidChangeTextDocument(function(e) {
		handleDocumentRefresh(e.document);
    });

	vscode.workspace.onDidOpenTextDocument(function(document) {
		handleDocumentRefresh(document);
	});

	vscode.window.onDidChangeActiveTextEditor(async editor => {
		activeEditor = editor;
		if (editor) {
			if(isIaFile(editor.document)) {
				setWordBasedSuggestions(false);
				triggerUpdateDecorations();
			} else {
				resetWordBasedSuggestions();
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
			resetWordBasedSuggestions();
		}
	}, null, context.subscriptions);
}

export function deactivate() {
	resetWordBasedSuggestions();
}

/**
 * This is an hack to avoid the editor to fill the autocomplete list with words from the document which make
 * YAML schema entries hard to find in the autocomplete words list.
 * Disable this function and try to edit a file to understand what I mean (edit the "resource" YAML section of an item and press CTRL+SPACE).
 * 
 * @param val true to hide, false to show.
 * @returns nothing
 */
async function setWordBasedSuggestions(val : boolean) {
	if(origWordBasedSuggestions === 1337) {
		return;
	}
	// Global
	await vscode.workspace.getConfiguration('editor').update(
		'wordBasedSuggestions', 
		val, 
		true
	);
	// If it's in a workspace
	if(vscode.workspace.name) {
		// Workspace
		await vscode.workspace.getConfiguration('editor').update(
			'wordBasedSuggestions', 
			val, 
			false
		);
	}
}

async function resetWordBasedSuggestions() {
	setWordBasedSuggestions(origWordBasedSuggestions);
}

/**
 * Check if the file is registered
 * @param document
 * @returns 
 */
function isIaFile(document: vscode.TextDocument) {
	if(iaDocuments.length === 0) {
		return false;
	}
	const uri = decodeURI(document.uri.toString());
	return iaDocuments.includes(uri);
}

function handleDocumentRefresh(document: vscode.TextDocument) {
	const uri = decodeURI(document.uri.toString());
        // Very hacky
		if(document.lineCount > 0 && document.lineAt(0).text.includes("info:")) {
			if(!iaDocuments.includes(uri)) {
				vscode.window.showInformationMessage('Detected ItemsAdder yml configuration!');
				iaDocuments.push(uri);
			}
		} else {
			// Remove from array
			iaDocuments = iaDocuments.filter(function(a){return a !== uri;});
		}
}

function onRequestSchemaURI(resource: string): string | undefined {
	if(!resource.endsWith('.yml')) {
		return undefined;
	}
	if(!iaDocuments.includes(decodeURI(resource))) {
		return undefined;
	}
	return `${SCHEMA}://schema/ItemsAdder`;
}

function onRequestSchemaContent(schemaUri: string): string | undefined {
	const parsedUri = Uri.parse(schemaUri);
	if (parsedUri.scheme !== SCHEMA) {
		return undefined;
	}
	if (!parsedUri.path || !parsedUri.path.startsWith('/')) {
		return undefined;
	}
	return schemaJSON;
}

/**
 * This function handles customized rules to hint about errors that are not handled by the YAML schema.
 * @param activeEditor the editor
 * @param diagnostics the diagnostics object
 * @param diagnosticsArr the diagnostics array
 */
function handleForcedDiagnostics(activeEditor : vscode.TextEditor, diagnostics : vscode.DiagnosticCollection, diagnosticsArr : vscode.Diagnostic[]) {
	diagnostics.clear();
	diagnosticsArr = [];

	const text = activeEditor.document.getText();
	let yy : any = null;
	try
	{
		yy = yaml.load(text);
		if(!yy?.items) {
			return;
		}
	}
	catch(ex : any)
	{
		//console.log(ex);
		//vscode.window.showErrorMessage('Error parsing ItemsAdder yml configuration!', ex.message);
		return;
	}

	Object.keys(yy.items).forEach((key : any) => {
		let value = yy.items[key];

		//#region Handle `material` property in `resource`.
		// Must underline the resources to warn about the missing material property and are not custom armors
		if(!value?.resource?.material && !value?.specific_properties?.armor) {
			// Search for the specified item key. 
			// Warning: this might find the wrong thing if there is something else with the same key name before the items list. //TODO: FIX THIS
			let matchItem;
			let regexItem = new RegExp("  " + key + ":", "g");
			while ((matchItem = regexItem.exec(text))) {
				// Search for the nearest "resource" property to underline it. No need to loop it, stop at the first found one.
				let match2;
				let regEx2 = new RegExp("    resource:", "g");
				if ((match2 = regEx2.exec(text.substring(matchItem.index)))) {
					const startPos = activeEditor.document.positionAt(4 + matchItem.index + match2.index); // 4spaces in front of "resource:"
					const endPos = activeEditor.document.positionAt(matchItem.index + match2.index + match2[0].length);
					
					const diagnostic = new vscode.Diagnostic(new vscode.Range(startPos, endPos), "Missing `material` property for `resource`", vscode.DiagnosticSeverity.Error);
					diagnosticsArr.push(diagnostic);
				}
			}
		}
		//#endregion
	});

	//#region Handle `flow` and allo only one flow rule. 
	let regEx = new RegExp("(.*)flow:", "g");
	let allLines = text.split("\n");
	regexLines(text, regEx, (entry) => {
		if(!entry) {
			return false;
		}

		let lines = allLines.slice(entry.line);
		let count = 0;
		for(let i = 1; i < lines.length; i++) {
			let line = lines[i];
			if(new RegExp("(.*)(skip|stop)_if(.*)(_success|_fail):", "g").test(line)) {
				count++;
			} else {
				// To detect if reached the end of the current action.
				if(count > 0) {
					break;
				}
			}
		}

		if(count > 1) {
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

function handleText(activeEditor : vscode.TextEditor, description : string, regEx : RegExp, itemsDeco: vscode.DecorationOptions[], propertyDeco: vscode.DecorationOptions[]) {
	const text = activeEditor.document.getText();
	let match;
	while ((match = regEx.exec(text))) {

		const startPos = activeEditor.document.positionAt(match.index);
		const endPos = activeEditor.document.positionAt(match.index + match[0].length);
		const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
		propertyDeco.push(decoration);

		const regExParent = /  [a-z0-9_]+\:\n/g;
		let matchParent;
		let prevText = "";
		let matchedParent = false;
		let i = 1;
		while (!matchedParent)
		{
			if(match.index - i < 0) {
				break;
			}
			prevText = activeEditor.document.getText(
				new vscode.Range(
					activeEditor.document.positionAt(match.index - i),
					activeEditor.document.positionAt(match.index)
				) 
			);
			
			matchParent = regExParent.exec(prevText)
			matchedParent = matchParent ? true : false;
			i++;
		}

		if(matchParent && matchedParent) {
			const startPos = activeEditor.document.positionAt(2 + match.index - i + 1);
			const endPos = activeEditor.document.positionAt(match.index - i + matchParent[0].length - 1);
		
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
			itemsDeco.push(decoration);
		}
	}
}

function handleTextEnum(activeEditor : vscode.TextEditor, description : string, enumsSchema: any[], decos : any) {

	const text = activeEditor.document.getText();

	enumsSchema.forEach(element => {

		decos.data[element] = [];

		// Space is important to match the property after : only and not random texts containing the enum.
		// For example it will match `property: ZOMBIE` and not `RANDOMSTRINGZOMBIE1234`.
		var regEx = new RegExp(" " + element + "\n", 'g');
		let match;
		while ((match = regEx.exec(text))) {
	
			const startPos = activeEditor.document.positionAt(match.index);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length - 1);
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
	
			decos.data[element].push(decoration);
		}

		activeEditor.setDecorations(decos.decos[element], decos.data[element]);
	});
}

function handleGenericProperty(activeEditor : vscode.TextEditor, description : string, regEx : RegExp, propertyDeco: vscode.DecorationOptions[]) {
	const text = activeEditor.document.getText();
	let match;
	while ((match = regEx.exec(text))) {

		const startPos = activeEditor.document.positionAt(match.index);
		const endPos = activeEditor.document.positionAt(match.index + match[0].length);
		const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
		propertyDeco.push(decoration);
	}
}

function handleGenericArea(activeEditor : vscode.TextEditor, description : string, regEx : RegExp, blockDeco: vscode.DecorationOptions[]) {
	const text = activeEditor.document.getText();
	let match;
	while ((match = regEx.exec(text))) {

		// Find the parent YAML block
		const regExParent = /  [a-z0-9_]+\:\n/g;
		let matchParent;
		let matchedParent = false;
		let i = 1;
		while (!matchedParent)
		{
			if(match.index - i < 0) {
				break;
			}
			let prevText = activeEditor.document.getText(
				new vscode.Range(
					activeEditor.document.positionAt(match.index - i),
					activeEditor.document.positionAt(match.index)
				) 
			);
			
			matchParent = regExParent.exec(prevText);
			matchedParent = matchParent ? true : false;
			i++;
		}

		// Find the next YAML block parent
		const regExNext = /\n  [a-z0-9_]+\:\n/g;
		let matchNext;
		let j = 1;
		while (!(match.index + j > text.length - 1))
		{
			let prevText = activeEditor.document.getText(
				new vscode.Range(
					activeEditor.document.positionAt(match.index + j),
					activeEditor.document.positionAt(match.index)
				) 
			);
			
			matchNext = regExNext.exec(prevText);
			if(matchNext) {
				break;
			}
			j++;
		}

		if(matchNext) {
			const startPos = activeEditor.document.positionAt(2 + match.index - i + 1);
			const endPos = activeEditor.document.positionAt(match.index + j - matchNext[0].length - 1);
		
			const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
			blockDeco.push(decoration);
		}
	}
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