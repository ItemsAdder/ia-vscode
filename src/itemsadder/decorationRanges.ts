export interface DisabledBlockRange {
	startLine: number;
	endLine: number;
	endCharacter: number;
}

export interface LineBlockRange {
	startLine: number;
	endLine: number;
}

export function findDisabledBlockRanges(text: string): DisabledBlockRange[] {
	const lines = text.split('\n');
	const ranges: DisabledBlockRange[] = [];

	lines.forEach((line, lineIndex) => {
		if (!/^\s*enabled:\s*false\b/.test(line)) {
			return;
		}

		const ownIndent = indentOf(line);
		let startLine = lineIndex;
		let parentIndent = ownIndent;

		for (let index = lineIndex - 1; index >= 0; index--) {
			if (!lines[index].trim()) {
				continue;
			}

			const indent = indentOf(lines[index]);
			if (indent < ownIndent) {
				startLine = index;
				parentIndent = indent;
				break;
			}
		}

		let endLine = lines.length - 1;
		for (let index = startLine + 1; index < lines.length; index++) {
			if (!lines[index].trim()) {
				continue;
			}

			if (index !== startLine && indentOf(lines[index]) <= parentIndent) {
				endLine = index - 1;
				break;
			}
		}

		ranges.push({ startLine, endLine, endCharacter: lines[endLine]?.length ?? 0 });
	});

	return ranges;
}

export function findItemBlockRanges(text: string): LineBlockRange[] {
	const lines = text.split('\n');
	const itemsLine = lines.findIndex(line => line.trim() === 'items:');
	if (itemsLine === -1) {
		return [];
	}

	const ranges: LineBlockRange[] = [];
	let currentStart = -1;

	for (let index = itemsLine + 1; index < lines.length; index++) {
		const line = lines[index];
		if (!line.trim()) {
			continue;
		}

		const indent = indentOf(line);
		if (indent <= 0) {
			break;
		}

		if (indent === 2 && /^\s*[^:\s]+:\s*$/.test(line)) {
			if (currentStart !== -1) {
				ranges.push({ startLine: currentStart, endLine: index });
			}
			currentStart = index;
		}
	}

	if (currentStart !== -1) {
		ranges.push({ startLine: currentStart, endLine: lines.length });
	}

	return ranges;
}

function indentOf(line: string): number {
	return line.match(/^\s*/)?.[0].length ?? 0;
}
