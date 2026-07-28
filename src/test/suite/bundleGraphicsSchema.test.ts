import * as assert from 'assert';

import { schemas } from '../../schemas';

suite('Bundle graphics schema', () => {
	test('accepts bundle states, rejects wrong types and keeps normal-only compatibility', () => {
		const itemSchema = schemas.$defs.item;
		const graphics = itemSchema.properties.graphics.properties;
		const states = ['normal', 'filled', 'open_back', 'open_front'];
		const allStates = Object.fromEntries(states.map(state => [state, `item/custom_bundle_${state}`]));
		const accepts = (source: string, value: Record<string, unknown>) => Object.entries(value).every(
			([state, stateValue]) => graphics[source].properties[state]?.type === typeof stateValue
		);

		for (const source of ['textures', 'models']) {
			assert.ok(accepts(source, allStates));
			assert.ok(!accepts(source, Object.fromEntries(states.map(state => [state, 1]))));
			assert.ok(accepts(source, { normal: 'item/custom_bundle' }));
			for (const state of states) {
				assert.ok(graphics[source].properties[state].markdownDescription.includes('ItemsAdder 4.0.18+'));
			}
		}

		const bundleTextures = itemSchema.allOf[0].then.properties.graphics.properties.textures;
		assert.deepStrictEqual(bundleTextures.required, ['normal']);
	});
});
