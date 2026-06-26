/* eslint-disable @typescript-eslint/no-var-requires */

import * as vscode from 'vscode';
import * as YAML from 'yaml';

export const itemsAdderPluginConfigSchema = require('./itemsAdderPluginConfigSchema.json');

export function isItemsAdderPluginConfig(document: vscode.TextDocument): boolean {
	if (!isYamlDocument(document)) {
		return false;
	}

	return isItemsAdderPluginConfigText(document.getText());
}

export function isItemsAdderPluginConfigText(text: string): boolean {
	const doc = YAML.parseDocument(text);
	const resourcePack = doc.getIn(['resource-pack'], true);
	if (!YAML.isMap(resourcePack)) {
		return false;
	}

	return resourcePack.has('uuid');
}

function isYamlDocument(document: vscode.TextDocument): boolean {
	return document.languageId === 'yaml' || document.fileName.endsWith('.yml') || document.fileName.endsWith('.yaml');
}
