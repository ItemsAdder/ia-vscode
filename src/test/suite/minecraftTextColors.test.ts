import * as assert from 'assert';

import { findMinecraftTextColorLinePreviews, findMinecraftTextColorTokens, formatMinecraftTextPreviewParts } from '../../itemsadder/minecraftTextColors';

suite('Minecraft text colors', () => {
	test('finds legacy ampersand colors and ignores formatting codes', () => {
		const tokens = findMinecraftTextColorTokens('"&5&oInfused with Amethyst"');

		assert.deepStrictEqual(tokens.map(token => [token.label, token.color]), [
			['&5', '#AA00AA']
		]);
	});

	test('finds legacy section and hex colors', () => {
		const tokens = findMinecraftTextColorTokens('§cRed &#12abEFHex &x&1&2&3&4&5&6Bungee');

		assert.deepStrictEqual(tokens.map(token => [token.label, token.color]), [
			['§c', '#FF5555'],
			['&#12abEF', '#12ABEF'],
			['&x&1&2&3&4&5&6', '#123456']
		]);
	});

	test('finds MiniMessage named and hex colors', () => {
		const tokens = findMinecraftTextColorTokens('<red>test<white>bro <#00ffaa>x');

		assert.deepStrictEqual(tokens.map(token => [token.label, token.color]), [
			['<red>', '#FF5555'],
			['<white>', '#FFFFFF'],
			['<#00ffaa>', '#00FFAA']
		]);
	});

	test('finds MiniMessage color and gradient first color', () => {
		const tokens = findMinecraftTextColorTokens('<color:gold>Gold <gradient:#ff0000:#00ff00>Gradient');

		assert.deepStrictEqual(tokens.map(token => [token.label, token.color]), [
			['<color:gold>', '#FFAA00'],
			['<gradient:#ff0000:#00ff00>', '#FF0000']
		]);
	});

	test('builds styled line preview text for legacy colors', () => {
		const previews = findMinecraftTextColorLinePreviews('name: "&5&oInfused with Amethyst"');

		assert.deepStrictEqual(previews, [
			{
				line: 0,
				character: 33,
				startCharacter: 6,
				endCharacter: 33,
				parts: [
					{
						text: 'Infused with Amethyst',
						color: '#AA00AA',
						italic: true,
						bold: false
					}
				]
			}
		]);
	});

	test('builds complete line preview text for MiniMessage colors', () => {
		const previews = findMinecraftTextColorLinePreviews('<red>test<white>bro');

		assert.deepStrictEqual(previews[0].parts.map(part => [part.color, part.text]), [
			['#FF5555', 'test'],
			['#FFFFFF', 'bro']
		]);
	});

	test('builds plain text preview with normal white default style', () => {
		const previews = findMinecraftTextColorLinePreviews('display_name: Cherry');

		assert.deepStrictEqual(previews, [
			{
				line: 0,
				character: 20,
				startCharacter: 14,
				endCharacter: 20,
				parts: [
					{ text: 'Cherry', color: '#FFFFFF', bold: false, italic: false }
				]
			}
		]);
	});

	test('does not preview technical play_sound name values', () => {
		const previews = findMinecraftTextColorLinePreviews([
			'play_sound:',
			'  name: iawearables:entity.creeper.primed',
			'  volume: 1',
			'  pitch: 1'
		].join('\n'));
		assert.deepStrictEqual(previews, []);
	});

	test('does not preview formatted technical play_sound name values', () => {
		const previews = findMinecraftTextColorLinePreviews([
			'play_sound:',
			'  name: <red>entity.creeper.primed'
		].join('\n'));
		assert.deepStrictEqual(previews, []);
	});

	test('does not preview script name values', () => {
		const previews = findMinecraftTextColorLinePreviews([
			'items:',
			'  test_interact_jspp:',
			'    events:',
			'      interact:',
			'        right:',
			'          script:',
			'            name: testjsppbossbar_issue'
		].join('\n'));
		assert.deepStrictEqual(previews, []);
	});

	test('builds plain lore preview with normal white default style', () => {
		const previews = findMinecraftTextColorLinePreviews(['lore:', '  - Simple lore'].join('\n'));

		assert.deepStrictEqual(previews[0].parts, [
			{ text: 'Simple lore', color: '#FFFFFF', bold: false, italic: false }
		]);
	});

	test('formats translated MiniMessage value without tags or quotes', () => {
		assert.deepStrictEqual(formatMinecraftTextPreviewParts('<red>My Sword'), [
			{ text: 'My Sword', color: '#FF5555', bold: false, italic: false }
		]);
	});

	test('formats plain translated text as normal white text', () => {
		assert.deepStrictEqual(formatMinecraftTextPreviewParts('Cherry'), [
			{ text: 'Cherry', color: '#FFFFFF', bold: false, italic: false }
		]);
	});

	test('keeps empty translated text as an empty preview part', () => {
		assert.deepStrictEqual(formatMinecraftTextPreviewParts(''), [
			{ text: '', color: '#FFFFFF', bold: false, italic: false }
		]);
		assert.deepStrictEqual(formatMinecraftTextPreviewParts("''"), [
			{ text: '', color: '#FFFFFF', bold: false, italic: false }
		]);
	});
});
