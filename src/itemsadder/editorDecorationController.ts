import * as vscode from 'vscode';
import * as YAML from 'yaml';

import { firstFramePngPath } from './animatedPngFirstFrame';
import { AssetPathResolver, AssetResolution } from './assetPathResolver';
import { findCollectionBlockRanges, findDisabledBlockRanges } from './decorationRanges';
import { findDictionaryReferenceRanges } from './dictionaryReferences';
import { EditorDiagnosticsController } from './editorDiagnosticsController';
import { findMinecraftTextColorLinePreviews, formatMinecraftTextPreviewParts } from './minecraftTextColors';
import { ItemsAdderDictionaryIndex } from './itemsAdderDictionaryIndex';
import { ProjectAssetIndex } from './projectAssetIndex';
import { vanillaTextureUrl } from './vanillaMinecraftAssets';

interface EditorDecorationControllerOptions {
	context: vscode.ExtensionContext;
	schemas: any;
	vanillaTexturePaths: string[];
	diagnostics: vscode.DiagnosticCollection;
	assetIndex?: ProjectAssetIndex;
	dictionaryIndex?: ItemsAdderDictionaryIndex;
}

interface EnumDecorationSet {
	types: Map<string, vscode.TextEditorDecorationType>;
}

interface YamlKeyEntry {
	line: number;
	indent: number;
	key: string;
	keyStart: number;
	keyEnd: number;
	parentPath: string[];
}

interface ImplicitNamespaceReference {
	line: number;
	character: number;
	value: string;
	kind: string;
}

export class EditorDecorationController {
	private readonly diagnosticsController: EditorDiagnosticsController;
	private readonly genericDecorations: vscode.TextEditorDecorationType[];
	private readonly templateDecoration: vscode.TextEditorDecorationType;
	private readonly variantDecoration: vscode.TextEditorDecorationType;
	private readonly resourceDecoration: vscode.TextEditorDecorationType;
	private readonly actionDecoration: vscode.TextEditorDecorationType;
	private readonly behaviourDecoration: vscode.TextEditorDecorationType;
	private readonly anvilRecipeDecoration: vscode.TextEditorDecorationType;
	private readonly craftingRecipeDecoration: vscode.TextEditorDecorationType;
	private readonly furnaceRecipeDecoration: vscode.TextEditorDecorationType;
	private readonly enabledDecoration: vscode.TextEditorDecorationType;
	private readonly disabledDecoration: vscode.TextEditorDecorationType;
	private readonly disabledBlockDecoration: vscode.TextEditorDecorationType;
	private readonly eventActionNameDecoration: vscode.TextEditorDecorationType;
	private readonly eventActionSuffixDecoration: vscode.TextEditorDecorationType;
	private readonly deprecatedMarkerDecoration: vscode.TextEditorDecorationType;
	private readonly materialDecorations: EnumDecorationSet;
	private readonly entityDecorations: EnumDecorationSet;
	private assetDecorations: vscode.TextEditorDecorationType[] = [];
	private alternatingDecorations: vscode.TextEditorDecorationType[] = [];
	private textColorPreviewDecorations: vscode.TextEditorDecorationType[] = [];
	private textColorOriginalDecorations: vscode.TextEditorDecorationType[] = [];
	private dictionaryFormattedPreviewDecorations: vscode.TextEditorDecorationType[] = [];
	private dictionaryFormattedOriginalDecorations: vscode.TextEditorDecorationType[] = [];
	private fontImageDecorations: vscode.TextEditorDecorationType[] = [];
	private implicitNamespaceDecorations: vscode.TextEditorDecorationType[] = [];

