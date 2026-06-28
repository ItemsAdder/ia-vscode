import * as assert from 'assert';
import * as YAML from 'yaml';

import { AssetPathResolver } from '../../itemsadder/assetPathResolver';
import { ItemsAdderDiagnosticsProvider } from '../../itemsadder/itemsAdderDiagnostics';
import { ProjectAssetIndex } from '../../itemsadder/projectAssetIndex';

suite('ItemsAdder diagnostics', () => {
	test('reports missing material on non-armor resource item', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    resource:',
			'      texture: item/gem'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message === 'Missing `material` property!'));
	});

	test('warns when info namespace does not match contents folder namespace', () => {
		const text = [
			'info:',
			'  namespace: wrong',
			'items: {}'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, {
			isDocumentDirty: false,
			expectedNamespace: 'test'
		});

		assert.ok(result.issues.some(issue =>
			issue.severity === 'warning' &&
			issue.message === 'Namespace `wrong` does not match folder namespace `test`.'
		));
	});

	test('warns dictionary-lang without dictionary section', () => {
		const text = [
			'info:',
			'  namespace: test',
			'  dictionary-lang: en',
			'items: {}'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue =>
			issue.severity === 'warning' &&
			issue.message === '`info.dictionary-lang` is used only with the top-level `dictionary` property.'
		));
	});

	test('reports multiple enabled plugin config hosting methods', () => {
		const text = [
			'resource-pack:',
			'  uuid: "d69238f2-b7ce-30b0-8262-17cd9490f29d"',
			'  hosting:',
			'    simple_self_host:',
			'      enabled: true',
			'    external-host:',
			'      enabled: true'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.strictEqual(result.issues.filter(issue =>
			issue.severity === 'error' &&
			issue.message === 'Only one resource pack hosting method can be enabled at a time.'
		).length, 2);
	});

	test('reports plugin config settings rules from Settings.java', () => {
		const text = [
			'resource-pack:',
			'  uuid: "d69238f2-b7ce-30b0-8262-17cd9490f29d"',
			'  zip:',
			'    emotes:',
			'      1_21_5_to_1_21_9_shaders: true',
			'      1_21_4_plus_modern_method: true',
			'blocks:',
			'  convert-vanilla-blocks:',
			'    enabled: true',
			'  fix-glitched-blocks:',
			'    enabled: true',
			'advanced:',
			'  legacy_shader_armor_conversion:',
			'    append_new_equipment_tag:',
			'      enabled: true',
			'    completely_convert_to_new_equipment_tag:',
			'      enabled: true',
			'cooldown_bars:',
			'  bossbar:',
			'    color: ORANGE',
			'    style: STRIPED',
			'player_stats:',
			'  save_type: SQL',
			'server:',
			'  port: abc',
			'  address: https://example.com/',
			'crops:',
			'  rendering:',
			'    radius_blocks: 200'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });
		const messages = result.issues.map(issue => issue.message);

		assert.ok(messages.includes('Use either `blocks.convert-vanilla-blocks` or `blocks.fix-glitched-blocks`, not both.'));
		assert.ok(messages.includes('Use either `append_new_equipment_tag` or `completely_convert_to_new_equipment_tag`, not both.'));
		assert.ok(messages.includes('Only one emotes resource pack method is needed.'));
		assert.ok(messages.some(message => message.startsWith('Invalid cooldown bossbar color.')));
		assert.ok(messages.some(message => message.startsWith('Invalid cooldown bossbar style.')));
		assert.ok(messages.some(message => message.startsWith('`player_stats.save_type` must be')));
		assert.ok(messages.includes('`server.port` must be an integer or `auto`.'));
	assert.ok(messages.includes('`server.address` must be `auto`, `host` or `host:port` without protocol or path.'));
	assert.ok(messages.includes('`crops.rendering.radius_blocks` should be 16-64.'));
});

