import * as YAML from 'yaml';

import { AssetPathResolver, AssetResolution } from './assetPathResolver';
import { ScriptPathResolver } from './scriptPathResolver';
import { itemsAdderPluginConfigSchema } from '../itemsAdderPluginConfig';

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

const HOSTING_PROVIDERS = [
	['resource-pack', 'hosting', 'self-host'],
	['resource-pack', 'hosting', 'simple_self_host'],
	['resource-pack', 'hosting', 'external-host'],
	['resource-pack', 'hosting', 'lobfile'],
	['resource-pack', 'hosting', 'no-host'],
	['resource-pack', 'hosting', 'auto-external-host']
];

const COOLDOWN_BOSSBAR_COLORS = new Set(['PINK', 'BLUE', 'RED', 'GREEN', 'YELLOW', 'PURPLE', 'WHITE']);
const COOLDOWN_BOSSBAR_STYLES = new Set(['SOLID', 'SEGMENTED_6', 'SEGMENTED_10', 'SEGMENTED_12', 'SEGMENTED_20']);
const PLAYER_STATS_SAVE_TYPES = new Set(['CUSTOM_NBT', 'PLAYER_DAT']);
const PLUGIN_CONFIG_MANUAL_SCHEMA_PATHS = new Set([
	'cooldown_bars.bossbar.color',
	'cooldown_bars.bossbar.style',
	'player_stats.save_type',
	'crops.rendering.max_shown_per_player',
	'crops.rendering.billboard.distance',
	'crops.rendering.tick_interval',
	'crops.rendering.radius_blocks',
	'crops.max_crops_in_area',
	'crops.area_limit_radius',
	'server.port',
	'resource-pack.hosting.self-host.pack-port',
	'resource-pack.hosting.self-host.protection.rate_limit.max_requests',
	'resource-pack.hosting.self-host.protection.rate_limit.period_seconds',
	'resource-pack.hosting.self-host.protection.rate_limit.cooldown.duration_minutes',
	'resource-pack.hosting.self-host.protection.rate_limit.cooldown.trigger_on_failed_times',
	'resource-pack.hosting.simple_self_host.optimization.max_downloads_per_ip',
	'resource-pack.hosting.simple_self_host.optimization.max_speed_in_megabyte_ps'
]);

export class ItemsAdderDiagnosticsProvider {
	public collect(doc: YAML.Document.Parsed<YAML.ParsedNode, true>, text: string, options: ItemsAdderDiagnosticsOptions): ItemsAdderDiagnosticsResult {
		const issues: ItemsAdderDiagnosticIssue[] = [];
		const assetDecorations: ItemsAdderAssetDecoration[] = [];

		if (this.isPluginConfig(doc)) {
			this.collectPluginConfigIssues(doc, issues);
			return { issues, assetDecorations };
		}

		const fileNamespace = this.getNamespace(doc);

		if (!fileNamespace) {
			return { issues, assetDecorations };
		}
		this.collectNamespaceIssues(doc, fileNamespace, issues, options);
		this.collectInfoIssues(doc, issues);

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

		this.collectRecipeIssues(doc.get('recipes', true), issues);
		this.collectFlowIssues(text, issues);
		return { issues, assetDecorations };
	}

