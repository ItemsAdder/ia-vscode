import * as assert from 'assert';

import { isItemsAdderPluginConfigText, itemsAdderPluginConfigSchema } from '../../itemsAdderPluginConfig';

suite('ItemsAdder plugin config', () => {
	test('detects main config by resource pack uuid', () => {
		assert.strictEqual(isItemsAdderPluginConfigText([
			'metrics: true',
			'resource-pack:',
			'  uuid: "d69238f2-b7ce-30b0-8262-17cd9490f29d"'
		].join('\n')), true);
	});

	test('does not detect regular resource configs', () => {
		assert.strictEqual(isItemsAdderPluginConfigText([
			'info:',
			'  namespace: test',
			'items: {}'
		].join('\n')), false);
	});

	test('contains config schema properties', () => {
		assert.ok(itemsAdderPluginConfigSchema.properties['resource-pack'].properties.uuid);
	});
});
