const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'out');

fs.mkdirSync(outDir, { recursive: true });

for (const file of ['schemas.json', 'schemaEnums.json', 'itemsAdderPluginConfigSchema.json']) {
	const source = path.join(root, 'src', file);
	const target = path.join(outDir, file);
	fs.copyFileSync(source, target);
}
