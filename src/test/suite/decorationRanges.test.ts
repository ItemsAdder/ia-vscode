import * as assert from 'assert';

import { findDisabledBlockRanges, findItemBlockRanges } from '../../itemsadder/decorationRanges';

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
});
