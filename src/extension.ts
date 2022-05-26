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

	vscode.workspace.onDidChangeTextDocument(function(e) {
		const uri = decodeURI(e.document.uri.toString());
        // Very hacky
		if(e.document.lineCount > 0 && e.document.lineAt(0).text.includes("info:")) {
			if(!iaDocuments.includes(uri)) {
				vscode.window.showInformationMessage('Detected ItemsAdder yml configuration!');
				iaDocuments.push(uri);
			}
		} else {
			// Remove from array
			iaDocuments = iaDocuments.filter(function(a){return a !== uri;});
		}
    });
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
