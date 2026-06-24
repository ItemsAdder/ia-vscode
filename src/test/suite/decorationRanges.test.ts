import * as assert from 'assert';

import { findCollectionBlockRanges, findDisabledBlockRanges, findItemBlockRanges } from '../../itemsadder/decorationRanges';
import { schemas } from '../../schemas';

suite('Decoration ranges', () => {
	test('expands enabled false to parent block only', () => {
		const text = [
			'items:',
			'  disabled_item:',
			'    enabled: false',
			'    name: Disabled',
			'  enabled_item:',
			'    enabled: true',
			'recipes:',
			'  crafting_table: {}'
		].join('\n');

		assert.deepStrictEqual(findDisabledBlockRanges(text), [
			{ startLine: 1, endLine: 3, endCharacter: 18 }
		]);
	});

	test('keeps top-level enabled false inside its own section', () => {
		const text = [
			'section:',
			'  enabled: false',
			'  value: 1',
			'other:',
			'  value: 2'
		].join('\n');

		assert.deepStrictEqual(findDisabledBlockRanges(text), [
			{ startLine: 0, endLine: 2, endCharacter: 10 }
		]);
	});

	test('finds top-level item blocks', () => {
		const text = [
			'items:',
			'  first:',
			'    name: First',
			'',
			'  second:',
			'    name: Second',
			'recipes:'
		].join('\n');

		assert.deepStrictEqual(findItemBlockRanges(text), [
			{ startLine: 1, endLine: 4 },
			{ startLine: 4, endLine: 6 }
		]);
	});

	test('finds schema collection blocks', () => {
		const text = [
			'items:',
			'  first:',
			'    name: First',
			'recipes:',
			'  crafting_table:',
			'    first_recipe:',
			'      enabled: true',
			'    second_recipe:',
			'      enabled: true',
			'loots:',
			'  blocks:',
			'    first_loot:',
			'      type: STONE',
			'trees_populators:',
			'  orange_tree:',
			'    log: orange_tree_log',
			'font_images:',
			'  no_recipe:',
			'    path: gui/no_recipe'
		].join('\n');

		assert.deepStrictEqual(findCollectionBlockRanges(text, schemas), [
			{ startLine: 1, endLine: 3 },
			{ startLine: 5, endLine: 7 },
			{ startLine: 7, endLine: 9 },
			{ startLine: 11, endLine: 13 },
			{ startLine: 14, endLine: 16 },
			{ startLine: 17, endLine: 19 }
		]);
	});
});
