import * as YAML from 'yaml';

import { AssetPathResolver, AssetResolution } from './assetPathResolver';
import { ScriptPathResolver } from './scriptPathResolver';

export type ItemsAdderDiagnosticSeverity = 'error' | 'warning';

export interface TextRange {
	start: number;
	end: number;
}

export interface ItemsAdderDiagnosticIssue {
	range: TextRange;
	message: string;
	severity: ItemsAdderDiagnosticSeverity;
}

export interface ItemsAdderAssetDecoration {
	range: TextRange;
	resolution?: AssetResolution;
	missing: boolean;
}

export interface ItemsAdderDiagnosticsResult {
	issues: ItemsAdderDiagnosticIssue[];
	assetDecorations: ItemsAdderAssetDecoration[];
}

export interface ItemsAdderDiagnosticsOptions {
	isDocumentDirty: boolean;
	assetResolver?: AssetPathResolver;
	scriptResolver?: ScriptPathResolver;
	expectedNamespace?: string;
}

export class ItemsAdderDiagnosticsProvider {
	public collect(doc: YAML.Document.Parsed<YAML.ParsedNode, true>, text: string, options: ItemsAdderDiagnosticsOptions): ItemsAdderDiagnosticsResult {
		const issues: ItemsAdderDiagnosticIssue[] = [];
		const assetDecorations: ItemsAdderAssetDecoration[] = [];
		const fileNamespace = this.getNamespace(doc);

		if (!fileNamespace) {
			return { issues, assetDecorations };
		}
		this.collectNamespaceIssues(doc, fileNamespace, issues, options);

		const itemsNode = doc.get('items', true);
		if (itemsNode && YAML.isCollection(itemsNode)) {
			for (const pair of itemsNode.items) {
				if (!YAML.isPair(pair) || !YAML.isMap(pair.value)) {
					continue;
				}

				this.collectItemIssues(pair.value, issues, assetDecorations, options);
			}
		}

		const entitiesNode = doc.get('entities', true);
		if (entitiesNode && YAML.isCollection(entitiesNode)) {
			for (const pair of entitiesNode.items) {
				if (!YAML.isPair(pair) || !YAML.isMap(pair.value)) {
					continue;
				}

				this.collectScriptIssues(pair.value.get('script', true), issues, options);
			}
		}

		this.collectFlowIssues(text, issues);
		return { issues, assetDecorations };
	}

	private collectItemIssues(
		itemNode: YAML.YAMLMap,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		const resourceNode = itemNode.get('resource', true);
		const graphicsNode = itemNode.get('graphics', true);
		const hasGraphics = itemNode.has('graphics');
		const hasResource = itemNode.has('resource');

		if (hasGraphics && hasResource) {
			this.pushNodeIssue(issues, YAML.isMap(resourceNode) ? resourceNode : itemNode, 'Use either `resource` or `graphics` property, not both.', 'error');
		}

		if (resourceNode && YAML.isMap(resourceNode)) {
			this.collectResourceIssues(itemNode, resourceNode, issues, assetDecorations, options);
		}

		if (graphicsNode && YAML.isMap(graphicsNode)) {
			this.collectGraphicsIssues(graphicsNode, issues, assetDecorations, options);
		}

		this.collectItemModelIssues(itemNode.get('item_model', true), issues, assetDecorations, options);
	}

	private collectResourceIssues(
		itemNode: YAML.YAMLMap,
		resourceNode: YAML.YAMLMap,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		const hasTexture = resourceNode.has('texture');
		const hasTextures = resourceNode.has('textures');
		const hasModelPath = resourceNode.has('model_path');

		if (hasTexture && hasTextures) {
			this.pushNodeIssue(issues, resourceNode, 'Use either `texture` or `textures` property, not both.', 'error');
		}

		if (hasModelPath && (hasTexture || hasTextures)) {
			this.pushNodeIssue(issues, resourceNode, 'Do not use `texture` or `textures` property when `model_path` is specified.', 'error');
		}

		if (this.isScalarValue(resourceNode.get('generate', true), true) && hasModelPath) {
			this.pushNodeIssue(issues, resourceNode.get('model_path', true), 'Set `generate: false` to use `model_path`.', 'error');
		}

		if (this.isScalarValue(resourceNode.get('generate', true), true) && !hasTexture && !hasTextures) {
			this.pushNodeIssue(issues, resourceNode, '`generate: true` requires `texture` or `textures` property.', 'error');
		}

		const specificPropertiesNode = itemNode.get('specific_properties', true);
		const armorNode = YAML.isMap(specificPropertiesNode) ? specificPropertiesNode.get('armor', true) : undefined;
		if (!resourceNode.has('material') && !armorNode) {
			this.pushNodeIssue(issues, resourceNode, 'Missing `material` property!', 'error');
		}

		this.collectAssetIssues(resourceNode, issues, assetDecorations, options);
		this.collectScriptIssues(itemNode.get('script', true), issues, options);
	}

