export interface MinecraftTextColorToken {
	start: number;
	end: number;
	color: string;
	label: string;
}

export interface MinecraftTextColorPreviewPart {
	text: string;
	color: string;
	bold: boolean;
	italic: boolean;
}

export interface MinecraftTextColorLinePreview {
	line: number;
	character: number;
	startCharacter: number;
	endCharacter: number;
	parts: MinecraftTextColorPreviewPart[];
}

const TEXT_PREVIEW_PROPERTIES = new Set(['name', 'display_name', 'item_name']);
const TECHNICAL_NAME_PARENT_KEYS = new Set(['play_sound']);

const LEGACY_COLORS = new Map<string, string>([
	['0', '#000000'],
	['1', '#0000AA'],
	['2', '#00AA00'],
	['3', '#00AAAA'],
	['4', '#AA0000'],
	['5', '#AA00AA'],
	['6', '#FFAA00'],
	['7', '#AAAAAA'],
	['8', '#555555'],
	['9', '#5555FF'],
	['a', '#55FF55'],
	['b', '#55FFFF'],
	['c', '#FF5555'],
	['d', '#FF55FF'],
	['e', '#FFFF55'],
	['f', '#FFFFFF']
]);

const MINI_MESSAGE_COLORS = new Map<string, string>([
	['black', '#000000'],
	['dark_blue', '#0000AA'],
	['dark_green', '#00AA00'],
	['dark_aqua', '#00AAAA'],
	['dark_red', '#AA0000'],
	['dark_purple', '#AA00AA'],
	['gold', '#FFAA00'],
	['gray', '#AAAAAA'],
	['grey', '#AAAAAA'],
	['dark_gray', '#555555'],
	['dark_grey', '#555555'],
	['blue', '#5555FF'],
	['green', '#55FF55'],
	['aqua', '#55FFFF'],
	['red', '#FF5555'],
	['light_purple', '#FF55FF'],
	['yellow', '#FFFF55'],
	['white', '#FFFFFF']
]);

export function findMinecraftTextColorTokens(text: string): MinecraftTextColorToken[] {
	return [
		...findLegacyColorTokens(text),
		...findMiniMessageColorTokens(text)
	].sort((left, right) => left.start - right.start);
}