	constructor(private readonly options: EditorDecorationControllerOptions) {
		this.diagnosticsController = new EditorDiagnosticsController({
			extensionContext: options.context,
			vanillaTexturePaths: options.vanillaTexturePaths,
			assetIndex: options.assetIndex
		});

		this.templateDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: options.context.asAbsolutePath('images/template.png').replace(/\\/g, '/'),
			color: 'aqua'
		});
		this.variantDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: options.context.asAbsolutePath('images/variant.png').replace(/\\/g, '/'),
			color: '#B6A102'
		});
		this.resourceDecoration = vscode.window.createTextEditorDecorationType({ color: '#B6A102' });
		this.actionDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: options.context.asAbsolutePath('images/flash.png').replace(/\\/g, '/'),
			color: '#B6A102',
			gutterIconSize: 'contain'
		});
		this.behaviourDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: options.context.asAbsolutePath('images/cog.png').replace(/\\/g, '/'),
			color: '#B6A102',
			gutterIconSize: 'contain'
		});
		this.anvilRecipeDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: this.materialIconUri('anvil'),
			color: '#B6A102',
			gutterIconSize: 'contain'
		});
		this.craftingRecipeDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: this.materialIconUri('craftingTable'),
			color: '#B6A102',
			gutterIconSize: 'contain'
		});
		this.furnaceRecipeDecoration = vscode.window.createTextEditorDecorationType({
			gutterIconPath: this.materialIconUri('furnace'),
			color: '#B6A102',
			gutterIconSize: 'contain'
		});
		this.enabledDecoration = vscode.window.createTextEditorDecorationType({ color: '#20812d' });
		this.disabledDecoration = vscode.window.createTextEditorDecorationType({ color: '#444444' });
		this.disabledBlockDecoration = vscode.window.createTextEditorDecorationType({
			backgroundColor: 'rgba(0, 0, 0, 0.3)',
			opacity: '0.7',
			isWholeLine: true
		});
		this.eventActionNameDecoration = vscode.window.createTextEditorDecorationType({
			color: '#C586C0',
			fontWeight: '600'
		});
		this.eventActionSuffixDecoration = vscode.window.createTextEditorDecorationType({
			color: '#6A737D'
		});
		this.deprecatedMarkerDecoration = vscode.window.createTextEditorDecorationType({
			after: {
				contentText: ' *',
				color: '#FFD866',
				fontWeight: '700'
			}
		});

		this.genericDecorations = [
			this.templateDecoration,
			this.variantDecoration,
			this.resourceDecoration,
			this.actionDecoration,
			this.behaviourDecoration,
			this.anvilRecipeDecoration,
			this.craftingRecipeDecoration,
			this.furnaceRecipeDecoration,
			this.enabledDecoration,
			this.disabledDecoration,
			this.disabledBlockDecoration,
			this.eventActionNameDecoration,
			this.eventActionSuffixDecoration,
			this.deprecatedMarkerDecoration
		];
		this.materialDecorations = this.createMaterialDecorations(options.schemas.$defs.bukkit_materials.enum);
		this.entityDecorations = this.createEntityDecorations(options.schemas.$defs.bukkit_entity_type.enum);
	}

	public update(editor: vscode.TextEditor): void {
		const text = editor.document.getText();
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });

		this.applyRegexDecoration(editor, / template:\s*true/g, 'Template item', this.templateDecoration);
		this.applyRegexDecoration(editor, / variant_of:/g, 'Variant item', this.variantDecoration);
		this.applyRegexDecoration(editor, / resource:/g, 'The graphical part of item', this.resourceDecoration);
		this.applyRegexDecoration(editor, / events:/g, 'Events called by item', this.actionDecoration);
		this.applyRegexDecoration(editor, / behaviours:/g, 'Predefined behaviours item', this.behaviourDecoration);
		this.applyRegexDecoration(editor, /^\s*anvil_repair:/gm, 'Anvil repair recipes', this.anvilRecipeDecoration);
		this.applyRegexDecoration(editor, /^\s*crafting_table:/gm, 'Crafting table recipes', this.craftingRecipeDecoration);
		this.applyRegexDecoration(editor, /^\s*cooking:/gm, 'Furnace cooking recipes', this.furnaceRecipeDecoration);
		this.applyRegexDecoration(editor, /\btrue\b/g, 'This property **enabled**', this.enabledDecoration);
		this.applyRegexDecoration(editor, /\bfalse\b/g, 'This property is **disabled**', this.disabledDecoration);
		this.applyEnumDecorations(editor, text, 'Vanilla material', this.options.schemas.$defs.bukkit_materials.enum, this.materialDecorations);
		this.applyEnumDecorations(editor, text, 'Vanilla entity type', this.options.schemas.$defs.bukkit_entity_type.enum, this.entityDecorations);
		this.applyDisabledBlockDecorations(editor, text);
		this.applyAlternatingItemBackgrounds(editor, text);
		this.applyEventActionDecorations(editor, text);
		this.applyDeprecatedPropertyMarkers(editor, text);
		this.applyFontImagePreviews(editor, text, doc);
		this.applyImplicitNamespaceHints(editor, text, doc);
		this.applyDictionaryFormattedPreviews(editor, text);
		this.applyTextColorPreviews(editor, text);
		this.assetDecorations = this.diagnosticsController.update(doc, text, editor, this.options.diagnostics, this.assetDecorations);
	}

	public updateTextPreviews(editor: vscode.TextEditor): void {
		const text = editor.document.getText();
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		this.applyImplicitNamespaceHints(editor, text, doc);
		this.applyDictionaryFormattedPreviews(editor, text);
		this.applyTextColorPreviews(editor, text);
	}

	public clear(editor?: vscode.TextEditor): void {
		this.options.diagnostics.clear();
		this.assetDecorations.forEach(decoration => decoration.dispose());
		this.assetDecorations = [];
		this.alternatingDecorations.forEach(decoration => {
			editor?.setDecorations(decoration, []);
			decoration.dispose();
		});
		this.alternatingDecorations = [];
	this.textColorPreviewDecorations.forEach(decoration => {
		editor?.setDecorations(decoration, []);
		decoration.dispose();
	});
	this.textColorPreviewDecorations = [];
	this.textColorOriginalDecorations.forEach(decoration => {
		editor?.setDecorations(decoration, []);
		decoration.dispose();
	});
	this.textColorOriginalDecorations = [];
	this.dictionaryFormattedPreviewDecorations.forEach(decoration => {
		editor?.setDecorations(decoration, []);
		decoration.dispose();
	});
	this.dictionaryFormattedPreviewDecorations = [];
	this.dictionaryFormattedOriginalDecorations.forEach(decoration => {
		editor?.setDecorations(decoration, []);
		decoration.dispose();
	});
	this.dictionaryFormattedOriginalDecorations = [];
		this.fontImageDecorations.forEach(decoration => {
			editor?.setDecorations(decoration, []);
			decoration.dispose();
		});
		this.fontImageDecorations = [];
		this.implicitNamespaceDecorations.forEach(decoration => {
			editor?.setDecorations(decoration, []);
			decoration.dispose();
		});
		this.implicitNamespaceDecorations = [];
	}

	public dispose(): void {
		this.clear();
		this.genericDecorations.forEach(decoration => decoration.dispose());
		for (const decoration of this.materialDecorations.types.values()) {
			decoration.dispose();
		}
		for (const decoration of this.entityDecorations.types.values()) {
			decoration.dispose();
		}
	}

	private applyRegexDecoration(
		editor: vscode.TextEditor,
		regExp: RegExp,
		description: string,
		decorationType: vscode.TextEditorDecorationType
	): void {
		const text = editor.document.getText();
		const decorations: vscode.DecorationOptions[] = [];
		let match: RegExpExecArray | null;
		regExp.lastIndex = 0;

		while ((match = regExp.exec(text))) {
			decorations.push({
				range: new vscode.Range(
					editor.document.positionAt(match.index),
					editor.document.positionAt(match.index + match[0].length)
				)
			});
		}

		editor.setDecorations(decorationType, decorations);
	}

	private applyEnumDecorations(
		editor: vscode.TextEditor,
		text: string,
		description: string,
		values: string[],
		decorationSet: EnumDecorationSet
	): void {
		for (const value of values) {
			const decorationType = decorationSet.types.get(value);
			if (!decorationType) {
				continue;
			}

			const decorations: vscode.DecorationOptions[] = [];
			const regExp = new RegExp(`^(\\s*[\\w-]+\\s*:\\s*)(${this.escapeRegex(value)})\\b`, 'gmi');
			let match: RegExpExecArray | null;
			while ((match = regExp.exec(text))) {
				const startOffset = match.index + match[1].length;
				decorations.push({
				range: new vscode.Range(
					editor.document.positionAt(startOffset),
					editor.document.positionAt(startOffset + value.length)
				)
			});
			}

			editor.setDecorations(decorationType, decorations);
		}
	}

	private applyDisabledBlockDecorations(editor: vscode.TextEditor, text: string): void {
		const decorations = findDisabledBlockRanges(text).map(range => ({
			range: new vscode.Range(new vscode.Position(range.startLine, 0), new vscode.Position(range.endLine, range.endCharacter)),
			hoverMessage: '### element disabled.'
		}));
		editor.setDecorations(this.disabledBlockDecoration, decorations);
	}

	private applyAlternatingItemBackgrounds(editor: vscode.TextEditor, text: string): void {
		this.alternatingDecorations.forEach(decoration => decoration.dispose());
		this.alternatingDecorations = [];

		const isLightTheme = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Light;
		const decorationTypeA = vscode.window.createTextEditorDecorationType({
			backgroundColor: isLightTheme ? 'rgba(255, 0, 170, 0.2)' : 'rgba(255, 0, 170, 0.03)',
			isWholeLine: true
		});
		const decorationTypeB = vscode.window.createTextEditorDecorationType({
			backgroundColor: isLightTheme ? 'rgba(132, 0, 255, 0.2)' : 'rgba(0, 238, 255, 0.03)',
			isWholeLine: true
		});
		this.alternatingDecorations.push(decorationTypeA, decorationTypeB);

		const ranges = findCollectionBlockRanges(text, this.options.schemas);
		const decorationsA: vscode.DecorationOptions[] = [];
		const decorationsB: vscode.DecorationOptions[] = [];
		const lines = text.split('\n');

		ranges.forEach((range, index) => {
			const target = index % 2 === 0 ? decorationsA : decorationsB;
			for (let lineIndex = range.startLine; lineIndex < range.endLine; lineIndex++) {
				const lineText = lines[lineIndex] ?? '';
				const firstTextColumn = lineText.search(/\S/);
				target.push({
					range: new vscode.Range(
						new vscode.Position(lineIndex, firstTextColumn === -1 ? 0 : firstTextColumn),
						new vscode.Position(lineIndex, lineText.length)
					)
				});
			}
		});

		editor.setDecorations(decorationTypeA, decorationsA);
		editor.setDecorations(decorationTypeB, decorationsB);
	}

	private applyEventActionDecorations(editor: vscode.TextEditor, text: string): void {
		const actionNames = this.eventActionNames();
		const actionNameDecorations: vscode.DecorationOptions[] = [];
		const actionSuffixDecorations: vscode.DecorationOptions[] = [];

		for (const entry of this.yamlKeyEntries(text)) {
			if (!entry.parentPath.includes('events') || entry.parentPath.some(parent => this.actionBaseFor(parent, actionNames))) {
				continue;
			}

			const actionBase = this.actionBaseFor(entry.key, actionNames);
			if (!actionBase) {
				continue;
			}

			actionNameDecorations.push({
				range: new vscode.Range(
					new vscode.Position(entry.line, entry.keyStart),
					new vscode.Position(entry.line, entry.keyStart + actionBase.length)
				),
				hoverMessage: `ItemsAdder action: \`${actionBase}\``
			});

			if (entry.key.length > actionBase.length) {
				actionSuffixDecorations.push({
					range: new vscode.Range(
						new vscode.Position(entry.line, entry.keyStart + actionBase.length),
						new vscode.Position(entry.line, entry.keyEnd)
					),
					hoverMessage: 'Action identifier suffix'
				});
			}
		}

		editor.setDecorations(this.eventActionNameDecoration, actionNameDecorations);
		editor.setDecorations(this.eventActionSuffixDecoration, actionSuffixDecorations);
	}

	private applyDeprecatedPropertyMarkers(editor: vscode.TextEditor, text: string): void {
		const decorations: vscode.DecorationOptions[] = [];
		for (const entry of this.yamlKeyEntries(text)) {
			const schemaNode = this.schemaNodeAtPath([...entry.parentPath, entry.key]);
			if (!schemaNode?.deprecated) {
				continue;
			}

			decorations.push({
				range: new vscode.Range(
					new vscode.Position(entry.line, entry.keyStart),
					new vscode.Position(entry.line, entry.keyEnd)
				)
			});
		}

		editor.setDecorations(this.deprecatedMarkerDecoration, decorations);
	}

	private applyFontImagePreviews(editor: vscode.TextEditor, text: string, doc: YAML.Document.Parsed<YAML.ParsedNode, true>): void {
		this.fontImageDecorations.forEach(decoration => decoration.dispose());
		this.fontImageDecorations = [];

		const namespace = this.readNamespace(doc);
		if (!namespace || editor.document.uri.scheme !== 'file') {
			return;
		}

		const resolver = new AssetPathResolver({
			workspaceFolders: vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath) ?? [],
			documentPath: editor.document.uri.fsPath,
			fileNamespace: namespace,
			vanillaTexturePaths: this.options.vanillaTexturePaths,
			assetIndex: this.options.assetIndex
		});
		const lines = text.split('\n');

		for (const entry of this.yamlKeyEntries(text)) {
			if (entry.key !== 'path' || entry.parentPath.length !== 2 || entry.parentPath[0] !== 'font_images') {
				continue;
			}

			const scalar = this.readScalarValue(lines[entry.line] ?? '', entry.keyEnd);
			if (!scalar) {
				continue;
			}

			const resolution = resolver.resolveTexture(scalar.value);
			const decorationType = vscode.window.createTextEditorDecorationType({
				gutterIconPath: this.fontImageGutterIcon(resolution),
				gutterIconSize: 'contain'
			});
			this.fontImageDecorations.push(decorationType);
			editor.setDecorations(decorationType, [{
				range: new vscode.Range(
					new vscode.Position(entry.line, scalar.startCharacter),
					new vscode.Position(entry.line, scalar.endCharacter)
				),
				hoverMessage: this.assetHoverMessage(
					resolution.assetPath,
					resolution.found ? 'Font image preview' : 'Font image not found'
				)
			}]);
		}
	}

	private applyImplicitNamespaceHints(editor: vscode.TextEditor, text: string, doc: YAML.Document.Parsed<YAML.ParsedNode, true>): void {
		this.implicitNamespaceDecorations.forEach(decoration => decoration.dispose());
		this.implicitNamespaceDecorations = [];

		const namespace = this.readNamespace(doc);
		if (!namespace) {
			return;
		}

		const references = this.findImplicitNamespaceReferences(text)
			.filter(reference => !this.isSelectionOnLine(editor, reference.line));
		if (references.length === 0) {
			return;
		}

		const decorationType = vscode.window.createTextEditorDecorationType({
			before: {
				contentText: `${namespace}:`,
				color: '#6A9955',
				fontStyle: 'italic'
			}
		});
		this.implicitNamespaceDecorations.push(decorationType);

		editor.setDecorations(decorationType, references.map(reference => {
			const position = new vscode.Position(reference.line, reference.character);
			return {
				range: new vscode.Range(position, position),
				hoverMessage: `Implicit ${reference.kind} namespace: \`${namespace}:${reference.value}\``
			};
		}));
	}

	private findImplicitNamespaceReferences(text: string): ImplicitNamespaceReference[] {
		const entries = this.yamlKeyEntries(text);
		const lines = text.split('\n');
		const references: ImplicitNamespaceReference[] = [];

		for (const entry of entries) {
			const kind = this.implicitNamespaceKindForScalar(entry);
			if (!kind) {
				continue;
			}

			const scalar = this.readScalarValue(lines[entry.line] ?? '', entry.keyEnd);
			if (!scalar || !this.isImplicitNamespaceValue(scalar.value)) {
				continue;
			}

			references.push({
				line: entry.line,
				character: this.scalarContentStart(lines[entry.line] ?? '', scalar.startCharacter),
				value: scalar.value,
				kind
			});
		}

		lines.forEach((lineText, line) => {
			const scalar = this.readSequenceScalarValue(lineText);
			if (!scalar || !this.isImplicitNamespaceValue(scalar.value)) {
				return;
			}

			const parentPath = this.parentPathForSequenceItem(entries, line, scalar.indent);
			const kind = this.implicitNamespaceKindForSequence(parentPath);
			if (!kind) {
				return;
			}

			references.push({
				line,
				character: scalar.startCharacter,
				value: scalar.value,
				kind
			});
		});

		return references;
	}

	private implicitNamespaceKindForScalar(entry: YamlKeyEntry): string | undefined {
		const schemaKind = this.implicitNamespaceKindForPath([...entry.parentPath, entry.key]);
		if (schemaKind) {
			return schemaKind;
		}

		const parent = entry.parentPath[entry.parentPath.length - 1];
		const key = entry.key;

		if (key === 'path' && entry.parentPath[0] === 'sounds') {
			return 'sound';
		}
		if (key === 'path' && entry.parentPath[0] === 'font_images') {
			return 'texture';
		}
		if (key === 'texture' || key === 'icon' || parent === 'textures') {
			return 'texture';
		}
		if (key === 'model' || key === 'model_path' || parent === 'models') {
			return 'model';
		}
		if (key === 'sound' || key === 'play_sound' || key.endsWith('_sound') || (key === 'song' && parent === 'jukebox_disc') || parent === 'sounds') {
			return 'sound';
		}
		if (key === 'item' || key === 'itemstack' || key === 'ingredient' || key === 'result' || key === 'drop' || parent === 'items') {
			return 'item';
		}
		if (key === 'block' || key === 'from' || key === 'to' || parent === 'blocks') {
			return 'block';
		}

		return undefined;
	}

	private implicitNamespaceKindForSequence(parentPath: string[]): string | undefined {
		const parent = parentPath[parentPath.length - 1];
		const schemaKind = this.implicitNamespaceKindForSequencePath(parentPath);
		if (schemaKind) {
			return schemaKind;
		}

		if (parent === 'textures') {
			return 'texture';
		}
		if (parent === 'models') {
			return 'model';
		}
		if (parent === 'sounds') {
			return 'sound';
		}
		if (parent === 'items') {
			return 'item';
		}
		if (parent === 'blocks') {
			return 'block';
		}
		return undefined;
	}

	private implicitNamespaceKindForPath(path: string[]): string | undefined {
		return this.implicitNamespaceKindForSchema(this.schemaNodeAtPath(path), path[path.length - 1], path);
	}

	private implicitNamespaceKindForSequencePath(parentPath: string[]): string | undefined {
		const parentSchema = this.schemaNodeAtPath(parentPath);
		return this.implicitNamespaceKindForSchema(parentSchema?.items ?? parentSchema, parentPath[parentPath.length - 1], parentPath);
	}

	private implicitNamespaceKindForSchema(schemaNode: any, key: string | undefined, path: string[]): string | undefined {
		const schema = this.resolveSchemaRef(schemaNode);
		if (!schema) {
			return undefined;
		}

		const id = String(schema.$id ?? '').toLowerCase();
		const keyName = String(key ?? '').toLowerCase();
		const text = [
			schema.title,
			schema.markdownDescription,
			schema.description,
			schema.detail
		].filter(Boolean).join('\n').toLowerCase();

		if (id === 'bukkit_materials_and_customitems') {
			return 'item';
		}
		if (id === 'bukkit_and_custom_blocks') {
			return 'block';
		}
		if (id === 'vanilla_and_custom_sound') {
			return 'sound';
		}
		if (id === 'custom_and_bukkit_entity_type') {
			return 'entity';
		}

		if (text.includes('custom itemsadder block') || text.includes('vanilla/custom blocks')) {
			return 'block';
		}
		if (text.includes('itemsadder custom item') || text.includes('custom item or vanilla material')) {
			return 'item';
		}
		if (text.includes('custom entity') && (keyName === 'entity' || keyName === 'type' || keyName.endsWith('_entity'))) {
			return 'entity';
		}
		if ((keyName === 'texture' || keyName === 'textures' || keyName === 'icon' || keyName.endsWith('_texture')) && text.includes('texture')) {
			return 'texture';
		}
		if ((keyName === 'model' || keyName === 'models' || keyName === 'model_path' || keyName.endsWith('_model')) && text.includes('model')) {
			return 'model';
		}
		if (
			(keyName === 'sound' || keyName === 'name' || keyName === 'song' || keyName === 'play_sound' || keyName.endsWith('_sound')) &&
			(text.includes('custom sound') || text.includes('vanilla sound') || text.includes('sound played') || text.includes('declared in the `sounds` section'))
		) {
			return 'sound';
		}
		if (keyName === 'song' && (text.includes('namespaced id') || path.includes('jukebox_disc'))) {
			return 'sound';
		}

		return undefined;
	}

	private isImplicitNamespaceValue(value: string): boolean {
		if (!value || value.includes(':')) {
			return false;
		}
		if (/^(https?|file|command):/i.test(value) || value.startsWith('/') || value.startsWith('<')) {
			return false;
		}
		if (/\s|\\/.test(value)) {
			return false;
		}

		return !/^[A-Z0-9_]+$/.test(value);
	}

	private scalarContentStart(line: string, startCharacter: number): number {
		const quote = line[startCharacter];
		return quote === '"' || quote === "'" ? startCharacter + 1 : startCharacter;
	}

	private readSequenceScalarValue(line: string): { indent: number; startCharacter: number; value: string } | undefined {
		const match = line.match(/^(\s*)-\s*/);
		if (!match) {
			return undefined;
		}

		const indent = match[1].length;
		const rawStart = match[0].length;
		if (rawStart >= line.length) {
			return undefined;
		}

		const quote = line[rawStart];
		if (quote === '"' || quote === "'") {
			const end = line.indexOf(quote, rawStart + 1);
			if (end === -1) {
				return undefined;
			}
			return {
				indent,
				startCharacter: rawStart + 1,
				value: line.slice(rawStart + 1, end)
			};
		}

		const commentStart = line.indexOf(' #', rawStart);
		const end = commentStart === -1 ? line.length : commentStart;
		const valueEnd = line.slice(0, end).trimEnd().length;
		const value = line.slice(rawStart, valueEnd).trim();
		return value
			? { indent, startCharacter: rawStart, value }
			: undefined;
	}

	private parentPathForSequenceItem(entries: YamlKeyEntry[], line: number, indent: number): string[] {
		let parent: YamlKeyEntry | undefined;
		for (const entry of entries) {
			if (entry.line >= line) {
				break;
			}
			if (entry.indent <= indent) {
				parent = entry;
			}
		}

		return parent ? [...parent.parentPath, parent.key] : [];
	}

	private isSelectionOnLine(editor: vscode.TextEditor, line: number): boolean {
		return editor.selections.some(selection => selection.active.line === line);
	}

	private applyDictionaryFormattedPreviews(editor: vscode.TextEditor, text: string): void {
		this.dictionaryFormattedPreviewDecorations.forEach(decoration => decoration.dispose());
		this.dictionaryFormattedPreviewDecorations = [];
		this.dictionaryFormattedOriginalDecorations.forEach(decoration => decoration.dispose());
		this.dictionaryFormattedOriginalDecorations = [];

		if (!this.options.dictionaryIndex) {
			return;
		}

		const previewGroups = new Map<string, vscode.DecorationOptions[]>();
		const hiddenOriginals: vscode.Range[] = [];
		for (const reference of findDictionaryReferenceRanges(text)) {
			const entry = reference.kind === 'minecraft_lang'
				? this.options.dictionaryIndex.lookupMinecraftLang(reference.key)
				: this.options.dictionaryIndex.lookup(reference.key);
			if (!entry) {
				continue;
			}

			const parts = formatMinecraftTextPreviewParts(entry.value);
			if (parts.length === 0) {
				continue;
			}
			const isActive = this.isSelectionInPreviewContext(editor, text, reference.line, reference.startCharacter, reference.endCharacter);
			const shouldReplaceOriginal = !isActive;
			const previewCharacter = shouldReplaceOriginal ? reference.startCharacter : reference.endCharacter;
			if (shouldReplaceOriginal) {
				hiddenOriginals.push(new vscode.Range(
					new vscode.Position(reference.line, reference.startCharacter),
					new vscode.Position(reference.line, reference.endCharacter)
				));
			}

			parts.forEach((part, index) => {
				const contentText = `${!shouldReplaceOriginal && index === 0 ? '    ' : ''}${part.text}`;
				if (!contentText) {
					return;
				}
				const key = JSON.stringify({
					contentText,
					color: part.color,
					bold: part.bold,
					italic: part.italic
				});
				const decorations = previewGroups.get(key) ?? [];
				const hover = new vscode.MarkdownString(undefined, true);
				hover.isTrusted = true;
				hover.appendMarkdown(`${reference.kind === 'minecraft_lang' ? 'Minecraft lang' : 'Dictionary'} key \`${reference.key}\``);
				if (entry.sourcePath) {
					const args = encodeURIComponent(JSON.stringify([entry.sourcePath]));
					hover.appendMarkdown(`\n\n[Open translation source](command:ia-vscode.openTranslationSource?${args})`);
				}
				decorations.push({
					range: new vscode.Range(
						new vscode.Position(reference.line, previewCharacter),
						new vscode.Position(reference.line, previewCharacter)
					),
					hoverMessage: hover
				});
				previewGroups.set(key, decorations);
			});
		}

		if (hiddenOriginals.length > 0) {
			const hiddenDecorationType = vscode.window.createTextEditorDecorationType({
				color: 'transparent',
				opacity: '0'
			});
			this.dictionaryFormattedOriginalDecorations.push(hiddenDecorationType);
			editor.setDecorations(hiddenDecorationType, hiddenOriginals);
		}

		for (const [key, decorations] of previewGroups) {
			const options = JSON.parse(key) as { contentText: string; color: string; bold: boolean; italic: boolean };
			const decorationType = vscode.window.createTextEditorDecorationType({
				after: {
					contentText: options.contentText,
					color: options.color,
					fontStyle: options.italic ? 'italic' : undefined,
					fontWeight: options.bold ? 'bold' : undefined
				}
			});
			this.dictionaryFormattedPreviewDecorations.push(decorationType);
			editor.setDecorations(decorationType, decorations);
		}
	}

	private applyTextColorPreviews(editor: vscode.TextEditor, text: string): void {
		this.textColorPreviewDecorations.forEach(decoration => decoration.dispose());
		this.textColorPreviewDecorations = [];
		this.textColorOriginalDecorations.forEach(decoration => decoration.dispose());
		this.textColorOriginalDecorations = [];

		const previewGroups = new Map<string, vscode.DecorationOptions[]>();
		const hiddenOriginals: vscode.Range[] = [];
		for (const preview of findMinecraftTextColorLinePreviews(text)) {
			if (this.hasResolvedDictionaryPreview(text, preview)) {
				continue;
			}

			const isActive = this.isSelectionInPreviewContext(editor, text, preview.line, preview.startCharacter, preview.endCharacter);
			const previewCharacter = isActive ? preview.character : preview.startCharacter;
			if (!isActive) {
				hiddenOriginals.push(new vscode.Range(
					new vscode.Position(preview.line, preview.startCharacter),
					new vscode.Position(preview.line, preview.endCharacter)
				));
			}

			preview.parts.forEach((part, index) => {
				const contentText = `${isActive && index === 0 ? '    ' : ''}${part.text}`;
				const key = JSON.stringify({
					contentText,
					color: part.color,
					bold: part.bold,
					italic: part.italic
				});
				const decorations = previewGroups.get(key) ?? [];
				decorations.push({
					range: new vscode.Range(
						new vscode.Position(preview.line, previewCharacter),
						new vscode.Position(preview.line, previewCharacter)
					),
					hoverMessage: 'Minecraft formatted text preview'
				});
				previewGroups.set(key, decorations);
			});
		}

		if (hiddenOriginals.length > 0) {
			const hiddenDecorationType = vscode.window.createTextEditorDecorationType({
				color: 'transparent',
				opacity: '0'
			});
			this.textColorOriginalDecorations.push(hiddenDecorationType);
			editor.setDecorations(hiddenDecorationType, hiddenOriginals);
		}

		for (const [key, decorations] of previewGroups) {
			const options = JSON.parse(key) as { contentText: string; color: string; bold: boolean; italic: boolean };
			const decorationType = vscode.window.createTextEditorDecorationType({
				after: {
					contentText: options.contentText,
					color: options.color,
					fontStyle: options.italic ? 'italic' : undefined,
					fontWeight: options.bold ? 'bold' : undefined
				}
			});
			this.textColorPreviewDecorations.push(decorationType);
			editor.setDecorations(decorationType, decorations);
		}
	}

	private isSelectionInPreviewContext(
		editor: vscode.TextEditor,
		text: string,
		line: number,
		startCharacter: number,
		endCharacter: number
	): boolean {
		const active = editor.selection.active;
		if (active.line === line && active.character >= startCharacter && active.character <= endCharacter) {
			return true;
		}

		const lines = text.split('\n');
		const parentBlock = this.closestParentBlock(lines, line);
		return parentBlock
			? active.line >= parentBlock.startLine && active.line <= parentBlock.endLine
			: active.line === line;
	}

	private hasResolvedDictionaryPreview(text: string, preview: { line: number; startCharacter: number; endCharacter: number }): boolean {
		if (!this.options.dictionaryIndex) {
			return false;
		}

		return findDictionaryReferenceRanges(text).some(reference => {
			if (
				reference.line !== preview.line ||
				reference.startCharacter !== preview.startCharacter ||
				reference.endCharacter !== preview.endCharacter
			) {
				return false;
			}

			return Boolean(reference.kind === 'minecraft_lang'
				? this.options.dictionaryIndex?.lookupMinecraftLang(reference.key)
				: this.options.dictionaryIndex?.lookup(reference.key));
		});
	}

	private closestParentBlock(lines: string[], line: number): { startLine: number; endLine: number } | undefined {
		const childIndent = this.lineIndent(lines[line] ?? '');
		for (let parentLine = line - 1; parentLine >= 0; parentLine--) {
			const parentText = lines[parentLine] ?? '';
			const trimmed = parentText.trim();
			if (!trimmed) {
				continue;
			}

			const parentIndent = this.lineIndent(parentText);
			if (parentIndent < childIndent && trimmed.endsWith(':')) {
				return {
					startLine: parentLine,
					endLine: this.blockEndLine(lines, parentLine, parentIndent)
				};
			}
		}

		return undefined;
	}

	private blockEndLine(lines: string[], startLine: number, blockIndent: number): number {
		for (let line = startLine + 1; line < lines.length; line++) {
			const text = lines[line] ?? '';
			if (!text.trim()) {
				continue;
			}

			if (this.lineIndent(text) <= blockIndent) {
				return line - 1;
			}
		}

		return lines.length - 1;
	}

	private lineIndent(text: string): number {
		return text.match(/^\s*/)?.[0].length ?? 0;
	}

	private readNamespace(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): string | undefined {
		const infoNode = doc.get('info', true);
		if (!YAML.isMap(infoNode)) {
			return undefined;
		}

		const namespaceNode = infoNode.get('namespace', true);
		if (YAML.isScalar(namespaceNode) && typeof namespaceNode.value === 'string') {
			return namespaceNode.value;
		}

		return typeof namespaceNode === 'string' ? namespaceNode : undefined;
	}

	private readScalarValue(line: string, keyEnd: number): { startCharacter: number; endCharacter: number; value: string } | undefined {
		const colon = line.indexOf(':', keyEnd);
		if (colon === -1) {
			return undefined;
		}

		let start = colon + 1;
		while (start < line.length && /\s/.test(line[start])) {
			start++;
		}

		if (start >= line.length) {
			return undefined;
		}

		const quote = line[start];
		if (quote === '"' || quote === "'") {
			const end = line.indexOf(quote, start + 1);
			if (end === -1) {
				return undefined;
			}
			return {
				startCharacter: start,
				endCharacter: end + 1,
				value: line.slice(start + 1, end)
			};
		}

		const commentStart = line.indexOf(' #', start);
		const end = commentStart === -1 ? line.length : commentStart;
		const valueEnd = line.slice(0, end).trimEnd().length;
		const value = line.slice(start, valueEnd).trim();
		return value
			? { startCharacter: start, endCharacter: valueEnd, value }
			: undefined;
	}

	private fontImageGutterIcon(resolution: AssetResolution): vscode.Uri {
		if (!resolution.found || !resolution.assetPath) {
			return vscode.Uri.file(this.options.context.asAbsolutePath('images/missing.png').replace(/\\/g, '/'));
		}

		return vscode.Uri.file(firstFramePngPath(
			resolution.assetPath,
			this.options.context.globalStorageUri.fsPath
		));
	}

	private assetHoverMessage(assetPath: string | undefined, title: string): vscode.MarkdownString {
		const markdown = new vscode.MarkdownString(undefined, true);
		markdown.isTrusted = true;
		markdown.appendMarkdown(title);
		if (assetPath) {
			markdown.appendMarkdown(`\n\nFound file: \`${assetPath}\``);
			const args = encodeURIComponent(JSON.stringify([assetPath]));
			markdown.appendMarkdown(`\n\n[Open asset source](command:ia-vscode.openAssetSource?${args})`);
		}
		return markdown;
	}

	private yamlKeyEntries(text: string): YamlKeyEntry[] {
		const entries: YamlKeyEntry[] = [];
		const parents: { indent: number; key: string }[] = [];
		const lines = text.split('\n');

		lines.forEach((lineText, line) => {
			if (/^\s*-\s+/.test(lineText)) {
				return;
			}

			const match = lineText.match(/^(\s*)([^:#][^:]*):/);
			if (!match) {
				return;
			}

			const indent = match[1].length;
			const key = match[2].trimEnd();
			while (parents.length > 0 && parents[parents.length - 1].indent >= indent) {
				parents.pop();
			}

			entries.push({
				line,
				indent,
				key,
				keyStart: indent,
				keyEnd: indent + key.length,
				parentPath: parents.map(parent => parent.key)
			});
			parents.push({ indent, key });
		});

		return entries;
	}

	private eventActionNames(): string[] {
		return Object.keys(this.options.schemas.$defs?.actions?.properties ?? {})
			.sort((left, right) => right.length - left.length);
	}

	private actionBaseFor(key: string, actionNames: string[]): string | undefined {
		return actionNames.find(actionName => key === actionName || key.startsWith(`${actionName}_`));
	}

	private schemaNodeAtPath(path: string[]): any | undefined {
		let current = this.resolveSchemaRef(this.options.schemas);
		for (const segment of path) {
			current = this.resolveSchemaRef(current);
			if (!current) {
				return undefined;
			}

			if (current.properties?.[segment]) {
				current = current.properties[segment];
				continue;
			}

			const patternSchema = this.patternSchemaFor(current, segment);
			if (patternSchema) {
				current = patternSchema;
				continue;
			}

			if (current.additionalProperties) {
				current = current.additionalProperties;
				continue;
			}

			if (current.items) {
				current = current.items;
				continue;
			}

			return undefined;
		}

		return this.resolveSchemaRef(current);
	}

	private patternSchemaFor(schemaNode: any, segment: string): any | undefined {
		const patterns = schemaNode?.patternProperties;
		if (!patterns) {
			return undefined;
		}

		for (const [pattern, value] of Object.entries(patterns)) {
			if (new RegExp(pattern).test(segment)) {
				return value;
			}
		}

		return undefined;
	}

	private resolveSchemaRef(schemaNode: any): any {
		if (!schemaNode?.$ref) {
			return schemaNode;
		}

		const refKey = String(schemaNode.$ref).split('/').pop();
		return refKey ? this.options.schemas.$defs?.[refKey] ?? schemaNode : schemaNode;
	}

	private materialIconUri(name: string): vscode.Uri {
		const textureByMaterial: Record<string, string> = {
			anvil: 'block/anvil_top.png',
			craftingTable: 'block/crafting_table_top.png',
			furnace: 'block/furnace_front.png'
		};
		return vscode.Uri.parse(vanillaTextureUrl(textureByMaterial[name]));
	}

	private createMaterialDecorations(materials: string[]): EnumDecorationSet {
		return this.createEnumDecorations(materials, '#886c99', value => {
			const fileName = value.toLowerCase().replace(/_/g, '-');
			return vscode.Uri.parse(`https://raw.githubusercontent.com/LoneDev6/crafting-icons/master/32/${fileName}/${fileName}.png`);
		});
	}

	private createEntityDecorations(entities: string[]): EnumDecorationSet {
		return this.createEnumDecorations(entities, '#886c99', value =>
			vscode.Uri.parse(`https://raw.githubusercontent.com/LoneDev6/mc-entities-icons/master/icons/${value}.gif`)
		);
	}

	private createEnumDecorations(
		values: string[],
		color: string,
		iconUriForValue?: (value: string) => vscode.Uri
	): EnumDecorationSet {
		const types = new Map<string, vscode.TextEditorDecorationType>();
		for (const value of values) {
			types.set(value, vscode.window.createTextEditorDecorationType({
				color,
				gutterIconPath: iconUriForValue?.(value),
				gutterIconSize: iconUriForValue ? 'contain' : undefined,
				overviewRulerColor: iconUriForValue ? 'blue' : undefined,
				overviewRulerLane: iconUriForValue ? vscode.OverviewRulerLane.Right : undefined
			}));
		}
		return { types };
	}

	private escapeRegex(value: string): string {
		return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
}
