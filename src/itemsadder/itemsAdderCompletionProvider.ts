import * as vscode from 'vscode';
import * as YAML from 'yaml';

import { definitionKindsForPath } from './definitionReferences';
import { getYamlParentPathFromText, getYamlSameLevelPropertiesFromText } from './yamlPath';
import { AssetKind } from './assetPathLayout';
import { displayWorkspacePath } from './pathDisplay';
import { ProjectAssetIndex } from './projectAssetIndex';
import { vanillaTextureUrl } from './vanillaMinecraftAssets';
import { isItemsAdderPluginConfigText } from '../itemsAdderPluginConfig';

interface ItemsAdderCompletionProviderOptions {
	schemas: any;
	pluginConfigSchema?: any;
	itemTemplates: any[];
	vanillaTexturePaths: string[];
	assetIndex?: ProjectAssetIndex;
	getDevMode(): boolean;
	getEnableCustomReferenceAutocomplete?(): boolean;
}

export class ItemsAdderCompletionProvider implements vscode.CompletionItemProvider {
	constructor(private readonly options: ItemsAdderCompletionProviderOptions) {}

	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
		const text = document.getText();
		if (isItemsAdderPluginConfigText(text)) {
			return this.providePluginConfigCompletionItems(document, position);
		}

		const yamlPath = getYamlParentPathFromText(text, position);
		const items: vscode.CompletionItem[] = [];

		this.addSpecialSuggestions(document, position, yamlPath, items);
		this.addDynamicEntrySuggestions(document, position, yamlPath, items);