	private collectGraphicsIssues(
		graphicsNode: YAML.YAMLMap,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		const sourceKeys = ['model', 'models', 'texture', 'textures'].filter(key => graphicsNode.has(key));
		if (sourceKeys.length > 1) {
			this.pushNodeIssue(issues, graphicsNode, 'Use exactly one graphics source: `model`, `models`, `texture`, or `textures`.', 'error');
		}

		if (graphicsNode.has('parent') && (graphicsNode.has('model') || graphicsNode.has('models'))) {
			this.pushNodeIssue(issues, graphicsNode.get('parent', true), '`graphics.parent` is allowed only with `graphics.texture` or `graphics.textures`.', 'error');
		}

		if (!options.assetResolver?.isDocumentInWorkspace()) {
			return;
		}

		const severity: ItemsAdderDiagnosticSeverity = options.isDocumentDirty ? 'warning' : 'error';
		this.checkModelNode(graphicsNode.get('model', true), issues, assetDecorations, severity, options.assetResolver);
		this.checkTextureNode(graphicsNode.get('texture', true), issues, assetDecorations, severity, options.assetResolver);
		this.checkTextureNode(graphicsNode.get('icon', true), issues, assetDecorations, severity, options.assetResolver);
		this.checkModelMap(graphicsNode.get('models', true), issues, assetDecorations, severity, options.assetResolver);
		this.checkTextureMap(graphicsNode.get('textures', true), issues, assetDecorations, severity, options.assetResolver);
	}

	private collectItemModelIssues(
		itemModelNode: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		if (!options.assetResolver?.isDocumentInWorkspace()) {
			return;
		}

		const severity: ItemsAdderDiagnosticSeverity = options.isDocumentDirty ? 'warning' : 'error';
		this.checkModelNode(itemModelNode, issues, assetDecorations, severity, options.assetResolver);
	}

	private collectAssetIssues(
		resourceNode: YAML.YAMLMap,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		if (!options.assetResolver?.isDocumentInWorkspace()) {
			return;
		}

		const severity: ItemsAdderDiagnosticSeverity = options.isDocumentDirty ? 'warning' : 'error';
		this.checkTextureNode(resourceNode.get('texture', true), issues, assetDecorations, severity, options.assetResolver);
		this.checkTextureNode(resourceNode.get('icon', true), issues, assetDecorations, severity, options.assetResolver);

		const texturesNode = resourceNode.get('textures', true);
		if (texturesNode && YAML.isSeq(texturesNode)) {
			for (const item of texturesNode.items) {
				this.checkTextureNode(item, issues, assetDecorations, severity, options.assetResolver);
			}
		}

		this.checkModelNode(resourceNode.get('model_path', true), issues, assetDecorations, severity, options.assetResolver);
	}

	private collectScriptIssues(
		scriptNode: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		if (!options.scriptResolver?.isDocumentInWorkspace() || !YAML.isMap(scriptNode)) {
			return;
		}

		if (this.isScalarValue(scriptNode.get('enabled', true), false)) {
			return;
		}

		const pathNode = scriptNode.get('path', true);
		const range = this.getNodeRange(pathNode);
		if (!range || !YAML.isScalar(pathNode) || typeof pathNode.value !== 'string') {
			return;
		}

		const resolution = options.scriptResolver.resolve(pathNode.value);
		if (!resolution.found) {
			issues.push({
				range,
				message: 'Script file not found. Expected a `.jspp` or `.java` file in this namespace.',
				severity: options.isDocumentDirty ? 'warning' : 'error'
			});
		}
	}

	private checkTextureNode(
		node: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		severity: ItemsAdderDiagnosticSeverity,
		assetResolver: AssetPathResolver
	): void {
		const range = this.getNodeRange(node);
		if (!range || !YAML.isScalar(node) || typeof node.value !== 'string') {
			return;
		}

		const resolution = assetResolver.resolveTexture(node.value);
		if (!resolution.found) {
			issues.push({ range, message: 'Texture not found!', severity });
		}

		assetDecorations.push({ range, resolution, missing: !resolution.found });
	}

