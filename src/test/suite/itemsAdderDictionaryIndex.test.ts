import * as assert from 'assert';

import { findDictionaryReferenceRanges } from '../../itemsadder/dictionaryReferences';
import { collectDictionaryEntries, collectMinecraftLangEntries } from '../../itemsadder/itemsAdderDictionaryIndex';

suite('ItemsAdder dictionary index', () => {
	test('collects dictionary entries from YAML', () => {
		const entries = collectDictionaryEntries([
			'info:',
			'  namespace: newtrees',
			'dictionary:',
			'  display-category-newtrees: "New Trees"',
			'  display-name-newtrees-end_tree_log: End Tree Log'
		].join('\n'), '/workspace/contents/newtrees/lang.yml');

		assert.deepStrictEqual(entries.map(entry => [entry.key, entry.value]), [
			['display-category-newtrees', 'New Trees'],
			['display-name-newtrees-end_tree_log', 'End Tree Log']
		]);
	});

	test('gives en dictionary language highest priority', () => {
		const entries = collectDictionaryEntries([
			'info:',
			'  namespace: iasurvival',
			'  dictionary-lang: en',
			'dictionary:',
			'  display-name-dark_amethyst_helmet: Dark Amethyst Helmet'
		].join('\n'), '/workspace/contents/iasurvival/en.yml');

		assert.deepStrictEqual(entries.map(entry => [entry.key, entry.value, entry.language, entry.priority]), [
			['display-name-dark_amethyst_helmet', 'Dark Amethyst Helmet', 'en', 0]
		]);
	});

	test('keeps empty dictionary entries', () => {
		const entries = collectDictionaryEntries([
			'dictionary:',
			"  lore-3-demoniac_hammer: ''"
		].join('\n'));

		assert.deepStrictEqual(entries.map(entry => [entry.key, entry.value]), [
			['lore-3-demoniac_hammer', '']
		]);
	});

	test('finds dictionary references in names and lore', () => {
		const references = findDictionaryReferenceRanges([
			'items:',
			'  end_tree_log:',
			'    display_name: display-name-newtrees-end_tree_log',
			'    lore:',
			'      - lore-newtrees-one',
			'      - "lore-newtrees-two"'
		].join('\n'));

		assert.deepStrictEqual(references.map(reference => [reference.line, reference.key]), [
			[2, 'display-name-newtrees-end_tree_log'],
			[4, 'lore-newtrees-one'],
			[5, 'lore-newtrees-two']
		]);
	});

	test('collects minecraft lang overwrite entries with language priority', () => {
		const entries = collectMinecraftLangEntries([
			'info:',
			'  namespace: special_items',
			'minecraft_lang_overwrite:',
			'  my_translations_all:',
			'    entries:',
			'      "my_custom_items.my_sword.name": "My Sword"',
			'    languages:',
			'      - ALL',
			'  my_translations_italian:',
			'    entries:',
			'      "my_custom_items.my_sword.name": "La Mia Spada"',
			'    languages:',
			'      - it_it'
		].join('\n'));

		assert.deepStrictEqual(entries.map(entry => [entry.key, entry.value, entry.priority]), [
			['my_custom_items.my_sword.name', 'My Sword', 0],
			['my_custom_items.my_sword.name', 'La Mia Spada', 2]
		]);
	});

	test('finds minecraft lang references in names and lore', () => {
		const references = findDictionaryReferenceRanges([
			'items:',
			'  my_sword:',
			'    name: <lang:my_custom_items.my_sword.name>',
			'    lore:',
			'      - <lang:my_custom_items.my_sword.lore>'
		].join('\n'));

		assert.deepStrictEqual(references.map(reference => [reference.line, reference.kind, reference.key]), [
			[2, 'minecraft_lang', 'my_custom_items.my_sword.name'],
			[4, 'minecraft_lang', 'my_custom_items.my_sword.lore']
		]);
	});
});