		return items;
	}

	private providePluginConfigCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
		const schema = this.options.pluginConfigSchema;
		if (!schema) {
			return [];
		}

		const currentLine = document.lineAt(position.line).text;
		const valueMatch = currentLine.match(/^(\s*[^:#][^:]*:\s*)(.*)$/);
		const yamlPath = getYamlParentPathFromText(document.getText(), position);
		const items: vscode.CompletionItem[] = [];

		if (valueMatch && position.character >= valueMatch[1].length) {
			const key = currentLine.slice(0, currentLine.indexOf(':')).trim();
			this.addSchemaValueSuggestions(schema, [...yamlPath, key], items);
			return items;
		}

		this.addSchemaPropertySuggestions(schema, document, position, yamlPath, items);
		return items;
	}

	private addSchemaPropertySuggestions(
		schema: any,
		document: vscode.TextDocument,
		position: vscode.Position,
		yamlPath: string[],
		items: vscode.CompletionItem[]
	): void {
		const schemaNode = this.schemaNodeAtPathFrom(schema, yamlPath);
		const properties = schemaNode?.properties;
		if (!properties) {
			return;
		}

		const usedKeys = getYamlSameLevelPropertiesFromText(document.getText(), position);
		for (const [key, property] of Object.entries(properties)) {
			if (usedKeys.includes(key)) {
				continue;
			}
			const resolved = this.resolveRefFrom(property, schema);
			this.addEntrySuggestion(items, key, this.descriptionForFrom(resolved, schema, 'Config property.'));
		}
	}

	private addSchemaValueSuggestions(schema: any, yamlPath: string[], items: vscode.CompletionItem[]): void {
		const schemaNode = this.schemaNodeAtPathFrom(schema, yamlPath);
		const values = this.valueSuggestionsFor(schemaNode, schema);
		for (const value of values) {
			const item = new vscode.CompletionItem(value, vscode.CompletionItemKind.Value);
			item.insertText = value;
			items.push(item);
		}
	}

	private valueSuggestionsFor(schemaNode: any, rootSchema: any): string[] {
		const resolved = this.resolveRefFrom(schemaNode, rootSchema);
		if (!resolved) {
			return [];
		}

		if (Array.isArray(resolved.enum)) {
			return resolved.enum.map((value: any) => String(value));
		}
		if (resolved.const !== undefined) {
			return [String(resolved.const)];
		}
		if (resolved.type === 'boolean') {
			return ['true', 'false'];
		}
		if (Array.isArray(resolved.anyOf)) {
			return Array.from(new Set<string>(resolved.anyOf.flatMap((entry: any) => this.valueSuggestionsFor(entry, rootSchema))));
		}

		return [];
	}

	private addSpecialSuggestions(
		document: vscode.TextDocument,
		position: vscode.Position,
		yamlPath: string[],
		items: vscode.CompletionItem[]
	): void {
		if (yamlPath.length === 4 && yamlPath[0] === 'items' && yamlPath[2] === 'consumable' && yamlPath[3] === 'effects') {
			this.addUniqueEntrySuggestion(document, position, items, 'apply_status_effects');
			this.addUniqueEntrySuggestion(document, position, items, 'remove_status_effects');
			this.addUniqueEntrySuggestion(document, position, items, 'play_sound');
		}

		if (yamlPath.length === 2 && yamlPath[0] === 'sounds') {
			this.addUniqueEntrySuggestion(document, position, items, 'variant');
		}

		if (yamlPath.length === 3 && yamlPath[0] === 'items' && yamlPath[2] === 'name') {
			const name = this.toDisplayName(yamlPath[1]);
			this.addTextSuggestion(items, name, 'Name shown in inventory tooltip.');
			this.addTextSuggestion(items, `item-${yamlPath[1]}`, 'Dictionary key for multi-language item name.');
			this.addTextSuggestion(items, 'Item', 'Name shown in inventory tooltip.');
		}

		if (yamlPath.length === 2 && yamlPath[0] === 'items') {
			const usedKeys = getYamlSameLevelPropertiesFromText(document.getText(), position);
			if (!usedKeys.includes('name')) {
				this.addTextSuggestion(items, `name: ${this.toDisplayName(yamlPath[1])}`, 'Name shown in inventory tooltip.');
			}
		}

		if (yamlPath.length === 1 && yamlPath[0] === 'items') {
			this.addItemTemplates(items);
		}

		if (this.isTexturePath(yamlPath)) {
			this.addVanillaTextureSuggestions(document, position, items);
			if (this.getEnableCustomReferenceAutocomplete()) {
				this.addWorkspaceAssetSuggestions(document, position, items, 'texture');
			}
		}

		if (this.isModelPath(yamlPath) && this.getEnableCustomReferenceAutocomplete()) {
			this.addWorkspaceAssetSuggestions(document, position, items, 'model');
		}

		if (this.getEnableCustomReferenceAutocomplete()) {
			this.addWorkspaceDefinitionSuggestions(document, position, yamlPath, items);
		}

		if (
			yamlPath.length >= 5 &&
			yamlPath[0] === 'recipes' &&
			yamlPath[1] === 'crafting_table' &&
			yamlPath[3] === 'return_items' &&
			yamlPath[4] === 'replace'
		) {
			const currentLine = document.lineAt(position.line).text;
			if (!currentLine.includes(': ') && !currentLine.endsWith(':')) {
				for (const material of this.options.schemas.$defs.bukkit_materials.enum) {
					this.addEntrySuggestion(items, material, 'Material to replace.', false, vscode.CompletionItemKind.EnumMember);
				}
			}
		}
	}

	private addDynamicEntrySuggestions(
		document: vscode.TextDocument,
		position: vscode.Position,
		yamlPath: string[],
		items: vscode.CompletionItem[]
	): void {
		const schemaNode = this.schemaNodeAtPath(yamlPath);
		const properties = schemaNode?.properties;
		if (!properties) {
			return;
		}

		const usedKeys = getYamlSameLevelPropertiesFromText(document.getText(), position);
		for (const key of Object.keys(properties)) {
			const property = this.resolveRef(properties[key]);
			if (property?.doNotSuggest) {
				continue;
			}

			if (!key.startsWith('my_')) {
				continue;
			}

			const uniqueKey = this.uniqueKey(`${key}_1`, usedKeys);
			this.addEntrySuggestion(items, uniqueKey, this.descriptionFor(property, 'New entry.'));
		}
	}

	private schemaNodeAtPath(yamlPath: string[]): any | undefined {
		return this.schemaNodeAtPathFrom(this.options.schemas, yamlPath);
	}

	private schemaNodeAtPathFrom(schema: any, yamlPath: string[]): any | undefined {
		let current = this.resolveRefFrom(schema, schema);
		for (const segment of yamlPath) {
			current = this.resolveRefFrom(current, schema);
			if (!current) {
				return undefined;
			}

			if (current.properties?.[segment]) {
				current = current.properties[segment];
				continue;
			}

			if (current.additionalProperties) {
				current = current.additionalProperties;
				continue;
			}

			return undefined;
		}

		return this.resolveRefFrom(current, schema);
	}

	private resolveRef(schemaNode: any): any {
		return this.resolveRefFrom(schemaNode, this.options.schemas);
	}

	private resolveRefFrom(schemaNode: any, rootSchema: any): any {
		if (!schemaNode?.$ref) {
			return schemaNode;
		}

		const refKey = String(schemaNode.$ref).split('/').pop();
		return refKey ? rootSchema.$defs?.[refKey] ?? schemaNode : schemaNode;
	}

	private descriptionFor(schemaNode: any, fallback: string): string {
		return this.descriptionForFrom(schemaNode, this.options.schemas, fallback);
	}

	private descriptionForFrom(schemaNode: any, rootSchema: any, fallback: string): string {
		const resolved = this.resolveRefFrom(schemaNode, rootSchema);
		return resolved?.markdownDescription ?? resolved?.description ?? fallback;
	}

	private addUniqueEntrySuggestion(
		document: vscode.TextDocument,
		position: vscode.Position,
		items: vscode.CompletionItem[],
		key: string
	): void {
		const usedKeys = getYamlSameLevelPropertiesFromText(document.getText(), position);
		this.addEntrySuggestion(items, this.uniqueKey(key, usedKeys), 'New entry.');
	}

	private uniqueKey(baseKey: string, usedKeys: string[]): string {
		let key = baseKey;
		let index = 1;
		while (usedKeys.includes(key)) {
			key = `${baseKey}_${index}`;
			index++;
		}
		return key;
	}

	private addEntrySuggestion(
		items: vscode.CompletionItem[],
		name: string,
		description: string,
		addNewLine = true,
		kind = vscode.CompletionItemKind.Property
	): void {
		const item = new vscode.CompletionItem(name, kind);
		item.detail = description;
		item.insertText = addNewLine ? `${name}:\n  ` : `${name}: `;
		items.push(item);
	}

	private addTextSuggestion(items: vscode.CompletionItem[], name: string, description: string): void {
		const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Text);
		item.detail = description;
		item.insertText = name;
		items.push(item);
	}

	private addItemTemplates(items: vscode.CompletionItem[]): void {
		for (const template of this.options.itemTemplates) {
			if (template.devMode && !this.options.getDevMode()) {
				continue;
			}

			const item = new vscode.CompletionItem(template.label, vscode.CompletionItemKind.Class);
			item.sortText = `~${template.label}`;
			item.detail = template.detail ?? template.label;
			item.insertText = YAML.stringify(template.object);
			items.push(item);
		}
	}

	private addVanillaTextureSuggestions(document: vscode.TextDocument, position: vscode.Position, items: vscode.CompletionItem[]): void {
		for (const texturePath of this.options.vanillaTexturePaths) {
			const namespacedPath = `minecraft:${texturePath}`;
			const item = new vscode.CompletionItem(namespacedPath, vscode.CompletionItemKind.File);
			item.detail = 'Vanilla texture';
			item.insertText = this.withArrayPrefix(document, position, namespacedPath);
			item.documentation = new vscode.MarkdownString(
				`\`assets/minecraft/textures/${texturePath}\`\n\n![Texture Preview](${vanillaTextureUrl(texturePath)}|width=100)`
			);
			items.push(item);
		}
	}

	private addWorkspaceAssetSuggestions(
		document: vscode.TextDocument,
		position: vscode.Position,
		items: vscode.CompletionItem[],
		kind: AssetKind
	): void {
		const namespace = this.readNamespace(document);
		if (!namespace || !this.options.assetIndex) {
			return;
		}

		const replacementRange = this.currentScalarReplacementRange(document, position);
		for (const asset of this.options.assetIndex.list(kind)) {
			const assetLabel = this.workspaceAssetLabel(asset.path, kind);
			const label = asset.namespace === namespace ? assetLabel : `${asset.namespace}:${assetLabel}`;
			const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.File);
			item.insertText = this.withArrayPrefix(document, position, label);
			if (replacementRange) {
				item.range = replacementRange;
			}
			item.documentation = this.workspaceAssetDocumentation(asset.fullPath, label, kind);
			items.push(item);
		}
	}

	private currentScalarReplacementRange(document: vscode.TextDocument, position: vscode.Position): vscode.Range | undefined {
		const line = document.lineAt(position.line).text;
		const keyValueMatch = line.match(/^(\s*[^:#][^:]*:\s*)(.*)$/);
		const arrayMatch = line.match(/^(\s*-\s+)(.*)$/);
		const prefixLength = keyValueMatch?.[1].length ?? arrayMatch?.[1].length;
		const rawValue = keyValueMatch?.[2] ?? arrayMatch?.[2];
		if (prefixLength === undefined || rawValue === undefined) {
			return undefined;
		}

		const leadingSpaces = rawValue.length - rawValue.trimStart().length;
		const startCharacter = prefixLength + leadingSpaces;
		if (position.character < startCharacter) {
			return undefined;
		}

		return new vscode.Range(position.line, startCharacter, position.line, position.character);
	}

	private workspaceAssetLabel(assetPath: string, kind: AssetKind): string {
		if (kind === 'texture') {
			return assetPath.replace(/\.png$/, '');
		}

		if (kind === 'model') {
			return assetPath.replace(/\.json$/, '');
		}

		return assetPath.replace(/\.ogg$/, '');
	}

	private workspaceAssetDocumentation(fullPath: string, assetPath: string, kind: AssetKind): vscode.MarkdownString {
		const normalizedPath = fullPath.replace(/\\/g, '/');
		const displayPath = displayWorkspacePath(normalizedPath, kind);
		if (kind !== 'texture') {
			return new vscode.MarkdownString(`\`${displayPath}\``);
		}

		return new vscode.MarkdownString(
			`Texture: \`${assetPath}\`\n\nFile: \`${displayPath}\`\n\n![Texture Preview](${vscode.Uri.file(fullPath).toString()}|width=100)`
		);
	}

	private addWorkspaceDefinitionSuggestions(
		document: vscode.TextDocument,
		position: vscode.Position,
		yamlPath: string[],
		items: vscode.CompletionItem[]
	): void {
		const namespace = this.readNamespace(document);
		if (!namespace || !this.options.assetIndex) {
			return;
		}

		const seenLabels = new Set<string>();
		for (const kind of definitionKindsForPath(yamlPath)) {
			for (const definition of this.options.assetIndex.listDefinitions(kind)) {
				const label = definition.namespace === namespace ? definition.id : `${definition.namespace}:${definition.id}`;
				if (seenLabels.has(label)) {
					continue;
				}
				seenLabels.add(label);
			const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Reference);
			item.detail = `ItemsAdder ${kind.replace('_', ' ')}`;
			item.insertText = this.withArrayPrefix(document, position, label);
			item.documentation = new vscode.MarkdownString(`\`${displayWorkspacePath(definition.fullPath)}\``);
			items.push(item);
		}
	}
	}

	private withArrayPrefix(document: vscode.TextDocument, position: vscode.Position, insertText: string): string {
		const currentLine = document.lineAt(position.line).text.trim();
		const previousLine = position.line > 0 ? document.lineAt(position.line - 1).text.trim() : '';
		if (!currentLine.includes('-') && previousLine.startsWith('-')) {
			return `- ${insertText}`;
		}

		return insertText;
	}

	private isTexturePath(yamlPath: string[]): boolean {
		const target = yamlPath[yamlPath.length - 1];
		return yamlPath[0] === 'items' &&
			(yamlPath[2] === 'resource' || yamlPath[2] === 'graphics') &&
			(target === 'texture' || target === 'textures' || target === 'icon');
	}

	private isModelPath(yamlPath: string[]): boolean {
		return yamlPath[0] === 'items' && yamlPath[2] === 'resource' && yamlPath[yamlPath.length - 1] === 'model_path';
	}

	private getEnableCustomReferenceAutocomplete(): boolean {
		return this.options.getEnableCustomReferenceAutocomplete?.() ?? true;
	}

	private readNamespace(document: vscode.TextDocument): string | undefined {
		const infoNamespace = document.getText().match(/^\s*namespace:\s*["']?([^"'\s]+)["']?/m)?.[1];
		if (infoNamespace) {
			return infoNamespace;
		}

		const pathParts = document.uri.fsPath.replace(/\\/g, '/').split('/');
		const contentsIndex = pathParts.lastIndexOf('contents');
		return contentsIndex >= 0 ? pathParts[contentsIndex + 1] : undefined;
	}

	private toDisplayName(entryId: string): string {
		return entryId.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
	}
}