test('reports invalid plugin config hosting address and numeric values', () => {
	const text = [
		'resource-pack:',
		'  uuid: "d69238f2-b7ce-30b0-8262-17cd9490f29d"',
		'  hosting:',
		'    simple_self_host:',
		'      server_address: https://example.com/path',
		'    self-host:',
		'      server-ip: 127.0.0.1',
		'      pack-port: 8163a',
		'      protection:',
		'        rate_limit:',
		'          cooldown:',
		'            trigger_on_failed_times: hjbhj'
	].join('\n');
	const doc = YAML.parseDocument(text, { keepSourceTokens: true });
	const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });
	const messages = result.issues.map(issue => issue.message);

	assert.ok(messages.includes('`resource-pack.hosting.simple_self_host.server_address` must be `auto`, `host` or `host:port` without protocol or path.'));
	assert.ok(messages.includes('`resource-pack.hosting.self-host.pack-port` must be an integer.'));
	assert.ok(messages.includes('`resource-pack.hosting.self-host.protection.rate_limit.cooldown.trigger_on_failed_times` must be an integer.'));
});

test('reports plugin config schema type errors', () => {
	const text = [
		'resource-pack:',
		'  uuid: "d69238f2-b7ce-30b0-8262-17cd9490f29d"',
		'  kick-player-on-fail: nope',
		'recipes:',
		'  crafting:',
		'    enabled: nope'
	].join('\n');
	const doc = YAML.parseDocument(text, { keepSourceTokens: true });
	const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });
	const messages = result.issues.map(issue => issue.message);

	assert.ok(messages.includes('`resource-pack.kick-player-on-fail` must be a boolean.'));
	assert.ok(messages.includes('`recipes.crafting.enabled` must be a boolean.'));
});

	test('allows dictionary-lang with dictionary section', () => {
		const text = [
			'info:',
			'  namespace: test',
			'  dictionary-lang: en',
			'dictionary:',
			'  display-name-test: Test'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(!result.issues.some(issue =>
			issue.message === '`info.dictionary-lang` is used only with the top-level `dictionary` property.'
		));
	});

	test('does not require material on legacy armor specific_properties', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  helmet:',
			'    resource:',
			'      texture: item/helmet',
			'    specific_properties:',
			'      armor: {}'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(!result.issues.some(issue => issue.message === 'Missing `material` property!'));
	});

	test('reports mutually exclusive resource texture fields', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    resource:',
			'      material: PAPER',
			'      texture: item/gem',
			'      textures:',
			'        - item/gem_a'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message === 'Use either `texture` or `textures` property, not both.'));
	});

	test('reports generate true without texture fields even when model path exists', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  diamond_sword:',
			'    resource:',
			'      material: DIAMOND_SWORD',
			'      generate: true',
			'      model_path: minecraft:item/diamond_sword'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message === 'Set `generate: false` to use `model_path`.'));
		assert.ok(result.issues.some(issue => issue.message === '`generate: true` requires `texture` or `textures` property.'));
	});

	test('allows generate true when texture is specified', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  diamond_sword:',
			'    resource:',
			'      material: DIAMOND_SWORD',
			'      generate: true',
			'      texture: item/diamond_sword'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(!result.issues.some(issue => issue.message === '`generate: true` requires `texture` or `textures` property.'));
	});

	test('reports pattern on shapeless crafting table recipes', () => {
		const text = [
			'info:',
			'  namespace: test',
			'recipes:',
			'  crafting_table:',
			'    deadmau5_hat:',
			'      shapeless: true',
			'      pattern:',
			'        - BXB',
			'      ingredients:',
			'        B: LIGHT_BLUE_WOOL',
			'      result:',
			'        item: iawearables:deadmau5_hat',
			'        amount: 1'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue =>
			issue.severity === 'error' &&
			issue.message === '`shapeless: true` recipes cannot use `pattern` properties.'
		));
	});

	test('reports pattern symbols without matching ingredients', () => {
		const text = [
			'info:',
			'  namespace: test',
			'recipes:',
			'  crafting_table:',
			'    deadmau5_hat:',
			'      pattern:',
			'        - BXB',
			'        - XBX',
			'        - XXZ',
			'      ingredients:',
			'        B: LIGHT_BLUE_WOOL',
			'      result:',
			'        item: iawearables:deadmau5_hat',
			'        amount: 1'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue =>
			issue.severity === 'error' &&
			issue.message === 'Pattern symbol `Z` does not have a matching ingredient.'
		));
		assert.ok(!result.issues.some(issue => issue.message === 'Pattern symbol `X` does not have a matching ingredient.'));
	});

	test('reports ingredients not used by any pattern', () => {
		const text = [
			'info:',
			'  namespace: test',
			'recipes:',
			'  crafting_table:',
			'    deadmau5_hat:',
			'      pattern:',
			'        - BXB',
			'      ingredients:',
			'        B: LIGHT_BLUE_WOOL',
			'        Z: LIGHT_BLUE_WOOL',
			'      result:',
			'        item: iawearables:deadmau5_hat',
			'        amount: 1'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue =>
			issue.severity === 'error' &&
			issue.message === 'Ingredient symbol `Z` does not appear in any pattern.'
		));
	});

	test('reports multiple flow conditions in one action', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    resource:',
			'      material: PAPER',
			'actions:',
			'  right_click:',
			'    flow:',
			'      skip_if_success: true',
			'      stop_if_fail: true'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message.includes('Multiple `stop_` `skip_` flow attributes')));
	});

	test('reports missing textures as warnings while document is dirty', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    resource:',
			'      material: PAPER',
			'      texture: item/missing'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const assetResolver = new AssetPathResolver({
			workspaceFolders: ['/workspace'],
			documentPath: '/workspace/test/config.yml',
			fileNamespace: 'test',
			vanillaTexturePaths: []
		});
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, {
			isDocumentDirty: true,
			assetResolver
		});

		const issue = result.issues.find(issue => issue.message === 'Texture not found!');
		assert.strictEqual(issue?.severity, 'warning');
	});

	test('reports invalid graphics source combinations', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    graphics:',
			'      model: item/gem',
			'      texture: item/gem'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message === 'Use exactly one graphics source: `model`, `models`, `texture`, or `textures`.'));
	});

	test('reports graphics parent when model source is used', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    graphics:',
			'      model: item/gem',
			'      parent: item/generated'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false });

		assert.ok(result.issues.some(issue => issue.message === '`graphics.parent` is allowed only with `graphics.texture` or `graphics.textures`.'));
	});

	test('validates graphics texture maps', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    graphics:',
			'      textures:',
			'        Bad Key: item/missing'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const assetResolver = new AssetPathResolver({
			workspaceFolders: ['/workspace'],
			documentPath: '/workspace/test/config.yml',
			fileNamespace: 'test',
			vanillaTexturePaths: []
		});
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false, assetResolver });

		assert.ok(result.issues.some(issue => issue.message === 'Invalid texture key `Bad Key`.'));
		assert.ok(result.issues.some(issue => issue.message === 'Texture not found!'));
	});

	test('warns unknown indexed ItemsAdder references', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  sword:',
			'    resource:',
			'      material: DIAMOND_SWORD',
			'recipes:',
			'  crafting_table:',
			'    sword_recipe:',
			'      ingredients:',
			'        A: sword',
			'      result:',
			'        item: other:missing'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const definitionIndex = {
			findDefinition(kind: string, namespace: string, id: string) {
				if (kind === 'item' && namespace === 'test' && id === 'sword') {
					return { kind: 'item', namespace, id, fullPath: '/workspace/contents/test/items.yml' };
				}
				return undefined;
			}
		} as ProjectAssetIndex;
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, {
			isDocumentDirty: false,
			definitionIndex
		});

		assert.ok(!result.issues.some(issue => issue.message.includes('`sword`')));
		assert.ok(result.issues.some(issue => issue.message === 'Unknown ItemsAdder item or block `other:missing`.'));
	});

	test('validates item_model as independent model asset', () => {
		const text = [
			'info:',
			'  namespace: test',
			'items:',
			'  gem:',
			'    item_model: test:item/missing',
			'    graphics:',
			'      texture: item/gem'
		].join('\n');
		const doc = YAML.parseDocument(text, { keepSourceTokens: true });
		const assetResolver = new AssetPathResolver({
			workspaceFolders: ['/workspace'],
			documentPath: '/workspace/test/config.yml',
			fileNamespace: 'test',
			vanillaTexturePaths: []
		});
		const result = new ItemsAdderDiagnosticsProvider().collect(doc, text, { isDocumentDirty: false, assetResolver });

		assert.ok(result.issues.some(issue => issue.message === 'Model not found!'));
	});
});
