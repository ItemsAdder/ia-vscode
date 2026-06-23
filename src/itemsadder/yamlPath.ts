export interface TextPosition {
	line: number;
	character: number;
}

export function getYamlParentPathFromText(text: string, position: TextPosition): string[] {
	const lines = text.split('\n');
	const indentStack: { indent: number; key: string }[] = [];
	let currentIndent = position.character;

	for (let i = position.line; i >= 0; i--) {
		const line = lines[i] ?? '';
		const arrayMatch = line.match(/^(\s*)-\s+/);
		if (arrayMatch) {
			const indent = arrayMatch[1].length;
			if (indent < currentIndent) {
				currentIndent = indent;
			}
			continue;
		}

		const keyMatch = line.match(/^(\s*)([^:]+):/);
		if (keyMatch) {
			const indent = keyMatch[1].length;
			const key = keyMatch[2];

			if (indent < currentIndent) {
				indentStack.push({ indent, key });
				currentIndent = indent;
			}
		}
	}

	const path = indentStack.reverse().map(item => item.key);
	const currentLine = lines[position.line] ?? '';
	const valueMatch = currentLine.match(/^(\s*)([^:]+):\s*(.*)/);

	if (valueMatch && valueMatch[3].trim() === '') {
		path.push(valueMatch[2]);
	} else if (currentLine.trim().startsWith('-')) {
		for (let i = position.line - 1; i >= 0; i--) {
			const line = lines[i] ?? '';
			const keyMatch = line.match(/^(\s*)([^:]+):/);
			if (!keyMatch) {
				continue;
			}

			const indent = keyMatch[1].length;
			if (indent < currentIndent) {
				path.push(keyMatch[2]);
				break;
			}
		}
	}

	return path;
}

export function getYamlSameLevelPropertiesFromText(text: string, position: TextPosition): string[] {
	const lines = text.split('\n');
	const properties: string[] = [];
	const currentIndent = position.character;

	for (let i = position.line; i >= 0; i--) {
		const line = lines[i] ?? '';
		const match = line.match(/^(\s*)([^:]+):/);
		if (!match) {
			continue;
		}

		const indent = match[1].length;
		const key = match[2];

		if (indent === currentIndent) {
			properties.push(key);
		} else if (indent < currentIndent) {
			break;
		}
	}

	return properties;
}
