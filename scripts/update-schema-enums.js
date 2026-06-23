#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const path = require('path');

const SCHEMA_ENUMS_PATH = path.resolve(__dirname, '../src/schemaEnums.json');
const SPIGOT_DOCS = 'https://hub.spigotmc.org/javadocs/spigot';

const SOURCES = [
	{
		name: 'Material',
		url: `${SPIGOT_DOCS}/org/bukkit/Material.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'bukkit_materials', transform: keepJavaName },
			{ def: 'materials', transform: materialNameToAliases },
			{ def: 'bukkit_blocks', parse: parseMaterialBlockConstants, transform: keepJavaName }
		]
	},
	{
		name: 'Sound',
		url: `${SPIGOT_DOCS}/org/bukkit/Sound.html`,
		section: 'Field Summary',
		targets: [
			{ def: 'vanilla_sound', transform: soundNameToKey }
		]
	},
	{
		name: 'SoundCategory',
		url: `${SPIGOT_DOCS}/org/bukkit/SoundCategory.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'bukkit_sound_category', transform: keepJavaName }
		]
	},
	{
		name: 'EntityType',
		url: `${SPIGOT_DOCS}/org/bukkit/entity/EntityType.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'bukkit_entity_type', transform: keepJavaName }
		]
	},
	{
		name: 'Enchantment',
		url: `${SPIGOT_DOCS}/org/bukkit/enchantments/Enchantment.html`,
		section: 'Field Summary',
		targets: [
			{ def: 'vanilla_enchants', transform: keepJavaName }
		]
	},
	{
		name: 'PotionType',
		url: `${SPIGOT_DOCS}/org/bukkit/potion/PotionType.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'vanilla_potion_type', transform: keepJavaName },
			{ def: 'bukkit_potion_type', transform: keepJavaName }
		]
	},
	{
		name: 'PotionEffectType',
		url: `${SPIGOT_DOCS}/org/bukkit/potion/PotionEffectType.html`,
		section: 'Field Summary',
		targets: [
			{ def: 'bukkit_potion_effect_type', transform: keepJavaName }
		]
	},
	{
		name: 'Biome',
		url: `${SPIGOT_DOCS}/org/bukkit/block/Biome.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'bukkit_biome', transform: keepJavaName }
		]
	},
	{
		name: 'TreeType',
		url: `${SPIGOT_DOCS}/org/bukkit/TreeType.html`,
		section: 'Enum Constant Summary',
		targets: [
			{ def: 'tree_type', transform: keepJavaName }
		]
	},
	{
		name: 'Color',
		url: `${SPIGOT_DOCS}/org/bukkit/Color.html`,
		section: 'Field Summary',
		targets: [
			{ def: 'colors', transform: keepJavaName, apply: applyColorEnum }
		]
	}
];

const STATIC_ENUMS = [
	{
		def: 'world_names',
		values: ['world', 'world_nether', 'world_the_end', '!world', '!world_nether', '!world_the_end', '!world_*', 'world_*'],
		base: { type: 'string', default: 'world' }
	}
];

async function main() {
	const dryRun = process.argv.includes('--dry-run');
	const schemaEnums = fs.existsSync(SCHEMA_ENUMS_PATH)
		? JSON.parse(fs.readFileSync(SCHEMA_ENUMS_PATH, 'utf8'))
		: { $defs: {} };

	schemaEnums.$defs ??= {};

	for (const source of SOURCES) {
		const html = await fetchText(source.url);
		const sourceConstants = parseJavadocConstants(html, source.section);

		for (const target of source.targets) {
			const constants = target.parse ? target.parse(html) : sourceConstants;
			if (constants.length === 0) {
				throw new Error(`No constants parsed for ${target.def} from ${source.url}`);
			}

			const values = unique(constants.flatMap(target.transform).filter(Boolean)).sort();
			if (values.length === 0) {
				throw new Error(`No values generated for $defs.${target.def}`);
			}

			const def = schemaEnums.$defs[target.def] ?? {};
			schemaEnums.$defs[target.def] = def;
			const before = target.apply ? target.apply(def, values) : applyEnum(def, values);
			console.log(`${target.def}: ${before} -> ${values.length} (${source.name})`);
		}
	}

	for (const item of STATIC_ENUMS) {
		const def = schemaEnums.$defs[item.def] ?? {};
		schemaEnums.$defs[item.def] = def;
		Object.assign(def, item.base);
		const values = unique(item.values).sort();
		const before = applyEnum(def, values);
		console.log(`${item.def}: ${before} -> ${values.length} (static)`);
	}

	if (!dryRun) {
		fs.writeFileSync(SCHEMA_ENUMS_PATH, `${JSON.stringify(schemaEnums, null, 2)}\n`);
		console.log(`Updated ${path.relative(process.cwd(), SCHEMA_ENUMS_PATH)}`);
	}
}

function applyEnum(def, values) {
	const before = Array.isArray(def.enum) ? def.enum.length : 0;
	def.enum = values;
	return before;
}

function applyColorEnum(def, values) {
	const enumOption = Array.isArray(def.anyOf) ? def.anyOf.find(option => Array.isArray(option.enum)) : undefined;
	const before = enumOption ? enumOption.enum.length : 0;
	def.anyOf = [
		{ type: 'string', enum: values },
		{ type: 'integer' }
	];
	return before;
}

function parseJavadocConstants(html, sectionTitle) {
	const section = sliceSection(html, sectionTitle) || html;
	const values = [];
	const patterns = [
		/href="#([A-Z][A-Z0-9_]+)"/g,
		/id="([A-Z][A-Z0-9_]+)"/g,
		/<h3>([A-Z][A-Z0-9_]+)<\/h3>/g,
		/<h[34][^>]*>\s*([A-Z][A-Z0-9_]+)\s*<\/h[34]>/g
	];

	for (const pattern of patterns) {
		let match;
		while ((match = pattern.exec(section))) {
			values.push(match[1]);
		}
	}

	return unique(values)
		.filter(value => !['MAX_VALUE', 'MIN_VALUE'].includes(value))
		.sort();
}

function parseMaterialBlockConstants(html) {
	const start = html.indexOf('<section class="constants-summary" id="enum-constant-summary">');
	const end = html.indexOf('<!-- =========== FIELD SUMMARY =========== -->', start);
	const section = start === -1 ? html : html.slice(start, end === -1 ? undefined : end);
	const values = [];
	const rowPattern = /<div class="col-first [^"]*"><code><a href="#([A-Z][A-Z0-9_]+)"[^>]*>[^<]+<\/a><\/code><\/div>\s*<div class="col-last [^"]*">([\s\S]*?)(?=<div class="col-first |\n<\/div>\n<\/div>)/g;
	let match;

	while ((match = rowPattern.exec(section))) {
		if (match[2].includes('BlockData:')) {
			values.push(match[1]);
		}
	}

	return unique(values).sort();
}

function sliceSection(html, sectionTitle) {
	const start = html.indexOf(sectionTitle);
	if (start === -1) {
		return undefined;
	}

	const rest = html.slice(start);
	const nextSectionMatch = rest.slice(sectionTitle.length).match(/<(?:h2|h3)[^>]*>[^<]*(?:Summary|Details)/i);
	if (!nextSectionMatch) {
		return rest;
	}

	return rest.slice(0, sectionTitle.length + nextSectionMatch.index);
}

function keepJavaName(value) {
	return value;
}

function materialNameToAliases(value) {
	return [value, value.toLowerCase()];
}

function soundNameToKey(value) {
	return value.toLowerCase().replace(/_/g, '.');
}

function unique(values) {
	return Array.from(new Set(values));
}

function fetchText(url) {
	return new Promise((resolve, reject) => {
		https.get(url, { headers: { 'User-Agent': 'ia-vscode-schema-updater/1.0' } }, response => {
			if (response.statusCode !== 200) {
				reject(new Error(`GET ${url} failed with ${response.statusCode}`));
				return;
			}

			let data = '';
			response.setEncoding('utf8');
			response.on('data', chunk => {
				data += chunk;
			});
			response.on('end', () => resolve(data));
		}).on('error', reject);
	});
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});
