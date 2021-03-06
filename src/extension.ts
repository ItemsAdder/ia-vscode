// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Uri } from 'vscode';

import {schemas} from "./schemas";

const SCHEMA = "ia-schema";
let schemaJSON = "";
let iaDocuments: string[] = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	schemaJSON = JSON.stringify(schemas);

	const vscodeYaml = vscode.extensions.getExtension("redhat.vscode-yaml");
	if(vscodeYaml)
	{
		const yamlExtensionAPI = await vscodeYaml.activate();
		yamlExtensionAPI.registerContributor(SCHEMA, onRequestSchemaURI, onRequestSchemaContent);
	}


    /*vscode.languages.registerHoverProvider('*', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word === "example") {

                return new vscode.Hover({
                    language: "example",
                    value: "example"
                });
            }
        }
    });*/


	vscode.workspace.textDocuments.forEach(document => {
		handleDocumentRefresh(document);
	});

	vscode.workspace.onDidChangeTextDocument(function(e) {
		handleDocumentRefresh(e.document);
    });

	vscode.workspace.onDidOpenTextDocument(function(document) {
		handleDocumentRefresh(document);
	});


	let timeout: NodeJS.Timer | undefined = undefined;

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
		typesDecos.materials.decos[element] = vscode.window.createTextEditorDecorationType({
			gutterIconPath: vscode.Uri.parse(`https://ide.devs.beer/api-mcicons/${element.toLowerCase().replace(/_/g, '-')}`),
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

	let activeEditor = vscode.window.activeTextEditor;

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

	vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		if (editor) {
			triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			triggerUpdateDecorations(true);
		}
	}, null, context.subscriptions);
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

// this method is called when your extension is deactivated
export function deactivate() {}

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

function handleText(activeEditor : vscode.TextEditor, description : string, regEx : RegExp, itemsDeco: vscode.DecorationOptions[], propertyDeco: vscode.DecorationOptions[]) {
	const text = activeEditor.document.getText();
	let match;
	while ((match = regEx.exec(text))) {

		const startPos = activeEditor.document.positionAt(match.index);
		const endPos = activeEditor.document.positionAt(match.index + match[0].length);
		const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
		propertyDeco.push(decoration);

		const regExParent = /  [a-zA-z]+\:\n/g;
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

		var regEx = new RegExp(element + "\n", 'g');
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
		const regExParent = /  [a-zA-z]+\:\n/g;
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
		const regExNext = /\n  [a-zA-z]+\:\n/g;
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