	private collectInfoIssues(doc: YAML.Document.Parsed<YAML.ParsedNode, true>, issues: ItemsAdderDiagnosticIssue[]): void {
		const infoNode = doc.get('info', true);
		if (!YAML.isMap(infoNode)) {
			return;
		}

		if (infoNode.has('dictionary-lang') && !doc.has('dictionary')) {
			this.pushNodeIssue(
				issues,
				infoNode.get('dictionary-lang', true),
				'`info.dictionary-lang` is used only with the top-level `dictionary` property.',
				'warning'
			);
		}
	}

private collectPluginConfigIssues(doc: YAML.Document.Parsed<YAML.ParsedNode, true>, issues: ItemsAdderDiagnosticIssue[]): void {
	this.collectPluginConfigSchemaIssues(doc.contents, itemsAdderPluginConfigSchema, [], issues);

	this.collectMutuallyExclusiveEnabledIssues(
		doc,
			HOSTING_PROVIDERS,
			'Only one resource pack hosting method can be enabled at a time.',
			issues
		);
		this.collectMutuallyExclusiveEnabledIssues(
			doc,
			[
				['blocks', 'convert-vanilla-blocks'],
				['blocks', 'fix-glitched-blocks']
			],
			'Use either `blocks.convert-vanilla-blocks` or `blocks.fix-glitched-blocks`, not both.',
			issues
		);
		this.collectMutuallyExclusiveEnabledIssues(
			doc,
			[
				['advanced', 'legacy_shader_armor_conversion', 'append_new_equipment_tag'],
				['advanced', 'legacy_shader_armor_conversion', 'completely_convert_to_new_equipment_tag']
			],
			'Use either `append_new_equipment_tag` or `completely_convert_to_new_equipment_tag`, not both.',
			issues
		);

		this.collectMutuallyExclusiveBooleanIssues(
			doc,
			[
				['resource-pack', 'zip', 'emotes', '1_21_5_to_1_21_9_shaders'],
				['resource-pack', 'zip', 'emotes', '1_21_4_plus_modern_method']
			],
			'Only one emotes resource pack method is needed.',
			'warning',
			issues
		);

		this.collectEnumIssue(doc, ['cooldown_bars', 'bossbar', 'color'], COOLDOWN_BOSSBAR_COLORS, 'Invalid cooldown bossbar color.', issues);
		this.collectEnumIssue(doc, ['cooldown_bars', 'bossbar', 'style'], COOLDOWN_BOSSBAR_STYLES, 'Invalid cooldown bossbar style.', issues);
		this.collectEnumIssue(doc, ['player_stats', 'save_type'], PLAYER_STATS_SAVE_TYPES, '`player_stats.save_type` must be `CUSTOM_NBT` or `PLAYER_DAT`.', issues);

		this.collectIntegerRangeIssue(doc, ['crops', 'rendering', 'max_shown_per_player'], 200, 1800, issues);
		this.collectIntegerRangeIssue(doc, ['crops', 'rendering', 'billboard', 'distance'], 0, 10, issues);
		this.collectIntegerRangeIssue(doc, ['crops', 'rendering', 'tick_interval'], 0, 10, issues);
		this.collectIntegerRangeIssue(doc, ['crops', 'rendering', 'radius_blocks'], 16, 64, issues);
	this.collectIntegerRangeIssue(doc, ['crops', 'max_crops_in_area'], 0, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['crops', 'area_limit_radius'], 16, 64, issues);
	this.collectIntegerRangeIssue(doc, ['server', 'port'], 1, 65535, issues, true);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'self-host', 'pack-port'], 1, 65535, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit', 'max_requests'], 1, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit', 'period_seconds'], 1, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit', 'cooldown', 'duration_minutes'], 0, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit', 'cooldown', 'trigger_on_failed_times'], 1, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'simple_self_host', 'optimization', 'max_downloads_per_ip'], 1, undefined, issues);
	this.collectIntegerRangeIssue(doc, ['resource-pack', 'hosting', 'simple_self_host', 'optimization', 'max_speed_in_megabyte_ps'], 1, undefined, issues);

	this.collectHostAddressIssue(doc, ['server', 'address'], issues);
		this.collectHostAddressIssue(doc, ['resource-pack', 'hosting', 'simple_self_host', 'server_address'], issues);
	}

	private collectMutuallyExclusiveEnabledIssues(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		paths: string[][],
		message: string,
		issues: ItemsAdderDiagnosticIssue[]
	): void {
		this.collectMutuallyExclusiveBooleanIssues(doc, paths.map(path => [...path, 'enabled']), message, 'error', issues);
	}

	private collectMutuallyExclusiveBooleanIssues(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		paths: string[][],
		message: string,
		severity: ItemsAdderDiagnosticSeverity,
		issues: ItemsAdderDiagnosticIssue[]
	): void {
		const enabled = paths
			.map(path => ({ path, node: doc.getIn(path, true) }))
			.filter(entry => this.isScalarValue(entry.node, true));

		if (enabled.length <= 1) {
			return;
		}

		for (const entry of enabled) {
			this.pushNodeIssue(issues, entry.node, message, severity);
		}
	}

	private collectEnumIssue(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		path: string[],
		allowedValues: Set<string>,
		message: string,
		issues: ItemsAdderDiagnosticIssue[]
	): void {
		const node = doc.getIn(path, true);
		if (!YAML.isScalar(node) || typeof node.value !== 'string') {
			return;
		}

		if (!allowedValues.has(node.value.toUpperCase())) {
			this.pushNodeIssue(issues, node, `${message} Allowed values: ${[...allowedValues].join(', ')}.`, 'error');
		}
	}

	private collectIntegerRangeIssue(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		path: string[],
		min: number | undefined,
		max: number | undefined,
		issues: ItemsAdderDiagnosticIssue[],
		allowAuto = false
	): void {
		const node = doc.getIn(path, true);
		if (!YAML.isScalar(node)) {
			return;
		}

		if (allowAuto && node.value === 'auto') {
			return;
		}

		const value = typeof node.value === 'number' ? node.value : Number(node.value);
		if (!Number.isInteger(value)) {
			this.pushNodeIssue(issues, node, `\`${path.join('.')}\` must be an integer${allowAuto ? ' or `auto`' : ''}.`, 'error');
			return;
		}

		if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
			const range = min !== undefined && max !== undefined ? `${min}-${max}` : min !== undefined ? `>= ${min}` : `<= ${max}`;
			this.pushNodeIssue(issues, node, `\`${path.join('.')}\` should be ${range}.`, 'warning');
		}
	}

	private collectHostAddressIssue(
		doc: YAML.Document.Parsed<YAML.ParsedNode, true>,
		path: string[],
		issues: ItemsAdderDiagnosticIssue[]
	): void {
		const node = doc.getIn(path, true);
	if (!YAML.isScalar(node) || typeof node.value !== 'string' || node.value === 'auto') {
		return;
	}

	const value = node.value.trim();
	if (
		value !== node.value ||
		/^https?:\/\//i.test(value) ||
		value.includes('/') ||
		/\s/.test(value) ||
		!this.isValidHostAddress(value)
	) {
		this.pushNodeIssue(issues, node, `\`${path.join('.')}\` must be \`auto\`, \`host\` or \`host:port\` without protocol or path.`, 'error');
	}
}