export function findMinecraftTextColorLinePreviews(text: string): MinecraftTextColorLinePreview[] {
	const previews: MinecraftTextColorLinePreview[] = [];
	const lines = text.split('\n');

	lines.forEach((lineText, line) => {
		const tokens = findMinecraftTextColorTokens(lineText);
		const parts: MinecraftTextColorPreviewPart[] = [];

		if (tokens.length === 0) {
			const plainPreview = plainTextLinePreview(lines, line, lineText);
			if (plainPreview) {
				previews.push(plainPreview);
			}
			return;
		}

		if (!isFormattedTextPreviewLine(lines, line, lineText)) {
			return;
		}

		tokens.forEach((token, index) => {
			const nextTokenStart = tokens[index + 1]?.start ?? lineText.length;
			const rawPreview = lineText.slice(token.end, nextTokenStart);
			const previewText = stripFormatting(rawPreview).trim().replace(/^['"]|['"]$/g, '');
			if (!previewText) {
				return;
			}

			const style = parseInlineStyle(rawPreview);
			parts.push({
				text: previewText,
				color: token.color,
				bold: style.bold,
				italic: style.italic
			});
		});

		if (parts.length > 0) {
			const startCharacter = formattedTextValueStart(lineText, tokens[0].start);
			const endCharacter = formattedTextValueEnd(lineText, startCharacter, lineText.length);
			previews.push({
				line,
				character: endCharacter,
				startCharacter,
				endCharacter,
				parts
			});
		}
	});

	return previews;
}

function plainTextLinePreview(lines: string[], line: number, lineText: string): MinecraftTextColorLinePreview | undefined {
	const direct = lineText.match(/^(\s*)([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/);
	if (direct && shouldPreviewDirectTextProperty(lines, line, direct[2], direct[1].length)) {
		const scalar = readPlainScalarValue(lineText, direct[0].indexOf(direct[3]));
		return scalarPreview(line, scalar);
	}

	const item = lineText.match(/^(\s*)-\s+(.+?)\s*$/);
	if (item && isInsideLore(lines, line, item[1].length)) {
		const scalar = readPlainScalarValue(lineText, item[0].indexOf(item[2]));
		return scalarPreview(line, scalar);
	}

	return undefined;
}

function isFormattedTextPreviewLine(lines: string[], line: number, lineText: string): boolean {
	const direct = lineText.match(/^(\s*)([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/);
	if (direct) {
		return shouldPreviewDirectTextProperty(lines, line, direct[2], direct[1].length);
	}

	const item = lineText.match(/^(\s*)-\s+(.+?)\s*$/);
	if (item) {
		return isInsideLore(lines, line, item[1].length);
	}

	return true;
}

function shouldPreviewDirectTextProperty(lines: string[], line: number, property: string, indent: number): boolean {
	if (!TEXT_PREVIEW_PROPERTIES.has(property)) {
		return false;
	}
	if (property !== 'name') {
		return true;
	}

	const parentKeys = parentKeysForLine(lines, line, indent);
	return !parentKeys.some(parentKey => TECHNICAL_NAME_PARENT_KEYS.has(parentKey));
}

function parentKeysForLine(lines: string[], line: number, indent: number): string[] {
	const parents: { indent: number; key: string }[] = [];
	for (let index = 0; index < line; index++) {
		const lineText = lines[index] ?? '';
		const match = lineText.match(/^(\s*)([^:#][^:]*):\s*$/);
		if (!match) {
			continue;
		}

		const parentIndent = match[1].length;
		while (parents.length > 0 && parents[parents.length - 1].indent >= parentIndent) {
			parents.pop();
		}
		if (parentIndent < indent) {
			parents.push({ indent: parentIndent, key: match[2].trimEnd() });
		}
	}

	return parents.map(parent => parent.key);
}

function scalarPreview(
	line: number,
	scalar: { startCharacter: number; endCharacter: number; value: string } | undefined
): MinecraftTextColorLinePreview | undefined {
	const value = scalar?.value;
	if (!value || /^<lang:[^>]+>$/i.test(value) || /^display-[\w.-]+$/i.test(value)) {
		return undefined;
	}

	return {
		line,
		character: scalar.endCharacter,
		startCharacter: scalar.startCharacter,
		endCharacter: scalar.endCharacter,
		parts: [{ text: value, color: '#FFFFFF', bold: false, italic: false }]
	};
}

function readPlainScalarValue(lineText: string, valueStart: number): { startCharacter: number; endCharacter: number; value: string } | undefined {
	let start = valueStart;
	while (start < lineText.length && /\s/.test(lineText[start])) {
		start++;
	}

	if (start >= lineText.length) {
		return undefined;
	}

	const quote = lineText[start];
	if (quote === '"' || quote === "'") {
		for (let index = start + 1; index < lineText.length; index++) {
			if (lineText[index] === quote && lineText[index - 1] !== '\\') {
				return {
					startCharacter: start,
					endCharacter: index + 1,
					value: lineText.slice(start + 1, index)
				};
			}
		}
		return undefined;
	}

	const commentStart = lineText.indexOf(' #', start);
	const end = commentStart === -1 ? lineText.length : commentStart;
	const valueEnd = lineText.slice(0, end).trimEnd().length;
	const value = lineText.slice(start, valueEnd).trim();
	return value
		? { startCharacter: start, endCharacter: valueEnd, value }
		: undefined;
}

function isInsideLore(lines: string[], line: number, itemIndent: number): boolean {
	for (let index = line - 1; index >= 0; index--) {
		const parentLine = lines[index] ?? '';
		if (!parentLine.trim()) {
			continue;
		}

		const indent = parentLine.match(/^\s*/)?.[0].length ?? 0;
		if (indent >= itemIndent) {
			continue;
		}

		return /^\s*lore\s*:\s*$/.test(parentLine);
	}

	return false;
}

export function formatMinecraftTextPreviewParts(value: string, defaultColor = '#FFFFFF'): MinecraftTextColorPreviewPart[] {
	const formattedPreview = findMinecraftTextColorLinePreviews(value)[0];
	if (formattedPreview?.parts.length) {
		return formattedPreview.parts;
	}

	const text = stripFormatting(value).trim().replace(/^['"]|['"]$/g, '');
	return [{ text, color: defaultColor, bold: false, italic: false }];
}

function formattedTextValueStart(lineText: string, firstTokenStart: number): number {
	const colon = lineText.lastIndexOf(':', firstTokenStart);
	if (colon !== -1) {
		return firstNonWhitespaceAfter(lineText, colon + 1);
	}

	const dash = lineText.lastIndexOf('-', firstTokenStart);
	if (dash !== -1 && lineText.slice(0, dash).trim() === '') {
		return firstNonWhitespaceAfter(lineText, dash + 1);
	}

	if (firstTokenStart > 0 && /^['"]$/.test(lineText[firstTokenStart - 1])) {
		return firstTokenStart - 1;
	}

	return firstTokenStart;
}

function formattedTextValueEnd(lineText: string, startCharacter: number, fallbackEnd: number): number {
	const quote = lineText[startCharacter];
	if (quote === '"' || quote === "'") {
		for (let index = startCharacter + 1; index < lineText.length; index++) {
			if (lineText[index] === quote && lineText[index - 1] !== '\\') {
				return index + 1;
			}
		}
	}

	const commentStart = lineText.indexOf(' #', startCharacter);
	return commentStart === -1 ? fallbackEnd : commentStart;
}

function firstNonWhitespaceAfter(text: string, start: number): number {
	let index = start;
	while (index < text.length && /\s/.test(text[index])) {
		index++;
	}
	return index;
}

function findLegacyColorTokens(text: string): MinecraftTextColorToken[] {
	const tokens: MinecraftTextColorToken[] = [];

	let match: RegExpExecArray | null;
	const hexPattern = /[&§]#([0-9a-fA-F]{6})/g;
	while ((match = hexPattern.exec(text))) {
		tokens.push({
			start: match.index,
			end: match.index + match[0].length,
			color: `#${match[1].toUpperCase()}`,
			label: match[0]
		});
	}

	const bungeeHexPattern = /[&§]x(?:[&§][0-9a-fA-F]){6}/g;
	while ((match = bungeeHexPattern.exec(text))) {
		const color = match[0].match(/[0-9a-fA-F]/g)?.join('');
		if (color?.length === 6) {
			tokens.push({
				start: match.index,
				end: match.index + match[0].length,
				color: `#${color.toUpperCase()}`,
				label: match[0]
			});
		}
	}

	const legacyPattern = /[&§]([0-9a-fA-F])/g;
	while ((match = legacyPattern.exec(text))) {
		if (isInsideExistingToken(match.index, tokens)) {
			continue;
		}

		const code = match[1].toLowerCase();
		tokens.push({
			start: match.index,
			end: match.index + match[0].length,
			color: LEGACY_COLORS.get(code) ?? '#FFFFFF',
			label: match[0]
		});
	}

	return tokens;
}

function findMiniMessageColorTokens(text: string): MinecraftTextColorToken[] {
	const tokens: MinecraftTextColorToken[] = [];
	const tagPattern = /<([a-zA-Z_]+|#[0-9a-fA-F]{6})(?::([^>\s]+(?:[:][^>\s]+)*))?>/g;

	let match: RegExpExecArray | null;
	while ((match = tagPattern.exec(text))) {
		const tag = match[1].toLowerCase();
		const args = match[2]?.split(':') ?? [];
		const color = miniMessageColor(tag, args);
		if (!color) {
			continue;
		}

		tokens.push({
			start: match.index,
			end: match.index + match[0].length,
			color,
			label: match[0]
		});
	}

	return tokens;
}

function miniMessageColor(tag: string, args: string[]): string | undefined {
	if (tag.startsWith('#')) {
		return tag.toUpperCase();
	}

	const namedColor = MINI_MESSAGE_COLORS.get(tag);
	if (namedColor) {
		return namedColor;
	}

	if ((tag === 'color' || tag === 'colour') && args[0]) {
		return normalizeMiniMessageColorValue(args[0]);
	}

	if ((tag === 'gradient' || tag === 'transition') && args[0]) {
		return normalizeMiniMessageColorValue(args[0]);
	}

	return undefined;
}

function normalizeMiniMessageColorValue(value: string): string | undefined {
	const normalized = value.toLowerCase();
	if (/^#[0-9a-f]{6}$/i.test(normalized)) {
		return normalized.toUpperCase();
	}

	return MINI_MESSAGE_COLORS.get(normalized);
}

function parseInlineStyle(text: string): { bold: boolean; italic: boolean } {
	return {
		bold: /[&§]l|<bold>|<b>/i.test(text),
		italic: /[&§]o|<italic>|<i>/i.test(text)
	};
}

function stripFormatting(text: string): string {
	return text
		.replace(/[&§]#([0-9a-fA-F]{6})/g, '')
		.replace(/[&§]x(?:[&§][0-9a-fA-F]){6}/g, '')
		.replace(/[&§][0-9a-fA-Fk-oK-OrR]/g, '')
		.replace(/<\/?[a-zA-Z_]+(?::[^>\s]+(?:[:][^>\s]+)*)?>/g, '')
		.replace(/<\/?#[0-9a-fA-F]{6}>/g, '');
}

function isInsideExistingToken(index: number, tokens: MinecraftTextColorToken[]): boolean {
	return tokens.some(token => index >= token.start && index < token.end);
}
