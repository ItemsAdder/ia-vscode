#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const inputPath = process.argv[2];
if (!inputPath) {
	console.error('Usage: node scripts/update-itemsadder-config-schema.js /path/to/config.yml');
	process.exit(2);
}

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'src', 'itemsAdderPluginConfigSchema.json');
const config = YAML.parse(fs.readFileSync(inputPath, 'utf8'));

const schema = {
	$id: 'itemsadder://schema/itemsadder-plugin-config',
	title: 'ItemsAdder config.yml',
	markdownDescription: 'ItemsAdder main plugin config.yml. Detected by `resource-pack.uuid`.',
	type: 'object',
	additionalProperties: true,
	properties: inferObjectProperties(config)
};

applyOverrides(schema, [
	{
		path: ['cooldown_bars', 'bossbar', 'color'],
		schema: {
			type: 'string',
			enum: ['PINK', 'BLUE', 'RED', 'GREEN', 'YELLOW', 'PURPLE', 'WHITE'],
			markdownDescription: 'Bukkit bossbar color.'
		}
	},
	{
		path: ['cooldown_bars', 'bossbar', 'style'],
		schema: {
			type: 'string',
			enum: ['SOLID', 'SEGMENTED_6', 'SEGMENTED_10', 'SEGMENTED_12', 'SEGMENTED_20'],
			markdownDescription: 'Bukkit bossbar style.'
		}
	},
	{
		path: ['player_stats', 'save_type'],
		schema: {
			type: 'string',
			enum: ['CUSTOM_NBT', 'PLAYER_DAT']
		}
	},
	{
		path: ['server', 'port'],
		schema: {
			anyOf: [
				{ type: 'integer', minimum: 1, maximum: 65535 },
				{ type: 'string', const: 'auto' }
			]
		}
	}
]);
applyDescriptions(schema, [
	{
		path: ['resource-pack'],
		description: 'Resource pack download, hosting, protection, prompt, font and zip generation settings.'
	},
	{
		path: ['resource-pack', 'uuid'],
		description: 'Stable identifier used by ItemsAdder for the generated resource pack configuration.'
	},
	{
		path: ['resource-pack', 'auto_apply'],
		description: 'Controls whether ItemsAdder automatically sends the resource pack to players.'
	},
	{
		path: ['resource-pack', 'auto_apply', 'enabled'],
		description: 'Enable automatic resource pack application when players join.'
	},
	{
		path: ['resource-pack', 'auto_apply', 'before_join'],
		description: 'Apply the resource pack before the player fully joins, when supported by the server.'
	},
	{
		path: ['resource-pack', 'auto_apply', 'delay_ticks'],
		description: 'Ticks to wait before sending the resource pack prompt.'
	},
	{
		path: ['resource-pack', 'kick-player-on-decline'],
		description: 'Kick players that decline the required resource pack.'
	},
	{
		path: ['resource-pack', 'kick-player-on-fail'],
		description: 'Kick players when the resource pack download or application fails.'
	},
	{
		path: ['resource-pack', 'hosting'],
		description: 'Choose exactly one resource pack hosting method. Official docs recommend LobFile, simple self host, or self-host depending on the setup. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting)'
	},
	{
		path: ['resource-pack', 'hosting', 'no-host'],
		description: 'Expert mode: ItemsAdder does not host or apply the pack because another plugin, proxy, or server handles it. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting/no-host)'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host'],
		description: 'Plug-and-play hosting introduced for ItemsAdder 4.0.17+. It does not require manual port forwarding; generate the pack with `/iazip`. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting)'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host', 'server_address'],
		description: 'Optional address and port for simple self host. `auto` lets ItemsAdder decide it automatically.'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host', 'optimization'],
		description: 'Download protection and throttling options for simple self host.'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host', 'optimization', 'block_non_game_requests'],
		description: 'Block requests that do not look like Minecraft client resource pack downloads.'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host', 'optimization', 'max_downloads_per_ip'],
		description: 'Maximum number of downloads allowed from the same IP during the configured window.'
	},
	{
		path: ['resource-pack', 'hosting', 'simple_self_host', 'optimization', 'max_speed_in_megabyte_ps'],
		description: 'Maximum resource pack download speed per connection, in megabytes per second.'
	},
	{
		path: ['resource-pack', 'hosting', 'lobfile'],
		description: 'Automatically uploads the pack to LobFile. This avoids exposing the server IP and reduces server bandwidth usage. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting/lobfile)'
	},
	{
		path: ['resource-pack', 'hosting', 'external-host'],
		description: 'Use an externally hosted resource pack URL, such as Google Drive, Dropbox, OneDrive, CDN, or custom hosting. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting/google-drive)'
	},
	{
		path: ['resource-pack', 'hosting', 'external-host', 'url'],
		description: 'Direct downloadable URL of the generated resource pack zip. Reload ItemsAdder after changing it.'
	},
	{
		path: ['resource-pack', 'hosting', 'external-host', 'skip_url_file_type_check'],
		description: 'Skip ItemsAdder URL file type checks. Use only when your external host cannot expose a normal zip URL.'
	},
	{
		path: ['resource-pack', 'hosting', 'self-host'],
		description: 'Host the pack directly from the Minecraft server. Useful while developing because `/iazip` updates the hosted pack immediately. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/resourcepack-hosting/self-hosting)'
	},
	{
		path: ['resource-pack', 'hosting', 'self-host', 'server-ip'],
		description: 'Public address used by players to download the pack. Use the server IP, or a proxied pack domain when configured.'
	},
	{
		path: ['resource-pack', 'hosting', 'self-host', 'pack-port'],
		description: 'Dedicated resource pack hosting port. This is not the Minecraft server port.'
	},
	{
		path: ['resource-pack', 'hosting', 'self-host', 'append-port'],
		description: 'Append `pack-port` to the generated pack URL. Disable it when a proxy or domain rule already maps the port.'
	},
	{
		path: ['resource-pack', 'hosting', 'self-host', 'protection'],
		description: 'Protection and rate limit settings for the self-hosted pack endpoint.'
	},
	{
		path: ['resource-pack', 'custom-font'],
		description: 'Custom font settings used by ItemsAdder generated resource pack text rendering.'
	},
	{
		path: ['resource-pack', 'zip'],
		description: 'Options used while generating the resource pack zip with `/iazip`.'
	},
	{
		path: ['resource-pack', 'zip', 'merge_other_plugins_resourcepacks_folders'],
		description: 'Merge resource pack folders provided by other plugins into the generated ItemsAdder pack.'
	},
	{
		path: ['config_files'],
		description: 'Language and config loading options. `lang` controls plugin messages, while `dictionaries-lang` controls ItemsAdder dictionary text. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/languages)'
	},
	{
		path: ['config_files', 'lang'],
		description: 'Language file name used for ItemsAdder commands, messages, and GUIs.'
	},
	{
		path: ['config_files', 'dictionaries-lang'],
		description: 'Dictionary language used by ItemsAdder legacy dictionaries for item names, lore, and menu categories.'
	},
	{
		path: ['items'],
		description: 'Global item behavior settings, including updater and legacy item conversion options.'
	},
	{
		path: ['items', 'auto_update'],
		description: 'Globally controls automatic updates for custom items already present in inventories or the world. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/items-updater)'
	},
	{
		path: ['items', 'auto_update', 'enabled'],
		description: 'Enable automatic updating for every custom item unless disabled in that item configuration.'
	},
	{
		path: ['items', 'auto_update', 'fix_unstackable_items_on_click'],
		description: 'Force merge clicked custom items that share the same namespace and id even when display data differs.'
	},
	{
		path: ['blocks'],
		description: 'Global custom block conversion, placement, liquid, palette and compatibility settings.'
	},
	{
		path: ['blocks', 'fix-liquids-flow'],
		description: 'Fix liquid flow interactions around custom blocks.'
	},
	{
		path: ['blocks', 'fix-floating-blocks'],
		description: 'Fix unsupported floating custom blocks after nearby block updates.'
	},
	{
		path: ['blocks', 'fix-glitched-blocks'],
		description: 'Repair glitched custom blocks in chunks. Do not enable together with vanilla block conversion.'
	},
	{
		path: ['blocks', 'convert-vanilla-blocks'],
		description: 'Convert matching vanilla blocks into ItemsAdder custom blocks. Do not enable together with glitched block fixing.'
	},
	{
		path: ['crops'],
		description: 'Global defaults for custom crop growth and rendering. Custom crops require ItemsAdder 4.0.15+ and Minecraft 1.21.4+. [Docs](https://itemsadder.devs.beer/adding-content/crops)'
	},
	{
		path: ['crops', 'avg_seconds_per_stage'],
		description: 'Default average seconds for a crop to grow by one stage under optimal conditions.'
	},
	{
		path: ['crops', 'max_crops_in_area'],
		description: 'Maximum custom crops allowed in the configured area to limit performance cost.'
	},
	{
		path: ['crops', 'area_limit_blocks_radius'],
		description: 'Radius used by the crop area limit.'
	},
	{
		path: ['crops', 'rendering'],
		description: 'Performance-related rendering options for custom crops.'
	},
	{
		path: ['crops', 'rendering', 'billboard'],
		description: 'Billboard rendering uses simpler far-away crop models for better client performance.'
	},
	{
		path: ['font_images'],
		description: 'Global support settings for ItemsAdder font images, glyphs, emojis, GUI glyphs and related placeholders. [Docs](https://itemsadder.devs.beer/adding-content/font-images)'
	},
	{
		path: ['font_images', 'chat'],
		description: 'Controls font image replacement and suggestions in chat.'
	},
	{
		path: ['font_images', 'iaimage-book'],
		description: 'Controls `/iaimage` book output formatting.'
	},
	{
		path: ['font_images', 'command'],
		description: 'Controls font image replacement in commands and command blocks.'
	},
	{
		path: ['font_images', 'customitem_name_and_lore'],
		description: 'Controls font image replacement in custom item names and lore.'
	},
	{
		path: ['font_images', 'sign'],
		description: 'Controls font image replacement on signs.'
	},
	{
		path: ['font_images', 'book'],
		description: 'Controls font image replacement in books.'
	},
	{
		path: ['font_images', 'anvil'],
		description: 'Controls font image replacement in anvil rename text.'
	},
	{
		path: ['font_images', 'inventory-title'],
		description: 'Controls font image replacement in inventory titles.'
	},
	{
		path: ['text_effects'],
		description: 'Special animated and coloring text effects. Requires Minecraft 1.17+ clients and resource pack regeneration with `/iazip`. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/text-effects-1.17+)'
	},
	{
		path: ['text_effects', 'enabled'],
		description: 'Enable ItemsAdder text effects globally.'
	},
	{
		path: ['entities'],
		description: 'Global limits and compatibility options for ItemsAdder custom entities, furniture and vehicles. [Docs](https://itemsadder.devs.beer/adding-content/entities)'
	},
	{
		path: ['entities', 'max-furniture-vehicles-per-chunk'],
		description: 'Maximum furniture vehicles allowed in one chunk.'
	},
	{
		path: ['entities', 'max_furniture_per_chunk'],
		description: 'Maximum furniture entities allowed in one chunk.'
	},
	{
		path: ['entities', 'custom_entities'],
		description: 'Global settings for ItemsAdder custom entities.'
	},
	{
		path: ['recipes'],
		description: 'Global recipe system settings for crafting, cooking, anvil, smithing, recipe book unlocks and vanilla recipe removal. [Docs](https://itemsadder.devs.beer/adding-content/recipes)'
	},
	{
		path: ['recipes', 'crafting'],
		description: 'Enable or disable ItemsAdder crafting table recipes.'
	},
	{
		path: ['recipes', 'cooking'],
		description: 'Enable or disable ItemsAdder furnace, smoker, campfire and blasting recipes.'
	},
	{
		path: ['recipes', 'anvil'],
		description: 'Enable or disable ItemsAdder anvil recipes.'
	},
	{
		path: ['recipes', 'smithing'],
		description: 'Enable or disable ItemsAdder smithing recipes.'
	},
	{
		path: ['recipes', 'remove-vanilla-recipes'],
		description: 'Remove selected vanilla recipes from the server.'
	},
	{
		path: ['player_stats'],
		description: 'Custom player stats added by ItemsAdder. They can be read by commands, PlaceholderAPI, and HUDs. [Docs](https://itemsadder.devs.beer/other/custom-player-stats)'
	},
	{
		path: ['player_stats', 'save_type'],
		description: '`CUSTOM_NBT` stores stats in ItemsAdder storage; `PLAYER_DAT` stores them in the vanilla player.dat file.'
	},
	{
		path: ['huds'],
		description: 'Global HUD feature settings. HUDs can also display ItemsAdder custom player stats.'
	},
{
	path: ['cooldown_bars'],
	description: 'Global cooldown bar rendering options.'
},
{ path: ['server'], description: 'Server address and port detection settings used for generated resource pack URLs and network-aware plugin features.' },
{ path: ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit'], description: 'Rate limit protection for the self-hosted resource pack endpoint.' },
{ path: ['resource-pack', 'hosting', 'self-host', 'protection', 'rate_limit', 'cooldown'], description: 'Cooldown, in seconds, before the same address can retry after hitting the self-host rate limit.' },
{ path: ['resource-pack', 'title'], description: 'Title shown in the Minecraft resource pack prompt when ItemsAdder sends the pack to players.' },
{ path: ['resource-pack', 'protect-player'], description: 'Prevents or limits player actions while the required resource pack is being applied.' },
{ path: ['resource-pack', 'command'], description: 'Settings for the resource pack command and its cooldown behavior.' },
{ path: ['resource-pack', 'thin-font'], description: 'Thin font generation settings for the ItemsAdder resource pack.' },
{ path: ['resource-pack', 'zip', 'protect-file-from-unzip'], description: 'Adds zip protection markers to discourage manual extraction of the generated resource pack.' },
{ path: ['resource-pack', 'zip', 'compress_sounds'], description: 'Audio compression settings used while generating the resource pack zip.' },
{ path: ['resource-pack', 'zip', 'custom_armors_shaders_legacy'], description: 'Legacy custom armor shader and CIT generation options for older clients and compatibility packs.' },
{ path: ['resource-pack', 'zip', 'custom_armors_shaders_legacy', 'vanilla'], description: 'Legacy custom armor shader generation for vanilla clients.' },
{ path: ['resource-pack', 'zip', 'custom_armors_shaders_legacy', 'vanilla', 'generate_shader'], description: 'Minecraft-version-specific switches for generating legacy vanilla armor shader files.' },
{ path: ['resource-pack', 'zip', 'custom_armors_shaders_legacy', 'optifine'], description: 'OptiFine CIT compatibility generation for legacy custom armor resource packs. [Issue context](https://github.com/PluginBugs/Issues-ItemsAdder/issues/4004)' },
{ path: ['resource-pack', 'zip', 'custom_armors_shaders_legacy', 'optifine', 'generate_cit'], description: 'Minecraft-version-specific switches for generating OptiFine CIT files for custom armor.' },
{ path: ['resource-pack', 'zip', 'emotes'], description: 'Resource pack shader and model compatibility options for ItemsAdder emotes.' },
{ path: ['resource-pack', 'zip', 'models'], description: 'Model generation fixes applied while building the resource pack zip.' },
{ path: ['resource-pack', 'zip', 'models', 'fix_1_21_11_plus_atlas_items_models'], description: 'Fixes Minecraft 1.21.11+ item model atlas issues when merged models use item textures. [Issue context](https://github.com/PluginBugs/Issues-ItemsAdder/issues/5282)' },
{ path: ['resource-pack', 'zip', 'models', 'fix_1_21_11_plus_atlas_items_models', 'models'], description: 'Model names affected by the Minecraft 1.21.11+ item atlas compatibility fix.' },
{ path: ['resource-pack', 'zip', 'ignore-files-ext'], description: 'File extensions ignored when ItemsAdder builds the generated resource pack zip.' },
{ path: ['resource-pack', 'zip', 'contents-folders-priority'], description: 'Content folder priority order used when multiple packs define the same generated resource pack asset.' },
{ path: ['resource-pack', 'items'], description: 'Generated item model settings for ItemsAdder custom items.' },
{ path: ['resource-pack', 'items', 'CustomModelData-starting-value'], description: 'Starting CustomModelData values per material, or `ALL`, used for generated item models.' },
{ path: ['resource-pack', 'custom_blocks_sounds_patch'], description: 'Patches generated resource pack sound data so custom blocks can use step, break, place, and related sounds.' },
{ path: ['resource-pack', 'pre_1_21_2_shaders_fix'], description: 'Compatibility shader fix for clients older than Minecraft 1.21.2.' },
{ path: ['blocks', 'custom'], description: 'Feature toggles for ItemsAdder custom block implementations and their backing vanilla block types.' },
{ path: ['blocks', 'worlds'], description: 'World allow or deny patterns where ItemsAdder custom block features are active.' },
{ path: ['blocks', 'cancel-break-wrong-tool'], description: 'Cancels custom block breaking when the player uses a wrong tool and optionally shows feedback.' },
{ path: ['items', 'fix_trades_guis_match_custom_items'], description: 'Makes trade and GUI item matching aware of ItemsAdder custom item metadata.' },
{ path: ['items', 'optimizations'], description: 'Performance and anti-spam settings for custom item interactions.' },
{ path: ['items', 'optimizations', 'kick_on_quickbar_spam'], description: 'Kicks players who spam quickbar or hotbar item interactions above the configured threshold.' },
{ path: ['items', 'update-legacy-items'], description: 'Updates old ItemsAdder item metadata to the current format when items are detected.' },
{ path: ['liquids'], description: 'Global feature toggle for ItemsAdder custom liquids.' },
{ path: ['huds', 'force_color'], description: 'Forces a global text color for ItemsAdder HUD rendering.' },
{ path: ['cooldown_bars', 'bossbar'], description: 'BossBar renderer settings for ItemsAdder cooldown bars.' },
{ path: ['loots'], description: 'Global loot behavior settings for ItemsAdder custom drops.' },
{ path: ['compatibility'], description: 'Compatibility toggles for external plugins and legacy integrations.' },
{ path: ['compatibility', 'worldguard'], description: 'WorldGuard compatibility settings for ItemsAdder regions, flags, furniture, and custom interactions.' },
{ path: ['compatibility', 'advanced_enchantments'], description: 'AdvancedEnchantments compatibility for enchantments used by ItemsAdder custom items.' },
{ path: ['font_images', 'command', 'excluded'], description: 'Commands where ItemsAdder font image replacement is disabled.' },
{ path: ['font_images', 'scoreboard-teams'], description: 'Font image replacement settings for scoreboard team prefixes and suffixes.' },
{ path: ['text_effects', 'chat'], description: 'Enables ItemsAdder text effects in chat messages. [Docs](https://itemsadder.devs.beer/plugin-usage/plugin-configuration/text-effects-1.17+)' },
{ path: ['text_effects', 'customitem_name_and_lore'], description: 'Enables ItemsAdder text effects in custom item names and lore.' },
{ path: ['text_effects', 'sign'], description: 'Enables ItemsAdder text effects on signs.' },
{ path: ['text_effects', 'book'], description: 'Enables ItemsAdder text effects in books.' },
{ path: ['text_effects', 'anvil'], description: 'Enables ItemsAdder text effects in anvil rename text.' },
{ path: ['entities', 'custom_entities', 'emotes'], description: 'Custom entity emote compatibility settings.' },
{ path: ['entities', 'custom_entities', 'expert_users'], description: 'Advanced custom entity packet and performance options. Change only when you understand the impact.' },
{ path: ['entities', 'furniture'], description: 'Global settings for ItemsAdder furniture entities and furniture placement behavior.' },
{ path: ['crops', 'rendering', 'checkerboard_pattern'], description: 'Checkerboard rendering options for custom crops, used to reduce visual repetition and improve crop visibility.' },
{ path: ['recipes', 'custom-recipes'], description: 'Controls registration and unlock behavior for ItemsAdder custom recipes. [Docs](https://itemsadder.devs.beer/adding-content/recipes)' },
{ path: ['recipes', 'custom-recipes', 'unlock'], description: 'Controls when ItemsAdder custom recipes are unlocked for players.' },
{ path: ['recipes', 'remove-vanilla-recipes', 'list'], description: 'Vanilla materials or recipe keys to remove from the server recipe registry.' },
{ path: ['advanced'], description: 'Advanced ItemsAdder behavior and migration settings. Change only when needed for compatibility or debugging.' },
{ path: ['advanced', 'legacy_shader_armor_conversion'], description: 'Migration options for converting legacy shader armor data to newer equipment-based formats.' },
{ path: ['advanced', 'legacy_shader_armor_conversion', 'append_new_equipment_tag'], description: 'Appends the new equipment tag while keeping legacy armor shader data.' },
{ path: ['advanced', 'legacy_shader_armor_conversion', 'completely_convert_to_new_equipment_tag'], description: 'Fully converts legacy shader armor data to the new equipment tag format.' },
{ path: ['advanced', 'ffmpeg'], description: 'FFmpeg integration settings used by ItemsAdder for media conversion tasks such as audio processing.' },
{ path: ['advanced', 'on_registries_changes'], description: 'Actions to run when Minecraft registries change and clients may need to refresh server state.' },
{ path: ['advanced', 'on_registries_changes', 'auto_re_join'], description: 'Automatically reconnects players when registry changes require a clean client-server state.' },
{ path: ['advanced', 'on_registries_changes', 'kick'], description: 'Kicks players when registry changes require manual reconnection.' },
{ path: ['debug'], description: 'Debug logging settings for ItemsAdder systems. Enable only while diagnosing issues.' },
{ path: ['debug', 'resourcepacks'], description: 'Debug logging for resource pack generation, compression, overlays, and player installation.' },
{ path: ['debug', 'resourcepacks', 'compression'], description: 'Debug logging for resource pack compression operations.' },
{ path: ['debug', 'items'], description: 'Debug logging for custom item loading, reloading, warnings, loots, HUDs, armors, and related systems.' },
{ path: ['debug', 'recipes'], description: 'Debug logging for custom recipe loading, disabled recipes, vanilla recipe removal, and packet-size fixes.' },
{ path: ['debug', 'blocks'], description: 'Debug logging for custom block conversion, saving, loading, and unusual break handling.' },
{ path: ['debug', 'blocks', 'log-save-load'], description: 'Logs custom block save/load operations, optionally only when they exceed a minimum duration.' },
{ path: ['debug', 'blocks-populators'], description: 'Debug logging for block populators while loading or skipping world generation rules.' },
{ path: ['debug', 'trees-populators'], description: 'Debug logging for custom tree populators.' },
{ path: ['debug', 'surface-decorators'], description: 'Debug logging for surface decorator generation.' },
{ path: ['debug', 'cave-decorators'], description: 'Debug logging for cave decorator generation.' },
{ path: ['debug', 'player-stats'], description: 'Debug logging for custom player stat loading, saving, and updates.' },
{ path: ['debug', 'performance'], description: 'Debug logging for performance-sensitive ItemsAdder operations.' },
{ path: ['debug', 'huds'], description: 'Debug logging for HUD loading and rendering behavior.' },
{ path: ['debug', 'other'], description: 'Miscellaneous debug logging for ItemsAdder systems not covered by more specific sections.' },
{ path: ['debug', 'categories'], description: 'Debug logging for category and GUI category loading.' },
{ path: ['debug', 'entities'], description: 'Debug logging for custom entities, furniture, and related entity systems.' },
{ path: ['debug', 'issues'], description: 'Extra diagnostics useful when reporting ItemsAdder issues.' },
{ path: ['debug', 'scripts'], description: 'Debug logging for ItemsAdder script loading and execution.' }
]);

applyDefaultMarkdownDescriptions(schema);
fs.writeFileSync(outputPath, `${JSON.stringify(schema, null, 2)}\n`);
console.log(`Updated ${path.relative(root, outputPath)}`);

function inferSchema(value) {
	if (Array.isArray(value)) {
		return {
			type: 'array',
			items: value.length > 0 ? inferSchema(value[0]) : {}
		};
	}

	if (value && typeof value === 'object') {
		return {
			type: 'object',
			additionalProperties: true,
			properties: inferObjectProperties(value)
		};
	}

	if (typeof value === 'boolean') {
		return { type: 'boolean', default: value };
	}

	if (typeof value === 'number') {
		return { type: Number.isInteger(value) ? 'integer' : 'number', default: value };
	}

	return { type: 'string', default: value == null ? '' : String(value) };
}

function inferObjectProperties(value) {
	return Object.fromEntries(
		Object.entries(value ?? {}).map(([key, child]) => [key, inferSchema(child)])
	);
}

function applyOverrides(schema, overrides) {
	for (const override of overrides) {
		let current = schema;
		for (const segment of override.path) {
			current = current.properties?.[segment];
			if (!current) {
				break;
			}
		}

		if (current) {
			Object.assign(current, override.schema);
		}
	}
}

function applyDescriptions(schema, descriptions) {
	for (const entry of descriptions) {
		let current = schema;
		for (const segment of entry.path) {
			current = current.properties?.[segment];
			if (!current) {
				break;
			}
		}

		if (current) {
			current.markdownDescription = entry.description;
		}
	}
}

function applyDefaultMarkdownDescriptions(node) {
	if (!node || typeof node !== 'object') {
		return;
	}

	if (Object.prototype.hasOwnProperty.call(node, 'default')) {
		const prefix = `(default: \`${formatDefaultValue(node.default)}\`)`;
		node.markdownDescription = node.markdownDescription ? `${prefix} ${node.markdownDescription}` : prefix;
	}

	if (node.properties) {
		Object.values(node.properties).forEach(applyDefaultMarkdownDescriptions);
	}
	if (node.items) {
		applyDefaultMarkdownDescriptions(node.items);
	}
	for (const entry of node.anyOf ?? []) {
		applyDefaultMarkdownDescriptions(entry);
	}
}

function formatDefaultValue(value) {
	if (typeof value === 'string') {
		return value === '' ? '""' : value.replace(/`/g, '\\`');
	}
	return String(value);
}