private isValidHostAddress(value: string): boolean {
	const match = value.match(/^([a-z0-9.-]+)(?::([0-9]+))?$/i);
	if (!match) {
		return false;
	}
	if (!/[a-z0-9]/i.test(match[1])) {
		return false;
	}
	if (match[2] === undefined) {
		return true;
	}
	const port = Number(match[2]);
	return Number.isInteger(port) && port >= 1 && port <= 65535;
}

	private isPluginConfig(doc: YAML.Document.Parsed<YAML.ParsedNode, true>): boolean {
		const resourcePackNode = doc.get('resource-pack', true);
		return YAML.isMap(resourcePackNode) && resourcePackNode.has('uuid');
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

	private collectRecipeIssues(recipesNode: unknown, issues: ItemsAdderDiagnosticIssue[]): void {
		if (!YAML.isMap(recipesNode)) {
			return;
		}

		const craftingTableNode = recipesNode.get('crafting_table', true);
		if (!YAML.isMap(craftingTableNode)) {
			return;
		}

		for (const item of craftingTableNode.items) {
			if (!YAML.isPair(item) || !YAML.isMap(item.value)) {
				continue;
			}

			this.collectCraftingRecipeIssues(item.value, issues);
		}
	}

	private collectCraftingRecipeIssues(recipeNode: YAML.YAMLMap, issues: ItemsAdderDiagnosticIssue[]): void {
		if (this.isScalarValue(recipeNode.get('shapeless', true), true)) {
			for (const item of recipeNode.items) {
				if (!YAML.isPair(item) || !YAML.isScalar(item.key) || typeof item.key.value !== 'string') {
					continue;
				}

				if (!/^pattern(?:$|_)/.test(item.key.value)) {
					continue;
				}

				this.pushNodeIssue(issues, item.key, '`shapeless: true` recipes cannot use `pattern` properties.', 'error');
			}
			return;
		}

		this.collectCraftingRecipeIngredientSymbolIssues(recipeNode, issues);
	}

	private collectCraftingRecipeIngredientSymbolIssues(recipeNode: YAML.YAMLMap, issues: ItemsAdderDiagnosticIssue[]): void {
		const ingredientKeys = this.craftingRecipeIngredientKeys(recipeNode.get('ingredients', true));
		if (ingredientKeys.size === 0) {
			return;
		}

		const patternSymbols = new Set<string>();
		const reportedMissingIngredients = new Set<string>();
		for (const item of recipeNode.items) {
			if (!YAML.isPair(item) || !YAML.isScalar(item.key) || typeof item.key.value !== 'string') {
				continue;
			}

			if (!/^pattern(?:$|_)/.test(item.key.value)) {
				continue;
			}

			for (const patternEntry of this.craftingRecipePatternEntries(item.value)) {
				for (const symbol of patternEntry.value) {
					if (symbol === 'X' || symbol === ' ') {
						continue;
					}

					patternSymbols.add(symbol);
					if (!ingredientKeys.has(symbol) && !reportedMissingIngredients.has(symbol)) {
						reportedMissingIngredients.add(symbol);
						issues.push({
							range: patternEntry.range,
							message: `Pattern symbol \`${symbol}\` does not have a matching ingredient.`,
							severity: 'error'
						});
					}
				}
			}
		}

		for (const [symbol, range] of ingredientKeys) {
			if (!patternSymbols.has(symbol)) {
				issues.push({
					range,
					message: `Ingredient symbol \`${symbol}\` does not appear in any pattern.`,
					severity: 'error'
				});
			}
		}
	}

	private craftingRecipeIngredientKeys(ingredientsNode: unknown): Map<string, TextRange> {
		const keys = new Map<string, TextRange>();
		if (!YAML.isMap(ingredientsNode)) {
			return keys;
		}

		for (const item of ingredientsNode.items) {
			if (!YAML.isPair(item) || !YAML.isScalar(item.key) || typeof item.key.value !== 'string') {
				continue;
			}

			const range = this.getNodeRange(item.key);
			if (range) {
				keys.set(item.key.value, range);
			}
		}
		return keys;
	}

	private craftingRecipePatternEntries(node: unknown): { value: string; range: TextRange }[] {
		if (YAML.isSeq(node)) {
			return node.items.flatMap(item => {
				const range = this.getNodeRange(item);
				return YAML.isScalar(item) && typeof item.value === 'string' && range ? [{ value: item.value, range }] : [];
			});
		}

		const range = this.getNodeRange(node);
		return YAML.isScalar(node) && typeof node.value === 'string' && range ? [{ value: node.value, range }] : [];
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

	private collectPluginConfigSchemaIssues(node: unknown, schemaNode: any, path: string[], issues: ItemsAdderDiagnosticIssue[]): void {
		if (!schemaNode) {
			return;
		}

		const currentPath = path.join('.');
		if (currentPath && !PLUGIN_CONFIG_MANUAL_SCHEMA_PATHS.has(currentPath)) {
			const message = this.pluginConfigSchemaIssueMessage(node, schemaNode, currentPath);
			if (message) {
				this.pushNodeIssue(issues, node, message, 'error');
				return;
			}
		}

		if (YAML.isMap(node) && schemaNode.properties) {
			for (const pair of node.items) {
				if (!YAML.isPair(pair)) {
					continue;
				}
				const key = YAML.isScalar(pair.key) ? String(pair.key.value) : String(pair.key);
				const childSchema = schemaNode.properties[key] ?? schemaNode.additionalProperties;
				if (childSchema && childSchema !== true) {
					this.collectPluginConfigSchemaIssues(pair.value, childSchema, [...path, key], issues);
				}
			}
			return;
		}

		if (YAML.isSeq(node) && schemaNode.items) {
			for (const item of node.items) {
				this.collectPluginConfigSchemaIssues(item, schemaNode.items, path, issues);
			}
		}
	}

	private pluginConfigSchemaIssueMessage(node: unknown, schemaNode: any, path: string): string | undefined {
		if (Array.isArray(schemaNode.anyOf)) {
			return schemaNode.anyOf.some((entry: any) => !this.pluginConfigSchemaIssueMessage(node, entry, path))
				? undefined
				: `\`${path}\` has invalid value.`;
		}

		const value = YAML.isScalar(node) ? node.value : undefined;
		if (Array.isArray(schemaNode.enum) && !schemaNode.enum.includes(value)) {
			return `\`${path}\` must be one of: ${schemaNode.enum.map((entry: unknown) => `\`${String(entry)}\``).join(', ')}.`;
		}
		if (schemaNode.const !== undefined && value !== schemaNode.const) {
			return `\`${path}\` must be \`${String(schemaNode.const)}\`.`;
		}
		if (schemaNode.type && !this.nodeMatchesSchemaType(node, schemaNode.type)) {
			return `\`${path}\` must be ${this.schemaTypeLabel(schemaNode.type)}.`;
		}

		return undefined;
	}

	private nodeMatchesSchemaType(node: unknown, type: string): boolean {
		if (type === 'object') {
			return YAML.isMap(node);
		}
		if (type === 'array') {
			return YAML.isSeq(node);
		}
		if (!YAML.isScalar(node)) {
			return false;
		}
		if (type === 'string') {
			return typeof node.value === 'string';
		}
		if (type === 'boolean') {
			return typeof node.value === 'boolean';
		}
		if (type === 'integer') {
			return typeof node.value === 'number' && Number.isInteger(node.value);
		}
		if (type === 'number') {
			return typeof node.value === 'number';
		}
		return true;
	}

	private schemaTypeLabel(type: string): string {
		return type === 'integer' ? 'an integer' : `a ${type}`;
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