	private checkModelNode(
		node: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		severity: ItemsAdderDiagnosticSeverity,
		assetResolver: AssetPathResolver
	): void {
		const range = this.getNodeRange(node);
		if (!range || !YAML.isScalar(node) || typeof node.value !== 'string') {
			return;
		}

		const resolution = assetResolver.resolveModel(node.value);
		if (resolution.skipped) {
			return;
		}

		if (!resolution.found) {
			issues.push({ range, message: 'Model not found!', severity });
		}

		assetDecorations.push({ range, resolution, missing: !resolution.found });
	}

	private checkTextureMap(
		node: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		severity: ItemsAdderDiagnosticSeverity,
		assetResolver: AssetPathResolver
	): void {
		this.checkAssetMap(node, issues, assetDecorations, severity, assetResolver, 'texture');
	}

	private checkModelMap(
		node: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		severity: ItemsAdderDiagnosticSeverity,
		assetResolver: AssetPathResolver
	): void {
		this.checkAssetMap(node, issues, assetDecorations, severity, assetResolver, 'model');
	}

	private checkAssetMap(
		node: unknown,
		issues: ItemsAdderDiagnosticIssue[],
		assetDecorations: ItemsAdderAssetDecoration[],
		severity: ItemsAdderDiagnosticSeverity,
		assetResolver: AssetPathResolver,
		assetType: 'texture' | 'model'
	): void {
		if (!YAML.isMap(node)) {
			return;
		}

		for (const item of node.items) {
			if (!YAML.isPair(item)) {
				continue;
			}

			const keyRange = this.getNodeRange(item.key);
			const key = YAML.isScalar(item.key) && typeof item.key.value === 'string' ? item.key.value : undefined;
			if (key && !this.isValidAssetKey(key) && keyRange) {
				issues.push({
					range: keyRange,
					message: `Invalid ${assetType} key \`${key}\`.`,
					severity: 'error'
				});
			}

			if (assetType === 'texture') {
				this.checkTextureNode(item.value, issues, assetDecorations, severity, assetResolver);
			} else {
				this.checkModelNode(item.value, issues, assetDecorations, severity, assetResolver);
			}
		}
	}

	private collectFlowIssues(text: string, issues: ItemsAdderDiagnosticIssue[]): void {
		const lines = text.split('\n');

		for (let index = 0; index < lines.length; index++) {
			const line = lines[index];
			if (!/(.*)flow:/.test(line)) {
				continue;
			}

			let count = 0;
			for (let nextIndex = index + 1; nextIndex < lines.length; nextIndex++) {
				const nextLine = lines[nextIndex];
				if (/(.*)(skip|stop)_if(.*)(_success|_fail):/.test(nextLine)) {
					count++;
					continue;
				}

				if (count > 0) {
					break;
				}
			}

			if (count > 1) {
				const start = this.lineOffset(lines, index) + Math.max(0, line.search(/\S/));
				issues.push({
					range: { start, end: this.lineOffset(lines, index) + line.length },
					message: 'Multiple `stop_` `skip_` flow attributes found in action.\nUse only one action.',
					severity: 'error'
				});
			}
		}
	}

	private collectNamespaceIssues(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		fileNamespace: string,
		issues: ItemsAdderDiagnosticIssue[],
		options: ItemsAdderDiagnosticsOptions
	): void {
		if (!options.expectedNamespace || options.expectedNamespace === fileNamespace) {
			return;
		}

		const infoNode = doc.get('info', true);
		if (!YAML.isMap(infoNode)) {
			return;
		}

		this.pushNodeIssue(
			issues,
			infoNode.get('namespace', true),
			`Namespace \`${fileNamespace}\` does not match folder namespace \`${options.expectedNamespace}\`.`,
			'warning'
		);
	}

	private getNamespace(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): string | undefined {
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

	private pushNodeIssue(
		issues: ItemsAdderDiagnosticIssue[],
		node: unknown,
		message: string,
		severity: ItemsAdderDiagnosticSeverity
	): void {
		const range = this.getNodeRange(node);
		if (!range) {
			return;
		}

		issues.push({ range, message, severity });
	}

	private getNodeRange(node: unknown): TextRange | undefined {
		if (!node || typeof node !== 'object' || !('range' in node)) {
			return undefined;
		}

		const range = (node as { range?: [number, number, number] }).range;
		if (!range) {
			return undefined;
		}

		return { start: range[0], end: range[1] };
	}

	private isScalarValue(node: unknown, expectedValue: unknown): boolean {
		return YAML.isScalar(node) && node.value === expectedValue;
	}

	private isValidAssetKey(key: string): boolean {
		return /^[a-z0-9_./:-]+$/.test(key);
	}

	private lineOffset(lines: string[], lineIndex: number): number {
		let offset = 0;
		for (let index = 0; index < lineIndex; index++) {
			offset += lines[index].length + 1;
		}
		return offset;
	}
}
