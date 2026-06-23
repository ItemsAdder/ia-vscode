import * as assert from 'assert';

import {
	getYamlParentPathFromText,
	getYamlSameLevelPropertiesFromText
} from '../../itemsadder/yamlPath';

suite('YAML path helpers', () => {
	test('finds nested parent path for ItemsAdder item resource property', () => {
		const text = [
			'items:',
			'  ruby_sword:',
			'    resource:',
			'      texture:'
		].join('\n');

		assert.deepStrictEqual(
			getYamlParentPathFromText(text, { line: 3, character: 14 }),
			['items', 'ruby_sword', 'resource', 'texture']
		);
	});

	test('finds array parent path', () => {
		const text = [
			'items:',
			'  ruby_sword:',
			'    resource:',
			'      textures:',
			'      - item/ruby_sword'
		].join('\n');

		assert.deepStrictEqual(
			getYamlParentPathFromText(text, { line: 4, character: 8 }),
			['items', 'ruby_sword', 'resource', 'textures']
		);
	});

	test('collects same-level properties above cursor', () => {
		const text = [
			'items:',
			'  ruby_sword:',
			'    display_name: Ruby Sword',
			'    resource:',
			'    durability:'
		].join('\n');

		assert.deepStrictEqual(
			getYamlSameLevelPropertiesFromText(text, { line: 4, character: 4 }),
			['durability', 'resource', 'display_name']
		);
	});
});
