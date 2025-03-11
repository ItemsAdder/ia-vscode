/* eslint-disable @typescript-eslint/naming-convention */
export const schemas = {
    "$id": "itemsadder://schema/itemsadder-resource",
    "title": "ItemsAdder Resource",
    "type": "object",
    "required": [
        "info"
    ],
    "properties": {
        "info": {
            "type": "object",
            "kind": 2,
            "detail": "(object)",
            "required": [
                "namespace"
            ],
            "properties": {
                "namespace": {
                    "type": "string",
                    "default": "myitems",
                    "markdownDescription": "Namespace"
                },
                "dictionary-lang": {
                    "type": "string",
                    "markdownDescription": "This special property is used by dictionaries. Add it only if you're using the 'dictionary' attribute.\nExample: dictionary-lang: \"en\""
                }
            }
        },
        "items": {
            "type": "object",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/item"
            },
            "properties": {
                "my_custom_item": { "$ref": "#/$defs/item" }
            }
        },
        "recipes": {
            "type": "object",
            "properties": {
                "crafting_table": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(recipes)",
                    "markdownDescription": "Crafting table recipes",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/recipe.craft"
                    },
                    "properties": {
                        "my_craft_recipe": { "type": "object", "$ref": "#/$defs/recipe.craft" }
                    }
                },
                "cooking": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(recipes)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/recipe.cooking"
                    },
                    "properties": {
                        "my_cooking_recipe": { "type": "object", "$ref": "#/$defs/recipe.cooking" }
                    }
                },
                "anvil_repair": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(recipes)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/recipe.anvil_repair"
                    },
                    "properties": {
                        "my_anvil_repair_recipe": { "type": "object", "$ref": "#/$defs/recipe.anvil_repair" }
                    }
                },
                "smithing": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(recipes)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/recipe.smithing"
                    },
                    "properties": {
                        "my_smithing_recipe": { "type": "object", "$ref": "#/$defs/recipe.smithing" }
                    }
                }
            }
        },
        "loots": {
            "type": "object",
            "markdownDescription": "Create loots (item drop) based on broken block, killed entity and on fishing",
            "properties": {
                "blocks": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(blocks loots)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loot.block"
                    },
                    "properties": {
                        "my_loot": { "type": "object", "$ref": "#/$defs/loot.block" }
                    }
                },
                "mobs": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(blocks loots)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loot.mobs"
                    },
                    "properties": {
                        "my_loot": { "type": "object", "$ref": "#/$defs/loot.mobs" }
                    }
                },
                "fishing": {
                    "type": "object",
                    "kind": 5,
                    "detail": "(blocks loots)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loot.fishing"
                    },
                    "properties": {
                        "my_loot": { "type": "object", "$ref": "#/$defs/loot.fishing" }
                    }
                }
            }
        },
        "worlds_populators": {
            "type": "object",
            "markdownDescription": "(**OLD NAME**, use the new `blocks_populators` instead.)",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/block_populator"
            },
            "doNotSuggest": true,
            "deprecated": true
        },
        "blocks_populators": {
            "type": "object",
            "markdownDescription": "Create rules to spawn custom ores around your worlds.\n**They will be spawned only on new chunks.**\n**Pregenerated worlds or already generated chunks won't be affected to avoid risky overwrite**",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/block_populator"
            },
            "properties": {
                "my_populator": { "type": "object", "$ref": "#/$defs/block_populator" }
            }
        },
        "trees_populators": {
            "type": "object",
            "markdownDescription": "Create rules to spawn custom trees around your worlds.\n**They will be spawned only on new chunks.**\n**Pregenerated worlds or already generated chunks won't be affected to avoid risky overwrite**",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/trees_populators"
            },
            "properties": {
                "my_populator": { "type": "object", "$ref": "#/$defs/trees_populators" }
            }
        },
        "surface_decorators": {
            "type": "object",
            "markdownDescription": "Create rules to spawn custom blocks on the surface of your worlds.\n**They will be spawned only on new chunks.**\n**Pregenerated worlds or already generated chunks won't be affected to avoid risky overwrite**",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/surface_decorators"
            },
            "properties": {
                "my_decorator": { "type": "object", "$ref": "#/$defs/surface_decorators" }
            }
        },
        "cave_decorators": {
            "type": "object",
            "markdownDescription": "Create rules to spawn custom blocks in the caves of your worlds.\n**They will be spawned only on new chunks.**\n**Pregenerated worlds or already generated chunks won't be affected to avoid risky overwrite**",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/cave_decorators"
            },
            "properties": {
                "my_decorator": { "type": "object", "$ref": "#/$defs/cave_decorators" }
            }
        },
        "font_images": {
            "type": "object",
            "markdownDescription": "Create your own font characters. You can use them as emoji, GUI texture, HUD...\nIt's basically an image shown in texts.",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": { "type": "object", "$ref": "#/$defs/font_image" },
            "properties": {
                "my_image": { "type": "object", "$ref": "#/$defs/font_image" }
            }
        },
        "huds": {
            "type": "object",
            "markdownDescription": "Create your own HUDs. You will be able to show mana on screen, fuel, current minigame level, heat and anything you want to add!",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/hud"
            },
            "properties": {
                "my_hud": { "type": "object", "$ref": "#/$defs/hud" }
            }
        },
        "categories": {
            "type": "object",
            "markdownDescription": "Create your own categories and show them in /ia command",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/ia_categories"
            },
            "properties": {
                "my_category": { "type": "object", "$ref": "#/$defs/ia_categories" }
            }
        },
        "liquids": {
            "type": "object",
            "markdownDescription": "Create your own colored liquids",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/liquid"
            },
            "properties": {
                "my_liquid": { "type": "object", "$ref": "#/$defs/liquid" }
            }
        },
        "minecraft_lang_overwrite": {
            "type": "object",
            "markdownDescription": "Replace language attributes to your custom value.",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/minecraft_lang_overwrite"
            },
            "properties": {
                "my_lang_overwrite": { "type": "object", "$ref": "#/$defs/minecraft_lang_overwrite" }
            }
        },
        "dictionary": {
            "type": "object",
            "markdownDescription": "Create a special list of texts to be used (almost) anywhere and get translated automatically by the plugin.\nFor example: in items names, lores, /ia menu categories names",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "string",
                "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
            },
            "properties": {
                "display-category-example-category-name": {
                    "type": "string",
                    "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
                },
                "my_display-name-": {
                     "type": "string", 
                     "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value." 
                }
            }
        },
        "entities": {
            "type": "object",
            "markdownDescription": "Create a custom entity with 3D model",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/entity"
            },
            "properties": {
                "my_entity": { "type": "object", "$ref": "#/$defs/entity" }
            }
        },
        "emotes": {
            "type": "object",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/emote"
            },
            "properties": {
                "my_emote": { "type": "object", "$ref": "#/$defs/emote" }
            }
        },
        "armors_rendering": {
            "$id": "armors_rendering",
            "markdownDescription": "(**OLD NAME**, use the new `legacy_armor_renderings` instead) Create legacy custom armors rendering which use shaders to show custom textures.",
            "type": "object",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/armors_rendering_entry"
            },
            "properties": {
                "my_rendering": { "type": "object", "$ref": "#/$defs/armors_rendering_entry" }
            },
            "deprecated": true, 
            "doNotSuggest": true
        },
        "legacy_armor_renderings": {
            "$id": "armors_rendering",
            "markdownDescription": "Create legacy custom armors rendering which use shaders to show custom textures.",
            "type": "object",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/armors_rendering_entry"
            },
            "properties": {
                "my_rendering": { "type": "object", "$ref": "#/$defs/armors_rendering_entry" }
            }
        },
        "equipments": {
            "type": "object",
            "markdownDescription": "Create custom equipments.",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/equipments_entry"
            },
            "properties": {
                "my_equipment": { "type": "object", "$ref": "#/$defs/equipments_entry" }
            }
        }
    },
    "$defs": {
        "attribute_modifiers": {
            "$id": "attribute_modifiers",
            "type": "object",
            "markdownDescription": "These are the vanilla attribute modifiers, you can get more info here https://minecraft.gamepedia.com/Attribute#Attributes_available_on_all_living_entities",
            "properties": {
                "attackDamage": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "attackSpeed": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "maxHealth": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "movementSpeed": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "armor": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "armorToughness": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "attackKnockback": {"$ref": "#/$defs/attribute_modifier", "deprecated": true, "doNotSuggest": true,},
                "attack_damage": {"$ref": "#/$defs/attribute_modifier"},
                "attack_speed": {"$ref": "#/$defs/attribute_modifier"},
                "movement_speed": {"$ref": "#/$defs/attribute_modifier"},
                "armor_toughness": {"$ref": "#/$defs/attribute_modifier"},
                "attack_knockback": {"$ref": "#/$defs/attribute_modifier"},
                "max_health": {"$ref": "#/$defs/attribute_modifier"},
                "follow_range": {"$ref": "#/$defs/attribute_modifier"},
                "knockback_resistance": {"$ref": "#/$defs/attribute_modifier"},
                "luck": {"$ref": "#/$defs/attribute_modifier"},
                "flying_speed": {"$ref": "#/$defs/attribute_modifier"},
                "fall_damage_multiplier": {"$ref": "#/$defs/attribute_modifier"},
                "max_absorption": {"$ref": "#/$defs/attribute_modifier"},
                "safe_fall_distance": {"$ref": "#/$defs/attribute_modifier"},
                "scale": {"$ref": "#/$defs/attribute_modifier"},
                "step_height": {"$ref": "#/$defs/attribute_modifier"},
                "gravity": {"$ref": "#/$defs/attribute_modifier"},
                "jump_strength": {"$ref": "#/$defs/attribute_modifier"},
                "block_interaction_range": {"$ref": "#/$defs/attribute_modifier"},
                "entity_interaction_range": {"$ref": "#/$defs/attribute_modifier"},
                "block_break_speed": {"$ref": "#/$defs/attribute_modifier"},
                "spawn_reinforcements": {"$ref": "#/$defs/attribute_modifier"}
            }
        },
        "attribute_modifier": {
            "$id": "attribute_modifier",
            "markdownDescription": `You can directly set a value or set \`value\` and \`operation\`.\n## Examples:
\`\`\`
attribute_modifiers:
  mainhand:
    attackDamage: 2
\`\`\`
Or:
\`\`\`
attribute_modifiers:
  mainhand:
    attackDamage:
      value: 2
      operation: add
\`\`\`
`,
            "anyOf": [
                {
                    "type": "object",
                    "required": ["value", "operation"],
                    "properties": {
                        "value": {"type": "number", "default": 1},
                        "operation": {
                            "markdownDescription": "More info here: https://minecraft.fandom.com/wiki/Attribute#Operations",
                            "type": "string",
                            "enum": ["add", "multiply_base", "multiply"],
                            "default": "add"
                        }
                    }
                },
                {
                    "markdownDescription": `You can directly set a value or set \`value\` and \`operation\`.\n## Examples:
\`\`\`
attribute_modifiers:
  mainhand:
    attackDamage: 2
\`\`\`
Or:
\`\`\`
attribute_modifiers:
  mainhand:
    attackDamage:
      value: 2
      operation: add
\`\`\`
`,
                    "type": "number"
                }
            ]
        },
        "vanilla_enchants": {
            "$id": "vanilla_enchants",
            "title": "Vanilla enchants",
            "type": "string",
            "enum": [
                'AQUA_AFFINITY',
                'BANE_OF_ARTHROPODS',
                'BINDING_CURSE',
                'BLAST_PROTECTION',
                'BREACH',
                'CHANNELING',
                'DENSITY',
                'DEPTH_STRIDER',
                'EFFICIENCY',
                'FEATHER_FALLING',
                'FIRE_ASPECT',
                'FIRE_PROTECTION',
                'FLAME',
                'FORTUNE',
                'FROST_WALKER',
                'IMPALING',
                'INFINITY',
                'KNOCKBACK',
                'LOOTING',
                'LOYALTY',
                'LUCK_OF_THE_SEA',
                'LURE',
                'MENDING',
                'MULTISHOT',
                'PIERCING',
                'POWER',
                'PROJECTILE_PROTECTION',
                'PROTECTION',
                'PUNCH',
                'QUICK_CHARGE',
                'RESPIRATION',
                'RIPTIDE',
                'SHARPNESS',
                'SILK_TOUCH',
                'SMITE',
                'SOUL_SPEED',
                'SWEEPING_EDGE',
                'SWIFT_SNEAK',
                'THORNS',
                'UNBREAKING',
                'VANISHING_CURSE',
                'WIND_BURST',
            ]
        },
        "bukkit_materials_and_customitems": {
            "$id": "bukkit_materials_and_customitems",
            "title": "Vanilla / ItemsAdder custom item",
            "markdownDescription": "Examples: **STONE**, **itemsadder:ruby**, **ruby**",
            "type": "string",
            "anyOf": [
                {"$ref": "#/$defs/bukkit_materials"},
                {"additionalProperties": {"type": "string"}}
            ]
        },
        "vanilla_and_custom_blocks": {
            "$id": "vanilla_and_custom_blocks",
            "title": "Vanilla / ItemsAdder custom blocks",
            "markdownDescription": "Examples: **STONE**, **itemsadder:ruby_block**, **crying_obsidian**",
            "type": "string",
            "anyOf": [
                {"$ref": "#/$defs/bukkit_blocks"},
                {"additionalProperties": {"type": "string"}}
            ]
        },
        "bukkit_materials": {
            "$id": "bukkit_materials",
            "title": "Vanilla Materials",
            "markdownDescription": "Examples: **STONE**, **DIAMOND**",
            "type": "string",
            "enum": [
                'ACACIA_BOAT',
                'ACACIA_BUTTON',
                'ACACIA_CHEST_BOAT',
                'ACACIA_DOOR',
                'ACACIA_FENCE',
                'ACACIA_FENCE_GATE',
                'ACACIA_HANGING_SIGN',
                'ACACIA_LEAVES',
                'ACACIA_LOG',
                'ACACIA_PLANKS',
                'ACACIA_PRESSURE_PLATE',
                'ACACIA_SAPLING',
                'ACACIA_SIGN',
                'ACACIA_SLAB',
                'ACACIA_STAIRS',
                'ACACIA_TRAPDOOR',
                'ACACIA_WALL_HANGING_SIGN',
                'ACACIA_WALL_SIGN',
                'ACACIA_WOOD',
                'ACTIVATOR_RAIL',
                'AIR',
                'ALLAY_SPAWN_EGG',
                'ALLIUM',
                'AMETHYST_BLOCK',
                'AMETHYST_CLUSTER',
                'AMETHYST_SHARD',
                'ANCIENT_DEBRIS',
                'ANDESITE',
                'ANDESITE_SLAB',
                'ANDESITE_STAIRS',
                'ANDESITE_WALL',
                'ANGLER_POTTERY_SHERD',
                'ANVIL',
                'APPLE',
                'ARCHER_POTTERY_SHERD',
                'ARMADILLO_SCUTE',
                'ARMADILLO_SPAWN_EGG',
                'ARMOR_STAND',
                'ARMS_UP_POTTERY_SHERD',
                'ARROW',
                'ATTACHED_MELON_STEM',
                'ATTACHED_PUMPKIN_STEM',
                'AXOLOTL_BUCKET',
                'AXOLOTL_SPAWN_EGG',
                'AZALEA',
                'AZALEA_LEAVES',
                'AZURE_BLUET',
                'BAKED_POTATO',
                'BAMBOO',
                'BAMBOO_BLOCK',
                'BAMBOO_BUTTON',
                'BAMBOO_CHEST_RAFT',
                'BAMBOO_DOOR',
                'BAMBOO_FENCE',
                'BAMBOO_FENCE_GATE',
                'BAMBOO_HANGING_SIGN',
                'BAMBOO_MOSAIC',
                'BAMBOO_MOSAIC_SLAB',
                'BAMBOO_MOSAIC_STAIRS',
                'BAMBOO_PLANKS',
                'BAMBOO_PRESSURE_PLATE',
                'BAMBOO_RAFT',
                'BAMBOO_SAPLING',
                'BAMBOO_SIGN',
                'BAMBOO_SLAB',
                'BAMBOO_STAIRS',
                'BAMBOO_TRAPDOOR',
                'BAMBOO_WALL_HANGING_SIGN',
                'BAMBOO_WALL_SIGN',
                'BARREL',
                'BARRIER',
                'BASALT',
                'BAT_SPAWN_EGG',
                'BEACON',
                'BEDROCK',
                'BEE_NEST',
                'BEE_SPAWN_EGG',
                'BEEF',
                'BEEHIVE',
                'BEETROOT',
                'BEETROOT_SEEDS',
                'BEETROOT_SOUP',
                'BEETROOTS',
                'BELL',
                'BIG_DRIPLEAF',
                'BIG_DRIPLEAF_STEM',
                'BIRCH_BOAT',
                'BIRCH_BUTTON',
                'BIRCH_CHEST_BOAT',
                'BIRCH_DOOR',
                'BIRCH_FENCE',
                'BIRCH_FENCE_GATE',
                'BIRCH_HANGING_SIGN',
                'BIRCH_LEAVES',
                'BIRCH_LOG',
                'BIRCH_PLANKS',
                'BIRCH_PRESSURE_PLATE',
                'BIRCH_SAPLING',
                'BIRCH_SIGN',
                'BIRCH_SLAB',
                'BIRCH_STAIRS',
                'BIRCH_TRAPDOOR',
                'BIRCH_WALL_HANGING_SIGN',
                'BIRCH_WALL_SIGN',
                'BIRCH_WOOD',
                'BLACK_BANNER',
                'BLACK_BED',
                'BLACK_BUNDLE',
                'BLACK_CANDLE',
                'BLACK_CANDLE_CAKE',
                'BLACK_CARPET',
                'BLACK_CONCRETE',
                'BLACK_CONCRETE_POWDER',
                'BLACK_DYE',
                'BLACK_GLAZED_TERRACOTTA',
                'BLACK_SHULKER_BOX',
                'BLACK_STAINED_GLASS',
                'BLACK_STAINED_GLASS_PANE',
                'BLACK_TERRACOTTA',
                'BLACK_WALL_BANNER',
                'BLACK_WOOL',
                'BLACKSTONE',
                'BLACKSTONE_SLAB',
                'BLACKSTONE_STAIRS',
                'BLACKSTONE_WALL',
                'BLADE_POTTERY_SHERD',
                'BLAST_FURNACE',
                'BLAZE_POWDER',
                'BLAZE_ROD',
                'BLAZE_SPAWN_EGG',
                'BLUE_BANNER',
                'BLUE_BED',
                'BLUE_BUNDLE',
                'BLUE_CANDLE',
                'BLUE_CANDLE_CAKE',
                'BLUE_CARPET',
                'BLUE_CONCRETE',
                'BLUE_CONCRETE_POWDER',
                'BLUE_DYE',
                'BLUE_GLAZED_TERRACOTTA',
                'BLUE_ICE',
                'BLUE_ORCHID',
                'BLUE_SHULKER_BOX',
                'BLUE_STAINED_GLASS',
                'BLUE_STAINED_GLASS_PANE',
                'BLUE_TERRACOTTA',
                'BLUE_WALL_BANNER',
                'BLUE_WOOL',
                'BOGGED_SPAWN_EGG',
                'BOLT_ARMOR_TRIM_SMITHING_TEMPLATE',
                'BONE',
                'BONE_BLOCK',
                'BONE_MEAL',
                'BOOK',
                'BOOKSHELF',
                'BORDURE_INDENTED_BANNER_PATTERN',
                'BOW',
                'BOWL',
                'BRAIN_CORAL',
                'BRAIN_CORAL_BLOCK',
                'BRAIN_CORAL_FAN',
                'BRAIN_CORAL_WALL_FAN',
                'BREAD',
                'BREEZE_ROD',
                'BREEZE_SPAWN_EGG',
                'BREWER_POTTERY_SHERD',
                'BREWING_STAND',
                'BRICK',
                'BRICK_SLAB',
                'BRICK_STAIRS',
                'BRICK_WALL',
                'BRICKS',
                'BROWN_BANNER',
                'BROWN_BED',
                'BROWN_BUNDLE',
                'BROWN_CANDLE',
                'BROWN_CANDLE_CAKE',
                'BROWN_CARPET',
                'BROWN_CONCRETE',
                'BROWN_CONCRETE_POWDER',
                'BROWN_DYE',
                'BROWN_GLAZED_TERRACOTTA',
                'BROWN_MUSHROOM',
                'BROWN_MUSHROOM_BLOCK',
                'BROWN_SHULKER_BOX',
                'BROWN_STAINED_GLASS',
                'BROWN_STAINED_GLASS_PANE',
                'BROWN_TERRACOTTA',
                'BROWN_WALL_BANNER',
                'BROWN_WOOL',
                'BRUSH',
                'BUBBLE_COLUMN',
                'BUBBLE_CORAL',
                'BUBBLE_CORAL_BLOCK',
                'BUBBLE_CORAL_FAN',
                'BUBBLE_CORAL_WALL_FAN',
                'BUCKET',
                'BUDDING_AMETHYST',
                'BUNDLE',
                'BURN_POTTERY_SHERD',
                'CACTUS',
                'CAKE',
                'CALCITE',
                'CALIBRATED_SCULK_SENSOR',
                'CAMEL_SPAWN_EGG',
                'CAMPFIRE',
                'CANDLE',
                'CANDLE_CAKE',
                'CARROT',
                'CARROT_ON_A_STICK',
                'CARROTS',
                'CARTOGRAPHY_TABLE',
                'CARVED_PUMPKIN',
                'CAT_SPAWN_EGG',
                'CAULDRON',
                'CAVE_AIR',
                'CAVE_SPIDER_SPAWN_EGG',
                'CAVE_VINES',
                'CAVE_VINES_PLANT',
                'CHAIN',
                'CHAIN_COMMAND_BLOCK',
                'CHAINMAIL_BOOTS',
                'CHAINMAIL_CHESTPLATE',
                'CHAINMAIL_HELMET',
                'CHAINMAIL_LEGGINGS',
                'CHARCOAL',
                'CHERRY_BOAT',
                'CHERRY_BUTTON',
                'CHERRY_CHEST_BOAT',
                'CHERRY_DOOR',
                'CHERRY_FENCE',
                'CHERRY_FENCE_GATE',
                'CHERRY_HANGING_SIGN',
                'CHERRY_LEAVES',
                'CHERRY_LOG',
                'CHERRY_PLANKS',
                'CHERRY_PRESSURE_PLATE',
                'CHERRY_SAPLING',
                'CHERRY_SIGN',
                'CHERRY_SLAB',
                'CHERRY_STAIRS',
                'CHERRY_TRAPDOOR',
                'CHERRY_WALL_HANGING_SIGN',
                'CHERRY_WALL_SIGN',
                'CHERRY_WOOD',
                'CHEST',
                'CHEST_MINECART',
                'CHICKEN',
                'CHICKEN_SPAWN_EGG',
                'CHIPPED_ANVIL',
                'CHISELED_BOOKSHELF',
                'CHISELED_COPPER',
                'CHISELED_DEEPSLATE',
                'CHISELED_NETHER_BRICKS',
                'CHISELED_POLISHED_BLACKSTONE',
                'CHISELED_QUARTZ_BLOCK',
                'CHISELED_RED_SANDSTONE',
                'CHISELED_SANDSTONE',
                'CHISELED_STONE_BRICKS',
                'CHISELED_TUFF',
                'CHISELED_TUFF_BRICKS',
                'CHORUS_FLOWER',
                'CHORUS_FRUIT',
                'CHORUS_PLANT',
                'CLAY',
                'CLAY_BALL',
                'CLOCK',
                'COAL',
                'COAL_BLOCK',
                'COAL_ORE',
                'COARSE_DIRT',
                'COAST_ARMOR_TRIM_SMITHING_TEMPLATE',
                'COBBLED_DEEPSLATE',
                'COBBLED_DEEPSLATE_SLAB',
                'COBBLED_DEEPSLATE_STAIRS',
                'COBBLED_DEEPSLATE_WALL',
                'COBBLESTONE',
                'COBBLESTONE_SLAB',
                'COBBLESTONE_STAIRS',
                'COBBLESTONE_WALL',
                'COBWEB',
                'COCOA',
                'COCOA_BEANS',
                'COD',
                'COD_BUCKET',
                'COD_SPAWN_EGG',
                'COMMAND_BLOCK',
                'COMMAND_BLOCK_MINECART',
                'COMPARATOR',
                'COMPASS',
                'COMPOSTER',
                'CONDUIT',
                'COOKED_BEEF',
                'COOKED_CHICKEN',
                'COOKED_COD',
                'COOKED_MUTTON',
                'COOKED_PORKCHOP',
                'COOKED_RABBIT',
                'COOKED_SALMON',
                'COOKIE',
                'COPPER_BLOCK',
                'COPPER_BULB',
                'COPPER_DOOR',
                'COPPER_GRATE',
                'COPPER_INGOT',
                'COPPER_ORE',
                'COPPER_TRAPDOOR',
                'CORNFLOWER',
                'COW_SPAWN_EGG',
                'CRACKED_DEEPSLATE_BRICKS',
                'CRACKED_DEEPSLATE_TILES',
                'CRACKED_NETHER_BRICKS',
                'CRACKED_POLISHED_BLACKSTONE_BRICKS',
                'CRACKED_STONE_BRICKS',
                'CRAFTER',
                'CRAFTING_TABLE',
                'CREAKING_HEART',
                'CREAKING_SPAWN_EGG',
                'CREEPER_BANNER_PATTERN',
                'CREEPER_HEAD',
                'CREEPER_SPAWN_EGG',
                'CREEPER_WALL_HEAD',
                'CRIMSON_BUTTON',
                'CRIMSON_DOOR',
                'CRIMSON_FENCE',
                'CRIMSON_FENCE_GATE',
                'CRIMSON_FUNGUS',
                'CRIMSON_HANGING_SIGN',
                'CRIMSON_HYPHAE',
                'CRIMSON_NYLIUM',
                'CRIMSON_PLANKS',
                'CRIMSON_PRESSURE_PLATE',
                'CRIMSON_ROOTS',
                'CRIMSON_SIGN',
                'CRIMSON_SLAB',
                'CRIMSON_STAIRS',
                'CRIMSON_STEM',
                'CRIMSON_TRAPDOOR',
                'CRIMSON_WALL_HANGING_SIGN',
                'CRIMSON_WALL_SIGN',
                'CROSSBOW',
                'CRYING_OBSIDIAN',
                'CUT_COPPER',
                'CUT_COPPER_SLAB',
                'CUT_COPPER_STAIRS',
                'CUT_RED_SANDSTONE',
                'CUT_RED_SANDSTONE_SLAB',
                'CUT_SANDSTONE',
                'CUT_SANDSTONE_SLAB',
                'CYAN_BANNER',
                'CYAN_BED',
                'CYAN_BUNDLE',
                'CYAN_CANDLE',
                'CYAN_CANDLE_CAKE',
                'CYAN_CARPET',
                'CYAN_CONCRETE',
                'CYAN_CONCRETE_POWDER',
                'CYAN_DYE',
                'CYAN_GLAZED_TERRACOTTA',
                'CYAN_SHULKER_BOX',
                'CYAN_STAINED_GLASS',
                'CYAN_STAINED_GLASS_PANE',
                'CYAN_TERRACOTTA',
                'CYAN_WALL_BANNER',
                'CYAN_WOOL',
                'DAMAGED_ANVIL',
                'DANDELION',
                'DANGER_POTTERY_SHERD',
                'DARK_OAK_BOAT',
                'DARK_OAK_BUTTON',
                'DARK_OAK_CHEST_BOAT',
                'DARK_OAK_DOOR',
                'DARK_OAK_FENCE',
                'DARK_OAK_FENCE_GATE',
                'DARK_OAK_HANGING_SIGN',
                'DARK_OAK_LEAVES',
                'DARK_OAK_LOG',
                'DARK_OAK_PLANKS',
                'DARK_OAK_PRESSURE_PLATE',
                'DARK_OAK_SAPLING',
                'DARK_OAK_SIGN',
                'DARK_OAK_SLAB',
                'DARK_OAK_STAIRS',
                'DARK_OAK_TRAPDOOR',
                'DARK_OAK_WALL_HANGING_SIGN',
                'DARK_OAK_WALL_SIGN',
                'DARK_OAK_WOOD',
                'DARK_PRISMARINE',
                'DARK_PRISMARINE_SLAB',
                'DARK_PRISMARINE_STAIRS',
                'DAYLIGHT_DETECTOR',
                'DEAD_BRAIN_CORAL',
                'DEAD_BRAIN_CORAL_BLOCK',
                'DEAD_BRAIN_CORAL_FAN',
                'DEAD_BRAIN_CORAL_WALL_FAN',
                'DEAD_BUBBLE_CORAL',
                'DEAD_BUBBLE_CORAL_BLOCK',
                'DEAD_BUBBLE_CORAL_FAN',
                'DEAD_BUBBLE_CORAL_WALL_FAN',
                'DEAD_BUSH',
                'DEAD_FIRE_CORAL',
                'DEAD_FIRE_CORAL_BLOCK',
                'DEAD_FIRE_CORAL_FAN',
                'DEAD_FIRE_CORAL_WALL_FAN',
                'DEAD_HORN_CORAL',
                'DEAD_HORN_CORAL_BLOCK',
                'DEAD_HORN_CORAL_FAN',
                'DEAD_HORN_CORAL_WALL_FAN',
                'DEAD_TUBE_CORAL',
                'DEAD_TUBE_CORAL_BLOCK',
                'DEAD_TUBE_CORAL_FAN',
                'DEAD_TUBE_CORAL_WALL_FAN',
                'DEBUG_STICK',
                'DECORATED_POT',
                'DEEPSLATE',
                'DEEPSLATE_BRICK_SLAB',
                'DEEPSLATE_BRICK_STAIRS',
                'DEEPSLATE_BRICK_WALL',
                'DEEPSLATE_BRICKS',
                'DEEPSLATE_COAL_ORE',
                'DEEPSLATE_COPPER_ORE',
                'DEEPSLATE_DIAMOND_ORE',
                'DEEPSLATE_EMERALD_ORE',
                'DEEPSLATE_GOLD_ORE',
                'DEEPSLATE_IRON_ORE',
                'DEEPSLATE_LAPIS_ORE',
                'DEEPSLATE_REDSTONE_ORE',
                'DEEPSLATE_TILE_SLAB',
                'DEEPSLATE_TILE_STAIRS',
                'DEEPSLATE_TILE_WALL',
                'DEEPSLATE_TILES',
                'DETECTOR_RAIL',
                'DIAMOND',
                'DIAMOND_AXE',
                'DIAMOND_BLOCK',
                'DIAMOND_BOOTS',
                'DIAMOND_CHESTPLATE',
                'DIAMOND_HELMET',
                'DIAMOND_HOE',
                'DIAMOND_HORSE_ARMOR',
                'DIAMOND_LEGGINGS',
                'DIAMOND_ORE',
                'DIAMOND_PICKAXE',
                'DIAMOND_SHOVEL',
                'DIAMOND_SWORD',
                'DIORITE',
                'DIORITE_SLAB',
                'DIORITE_STAIRS',
                'DIORITE_WALL',
                'DIRT',
                'DIRT_PATH',
                'DISC_FRAGMENT_5',
                'DISPENSER',
                'DOLPHIN_SPAWN_EGG',
                'DONKEY_SPAWN_EGG',
                'DRAGON_BREATH',
                'DRAGON_EGG',
                'DRAGON_HEAD',
                'DRAGON_WALL_HEAD',
                'DRIED_KELP',
                'DRIED_KELP_BLOCK',
                'DRIPSTONE_BLOCK',
                'DROPPER',
                'DROWNED_SPAWN_EGG',
                'DUNE_ARMOR_TRIM_SMITHING_TEMPLATE',
                'ECHO_SHARD',
                'EGG',
                'ELDER_GUARDIAN_SPAWN_EGG',
                'ELYTRA',
                'EMERALD',
                'EMERALD_BLOCK',
                'EMERALD_ORE',
                'ENCHANTED_BOOK',
                'ENCHANTED_GOLDEN_APPLE',
                'ENCHANTING_TABLE',
                'END_CRYSTAL',
                'END_GATEWAY',
                'END_PORTAL',
                'END_PORTAL_FRAME',
                'END_ROD',
                'END_STONE',
                'END_STONE_BRICK_SLAB',
                'END_STONE_BRICK_STAIRS',
                'END_STONE_BRICK_WALL',
                'END_STONE_BRICKS',
                'ENDER_CHEST',
                'ENDER_DRAGON_SPAWN_EGG',
                'ENDER_EYE',
                'ENDER_PEARL',
                'ENDERMAN_SPAWN_EGG',
                'ENDERMITE_SPAWN_EGG',
                'EVOKER_SPAWN_EGG',
                'EXPERIENCE_BOTTLE',
                'EXPLORER_POTTERY_SHERD',
                'EXPOSED_CHISELED_COPPER',
                'EXPOSED_COPPER',
                'EXPOSED_COPPER_BULB',
                'EXPOSED_COPPER_DOOR',
                'EXPOSED_COPPER_GRATE',
                'EXPOSED_COPPER_TRAPDOOR',
                'EXPOSED_CUT_COPPER',
                'EXPOSED_CUT_COPPER_SLAB',
                'EXPOSED_CUT_COPPER_STAIRS',
                'EYE_ARMOR_TRIM_SMITHING_TEMPLATE',
                'FARMLAND',
                'FEATHER',
                'FERMENTED_SPIDER_EYE',
                'FERN',
                'FIELD_MASONED_BANNER_PATTERN',
                'FILLED_MAP',
                'FIRE',
                'FIRE_CHARGE',
                'FIRE_CORAL',
                'FIRE_CORAL_BLOCK',
                'FIRE_CORAL_FAN',
                'FIRE_CORAL_WALL_FAN',
                'FIREWORK_ROCKET',
                'FIREWORK_STAR',
                'FISHING_ROD',
                'FLETCHING_TABLE',
                'FLINT',
                'FLINT_AND_STEEL',
                'FLOW_ARMOR_TRIM_SMITHING_TEMPLATE',
                'FLOW_BANNER_PATTERN',
                'FLOW_POTTERY_SHERD',
                'FLOWER_BANNER_PATTERN',
                'FLOWER_POT',
                'FLOWERING_AZALEA',
                'FLOWERING_AZALEA_LEAVES',
                'FOX_SPAWN_EGG',
                'FRIEND_POTTERY_SHERD',
                'FROG_SPAWN_EGG',
                'FROGSPAWN',
                'FROSTED_ICE',
                'FURNACE',
                'FURNACE_MINECART',
                'GHAST_SPAWN_EGG',
                'GHAST_TEAR',
                'GILDED_BLACKSTONE',
                'GLASS',
                'GLASS_BOTTLE',
                'GLASS_PANE',
                'GLISTERING_MELON_SLICE',
                'GLOBE_BANNER_PATTERN',
                'GLOW_BERRIES',
                'GLOW_INK_SAC',
                'GLOW_ITEM_FRAME',
                'GLOW_LICHEN',
                'GLOW_SQUID_SPAWN_EGG',
                'GLOWSTONE',
                'GLOWSTONE_DUST',
                'GOAT_HORN',
                'GOAT_SPAWN_EGG',
                'GOLD_BLOCK',
                'GOLD_INGOT',
                'GOLD_NUGGET',
                'GOLD_ORE',
                'GOLDEN_APPLE',
                'GOLDEN_AXE',
                'GOLDEN_BOOTS',
                'GOLDEN_CARROT',
                'GOLDEN_CHESTPLATE',
                'GOLDEN_HELMET',
                'GOLDEN_HOE',
                'GOLDEN_HORSE_ARMOR',
                'GOLDEN_LEGGINGS',
                'GOLDEN_PICKAXE',
                'GOLDEN_SHOVEL',
                'GOLDEN_SWORD',
                'GRANITE',
                'GRANITE_SLAB',
                'GRANITE_STAIRS',
                'GRANITE_WALL',
                'GRASS_BLOCK',
                'GRAVEL',
                'GRAY_BANNER',
                'GRAY_BED',
                'GRAY_BUNDLE',
                'GRAY_CANDLE',
                'GRAY_CANDLE_CAKE',
                'GRAY_CARPET',
                'GRAY_CONCRETE',
                'GRAY_CONCRETE_POWDER',
                'GRAY_DYE',
                'GRAY_GLAZED_TERRACOTTA',
                'GRAY_SHULKER_BOX',
                'GRAY_STAINED_GLASS',
                'GRAY_STAINED_GLASS_PANE',
                'GRAY_TERRACOTTA',
                'GRAY_WALL_BANNER',
                'GRAY_WOOL',
                'GREEN_BANNER',
                'GREEN_BED',
                'GREEN_BUNDLE',
                'GREEN_CANDLE',
                'GREEN_CANDLE_CAKE',
                'GREEN_CARPET',
                'GREEN_CONCRETE',
                'GREEN_CONCRETE_POWDER',
                'GREEN_DYE',
                'GREEN_GLAZED_TERRACOTTA',
                'GREEN_SHULKER_BOX',
                'GREEN_STAINED_GLASS',
                'GREEN_STAINED_GLASS_PANE',
                'GREEN_TERRACOTTA',
                'GREEN_WALL_BANNER',
                'GREEN_WOOL',
                'GRINDSTONE',
                'GUARDIAN_SPAWN_EGG',
                'GUNPOWDER',
                'GUSTER_BANNER_PATTERN',
                'GUSTER_POTTERY_SHERD',
                'HANGING_ROOTS',
                'HAY_BLOCK',
                'HEART_OF_THE_SEA',
                'HEART_POTTERY_SHERD',
                'HEARTBREAK_POTTERY_SHERD',
                'HEAVY_CORE',
                'HEAVY_WEIGHTED_PRESSURE_PLATE',
                'HOGLIN_SPAWN_EGG',
                'HONEY_BLOCK',
                'HONEY_BOTTLE',
                'HONEYCOMB',
                'HONEYCOMB_BLOCK',
                'HOPPER',
                'HOPPER_MINECART',
                'HORN_CORAL',
                'HORN_CORAL_BLOCK',
                'HORN_CORAL_FAN',
                'HORN_CORAL_WALL_FAN',
                'HORSE_SPAWN_EGG',
                'HOST_ARMOR_TRIM_SMITHING_TEMPLATE',
                'HOWL_POTTERY_SHERD',
                'HUSK_SPAWN_EGG',
                'ICE',
                'INFESTED_CHISELED_STONE_BRICKS',
                'INFESTED_COBBLESTONE',
                'INFESTED_CRACKED_STONE_BRICKS',
                'INFESTED_DEEPSLATE',
                'INFESTED_MOSSY_STONE_BRICKS',
                'INFESTED_STONE',
                'INFESTED_STONE_BRICKS',
                'INK_SAC',
                'IRON_AXE',
                'IRON_BARS',
                'IRON_BLOCK',
                'IRON_BOOTS',
                'IRON_CHESTPLATE',
                'IRON_DOOR',
                'IRON_GOLEM_SPAWN_EGG',
                'IRON_HELMET',
                'IRON_HOE',
                'IRON_HORSE_ARMOR',
                'IRON_INGOT',
                'IRON_LEGGINGS',
                'IRON_NUGGET',
                'IRON_ORE',
                'IRON_PICKAXE',
                'IRON_SHOVEL',
                'IRON_SWORD',
                'IRON_TRAPDOOR',
                'ITEM_FRAME',
                'JACK_O_LANTERN',
                'JIGSAW',
                'JUKEBOX',
                'JUNGLE_BOAT',
                'JUNGLE_BUTTON',
                'JUNGLE_CHEST_BOAT',
                'JUNGLE_DOOR',
                'JUNGLE_FENCE',
                'JUNGLE_FENCE_GATE',
                'JUNGLE_HANGING_SIGN',
                'JUNGLE_LEAVES',
                'JUNGLE_LOG',
                'JUNGLE_PLANKS',
                'JUNGLE_PRESSURE_PLATE',
                'JUNGLE_SAPLING',
                'JUNGLE_SIGN',
                'JUNGLE_SLAB',
                'JUNGLE_STAIRS',
                'JUNGLE_TRAPDOOR',
                'JUNGLE_WALL_HANGING_SIGN',
                'JUNGLE_WALL_SIGN',
                'JUNGLE_WOOD',
                'KELP',
                'KELP_PLANT',
                'KNOWLEDGE_BOOK',
                'LADDER',
                'LANTERN',
                'LAPIS_BLOCK',
                'LAPIS_LAZULI',
                'LAPIS_ORE',
                'LARGE_AMETHYST_BUD',
                'LARGE_FERN',
                'LAVA',
                'LAVA_BUCKET',
                'LAVA_CAULDRON',
                'LEAD',
                'LEATHER',
                'LEATHER_BOOTS',
                'LEATHER_CHESTPLATE',
                'LEATHER_HELMET',
                'LEATHER_HORSE_ARMOR',
                'LEATHER_LEGGINGS',
                'LECTERN',
                'LEVER',
                'LIGHT',
                'LIGHT_BLUE_BANNER',
                'LIGHT_BLUE_BED',
                'LIGHT_BLUE_BUNDLE',
                'LIGHT_BLUE_CANDLE',
                'LIGHT_BLUE_CANDLE_CAKE',
                'LIGHT_BLUE_CARPET',
                'LIGHT_BLUE_CONCRETE',
                'LIGHT_BLUE_CONCRETE_POWDER',
                'LIGHT_BLUE_DYE',
                'LIGHT_BLUE_GLAZED_TERRACOTTA',
                'LIGHT_BLUE_SHULKER_BOX',
                'LIGHT_BLUE_STAINED_GLASS',
                'LIGHT_BLUE_STAINED_GLASS_PANE',
                'LIGHT_BLUE_TERRACOTTA',
                'LIGHT_BLUE_WALL_BANNER',
                'LIGHT_BLUE_WOOL',
                'LIGHT_GRAY_BANNER',
                'LIGHT_GRAY_BED',
                'LIGHT_GRAY_BUNDLE',
                'LIGHT_GRAY_CANDLE',
                'LIGHT_GRAY_CANDLE_CAKE',
                'LIGHT_GRAY_CARPET',
                'LIGHT_GRAY_CONCRETE',
                'LIGHT_GRAY_CONCRETE_POWDER',
                'LIGHT_GRAY_DYE',
                'LIGHT_GRAY_GLAZED_TERRACOTTA',
                'LIGHT_GRAY_SHULKER_BOX',
                'LIGHT_GRAY_STAINED_GLASS',
                'LIGHT_GRAY_STAINED_GLASS_PANE',
                'LIGHT_GRAY_TERRACOTTA',
                'LIGHT_GRAY_WALL_BANNER',
                'LIGHT_GRAY_WOOL',
                'LIGHT_WEIGHTED_PRESSURE_PLATE',
                'LIGHTNING_ROD',
                'LILAC',
                'LILY_OF_THE_VALLEY',
                'LILY_PAD',
                'LIME_BANNER',
                'LIME_BED',
                'LIME_BUNDLE',
                'LIME_CANDLE',
                'LIME_CANDLE_CAKE',
                'LIME_CARPET',
                'LIME_CONCRETE',
                'LIME_CONCRETE_POWDER',
                'LIME_DYE',
                'LIME_GLAZED_TERRACOTTA',
                'LIME_SHULKER_BOX',
                'LIME_STAINED_GLASS',
                'LIME_STAINED_GLASS_PANE',
                'LIME_TERRACOTTA',
                'LIME_WALL_BANNER',
                'LIME_WOOL',
                'LINGERING_POTION',
                'LLAMA_SPAWN_EGG',
                'LODESTONE',
                'LOOM',
                'MACE',
                'MAGENTA_BANNER',
                'MAGENTA_BED',
                'MAGENTA_BUNDLE',
                'MAGENTA_CANDLE',
                'MAGENTA_CANDLE_CAKE',
                'MAGENTA_CARPET',
                'MAGENTA_CONCRETE',
                'MAGENTA_CONCRETE_POWDER',
                'MAGENTA_DYE',
                'MAGENTA_GLAZED_TERRACOTTA',
                'MAGENTA_SHULKER_BOX',
                'MAGENTA_STAINED_GLASS',
                'MAGENTA_STAINED_GLASS_PANE',
                'MAGENTA_TERRACOTTA',
                'MAGENTA_WALL_BANNER',
                'MAGENTA_WOOL',
                'MAGMA_BLOCK',
                'MAGMA_CREAM',
                'MAGMA_CUBE_SPAWN_EGG',
                'MANGROVE_BOAT',
                'MANGROVE_BUTTON',
                'MANGROVE_CHEST_BOAT',
                'MANGROVE_DOOR',
                'MANGROVE_FENCE',
                'MANGROVE_FENCE_GATE',
                'MANGROVE_HANGING_SIGN',
                'MANGROVE_LEAVES',
                'MANGROVE_LOG',
                'MANGROVE_PLANKS',
                'MANGROVE_PRESSURE_PLATE',
                'MANGROVE_PROPAGULE',
                'MANGROVE_ROOTS',
                'MANGROVE_SIGN',
                'MANGROVE_SLAB',
                'MANGROVE_STAIRS',
                'MANGROVE_TRAPDOOR',
                'MANGROVE_WALL_HANGING_SIGN',
                'MANGROVE_WALL_SIGN',
                'MANGROVE_WOOD',
                'MAP',
                'MEDIUM_AMETHYST_BUD',
                'MELON',
                'MELON_SEEDS',
                'MELON_SLICE',
                'MELON_STEM',
                'MILK_BUCKET',
                'MINECART',
                'MINER_POTTERY_SHERD',
                'MOJANG_BANNER_PATTERN',
                'MOOSHROOM_SPAWN_EGG',
                'MOSS_BLOCK',
                'MOSS_CARPET',
                'MOSSY_COBBLESTONE',
                'MOSSY_COBBLESTONE_SLAB',
                'MOSSY_COBBLESTONE_STAIRS',
                'MOSSY_COBBLESTONE_WALL',
                'MOSSY_STONE_BRICK_SLAB',
                'MOSSY_STONE_BRICK_STAIRS',
                'MOSSY_STONE_BRICK_WALL',
                'MOSSY_STONE_BRICKS',
                'MOURNER_POTTERY_SHERD',
                'MOVING_PISTON',
                'MUD',
                'MUD_BRICK_SLAB',
                'MUD_BRICK_STAIRS',
                'MUD_BRICK_WALL',
                'MUD_BRICKS',
                'MUDDY_MANGROVE_ROOTS',
                'MULE_SPAWN_EGG',
                'MUSHROOM_STEM',
                'MUSHROOM_STEW',
                'MUSIC_DISC_11',
                'MUSIC_DISC_13',
                'MUSIC_DISC_5',
                'MUSIC_DISC_BLOCKS',
                'MUSIC_DISC_CAT',
                'MUSIC_DISC_CHIRP',
                'MUSIC_DISC_CREATOR',
                'MUSIC_DISC_CREATOR_MUSIC_BOX',
                'MUSIC_DISC_FAR',
                'MUSIC_DISC_MALL',
                'MUSIC_DISC_MELLOHI',
                'MUSIC_DISC_OTHERSIDE',
                'MUSIC_DISC_PIGSTEP',
                'MUSIC_DISC_PRECIPICE',
                'MUSIC_DISC_RELIC',
                'MUSIC_DISC_STAL',
                'MUSIC_DISC_STRAD',
                'MUSIC_DISC_WAIT',
                'MUSIC_DISC_WARD',
                'MUTTON',
                'MYCELIUM',
                'NAME_TAG',
                'NAUTILUS_SHELL',
                'NETHER_BRICK',
                'NETHER_BRICK_FENCE',
                'NETHER_BRICK_SLAB',
                'NETHER_BRICK_STAIRS',
                'NETHER_BRICK_WALL',
                'NETHER_BRICKS',
                'NETHER_GOLD_ORE',
                'NETHER_PORTAL',
                'NETHER_QUARTZ_ORE',
                'NETHER_SPROUTS',
                'NETHER_STAR',
                'NETHER_WART',
                'NETHER_WART_BLOCK',
                'NETHERITE_AXE',
                'NETHERITE_BLOCK',
                'NETHERITE_BOOTS',
                'NETHERITE_CHESTPLATE',
                'NETHERITE_HELMET',
                'NETHERITE_HOE',
                'NETHERITE_INGOT',
                'NETHERITE_LEGGINGS',
                'NETHERITE_PICKAXE',
                'NETHERITE_SCRAP',
                'NETHERITE_SHOVEL',
                'NETHERITE_SWORD',
                'NETHERITE_UPGRADE_SMITHING_TEMPLATE',
                'NETHERRACK',
                'NOTE_BLOCK',
                'OAK_BOAT',
                'OAK_BUTTON',
                'OAK_CHEST_BOAT',
                'OAK_DOOR',
                'OAK_FENCE',
                'OAK_FENCE_GATE',
                'OAK_HANGING_SIGN',
                'OAK_LEAVES',
                'OAK_LOG',
                'OAK_PLANKS',
                'OAK_PRESSURE_PLATE',
                'OAK_SAPLING',
                'OAK_SIGN',
                'OAK_SLAB',
                'OAK_STAIRS',
                'OAK_TRAPDOOR',
                'OAK_WALL_HANGING_SIGN',
                'OAK_WALL_SIGN',
                'OAK_WOOD',
                'OBSERVER',
                'OBSIDIAN',
                'OCELOT_SPAWN_EGG',
                'OCHRE_FROGLIGHT',
                'OMINOUS_BOTTLE',
                'OMINOUS_TRIAL_KEY',
                'ORANGE_BANNER',
                'ORANGE_BED',
                'ORANGE_BUNDLE',
                'ORANGE_CANDLE',
                'ORANGE_CANDLE_CAKE',
                'ORANGE_CARPET',
                'ORANGE_CONCRETE',
                'ORANGE_CONCRETE_POWDER',
                'ORANGE_DYE',
                'ORANGE_GLAZED_TERRACOTTA',
                'ORANGE_SHULKER_BOX',
                'ORANGE_STAINED_GLASS',
                'ORANGE_STAINED_GLASS_PANE',
                'ORANGE_TERRACOTTA',
                'ORANGE_TULIP',
                'ORANGE_WALL_BANNER',
                'ORANGE_WOOL',
                'OXEYE_DAISY',
                'OXIDIZED_CHISELED_COPPER',
                'OXIDIZED_COPPER',
                'OXIDIZED_COPPER_BULB',
                'OXIDIZED_COPPER_DOOR',
                'OXIDIZED_COPPER_GRATE',
                'OXIDIZED_COPPER_TRAPDOOR',
                'OXIDIZED_CUT_COPPER',
                'OXIDIZED_CUT_COPPER_SLAB',
                'OXIDIZED_CUT_COPPER_STAIRS',
                'PACKED_ICE',
                'PACKED_MUD',
                'PAINTING',
                'PALE_HANGING_MOSS',
                'PALE_MOSS_BLOCK',
                'PALE_MOSS_CARPET',
                'PALE_OAK_BOAT',
                'PALE_OAK_BUTTON',
                'PALE_OAK_CHEST_BOAT',
                'PALE_OAK_DOOR',
                'PALE_OAK_FENCE',
                'PALE_OAK_FENCE_GATE',
                'PALE_OAK_HANGING_SIGN',
                'PALE_OAK_LEAVES',
                'PALE_OAK_LOG',
                'PALE_OAK_PLANKS',
                'PALE_OAK_PRESSURE_PLATE',
                'PALE_OAK_SAPLING',
                'PALE_OAK_SIGN',
                'PALE_OAK_SLAB',
                'PALE_OAK_STAIRS',
                'PALE_OAK_TRAPDOOR',
                'PALE_OAK_WALL_HANGING_SIGN',
                'PALE_OAK_WALL_SIGN',
                'PALE_OAK_WOOD',
                'PANDA_SPAWN_EGG',
                'PAPER',
                'PARROT_SPAWN_EGG',
                'PEARLESCENT_FROGLIGHT',
                'PEONY',
                'PETRIFIED_OAK_SLAB',
                'PHANTOM_MEMBRANE',
                'PHANTOM_SPAWN_EGG',
                'PIG_SPAWN_EGG',
                'PIGLIN_BANNER_PATTERN',
                'PIGLIN_BRUTE_SPAWN_EGG',
                'PIGLIN_HEAD',
                'PIGLIN_SPAWN_EGG',
                'PIGLIN_WALL_HEAD',
                'PILLAGER_SPAWN_EGG',
                'PINK_BANNER',
                'PINK_BED',
                'PINK_BUNDLE',
                'PINK_CANDLE',
                'PINK_CANDLE_CAKE',
                'PINK_CARPET',
                'PINK_CONCRETE',
                'PINK_CONCRETE_POWDER',
                'PINK_DYE',
                'PINK_GLAZED_TERRACOTTA',
                'PINK_PETALS',
                'PINK_SHULKER_BOX',
                'PINK_STAINED_GLASS',
                'PINK_STAINED_GLASS_PANE',
                'PINK_TERRACOTTA',
                'PINK_TULIP',
                'PINK_WALL_BANNER',
                'PINK_WOOL',
                'PISTON',
                'PISTON_HEAD',
                'PITCHER_CROP',
                'PITCHER_PLANT',
                'PITCHER_POD',
                'PLAYER_HEAD',
                'PLAYER_WALL_HEAD',
                'PLENTY_POTTERY_SHERD',
                'PODZOL',
                'POINTED_DRIPSTONE',
                'POISONOUS_POTATO',
                'POLAR_BEAR_SPAWN_EGG',
                'POLISHED_ANDESITE',
                'POLISHED_ANDESITE_SLAB',
                'POLISHED_ANDESITE_STAIRS',
                'POLISHED_BASALT',
                'POLISHED_BLACKSTONE',
                'POLISHED_BLACKSTONE_BRICK_SLAB',
                'POLISHED_BLACKSTONE_BRICK_STAIRS',
                'POLISHED_BLACKSTONE_BRICK_WALL',
                'POLISHED_BLACKSTONE_BRICKS',
                'POLISHED_BLACKSTONE_BUTTON',
                'POLISHED_BLACKSTONE_PRESSURE_PLATE',
                'POLISHED_BLACKSTONE_SLAB',
                'POLISHED_BLACKSTONE_STAIRS',
                'POLISHED_BLACKSTONE_WALL',
                'POLISHED_DEEPSLATE',
                'POLISHED_DEEPSLATE_SLAB',
                'POLISHED_DEEPSLATE_STAIRS',
                'POLISHED_DEEPSLATE_WALL',
                'POLISHED_DIORITE',
                'POLISHED_DIORITE_SLAB',
                'POLISHED_DIORITE_STAIRS',
                'POLISHED_GRANITE',
                'POLISHED_GRANITE_SLAB',
                'POLISHED_GRANITE_STAIRS',
                'POLISHED_TUFF',
                'POLISHED_TUFF_SLAB',
                'POLISHED_TUFF_STAIRS',
                'POLISHED_TUFF_WALL',
                'POPPED_CHORUS_FRUIT',
                'POPPY',
                'PORKCHOP',
                'POTATO',
                'POTATOES',
                'POTION',
                'POTTED_ACACIA_SAPLING',
                'POTTED_ALLIUM',
                'POTTED_AZALEA_BUSH',
                'POTTED_AZURE_BLUET',
                'POTTED_BAMBOO',
                'POTTED_BIRCH_SAPLING',
                'POTTED_BLUE_ORCHID',
                'POTTED_BROWN_MUSHROOM',
                'POTTED_CACTUS',
                'POTTED_CHERRY_SAPLING',
                'POTTED_CORNFLOWER',
                'POTTED_CRIMSON_FUNGUS',
                'POTTED_CRIMSON_ROOTS',
                'POTTED_DANDELION',
                'POTTED_DARK_OAK_SAPLING',
                'POTTED_DEAD_BUSH',
                'POTTED_FERN',
                'POTTED_FLOWERING_AZALEA_BUSH',
                'POTTED_JUNGLE_SAPLING',
                'POTTED_LILY_OF_THE_VALLEY',
                'POTTED_MANGROVE_PROPAGULE',
                'POTTED_OAK_SAPLING',
                'POTTED_ORANGE_TULIP',
                'POTTED_OXEYE_DAISY',
                'POTTED_PALE_OAK_SAPLING',
                'POTTED_PINK_TULIP',
                'POTTED_POPPY',
                'POTTED_RED_MUSHROOM',
                'POTTED_RED_TULIP',
                'POTTED_SPRUCE_SAPLING',
                'POTTED_TORCHFLOWER',
                'POTTED_WARPED_FUNGUS',
                'POTTED_WARPED_ROOTS',
                'POTTED_WHITE_TULIP',
                'POTTED_WITHER_ROSE',
                'POWDER_SNOW',
                'POWDER_SNOW_BUCKET',
                'POWDER_SNOW_CAULDRON',
                'POWERED_RAIL',
                'PRISMARINE',
                'PRISMARINE_BRICK_SLAB',
                'PRISMARINE_BRICK_STAIRS',
                'PRISMARINE_BRICKS',
                'PRISMARINE_CRYSTALS',
                'PRISMARINE_SHARD',
                'PRISMARINE_SLAB',
                'PRISMARINE_STAIRS',
                'PRISMARINE_WALL',
                'PRIZE_POTTERY_SHERD',
                'PUFFERFISH',
                'PUFFERFISH_BUCKET',
                'PUFFERFISH_SPAWN_EGG',
                'PUMPKIN',
                'PUMPKIN_PIE',
                'PUMPKIN_SEEDS',
                'PUMPKIN_STEM',
                'PURPLE_BANNER',
                'PURPLE_BED',
                'PURPLE_BUNDLE',
                'PURPLE_CANDLE',
                'PURPLE_CANDLE_CAKE',
                'PURPLE_CARPET',
                'PURPLE_CONCRETE',
                'PURPLE_CONCRETE_POWDER',
                'PURPLE_DYE',
                'PURPLE_GLAZED_TERRACOTTA',
                'PURPLE_SHULKER_BOX',
                'PURPLE_STAINED_GLASS',
                'PURPLE_STAINED_GLASS_PANE',
                'PURPLE_TERRACOTTA',
                'PURPLE_WALL_BANNER',
                'PURPLE_WOOL',
                'PURPUR_BLOCK',
                'PURPUR_PILLAR',
                'PURPUR_SLAB',
                'PURPUR_STAIRS',
                'QUARTZ',
                'QUARTZ_BLOCK',
                'QUARTZ_BRICKS',
                'QUARTZ_PILLAR',
                'QUARTZ_SLAB',
                'QUARTZ_STAIRS',
                'RABBIT',
                'RABBIT_FOOT',
                'RABBIT_HIDE',
                'RABBIT_SPAWN_EGG',
                'RABBIT_STEW',
                'RAIL',
                'RAISER_ARMOR_TRIM_SMITHING_TEMPLATE',
                'RAVAGER_SPAWN_EGG',
                'RAW_COPPER',
                'RAW_COPPER_BLOCK',
                'RAW_GOLD',
                'RAW_GOLD_BLOCK',
                'RAW_IRON',
                'RAW_IRON_BLOCK',
                'RECOVERY_COMPASS',
                'RED_BANNER',
                'RED_BED',
                'RED_BUNDLE',
                'RED_CANDLE',
                'RED_CANDLE_CAKE',
                'RED_CARPET',
                'RED_CONCRETE',
                'RED_CONCRETE_POWDER',
                'RED_DYE',
                'RED_GLAZED_TERRACOTTA',
                'RED_MUSHROOM',
                'RED_MUSHROOM_BLOCK',
                'RED_NETHER_BRICK_SLAB',
                'RED_NETHER_BRICK_STAIRS',
                'RED_NETHER_BRICK_WALL',
                'RED_NETHER_BRICKS',
                'RED_SAND',
                'RED_SANDSTONE',
                'RED_SANDSTONE_SLAB',
                'RED_SANDSTONE_STAIRS',
                'RED_SANDSTONE_WALL',
                'RED_SHULKER_BOX',
                'RED_STAINED_GLASS',
                'RED_STAINED_GLASS_PANE',
                'RED_TERRACOTTA',
                'RED_TULIP',
                'RED_WALL_BANNER',
                'RED_WOOL',
                'REDSTONE',
                'REDSTONE_BLOCK',
                'REDSTONE_LAMP',
                'REDSTONE_ORE',
                'REDSTONE_TORCH',
                'REDSTONE_WALL_TORCH',
                'REDSTONE_WIRE',
                'REINFORCED_DEEPSLATE',
                'REPEATER',
                'REPEATING_COMMAND_BLOCK',
                'RESPAWN_ANCHOR',
                'RIB_ARMOR_TRIM_SMITHING_TEMPLATE',
                'ROOTED_DIRT',
                'ROSE_BUSH',
                'ROTTEN_FLESH',
                'SADDLE',
                'SALMON',
                'SALMON_BUCKET',
                'SALMON_SPAWN_EGG',
                'SAND',
                'SANDSTONE',
                'SANDSTONE_SLAB',
                'SANDSTONE_STAIRS',
                'SANDSTONE_WALL',
                'SCAFFOLDING',
                'SCRAPE_POTTERY_SHERD',
                'SCULK',
                'SCULK_CATALYST',
                'SCULK_SENSOR',
                'SCULK_SHRIEKER',
                'SCULK_VEIN',
                'SEA_LANTERN',
                'SEA_PICKLE',
                'SEAGRASS',
                'SENTRY_ARMOR_TRIM_SMITHING_TEMPLATE',
                'SHAPER_ARMOR_TRIM_SMITHING_TEMPLATE',
                'SHEAF_POTTERY_SHERD',
                'SHEARS',
                'SHEEP_SPAWN_EGG',
                'SHELTER_POTTERY_SHERD',
                'SHIELD',
                'SHORT_GRASS',
                'SHROOMLIGHT',
                'SHULKER_BOX',
                'SHULKER_SHELL',
                'SHULKER_SPAWN_EGG',
                'SILENCE_ARMOR_TRIM_SMITHING_TEMPLATE',
                'SILVERFISH_SPAWN_EGG',
                'SKELETON_HORSE_SPAWN_EGG',
                'SKELETON_SKULL',
                'SKELETON_SPAWN_EGG',
                'SKELETON_WALL_SKULL',
                'SKULL_BANNER_PATTERN',
                'SKULL_POTTERY_SHERD',
                'SLIME_BALL',
                'SLIME_BLOCK',
                'SLIME_SPAWN_EGG',
                'SMALL_AMETHYST_BUD',
                'SMALL_DRIPLEAF',
                'SMITHING_TABLE',
                'SMOKER',
                'SMOOTH_BASALT',
                'SMOOTH_QUARTZ',
                'SMOOTH_QUARTZ_SLAB',
                'SMOOTH_QUARTZ_STAIRS',
                'SMOOTH_RED_SANDSTONE',
                'SMOOTH_RED_SANDSTONE_SLAB',
                'SMOOTH_RED_SANDSTONE_STAIRS',
                'SMOOTH_SANDSTONE',
                'SMOOTH_SANDSTONE_SLAB',
                'SMOOTH_SANDSTONE_STAIRS',
                'SMOOTH_STONE',
                'SMOOTH_STONE_SLAB',
                'SNIFFER_EGG',
                'SNIFFER_SPAWN_EGG',
                'SNORT_POTTERY_SHERD',
                'SNOUT_ARMOR_TRIM_SMITHING_TEMPLATE',
                'SNOW',
                'SNOW_BLOCK',
                'SNOW_GOLEM_SPAWN_EGG',
                'SNOWBALL',
                'SOUL_CAMPFIRE',
                'SOUL_FIRE',
                'SOUL_LANTERN',
                'SOUL_SAND',
                'SOUL_SOIL',
                'SOUL_TORCH',
                'SOUL_WALL_TORCH',
                'SPAWNER',
                'SPECTRAL_ARROW',
                'SPIDER_EYE',
                'SPIDER_SPAWN_EGG',
                'SPIRE_ARMOR_TRIM_SMITHING_TEMPLATE',
                'SPLASH_POTION',
                'SPONGE',
                'SPORE_BLOSSOM',
                'SPRUCE_BOAT',
                'SPRUCE_BUTTON',
                'SPRUCE_CHEST_BOAT',
                'SPRUCE_DOOR',
                'SPRUCE_FENCE',
                'SPRUCE_FENCE_GATE',
                'SPRUCE_HANGING_SIGN',
                'SPRUCE_LEAVES',
                'SPRUCE_LOG',
                'SPRUCE_PLANKS',
                'SPRUCE_PRESSURE_PLATE',
                'SPRUCE_SAPLING',
                'SPRUCE_SIGN',
                'SPRUCE_SLAB',
                'SPRUCE_STAIRS',
                'SPRUCE_TRAPDOOR',
                'SPRUCE_WALL_HANGING_SIGN',
                'SPRUCE_WALL_SIGN',
                'SPRUCE_WOOD',
                'SPYGLASS',
                'SQUID_SPAWN_EGG',
                'STICK',
                'STICKY_PISTON',
                'STONE',
                'STONE_AXE',
                'STONE_BRICK_SLAB',
                'STONE_BRICK_STAIRS',
                'STONE_BRICK_WALL',
                'STONE_BRICKS',
                'STONE_BUTTON',
                'STONE_HOE',
                'STONE_PICKAXE',
                'STONE_PRESSURE_PLATE',
                'STONE_SHOVEL',
                'STONE_SLAB',
                'STONE_STAIRS',
                'STONE_SWORD',
                'STONECUTTER',
                'STRAY_SPAWN_EGG',
                'STRIDER_SPAWN_EGG',
                'STRING',
                'STRIPPED_ACACIA_LOG',
                'STRIPPED_ACACIA_WOOD',
                'STRIPPED_BAMBOO_BLOCK',
                'STRIPPED_BIRCH_LOG',
                'STRIPPED_BIRCH_WOOD',
                'STRIPPED_CHERRY_LOG',
                'STRIPPED_CHERRY_WOOD',
                'STRIPPED_CRIMSON_HYPHAE',
                'STRIPPED_CRIMSON_STEM',
                'STRIPPED_DARK_OAK_LOG',
                'STRIPPED_DARK_OAK_WOOD',
                'STRIPPED_JUNGLE_LOG',
                'STRIPPED_JUNGLE_WOOD',
                'STRIPPED_MANGROVE_LOG',
                'STRIPPED_MANGROVE_WOOD',
                'STRIPPED_OAK_LOG',
                'STRIPPED_OAK_WOOD',
                'STRIPPED_PALE_OAK_LOG',
                'STRIPPED_PALE_OAK_WOOD',
                'STRIPPED_SPRUCE_LOG',
                'STRIPPED_SPRUCE_WOOD',
                'STRIPPED_WARPED_HYPHAE',
                'STRIPPED_WARPED_STEM',
                'STRUCTURE_BLOCK',
                'STRUCTURE_VOID',
                'SUGAR',
                'SUGAR_CANE',
                'SUNFLOWER',
                'SUSPICIOUS_GRAVEL',
                'SUSPICIOUS_SAND',
                'SUSPICIOUS_STEW',
                'SWEET_BERRIES',
                'SWEET_BERRY_BUSH',
                'TADPOLE_BUCKET',
                'TADPOLE_SPAWN_EGG',
                'TALL_GRASS',
                'TALL_SEAGRASS',
                'TARGET',
                'TERRACOTTA',
                'TIDE_ARMOR_TRIM_SMITHING_TEMPLATE',
                'TINTED_GLASS',
                'TIPPED_ARROW',
                'TNT',
                'TNT_MINECART',
                'TORCH',
                'TORCHFLOWER',
                'TORCHFLOWER_CROP',
                'TORCHFLOWER_SEEDS',
                'TOTEM_OF_UNDYING',
                'TRADER_LLAMA_SPAWN_EGG',
                'TRAPPED_CHEST',
                'TRIAL_KEY',
                'TRIAL_SPAWNER',
                'TRIDENT',
                'TRIPWIRE',
                'TRIPWIRE_HOOK',
                'TROPICAL_FISH',
                'TROPICAL_FISH_BUCKET',
                'TROPICAL_FISH_SPAWN_EGG',
                'TUBE_CORAL',
                'TUBE_CORAL_BLOCK',
                'TUBE_CORAL_FAN',
                'TUBE_CORAL_WALL_FAN',
                'TUFF',
                'TUFF_BRICK_SLAB',
                'TUFF_BRICK_STAIRS',
                'TUFF_BRICK_WALL',
                'TUFF_BRICKS',
                'TUFF_SLAB',
                'TUFF_STAIRS',
                'TUFF_WALL',
                'TURTLE_EGG',
                'TURTLE_HELMET',
                'TURTLE_SCUTE',
                'TURTLE_SPAWN_EGG',
                'TWISTING_VINES',
                'TWISTING_VINES_PLANT',
                'VAULT',
                'VERDANT_FROGLIGHT',
                'VEX_ARMOR_TRIM_SMITHING_TEMPLATE',
                'VEX_SPAWN_EGG',
                'VILLAGER_SPAWN_EGG',
                'VINDICATOR_SPAWN_EGG',
                'VINE',
                'VOID_AIR',
                'WALL_TORCH',
                'WANDERING_TRADER_SPAWN_EGG',
                'WARD_ARMOR_TRIM_SMITHING_TEMPLATE',
                'WARDEN_SPAWN_EGG',
                'WARPED_BUTTON',
                'WARPED_DOOR',
                'WARPED_FENCE',
                'WARPED_FENCE_GATE',
                'WARPED_FUNGUS',
                'WARPED_FUNGUS_ON_A_STICK',
                'WARPED_HANGING_SIGN',
                'WARPED_HYPHAE',
                'WARPED_NYLIUM',
                'WARPED_PLANKS',
                'WARPED_PRESSURE_PLATE',
                'WARPED_ROOTS',
                'WARPED_SIGN',
                'WARPED_SLAB',
                'WARPED_STAIRS',
                'WARPED_STEM',
                'WARPED_TRAPDOOR',
                'WARPED_WALL_HANGING_SIGN',
                'WARPED_WALL_SIGN',
                'WARPED_WART_BLOCK',
                'WATER',
                'WATER_BUCKET',
                'WATER_CAULDRON',
                'WAXED_CHISELED_COPPER',
                'WAXED_COPPER_BLOCK',
                'WAXED_COPPER_BULB',
                'WAXED_COPPER_DOOR',
                'WAXED_COPPER_GRATE',
                'WAXED_COPPER_TRAPDOOR',
                'WAXED_CUT_COPPER',
                'WAXED_CUT_COPPER_SLAB',
                'WAXED_CUT_COPPER_STAIRS',
                'WAXED_EXPOSED_CHISELED_COPPER',
                'WAXED_EXPOSED_COPPER',
                'WAXED_EXPOSED_COPPER_BULB',
                'WAXED_EXPOSED_COPPER_DOOR',
                'WAXED_EXPOSED_COPPER_GRATE',
                'WAXED_EXPOSED_COPPER_TRAPDOOR',
                'WAXED_EXPOSED_CUT_COPPER',
                'WAXED_EXPOSED_CUT_COPPER_SLAB',
                'WAXED_EXPOSED_CUT_COPPER_STAIRS',
                'WAXED_OXIDIZED_CHISELED_COPPER',
                'WAXED_OXIDIZED_COPPER',
                'WAXED_OXIDIZED_COPPER_BULB',
                'WAXED_OXIDIZED_COPPER_DOOR',
                'WAXED_OXIDIZED_COPPER_GRATE',
                'WAXED_OXIDIZED_COPPER_TRAPDOOR',
                'WAXED_OXIDIZED_CUT_COPPER',
                'WAXED_OXIDIZED_CUT_COPPER_SLAB',
                'WAXED_OXIDIZED_CUT_COPPER_STAIRS',
                'WAXED_WEATHERED_CHISELED_COPPER',
                'WAXED_WEATHERED_COPPER',
                'WAXED_WEATHERED_COPPER_BULB',
                'WAXED_WEATHERED_COPPER_DOOR',
                'WAXED_WEATHERED_COPPER_GRATE',
                'WAXED_WEATHERED_COPPER_TRAPDOOR',
                'WAXED_WEATHERED_CUT_COPPER',
                'WAXED_WEATHERED_CUT_COPPER_SLAB',
                'WAXED_WEATHERED_CUT_COPPER_STAIRS',
                'WAYFINDER_ARMOR_TRIM_SMITHING_TEMPLATE',
                'WEATHERED_CHISELED_COPPER',
                'WEATHERED_COPPER',
                'WEATHERED_COPPER_BULB',
                'WEATHERED_COPPER_DOOR',
                'WEATHERED_COPPER_GRATE',
                'WEATHERED_COPPER_TRAPDOOR',
                'WEATHERED_CUT_COPPER',
                'WEATHERED_CUT_COPPER_SLAB',
                'WEATHERED_CUT_COPPER_STAIRS',
                'WEEPING_VINES',
                'WEEPING_VINES_PLANT',
                'WET_SPONGE',
                'WHEAT',
                'WHEAT_SEEDS',
                'WHITE_BANNER',
                'WHITE_BED',
                'WHITE_BUNDLE',
                'WHITE_CANDLE',
                'WHITE_CANDLE_CAKE',
                'WHITE_CARPET',
                'WHITE_CONCRETE',
                'WHITE_CONCRETE_POWDER',
                'WHITE_DYE',
                'WHITE_GLAZED_TERRACOTTA',
                'WHITE_SHULKER_BOX',
                'WHITE_STAINED_GLASS',
                'WHITE_STAINED_GLASS_PANE',
                'WHITE_TERRACOTTA',
                'WHITE_TULIP',
                'WHITE_WALL_BANNER',
                'WHITE_WOOL',
                'WILD_ARMOR_TRIM_SMITHING_TEMPLATE',
                'WIND_CHARGE',
                'WITCH_SPAWN_EGG',
                'WITHER_ROSE',
                'WITHER_SKELETON_SKULL',
                'WITHER_SKELETON_SPAWN_EGG',
                'WITHER_SKELETON_WALL_SKULL',
                'WITHER_SPAWN_EGG',
                'WOLF_ARMOR',
                'WOLF_SPAWN_EGG',
                'WOODEN_AXE',
                'WOODEN_HOE',
                'WOODEN_PICKAXE',
                'WOODEN_SHOVEL',
                'WOODEN_SWORD',
                'WRITABLE_BOOK',
                'WRITTEN_BOOK',
                'YELLOW_BANNER',
                'YELLOW_BED',
                'YELLOW_BUNDLE',
                'YELLOW_CANDLE',
                'YELLOW_CANDLE_CAKE',
                'YELLOW_CARPET',
                'YELLOW_CONCRETE',
                'YELLOW_CONCRETE_POWDER',
                'YELLOW_DYE',
                'YELLOW_GLAZED_TERRACOTTA',
                'YELLOW_SHULKER_BOX',
                'YELLOW_STAINED_GLASS',
                'YELLOW_STAINED_GLASS_PANE',
                'YELLOW_TERRACOTTA',
                'YELLOW_WALL_BANNER',
                'YELLOW_WOOL',
                'ZOGLIN_SPAWN_EGG',
                'ZOMBIE_HEAD',
                'ZOMBIE_HORSE_SPAWN_EGG',
                'ZOMBIE_SPAWN_EGG',
                'ZOMBIE_VILLAGER_SPAWN_EGG',
                'ZOMBIE_WALL_HEAD',
                'ZOMBIFIED_PIGLIN_SPAWN_EGG',
                'GRASS',
            ]
        },
        "bukkit_blocks": {
            "$id": "bukkit_blocks",
            "title": "Vanilla blocks",
            "markdownDescription": "Examples: **STONE**, **DIAMOND_BLOCK**",
            "type": "string",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        'ACACIA_BUTTON',
                        'ACACIA_DOOR',
                        'ACACIA_FENCE',
                        'ACACIA_FENCE_GATE',
                        'ACACIA_HANGING_SIGN',
                        'ACACIA_LEAVES',
                        'ACACIA_LOG',
                        'ACACIA_PRESSURE_PLATE',
                        'ACACIA_SAPLING',
                        'ACACIA_SIGN',
                        'ACACIA_SLAB',
                        'ACACIA_STAIRS',
                        'ACACIA_TRAPDOOR',
                        'ACACIA_WALL_HANGING_SIGN',
                        'ACACIA_WALL_SIGN',
                        'ACACIA_WOOD',
                        'ACTIVATOR_RAIL',
                        'AMETHYST_CLUSTER',
                        'ANDESITE_SLAB',
                        'ANDESITE_STAIRS',
                        'ANDESITE_WALL',
                        'ANVIL',
                        'ATTACHED_MELON_STEM',
                        'ATTACHED_PUMPKIN_STEM',
                        'AZALEA_LEAVES',
                        'BAMBOO',
                        'BAMBOO_BLOCK',
                        'BAMBOO_BUTTON',
                        'BAMBOO_DOOR',
                        'BAMBOO_FENCE',
                        'BAMBOO_FENCE_GATE',
                        'BAMBOO_HANGING_SIGN',
                        'BAMBOO_MOSAIC_SLAB',
                        'BAMBOO_MOSAIC_STAIRS',
                        'BAMBOO_PRESSURE_PLATE',
                        'BAMBOO_SIGN',
                        'BAMBOO_SLAB',
                        'BAMBOO_STAIRS',
                        'BAMBOO_TRAPDOOR',
                        'BAMBOO_WALL_HANGING_SIGN',
                        'BAMBOO_WALL_SIGN',
                        'BARREL',
                        'BARRIER',
                        'BASALT',
                        'BEE_NEST',
                        'BEEHIVE',
                        'BEETROOTS',
                        'BELL',
                        'BIG_DRIPLEAF',
                        'BIG_DRIPLEAF_STEM',
                        'BIRCH_BUTTON',
                        'BIRCH_DOOR',
                        'BIRCH_FENCE',
                        'BIRCH_FENCE_GATE',
                        'BIRCH_HANGING_SIGN',
                        'BIRCH_LEAVES',
                        'BIRCH_LOG',
                        'BIRCH_PRESSURE_PLATE',
                        'BIRCH_SAPLING',
                        'BIRCH_SIGN',
                        'BIRCH_SLAB',
                        'BIRCH_STAIRS',
                        'BIRCH_TRAPDOOR',
                        'BIRCH_WALL_HANGING_SIGN',
                        'BIRCH_WALL_SIGN',
                        'BIRCH_WOOD',
                        'BLACK_BANNER',
                        'BLACK_BED',
                        'BLACK_CANDLE',
                        'BLACK_CANDLE_CAKE',
                        'BLACK_GLAZED_TERRACOTTA',
                        'BLACK_SHULKER_BOX',
                        'BLACK_STAINED_GLASS_PANE',
                        'BLACK_WALL_BANNER',
                        'BLACKSTONE_SLAB',
                        'BLACKSTONE_STAIRS',
                        'BLACKSTONE_WALL',
                        'BLAST_FURNACE',
                        'BLUE_BANNER',
                        'BLUE_BED',
                        'BLUE_CANDLE',
                        'BLUE_CANDLE_CAKE',
                        'BLUE_GLAZED_TERRACOTTA',
                        'BLUE_SHULKER_BOX',
                        'BLUE_STAINED_GLASS_PANE',
                        'BLUE_WALL_BANNER',
                        'BONE_BLOCK',
                        'BRAIN_CORAL',
                        'BRAIN_CORAL_FAN',
                        'BRAIN_CORAL_WALL_FAN',
                        'BREWING_STAND',
                        'BRICK_SLAB',
                        'BRICK_STAIRS',
                        'BRICK_WALL',
                        'BROWN_BANNER',
                        'BROWN_BED',
                        'BROWN_CANDLE',
                        'BROWN_CANDLE_CAKE',
                        'BROWN_GLAZED_TERRACOTTA',
                        'BROWN_MUSHROOM_BLOCK',
                        'BROWN_SHULKER_BOX',
                        'BROWN_STAINED_GLASS_PANE',
                        'BROWN_WALL_BANNER',
                        'BUBBLE_COLUMN',
                        'BUBBLE_CORAL',
                        'BUBBLE_CORAL_FAN',
                        'BUBBLE_CORAL_WALL_FAN',
                        'CACTUS',
                        'CAKE',
                        'CALIBRATED_SCULK_SENSOR',
                        'CAMPFIRE',
                        'CANDLE',
                        'CANDLE_CAKE',
                        'CARROTS',
                        'CARVED_PUMPKIN',
                        'CAVE_VINES',
                        'CAVE_VINES_PLANT',
                        'CHAIN',
                        'CHAIN_COMMAND_BLOCK',
                        'CHERRY_BUTTON',
                        'CHERRY_DOOR',
                        'CHERRY_FENCE',
                        'CHERRY_FENCE_GATE',
                        'CHERRY_HANGING_SIGN',
                        'CHERRY_LEAVES',
                        'CHERRY_LOG',
                        'CHERRY_PRESSURE_PLATE',
                        'CHERRY_SAPLING',
                        'CHERRY_SIGN',
                        'CHERRY_SLAB',
                        'CHERRY_STAIRS',
                        'CHERRY_TRAPDOOR',
                        'CHERRY_WALL_HANGING_SIGN',
                        'CHERRY_WALL_SIGN',
                        'CHERRY_WOOD',
                        'CHEST',
                        'CHIPPED_ANVIL',
                        'CHISELED_BOOKSHELF',
                        'CHORUS_FLOWER',
                        'CHORUS_PLANT',
                        'COBBLED_DEEPSLATE_SLAB',
                        'COBBLED_DEEPSLATE_STAIRS',
                        'COBBLED_DEEPSLATE_WALL',
                        'COBBLESTONE_SLAB',
                        'COBBLESTONE_STAIRS',
                        'COBBLESTONE_WALL',
                        'COCOA',
                        'COMMAND_BLOCK',
                        'COMPARATOR',
                        'COMPOSTER',
                        'CONDUIT',
                        'COPPER_BULB',
                        'COPPER_DOOR',
                        'COPPER_GRATE',
                        'COPPER_TRAPDOOR',
                        'CRAFTER',
                        'CREAKING_HEART',
                        'CREEPER_HEAD',
                        'CREEPER_WALL_HEAD',
                        'CRIMSON_BUTTON',
                        'CRIMSON_DOOR',
                        'CRIMSON_FENCE',
                        'CRIMSON_FENCE_GATE',
                        'CRIMSON_HANGING_SIGN',
                        'CRIMSON_HYPHAE',
                        'CRIMSON_PRESSURE_PLATE',
                        'CRIMSON_SIGN',
                        'CRIMSON_SLAB',
                        'CRIMSON_STAIRS',
                        'CRIMSON_STEM',
                        'CRIMSON_TRAPDOOR',
                        'CRIMSON_WALL_HANGING_SIGN',
                        'CRIMSON_WALL_SIGN',
                        'CUT_COPPER_SLAB',
                        'CUT_COPPER_STAIRS',
                        'CUT_RED_SANDSTONE_SLAB',
                        'CUT_SANDSTONE_SLAB',
                        'CYAN_BANNER',
                        'CYAN_BED',
                        'CYAN_CANDLE',
                        'CYAN_CANDLE_CAKE',
                        'CYAN_GLAZED_TERRACOTTA',
                        'CYAN_SHULKER_BOX',
                        'CYAN_STAINED_GLASS_PANE',
                        'CYAN_WALL_BANNER',
                        'DAMAGED_ANVIL',
                        'DARK_OAK_BUTTON',
                        'DARK_OAK_DOOR',
                        'DARK_OAK_FENCE',
                        'DARK_OAK_FENCE_GATE',
                        'DARK_OAK_HANGING_SIGN',
                        'DARK_OAK_LEAVES',
                        'DARK_OAK_LOG',
                        'DARK_OAK_PRESSURE_PLATE',
                        'DARK_OAK_SAPLING',
                        'DARK_OAK_SIGN',
                        'DARK_OAK_SLAB',
                        'DARK_OAK_STAIRS',
                        'DARK_OAK_TRAPDOOR',
                        'DARK_OAK_WALL_HANGING_SIGN',
                        'DARK_OAK_WALL_SIGN',
                        'DARK_OAK_WOOD',
                        'DARK_PRISMARINE_SLAB',
                        'DARK_PRISMARINE_STAIRS',
                        'DAYLIGHT_DETECTOR',
                        'DEAD_BRAIN_CORAL',
                        'DEAD_BRAIN_CORAL_FAN',
                        'DEAD_BRAIN_CORAL_WALL_FAN',
                        'DEAD_BUBBLE_CORAL',
                        'DEAD_BUBBLE_CORAL_FAN',
                        'DEAD_BUBBLE_CORAL_WALL_FAN',
                        'DEAD_FIRE_CORAL',
                        'DEAD_FIRE_CORAL_FAN',
                        'DEAD_FIRE_CORAL_WALL_FAN',
                        'DEAD_HORN_CORAL',
                        'DEAD_HORN_CORAL_FAN',
                        'DEAD_HORN_CORAL_WALL_FAN',
                        'DEAD_TUBE_CORAL',
                        'DEAD_TUBE_CORAL_FAN',
                        'DEAD_TUBE_CORAL_WALL_FAN',
                        'DECORATED_POT',
                        'DEEPSLATE',
                        'DEEPSLATE_BRICK_SLAB',
                        'DEEPSLATE_BRICK_STAIRS',
                        'DEEPSLATE_BRICK_WALL',
                        'DEEPSLATE_REDSTONE_ORE',
                        'DEEPSLATE_TILE_SLAB',
                        'DEEPSLATE_TILE_STAIRS',
                        'DEEPSLATE_TILE_WALL',
                        'DETECTOR_RAIL',
                        'DIORITE_SLAB',
                        'DIORITE_STAIRS',
                        'DIORITE_WALL',
                        'DISPENSER',
                        'DRAGON_HEAD',
                        'DRAGON_WALL_HEAD',
                        'DROPPER',
                        'END_PORTAL_FRAME',
                        'END_ROD',
                        'END_STONE_BRICK_SLAB',
                        'END_STONE_BRICK_STAIRS',
                        'END_STONE_BRICK_WALL',
                        'ENDER_CHEST',
                        'EXPOSED_COPPER_BULB',
                        'EXPOSED_COPPER_DOOR',
                        'EXPOSED_COPPER_GRATE',
                        'EXPOSED_COPPER_TRAPDOOR',
                        'EXPOSED_CUT_COPPER_SLAB',
                        'EXPOSED_CUT_COPPER_STAIRS',
                        'FARMLAND',
                        'FIRE',
                        'FIRE_CORAL',
                        'FIRE_CORAL_FAN',
                        'FIRE_CORAL_WALL_FAN',
                        'FLOWERING_AZALEA_LEAVES',
                        'FROSTED_ICE',
                        'FURNACE',
                        'GLASS_PANE',
                        'GLOW_LICHEN',
                        'GRANITE_SLAB',
                        'GRANITE_STAIRS',
                        'GRANITE_WALL',
                        'GRASS_BLOCK',
                        'GRAY_BANNER',
                        'GRAY_BED',
                        'GRAY_CANDLE',
                        'GRAY_CANDLE_CAKE',
                        'GRAY_GLAZED_TERRACOTTA',
                        'GRAY_SHULKER_BOX',
                        'GRAY_STAINED_GLASS_PANE',
                        'GRAY_WALL_BANNER',
                        'GREEN_BANNER',
                        'GREEN_BED',
                        'GREEN_CANDLE',
                        'GREEN_CANDLE_CAKE',
                        'GREEN_GLAZED_TERRACOTTA',
                        'GREEN_SHULKER_BOX',
                        'GREEN_STAINED_GLASS_PANE',
                        'GREEN_WALL_BANNER',
                        'GRINDSTONE',
                        'HANGING_ROOTS',
                        'HAY_BLOCK',
                        'HEAVY_CORE',
                        'HEAVY_WEIGHTED_PRESSURE_PLATE',
                        'HOPPER',
                        'HORN_CORAL',
                        'HORN_CORAL_FAN',
                        'HORN_CORAL_WALL_FAN',
                        'INFESTED_DEEPSLATE',
                        'IRON_BARS',
                        'IRON_DOOR',
                        'IRON_TRAPDOOR',
                        'JACK_O_LANTERN',
                        'JIGSAW',
                        'JUKEBOX',
                        'JUNGLE_BUTTON',
                        'JUNGLE_DOOR',
                        'JUNGLE_FENCE',
                        'JUNGLE_FENCE_GATE',
                        'JUNGLE_HANGING_SIGN',
                        'JUNGLE_LEAVES',
                        'JUNGLE_LOG',
                        'JUNGLE_PRESSURE_PLATE',
                        'JUNGLE_SAPLING',
                        'JUNGLE_SIGN',
                        'JUNGLE_SLAB',
                        'JUNGLE_STAIRS',
                        'JUNGLE_TRAPDOOR',
                        'JUNGLE_WALL_HANGING_SIGN',
                        'JUNGLE_WALL_SIGN',
                        'JUNGLE_WOOD',
                        'KELP',
                        'LADDER',
                        'LANTERN',
                        'LARGE_AMETHYST_BUD',
                        'LARGE_FERN',
                        'LAVA',
                        'LECTERN',
                        'LEVER',
                        'LIGHT',
                        'LIGHT_BLUE_BANNER',
                        'LIGHT_BLUE_BED',
                        'LIGHT_BLUE_CANDLE',
                        'LIGHT_BLUE_CANDLE_CAKE',
                        'LIGHT_BLUE_GLAZED_TERRACOTTA',
                        'LIGHT_BLUE_SHULKER_BOX',
                        'LIGHT_BLUE_STAINED_GLASS_PANE',
                        'LIGHT_BLUE_WALL_BANNER',
                        'LIGHT_GRAY_BANNER',
                        'LIGHT_GRAY_BED',
                        'LIGHT_GRAY_CANDLE',
                        'LIGHT_GRAY_CANDLE_CAKE',
                        'LIGHT_GRAY_GLAZED_TERRACOTTA',
                        'LIGHT_GRAY_SHULKER_BOX',
                        'LIGHT_GRAY_STAINED_GLASS_PANE',
                        'LIGHT_GRAY_WALL_BANNER',
                        'LIGHT_WEIGHTED_PRESSURE_PLATE',
                        'LIGHTNING_ROD',
                        'LILAC',
                        'LIME_BANNER',
                        'LIME_BED',
                        'LIME_CANDLE',
                        'LIME_CANDLE_CAKE',
                        'LIME_GLAZED_TERRACOTTA',
                        'LIME_SHULKER_BOX',
                        'LIME_STAINED_GLASS_PANE',
                        'LIME_WALL_BANNER',
                        'LOOM',
                        'MAGENTA_BANNER',
                        'MAGENTA_BED',
                        'MAGENTA_CANDLE',
                        'MAGENTA_CANDLE_CAKE',
                        'MAGENTA_GLAZED_TERRACOTTA',
                        'MAGENTA_SHULKER_BOX',
                        'MAGENTA_STAINED_GLASS_PANE',
                        'MAGENTA_WALL_BANNER',
                        'MANGROVE_BUTTON',
                        'MANGROVE_DOOR',
                        'MANGROVE_FENCE',
                        'MANGROVE_FENCE_GATE',
                        'MANGROVE_HANGING_SIGN',
                        'MANGROVE_LEAVES',
                        'MANGROVE_LOG',
                        'MANGROVE_PRESSURE_PLATE',
                        'MANGROVE_PROPAGULE',
                        'MANGROVE_ROOTS',
                        'MANGROVE_SIGN',
                        'MANGROVE_SLAB',
                        'MANGROVE_STAIRS',
                        'MANGROVE_TRAPDOOR',
                        'MANGROVE_WALL_HANGING_SIGN',
                        'MANGROVE_WALL_SIGN',
                        'MANGROVE_WOOD',
                        'MEDIUM_AMETHYST_BUD',
                        'MELON_STEM',
                        'MOSSY_COBBLESTONE_SLAB',
                        'MOSSY_COBBLESTONE_STAIRS',
                        'MOSSY_COBBLESTONE_WALL',
                        'MOSSY_STONE_BRICK_SLAB',
                        'MOSSY_STONE_BRICK_STAIRS',
                        'MOSSY_STONE_BRICK_WALL',
                        'MOVING_PISTON',
                        'MUD_BRICK_SLAB',
                        'MUD_BRICK_STAIRS',
                        'MUD_BRICK_WALL',
                        'MUDDY_MANGROVE_ROOTS',
                        'MUSHROOM_STEM',
                        'MYCELIUM',
                        'NETHER_BRICK_FENCE',
                        'NETHER_BRICK_SLAB',
                        'NETHER_BRICK_STAIRS',
                        'NETHER_BRICK_WALL',
                        'NETHER_PORTAL',
                        'NETHER_WART',
                        'NOTE_BLOCK',
                        'OAK_BUTTON',
                        'OAK_DOOR',
                        'OAK_FENCE',
                        'OAK_FENCE_GATE',
                        'OAK_HANGING_SIGN',
                        'OAK_LEAVES',
                        'OAK_LOG',
                        'OAK_PRESSURE_PLATE',
                        'OAK_SAPLING',
                        'OAK_SIGN',
                        'OAK_SLAB',
                        'OAK_STAIRS',
                        'OAK_TRAPDOOR',
                        'OAK_WALL_HANGING_SIGN',
                        'OAK_WALL_SIGN',
                        'OAK_WOOD',
                        'OBSERVER',
                        'OCHRE_FROGLIGHT',
                        'ORANGE_BANNER',
                        'ORANGE_BED',
                        'ORANGE_CANDLE',
                        'ORANGE_CANDLE_CAKE',
                        'ORANGE_GLAZED_TERRACOTTA',
                        'ORANGE_SHULKER_BOX',
                        'ORANGE_STAINED_GLASS_PANE',
                        'ORANGE_WALL_BANNER',
                        'OXIDIZED_COPPER_BULB',
                        'OXIDIZED_COPPER_DOOR',
                        'OXIDIZED_COPPER_GRATE',
                        'OXIDIZED_COPPER_TRAPDOOR',
                        'OXIDIZED_CUT_COPPER_SLAB',
                        'OXIDIZED_CUT_COPPER_STAIRS',
                        'PALE_HANGING_MOSS',
                        'PALE_MOSS_CARPET',
                        'PALE_OAK_BUTTON',
                        'PALE_OAK_DOOR',
                        'PALE_OAK_FENCE',
                        'PALE_OAK_FENCE_GATE',
                        'PALE_OAK_HANGING_SIGN',
                        'PALE_OAK_LEAVES',
                        'PALE_OAK_LOG',
                        'PALE_OAK_PRESSURE_PLATE',
                        'PALE_OAK_SAPLING',
                        'PALE_OAK_SIGN',
                        'PALE_OAK_SLAB',
                        'PALE_OAK_STAIRS',
                        'PALE_OAK_TRAPDOOR',
                        'PALE_OAK_WALL_HANGING_SIGN',
                        'PALE_OAK_WALL_SIGN',
                        'PALE_OAK_WOOD',
                        'PEARLESCENT_FROGLIGHT',
                        'PEONY',
                        'PETRIFIED_OAK_SLAB',
                        'PIGLIN_HEAD',
                        'PIGLIN_WALL_HEAD',
                        'PINK_BANNER',
                        'PINK_BED',
                        'PINK_CANDLE',
                        'PINK_CANDLE_CAKE',
                        'PINK_GLAZED_TERRACOTTA',
                        'PINK_PETALS',
                        'PINK_SHULKER_BOX',
                        'PINK_STAINED_GLASS_PANE',
                        'PINK_WALL_BANNER',
                        'PISTON',
                        'PISTON_HEAD',
                        'PITCHER_CROP',
                        'PITCHER_PLANT',
                        'PLAYER_HEAD',
                        'PLAYER_WALL_HEAD',
                        'PODZOL',
                        'POINTED_DRIPSTONE',
                        'POLISHED_ANDESITE_SLAB',
                        'POLISHED_ANDESITE_STAIRS',
                        'POLISHED_BASALT',
                        'POLISHED_BLACKSTONE_BRICK_SLAB',
                        'POLISHED_BLACKSTONE_BRICK_STAIRS',
                        'POLISHED_BLACKSTONE_BRICK_WALL',
                        'POLISHED_BLACKSTONE_BUTTON',
                        'POLISHED_BLACKSTONE_PRESSURE_PLATE',
                        'POLISHED_BLACKSTONE_SLAB',
                        'POLISHED_BLACKSTONE_STAIRS',
                        'POLISHED_BLACKSTONE_WALL',
                        'POLISHED_DEEPSLATE_SLAB',
                        'POLISHED_DEEPSLATE_STAIRS',
                        'POLISHED_DEEPSLATE_WALL',
                        'POLISHED_DIORITE_SLAB',
                        'POLISHED_DIORITE_STAIRS',
                        'POLISHED_GRANITE_SLAB',
                        'POLISHED_GRANITE_STAIRS',
                        'POLISHED_TUFF_SLAB',
                        'POLISHED_TUFF_STAIRS',
                        'POLISHED_TUFF_WALL',
                        'POTATOES',
                        'POWDER_SNOW_CAULDRON',
                        'POWERED_RAIL',
                        'PRISMARINE_BRICK_SLAB',
                        'PRISMARINE_BRICK_STAIRS',
                        'PRISMARINE_SLAB',
                        'PRISMARINE_STAIRS',
                        'PRISMARINE_WALL',
                        'PUMPKIN_STEM',
                        'PURPLE_BANNER',
                        'PURPLE_BED',
                        'PURPLE_CANDLE',
                        'PURPLE_CANDLE_CAKE',
                        'PURPLE_GLAZED_TERRACOTTA',
                        'PURPLE_SHULKER_BOX',
                        'PURPLE_STAINED_GLASS_PANE',
                        'PURPLE_WALL_BANNER',
                        'PURPUR_PILLAR',
                        'PURPUR_SLAB',
                        'PURPUR_STAIRS',
                        'QUARTZ_PILLAR',
                        'QUARTZ_SLAB',
                        'QUARTZ_STAIRS',
                        'RAIL',
                        'RED_BANNER',
                        'RED_BED',
                        'RED_CANDLE',
                        'RED_CANDLE_CAKE',
                        'RED_GLAZED_TERRACOTTA',
                        'RED_MUSHROOM_BLOCK',
                        'RED_NETHER_BRICK_SLAB',
                        'RED_NETHER_BRICK_STAIRS',
                        'RED_NETHER_BRICK_WALL',
                        'RED_SANDSTONE_SLAB',
                        'RED_SANDSTONE_STAIRS',
                        'RED_SANDSTONE_WALL',
                        'RED_SHULKER_BOX',
                        'RED_STAINED_GLASS_PANE',
                        'RED_WALL_BANNER',
                        'REDSTONE_LAMP',
                        'REDSTONE_ORE',
                        'REDSTONE_TORCH',
                        'REDSTONE_WALL_TORCH',
                        'REDSTONE_WIRE',
                        'REPEATER',
                        'REPEATING_COMMAND_BLOCK',
                        'RESPAWN_ANCHOR',
                        'ROSE_BUSH',
                        'SANDSTONE_SLAB',
                        'SANDSTONE_STAIRS',
                        'SANDSTONE_WALL',
                        'SCAFFOLDING',
                        'SCULK_CATALYST',
                        'SCULK_SENSOR',
                        'SCULK_SHRIEKER',
                        'SCULK_VEIN',
                        'SEA_PICKLE',
                        'SHULKER_BOX',
                        'SKELETON_SKULL',
                        'SKELETON_WALL_SKULL',
                        'SMALL_AMETHYST_BUD',
                        'SMALL_DRIPLEAF',
                        'SMOKER',
                        'SMOOTH_QUARTZ_SLAB',
                        'SMOOTH_QUARTZ_STAIRS',
                        'SMOOTH_RED_SANDSTONE_SLAB',
                        'SMOOTH_RED_SANDSTONE_STAIRS',
                        'SMOOTH_SANDSTONE_SLAB',
                        'SMOOTH_SANDSTONE_STAIRS',
                        'SMOOTH_STONE_SLAB',
                        'SNIFFER_EGG',
                        'SNOW',
                        'SOUL_CAMPFIRE',
                        'SOUL_LANTERN',
                        'SOUL_WALL_TORCH',
                        'SPRUCE_BUTTON',
                        'SPRUCE_DOOR',
                        'SPRUCE_FENCE',
                        'SPRUCE_FENCE_GATE',
                        'SPRUCE_HANGING_SIGN',
                        'SPRUCE_LEAVES',
                        'SPRUCE_LOG',
                        'SPRUCE_PRESSURE_PLATE',
                        'SPRUCE_SAPLING',
                        'SPRUCE_SIGN',
                        'SPRUCE_SLAB',
                        'SPRUCE_STAIRS',
                        'SPRUCE_TRAPDOOR',
                        'SPRUCE_WALL_HANGING_SIGN',
                        'SPRUCE_WALL_SIGN',
                        'SPRUCE_WOOD',
                        'STICKY_PISTON',
                        'STONE_BRICK_SLAB',
                        'STONE_BRICK_STAIRS',
                        'STONE_BRICK_WALL',
                        'STONE_BUTTON',
                        'STONE_PRESSURE_PLATE',
                        'STONE_SLAB',
                        'STONE_STAIRS',
                        'STONECUTTER',
                        'STRIPPED_ACACIA_LOG',
                        'STRIPPED_ACACIA_WOOD',
                        'STRIPPED_BAMBOO_BLOCK',
                        'STRIPPED_BIRCH_LOG',
                        'STRIPPED_BIRCH_WOOD',
                        'STRIPPED_CHERRY_LOG',
                        'STRIPPED_CHERRY_WOOD',
                        'STRIPPED_CRIMSON_HYPHAE',
                        'STRIPPED_CRIMSON_STEM',
                        'STRIPPED_DARK_OAK_LOG',
                        'STRIPPED_DARK_OAK_WOOD',
                        'STRIPPED_JUNGLE_LOG',
                        'STRIPPED_JUNGLE_WOOD',
                        'STRIPPED_MANGROVE_LOG',
                        'STRIPPED_MANGROVE_WOOD',
                        'STRIPPED_OAK_LOG',
                        'STRIPPED_OAK_WOOD',
                        'STRIPPED_PALE_OAK_LOG',
                        'STRIPPED_PALE_OAK_WOOD',
                        'STRIPPED_SPRUCE_LOG',
                        'STRIPPED_SPRUCE_WOOD',
                        'STRIPPED_WARPED_HYPHAE',
                        'STRIPPED_WARPED_STEM',
                        'STRUCTURE_BLOCK',
                        'SUGAR_CANE',
                        'SUNFLOWER',
                        'SUSPICIOUS_GRAVEL',
                        'SUSPICIOUS_SAND',
                        'SWEET_BERRY_BUSH',
                        'TALL_GRASS',
                        'TALL_SEAGRASS',
                        'TARGET',
                        'TNT',
                        'TORCHFLOWER_CROP',
                        'TRAPPED_CHEST',
                        'TRIAL_SPAWNER',
                        'TRIPWIRE',
                        'TRIPWIRE_HOOK',
                        'TUBE_CORAL',
                        'TUBE_CORAL_FAN',
                        'TUBE_CORAL_WALL_FAN',
                        'TUFF_BRICK_SLAB',
                        'TUFF_BRICK_STAIRS',
                        'TUFF_BRICK_WALL',
                        'TUFF_SLAB',
                        'TUFF_STAIRS',
                        'TUFF_WALL',
                        'TURTLE_EGG',
                        'TWISTING_VINES',
                        'VAULT',
                        'VERDANT_FROGLIGHT',
                        'VINE',
                        'WALL_TORCH',
                        'WARPED_BUTTON',
                        'WARPED_DOOR',
                        'WARPED_FENCE',
                        'WARPED_FENCE_GATE',
                        'WARPED_HANGING_SIGN',
                        'WARPED_HYPHAE',
                        'WARPED_PRESSURE_PLATE',
                        'WARPED_SIGN',
                        'WARPED_SLAB',
                        'WARPED_STAIRS',
                        'WARPED_STEM',
                        'WARPED_TRAPDOOR',
                        'WARPED_WALL_HANGING_SIGN',
                        'WARPED_WALL_SIGN',
                        'WATER',
                        'WATER_CAULDRON',
                        'WAXED_COPPER_BULB',
                        'WAXED_COPPER_DOOR',
                        'WAXED_COPPER_GRATE',
                        'WAXED_COPPER_TRAPDOOR',
                        'WAXED_CUT_COPPER_SLAB',
                        'WAXED_CUT_COPPER_STAIRS',
                        'WAXED_EXPOSED_COPPER_BULB',
                        'WAXED_EXPOSED_COPPER_DOOR',
                        'WAXED_EXPOSED_COPPER_GRATE',
                        'WAXED_EXPOSED_COPPER_TRAPDOOR',
                        'WAXED_EXPOSED_CUT_COPPER_SLAB',
                        'WAXED_EXPOSED_CUT_COPPER_STAIRS',
                        'WAXED_OXIDIZED_COPPER_BULB',
                        'WAXED_OXIDIZED_COPPER_DOOR',
                        'WAXED_OXIDIZED_COPPER_GRATE',
                        'WAXED_OXIDIZED_COPPER_TRAPDOOR',
                        'WAXED_OXIDIZED_CUT_COPPER_SLAB',
                        'WAXED_OXIDIZED_CUT_COPPER_STAIRS',
                        'WAXED_WEATHERED_COPPER_BULB',
                        'WAXED_WEATHERED_COPPER_DOOR',
                        'WAXED_WEATHERED_COPPER_GRATE',
                        'WAXED_WEATHERED_COPPER_TRAPDOOR',
                        'WAXED_WEATHERED_CUT_COPPER_SLAB',
                        'WAXED_WEATHERED_CUT_COPPER_STAIRS',
                        'WEATHERED_COPPER_BULB',
                        'WEATHERED_COPPER_DOOR',
                        'WEATHERED_COPPER_GRATE',
                        'WEATHERED_COPPER_TRAPDOOR',
                        'WEATHERED_CUT_COPPER_SLAB',
                        'WEATHERED_CUT_COPPER_STAIRS',
                        'WEEPING_VINES',
                        'WHEAT',
                        'WHITE_BANNER',
                        'WHITE_BED',
                        'WHITE_CANDLE',
                        'WHITE_CANDLE_CAKE',
                        'WHITE_GLAZED_TERRACOTTA',
                        'WHITE_SHULKER_BOX',
                        'WHITE_STAINED_GLASS_PANE',
                        'WHITE_WALL_BANNER',
                        'WITHER_SKELETON_SKULL',
                        'WITHER_SKELETON_WALL_SKULL',
                        'YELLOW_BANNER',
                        'YELLOW_BED',
                        'YELLOW_CANDLE',
                        'YELLOW_CANDLE_CAKE',
                        'YELLOW_GLAZED_TERRACOTTA',
                        'YELLOW_SHULKER_BOX',
                        'YELLOW_STAINED_GLASS_PANE',
                        'YELLOW_WALL_BANNER',
                        'ZOMBIE_HEAD',
                        'ZOMBIE_WALL_HEAD',
                        'GRASS',
                    ]
                },
                {"type": "string", "default": "STONE"}
            ]
        },
        "custom_potion_effect": {
            "$id": "custom_potion_effect",
            "type": "object",
            "description": "Attach a specific potion effect to this potion.",
            "properties": {
                "type": { "$ref": "#/$defs/bukkit_potion_effect_type" },
                "amplifier": { "$ref": "#/$defs/potion_amplifier" },
                "duration": { "$ref": "#/$defs/ticks" },
                "ambient": { "type": "boolean" }
            }
        },
        "vanilla_potion_type": {
            "$id": "vanilla_potion_type",
            "type": "string",
            "enum": [
                "minecraft:water",
                "minecraft:mundane",
                "minecraft:thick",
                "minecraft:awkward",
                "minecraft:night_vision",
                "minecraft:long_night_vision",
                "minecraft:invisibility",
                "minecraft:long_invisibility",
                "minecraft:leaping",
                "minecraft:long_leaping",
                "minecraft:strong_leaping",
                "minecraft:fire_resistance",
                "minecraft:long_fire_resistance",
                "minecraft:swiftness",
                "minecraft:long_swiftness",
                "minecraft:strong_swiftness",
                "minecraft:slowness",
                "minecraft:long_slowness",
                "minecraft:strong_slowness",
                "minecraft:turtle_master",
                "minecraft:long_turtle_master",
                "minecraft:strong_turtle_master",
                "minecraft:water_breathing",
                "minecraft:long_water_breathing",
                "minecraft:healing",
                "minecraft:strong_healing",
                "minecraft:harming",
                "minecraft:strong_harming",
                "minecraft:poison",
                "minecraft:long_poison",
                "minecraft:strong_poison",
                "minecraft:regeneration",
                "minecraft:long_regeneration",
                "minecraft:strong_regeneration",
                "minecraft:strength",
                "minecraft:long_strength",
                "minecraft:strong_strength",
                "minecraft:weakness",
                "minecraft:long_weakness",
                "minecraft:luck",
                "minecraft:slow_falling",
                "minecraft:long_slow_falling",
                "minecraft:wind_charged",
                "minecraft:weaving",
                "minecraft:oozing",
                "minecraft:infested"
              ]
        },
        "bukkit_potion_type": {
            "$id": "bukkit_potion_type",
            "type": "string",
            "markdownDescription": "Vanilla potion types",
            "enum": [
                'AWKWARD',
                'FIRE_RESISTANCE',
                'HARMING',
                'HEALING',
                'INFESTED',
                'INVISIBILITY',
                'LEAPING',
                'LONG_FIRE_RESISTANCE',
                'LONG_INVISIBILITY',
                'LONG_LEAPING',
                'LONG_NIGHT_VISION',
                'LONG_POISON',
                'LONG_REGENERATION',
                'LONG_SLOW_FALLING',
                'LONG_SLOWNESS',
                'LONG_STRENGTH',
                'LONG_SWIFTNESS',
                'LONG_TURTLE_MASTER',
                'LONG_WATER_BREATHING',
                'LONG_WEAKNESS',
                'LUCK',
                'MUNDANE',
                'NIGHT_VISION',
                'OOZING',
                'POISON',
                'REGENERATION',
                'SLOW_FALLING',
                'SLOWNESS',
                'STRENGTH',
                'STRONG_HARMING',
                'STRONG_HEALING',
                'STRONG_LEAPING',
                'STRONG_POISON',
                'STRONG_REGENERATION',
                'STRONG_SLOWNESS',
                'STRONG_STRENGTH',
                'STRONG_SWIFTNESS',
                'STRONG_TURTLE_MASTER',
                'SWIFTNESS',
                'THICK',
                'TURTLE_MASTER',
                'WATER',
                'WATER_BREATHING',
                'WEAKNESS',
                'WEAVING',
                'WIND_CHARGED',
            ]
        },
        "vanilla_sound": {
            "$id": "vanilla_sound",
            "type": "string",
            "markdownDescription": "Vanilla sounds",
            "enum": [
                "ambient.basalt_deltas.additions",
                "ambient.basalt_deltas.loop",
                "ambient.basalt_deltas.mood",
                "ambient.cave",
                "ambient.crimson_forest.additions",
                "ambient.crimson_forest.loop",
                "ambient.crimson_forest.mood",
                "ambient.nether_wastes.additions",
                "ambient.nether_wastes.loop",
                "ambient.nether_wastes.mood",
                "ambient.soul_sand_valley.additions",
                "ambient.soul_sand_valley.loop",
                "ambient.soul_sand_valley.mood",
                "ambient.underwater.enter",
                "ambient.underwater.exit",
                "ambient.underwater.loop",
                "ambient.underwater.loop.additions",
                "ambient.underwater.loop.additions.rare",
                "ambient.underwater.loop.additions.ultra_rare",
                "ambient.warped_forest.additions",
                "ambient.warped_forest.loop",
                "ambient.warped_forest.mood",
                "block.amethyst_block.break",
                "block.amethyst_block.chime",
                "block.amethyst_block.fall",
                "block.amethyst_block.hit",
                "block.amethyst_block.place",
                "block.amethyst_block.resonate",
                "block.amethyst_block.step",
                "block.amethyst_cluster.break",
                "block.amethyst_cluster.fall",
                "block.amethyst_cluster.hit",
                "block.amethyst_cluster.place",
                "block.amethyst_cluster.step",
                "block.ancient_debris.break",
                "block.ancient_debris.fall",
                "block.ancient_debris.hit",
                "block.ancient_debris.place",
                "block.ancient_debris.step",
                "block.anvil.break",
                "block.anvil.destroy",
                "block.anvil.fall",
                "block.anvil.hit",
                "block.anvil.land",
                "block.anvil.place",
                "block.anvil.step",
                "block.anvil.use",
                "block.azalea.break",
                "block.azalea.fall",
                "block.azalea.hit",
                "block.azalea.place",
                "block.azalea.step",
                "block.azalea_leaves.break",
                "block.azalea_leaves.fall",
                "block.azalea_leaves.hit",
                "block.azalea_leaves.place",
                "block.azalea_leaves.step",
                "block.bamboo.break",
                "block.bamboo.fall",
                "block.bamboo.hit",
                "block.bamboo.place",
                "block.bamboo.step",
                "block.bamboo_sapling.break",
                "block.bamboo_sapling.hit",
                "block.bamboo_sapling.place",
                "block.bamboo_wood.break",
                "block.bamboo_wood.fall",
                "block.bamboo_wood.hit",
                "block.bamboo_wood.place",
                "block.bamboo_wood.step",
                "block.bamboo_wood_button.click_off",
                "block.bamboo_wood_button.click_on",
                "block.bamboo_wood_door.close",
                "block.bamboo_wood_door.open",
                "block.bamboo_wood_fence_gate.close",
                "block.bamboo_wood_fence_gate.open",
                "block.bamboo_wood_hanging_sign.break",
                "block.bamboo_wood_hanging_sign.fall",
                "block.bamboo_wood_hanging_sign.hit",
                "block.bamboo_wood_hanging_sign.place",
                "block.bamboo_wood_hanging_sign.step",
                "block.bamboo_wood_pressure_plate.click_off",
                "block.bamboo_wood_pressure_plate.click_on",
                "block.bamboo_wood_trapdoor.close",
                "block.bamboo_wood_trapdoor.open",
                "block.barrel.close",
                "block.barrel.open",
                "block.basalt.break",
                "block.basalt.fall",
                "block.basalt.hit",
                "block.basalt.place",
                "block.basalt.step",
                "block.beacon.activate",
                "block.beacon.ambient",
                "block.beacon.deactivate",
                "block.beacon.power_select",
                "block.beehive.drip",
                "block.beehive.enter",
                "block.beehive.exit",
                "block.beehive.shear",
                "block.beehive.work",
                "block.bell.resonate",
                "block.bell.use",
                "block.big_dripleaf.break",
                "block.big_dripleaf.fall",
                "block.big_dripleaf.hit",
                "block.big_dripleaf.place",
                "block.big_dripleaf.step",
                "block.big_dripleaf.tilt_down",
                "block.big_dripleaf.tilt_up",
                "block.blastfurnace.fire_crackle",
                "block.bone_block.break",
                "block.bone_block.fall",
                "block.bone_block.hit",
                "block.bone_block.place",
                "block.bone_block.step",
                "block.brewing_stand.brew",
                "block.bubble_column.bubble_pop",
                "block.bubble_column.upwards_ambient",
                "block.bubble_column.upwards_inside",
                "block.bubble_column.whirlpool_ambient",
                "block.bubble_column.whirlpool_inside",
                "block.cake.add_candle",
                "block.calcite.break",
                "block.calcite.fall",
                "block.calcite.hit",
                "block.calcite.place",
                "block.calcite.step",
                "block.campfire.crackle",
                "block.candle.ambient",
                "block.candle.break",
                "block.candle.extinguish",
                "block.candle.fall",
                "block.candle.hit",
                "block.candle.place",
                "block.candle.step",
                "block.cave_vines.break",
                "block.cave_vines.fall",
                "block.cave_vines.hit",
                "block.cave_vines.pick_berries",
                "block.cave_vines.place",
                "block.cave_vines.step",
                "block.chain.break",
                "block.chain.fall",
                "block.chain.hit",
                "block.chain.place",
                "block.chain.step",
                "block.cherry_leaves.break",
                "block.cherry_leaves.fall",
                "block.cherry_leaves.hit",
                "block.cherry_leaves.place",
                "block.cherry_leaves.step",
                "block.cherry_sapling.break",
                "block.cherry_sapling.fall",
                "block.cherry_sapling.hit",
                "block.cherry_sapling.place",
                "block.cherry_sapling.step",
                "block.cherry_wood.break",
                "block.cherry_wood.fall",
                "block.cherry_wood.hit",
                "block.cherry_wood.place",
                "block.cherry_wood.step",
                "block.cherry_wood_button.click_off",
                "block.cherry_wood_button.click_on",
                "block.cherry_wood_door.close",
                "block.cherry_wood_door.open",
                "block.cherry_wood_fence_gate.close",
                "block.cherry_wood_fence_gate.open",
                "block.cherry_wood_hanging_sign.break",
                "block.cherry_wood_hanging_sign.fall",
                "block.cherry_wood_hanging_sign.hit",
                "block.cherry_wood_hanging_sign.place",
                "block.cherry_wood_hanging_sign.step",
                "block.cherry_wood_pressure_plate.click_off",
                "block.cherry_wood_pressure_plate.click_on",
                "block.cherry_wood_trapdoor.close",
                "block.cherry_wood_trapdoor.open",
                "block.chest.close",
                "block.chest.locked",
                "block.chest.open",
                "block.chiseled_bookshelf.break",
                "block.chiseled_bookshelf.fall",
                "block.chiseled_bookshelf.hit",
                "block.chiseled_bookshelf.insert",
                "block.chiseled_bookshelf.insert.enchanted",
                "block.chiseled_bookshelf.pickup",
                "block.chiseled_bookshelf.pickup.enchanted",
                "block.chiseled_bookshelf.place",
                "block.chiseled_bookshelf.step",
                "block.chorus_flower.death",
                "block.chorus_flower.grow",
                "block.cobweb.break",
                "block.cobweb.fall",
                "block.cobweb.hit",
                "block.cobweb.place",
                "block.cobweb.step",
                "block.comparator.click",
                "block.composter.empty",
                "block.composter.fill",
                "block.composter.fill_success",
                "block.composter.ready",
                "block.conduit.activate",
                "block.conduit.ambient",
                "block.conduit.ambient.short",
                "block.conduit.attack.target",
                "block.conduit.deactivate",
                "block.copper.break",
                "block.copper.fall",
                "block.copper.hit",
                "block.copper.place",
                "block.copper.step",
                "block.copper_bulb.break",
                "block.copper_bulb.fall",
                "block.copper_bulb.hit",
                "block.copper_bulb.place",
                "block.copper_bulb.step",
                "block.copper_bulb.turn_off",
                "block.copper_bulb.turn_on",
                "block.copper_door.close",
                "block.copper_door.open",
                "block.copper_grate.break",
                "block.copper_grate.fall",
                "block.copper_grate.hit",
                "block.copper_grate.place",
                "block.copper_grate.step",
                "block.copper_trapdoor.close",
                "block.copper_trapdoor.open",
                "block.coral_block.break",
                "block.coral_block.fall",
                "block.coral_block.hit",
                "block.coral_block.place",
                "block.coral_block.step",
                "block.crafter.craft",
                "block.crafter.fail",
                "block.crop.break",
                "block.decorated_pot.break",
                "block.decorated_pot.fall",
                "block.decorated_pot.hit",
                "block.decorated_pot.insert",
                "block.decorated_pot.insert_fail",
                "block.decorated_pot.place",
                "block.decorated_pot.shatter",
                "block.decorated_pot.step",
                "block.deepslate.break",
                "block.deepslate.fall",
                "block.deepslate.hit",
                "block.deepslate.place",
                "block.deepslate.step",
                "block.deepslate_bricks.break",
                "block.deepslate_bricks.fall",
                "block.deepslate_bricks.hit",
                "block.deepslate_bricks.place",
                "block.deepslate_bricks.step",
                "block.deepslate_tiles.break",
                "block.deepslate_tiles.fall",
                "block.deepslate_tiles.hit",
                "block.deepslate_tiles.place",
                "block.deepslate_tiles.step",
                "block.dispenser.dispense",
                "block.dispenser.fail",
                "block.dispenser.launch",
                "block.dripstone_block.break",
                "block.dripstone_block.fall",
                "block.dripstone_block.hit",
                "block.dripstone_block.place",
                "block.dripstone_block.step",
                "block.enchantment_table.use",
                "block.end_gateway.spawn",
                "block.end_portal.spawn",
                "block.end_portal_frame.fill",
                "block.ender_chest.close",
                "block.ender_chest.open",
                "block.fence_gate.close",
                "block.fence_gate.open",
                "block.fire.ambient",
                "block.fire.extinguish",
                "block.flowering_azalea.break",
                "block.flowering_azalea.fall",
                "block.flowering_azalea.hit",
                "block.flowering_azalea.place",
                "block.flowering_azalea.step",
                "block.froglight.break",
                "block.froglight.fall",
                "block.froglight.hit",
                "block.froglight.place",
                "block.froglight.step",
                "block.frogspawn.break",
                "block.frogspawn.fall",
                "block.frogspawn.hatch",
                "block.frogspawn.hit",
                "block.frogspawn.place",
                "block.frogspawn.step",
                "block.fungus.break",
                "block.fungus.fall",
                "block.fungus.hit",
                "block.fungus.place",
                "block.fungus.step",
                "block.furnace.fire_crackle",
                "block.gilded_blackstone.break",
                "block.gilded_blackstone.fall",
                "block.gilded_blackstone.hit",
                "block.gilded_blackstone.place",
                "block.gilded_blackstone.step",
                "block.glass.break",
                "block.glass.fall",
                "block.glass.hit",
                "block.glass.place",
                "block.glass.step",
                "block.grass.break",
                "block.grass.fall",
                "block.grass.hit",
                "block.grass.place",
                "block.grass.step",
                "block.gravel.break",
                "block.gravel.fall",
                "block.gravel.hit",
                "block.gravel.place",
                "block.gravel.step",
                "block.grindstone.use",
                "block.growing_plant.crop",
                "block.hanging_roots.break",
                "block.hanging_roots.fall",
                "block.hanging_roots.hit",
                "block.hanging_roots.place",
                "block.hanging_roots.step",
                "block.hanging_sign.break",
                "block.hanging_sign.fall",
                "block.hanging_sign.hit",
                "block.hanging_sign.place",
                "block.hanging_sign.step",
                "block.hanging_sign.waxed_interact_fail",
                "block.heavy_core.break",
                "block.heavy_core.fall",
                "block.heavy_core.hit",
                "block.heavy_core.place",
                "block.heavy_core.step",
                "block.honey_block.break",
                "block.honey_block.fall",
                "block.honey_block.hit",
                "block.honey_block.place",
                "block.honey_block.slide",
                "block.honey_block.step",
                "block.iron_door.close",
                "block.iron_door.open",
                "block.iron_trapdoor.close",
                "block.iron_trapdoor.open",
                "block.ladder.break",
                "block.ladder.fall",
                "block.ladder.hit",
                "block.ladder.place",
                "block.ladder.step",
                "block.lantern.break",
                "block.lantern.fall",
                "block.lantern.hit",
                "block.lantern.place",
                "block.lantern.step",
                "block.large_amethyst_bud.break",
                "block.large_amethyst_bud.place",
                "block.lava.ambient",
                "block.lava.extinguish",
                "block.lava.pop",
                "block.lever.click",
                "block.lily_pad.place",
                "block.lodestone.break",
                "block.lodestone.fall",
                "block.lodestone.hit",
                "block.lodestone.place",
                "block.lodestone.step",
                "block.mangrove_roots.break",
                "block.mangrove_roots.fall",
                "block.mangrove_roots.hit",
                "block.mangrove_roots.place",
                "block.mangrove_roots.step",
                "block.medium_amethyst_bud.break",
                "block.medium_amethyst_bud.place",
                "block.metal.break",
                "block.metal.fall",
                "block.metal.hit",
                "block.metal.place",
                "block.metal.step",
                "block.metal_pressure_plate.click_off",
                "block.metal_pressure_plate.click_on",
                "block.moss.break",
                "block.moss.fall",
                "block.moss.hit",
                "block.moss.place",
                "block.moss.step",
                "block.moss_carpet.break",
                "block.moss_carpet.fall",
                "block.moss_carpet.hit",
                "block.moss_carpet.place",
                "block.moss_carpet.step",
                "block.mud.break",
                "block.mud.fall",
                "block.mud.hit",
                "block.mud.place",
                "block.mud.step",
                "block.mud_bricks.break",
                "block.mud_bricks.fall",
                "block.mud_bricks.hit",
                "block.mud_bricks.place",
                "block.mud_bricks.step",
                "block.muddy_mangrove_roots.break",
                "block.muddy_mangrove_roots.fall",
                "block.muddy_mangrove_roots.hit",
                "block.muddy_mangrove_roots.place",
                "block.muddy_mangrove_roots.step",
                "block.nether_bricks.break",
                "block.nether_bricks.fall",
                "block.nether_bricks.hit",
                "block.nether_bricks.place",
                "block.nether_bricks.step",
                "block.nether_gold_ore.break",
                "block.nether_gold_ore.fall",
                "block.nether_gold_ore.hit",
                "block.nether_gold_ore.place",
                "block.nether_gold_ore.step",
                "block.nether_ore.break",
                "block.nether_ore.fall",
                "block.nether_ore.hit",
                "block.nether_ore.place",
                "block.nether_ore.step",
                "block.nether_sprouts.break",
                "block.nether_sprouts.fall",
                "block.nether_sprouts.hit",
                "block.nether_sprouts.place",
                "block.nether_sprouts.step",
                "block.nether_wart.break",
                "block.nether_wood.break",
                "block.nether_wood.fall",
                "block.nether_wood.hit",
                "block.nether_wood.place",
                "block.nether_wood.step",
                "block.nether_wood_button.click_off",
                "block.nether_wood_button.click_on",
                "block.nether_wood_door.close",
                "block.nether_wood_door.open",
                "block.nether_wood_fence_gate.close",
                "block.nether_wood_fence_gate.open",
                "block.nether_wood_hanging_sign.break",
                "block.nether_wood_hanging_sign.fall",
                "block.nether_wood_hanging_sign.hit",
                "block.nether_wood_hanging_sign.place",
                "block.nether_wood_hanging_sign.step",
                "block.nether_wood_pressure_plate.click_off",
                "block.nether_wood_pressure_plate.click_on",
                "block.nether_wood_trapdoor.close",
                "block.nether_wood_trapdoor.open",
                "block.netherite_block.break",
                "block.netherite_block.fall",
                "block.netherite_block.hit",
                "block.netherite_block.place",
                "block.netherite_block.step",
                "block.netherrack.break",
                "block.netherrack.fall",
                "block.netherrack.hit",
                "block.netherrack.place",
                "block.netherrack.step",
                "block.note_block.banjo",
                "block.note_block.basedrum",
                "block.note_block.bass",
                "block.note_block.bell",
                "block.note_block.bit",
                "block.note_block.chime",
                "block.note_block.cow_bell",
                "block.note_block.didgeridoo",
                "block.note_block.flute",
                "block.note_block.guitar",
                "block.note_block.harp",
                "block.note_block.hat",
                "block.note_block.imitate.creeper",
                "block.note_block.imitate.ender_dragon",
                "block.note_block.imitate.piglin",
                "block.note_block.imitate.skeleton",
                "block.note_block.imitate.wither_skeleton",
                "block.note_block.imitate.zombie",
                "block.note_block.iron_xylophone",
                "block.note_block.pling",
                "block.note_block.snare",
                "block.note_block.xylophone",
                "block.nylium.break",
                "block.nylium.fall",
                "block.nylium.hit",
                "block.nylium.place",
                "block.nylium.step",
                "block.packed_mud.break",
                "block.packed_mud.fall",
                "block.packed_mud.hit",
                "block.packed_mud.place",
                "block.packed_mud.step",
                "block.pink_petals.break",
                "block.pink_petals.fall",
                "block.pink_petals.hit",
                "block.pink_petals.place",
                "block.pink_petals.step",
                "block.piston.contract",
                "block.piston.extend",
                "block.pointed_dripstone.break",
                "block.pointed_dripstone.drip_lava",
                "block.pointed_dripstone.drip_lava_into_cauldron",
                "block.pointed_dripstone.drip_water",
                "block.pointed_dripstone.drip_water_into_cauldron",
                "block.pointed_dripstone.fall",
                "block.pointed_dripstone.hit",
                "block.pointed_dripstone.land",
                "block.pointed_dripstone.place",
                "block.pointed_dripstone.step",
                "block.polished_deepslate.break",
                "block.polished_deepslate.fall",
                "block.polished_deepslate.hit",
                "block.polished_deepslate.place",
                "block.polished_deepslate.step",
                "block.polished_tuff.break",
                "block.polished_tuff.fall",
                "block.polished_tuff.hit",
                "block.polished_tuff.place",
                "block.polished_tuff.step",
                "block.portal.ambient",
                "block.portal.travel",
                "block.portal.trigger",
                "block.powder_snow.break",
                "block.powder_snow.fall",
                "block.powder_snow.hit",
                "block.powder_snow.place",
                "block.powder_snow.step",
                "block.pumpkin.carve",
                "block.redstone_torch.burnout",
                "block.respawn_anchor.ambient",
                "block.respawn_anchor.charge",
                "block.respawn_anchor.deplete",
                "block.respawn_anchor.set_spawn",
                "block.rooted_dirt.break",
                "block.rooted_dirt.fall",
                "block.rooted_dirt.hit",
                "block.rooted_dirt.place",
                "block.rooted_dirt.step",
                "block.roots.break",
                "block.roots.fall",
                "block.roots.hit",
                "block.roots.place",
                "block.roots.step",
                "block.sand.break",
                "block.sand.fall",
                "block.sand.hit",
                "block.sand.place",
                "block.sand.step",
                "block.scaffolding.break",
                "block.scaffolding.fall",
                "block.scaffolding.hit",
                "block.scaffolding.place",
                "block.scaffolding.step",
                "block.sculk.break",
                "block.sculk.charge",
                "block.sculk.fall",
                "block.sculk.hit",
                "block.sculk.place",
                "block.sculk.spread",
                "block.sculk.step",
                "block.sculk_catalyst.bloom",
                "block.sculk_catalyst.break",
                "block.sculk_catalyst.fall",
                "block.sculk_catalyst.hit",
                "block.sculk_catalyst.place",
                "block.sculk_catalyst.step",
                "block.sculk_sensor.break",
                "block.sculk_sensor.clicking",
                "block.sculk_sensor.clicking_stop",
                "block.sculk_sensor.fall",
                "block.sculk_sensor.hit",
                "block.sculk_sensor.place",
                "block.sculk_sensor.step",
                "block.sculk_shrieker.break",
                "block.sculk_shrieker.fall",
                "block.sculk_shrieker.hit",
                "block.sculk_shrieker.place",
                "block.sculk_shrieker.shriek",
                "block.sculk_shrieker.step",
                "block.sculk_vein.break",
                "block.sculk_vein.fall",
                "block.sculk_vein.hit",
                "block.sculk_vein.place",
                "block.sculk_vein.step",
                "block.shroomlight.break",
                "block.shroomlight.fall",
                "block.shroomlight.hit",
                "block.shroomlight.place",
                "block.shroomlight.step",
                "block.shulker_box.close",
                "block.shulker_box.open",
                "block.sign.waxed_interact_fail",
                "block.slime_block.break",
                "block.slime_block.fall",
                "block.slime_block.hit",
                "block.slime_block.place",
                "block.slime_block.step",
                "block.small_amethyst_bud.break",
                "block.small_amethyst_bud.place",
                "block.small_dripleaf.break",
                "block.small_dripleaf.fall",
                "block.small_dripleaf.hit",
                "block.small_dripleaf.place",
                "block.small_dripleaf.step",
                "block.smithing_table.use",
                "block.smoker.smoke",
                "block.sniffer_egg.crack",
                "block.sniffer_egg.hatch",
                "block.sniffer_egg.plop",
                "block.snow.break",
                "block.snow.fall",
                "block.snow.hit",
                "block.snow.place",
                "block.snow.step",
                "block.soul_sand.break",
                "block.soul_sand.fall",
                "block.soul_sand.hit",
                "block.soul_sand.place",
                "block.soul_sand.step",
                "block.soul_soil.break",
                "block.soul_soil.fall",
                "block.soul_soil.hit",
                "block.soul_soil.place",
                "block.soul_soil.step",
                "block.spawner.break",
                "block.spawner.hit",
                "block.spawner.place",
                "block.spawner.step",
                "block.sponge.absorb",
                "block.sponge.break",
                "block.sponge.fall",
                "block.sponge.hit",
                "block.sponge.place",
                "block.sponge.step",
                "block.spore_blossom.break",
                "block.spore_blossom.fall",
                "block.spore_blossom.hit",
                "block.spore_blossom.place",
                "block.spore_blossom.step",
                "block.stem.break",
                "block.stem.fall",
                "block.stem.hit",
                "block.stem.place",
                "block.stem.step",
                "block.stone.break",
                "block.stone.fall",
                "block.stone.hit",
                "block.stone.place",
                "block.stone.step",
                "block.stone_button.click_off",
                "block.stone_button.click_on",
                "block.stone_pressure_plate.click_off",
                "block.stone_pressure_plate.click_on",
                "block.suspicious_gravel.break",
                "block.suspicious_gravel.fall",
                "block.suspicious_gravel.hit",
                "block.suspicious_gravel.place",
                "block.suspicious_gravel.step",
                "block.suspicious_sand.break",
                "block.suspicious_sand.fall",
                "block.suspicious_sand.hit",
                "block.suspicious_sand.place",
                "block.suspicious_sand.step",
                "block.sweet_berry_bush.break",
                "block.sweet_berry_bush.pick_berries",
                "block.sweet_berry_bush.place",
                "block.trial_spawner.about_to_spawn_item",
                "block.trial_spawner.ambient",
                "block.trial_spawner.ambient_ominous",
                "block.trial_spawner.break",
                "block.trial_spawner.close_shutter",
                "block.trial_spawner.detect_player",
                "block.trial_spawner.eject_item",
                "block.trial_spawner.fall",
                "block.trial_spawner.hit",
                "block.trial_spawner.ominous_activate",
                "block.trial_spawner.open_shutter",
                "block.trial_spawner.place",
                "block.trial_spawner.spawn_item",
                "block.trial_spawner.spawn_item_begin",
                "block.trial_spawner.spawn_mob",
                "block.trial_spawner.step",
                "block.tripwire.attach",
                "block.tripwire.click_off",
                "block.tripwire.click_on",
                "block.tripwire.detach",
                "block.tuff.break",
                "block.tuff.fall",
                "block.tuff.hit",
                "block.tuff.place",
                "block.tuff.step",
                "block.tuff_bricks.break",
                "block.tuff_bricks.fall",
                "block.tuff_bricks.hit",
                "block.tuff_bricks.place",
                "block.tuff_bricks.step",
                "block.vault.activate",
                "block.vault.ambient",
                "block.vault.break",
                "block.vault.close_shutter",
                "block.vault.deactivate",
                "block.vault.eject_item",
                "block.vault.fall",
                "block.vault.hit",
                "block.vault.insert_item",
                "block.vault.insert_item_fail",
                "block.vault.open_shutter",
                "block.vault.place",
                "block.vault.reject_rewarded_player",
                "block.vault.step",
                "block.vine.break",
                "block.vine.fall",
                "block.vine.hit",
                "block.vine.place",
                "block.vine.step",
                "block.wart_block.break",
                "block.wart_block.fall",
                "block.wart_block.hit",
                "block.wart_block.place",
                "block.wart_block.step",
                "block.water.ambient",
                "block.weeping_vines.break",
                "block.weeping_vines.fall",
                "block.weeping_vines.hit",
                "block.weeping_vines.place",
                "block.weeping_vines.step",
                "block.wet_grass.break",
                "block.wet_grass.fall",
                "block.wet_grass.hit",
                "block.wet_grass.place",
                "block.wet_grass.step",
                "block.wet_sponge.break",
                "block.wet_sponge.dries",
                "block.wet_sponge.fall",
                "block.wet_sponge.hit",
                "block.wet_sponge.place",
                "block.wet_sponge.step",
                "block.wood.break",
                "block.wood.fall",
                "block.wood.hit",
                "block.wood.place",
                "block.wood.step",
                "block.wooden_button.click_off",
                "block.wooden_button.click_on",
                "block.wooden_door.close",
                "block.wooden_door.open",
                "block.wooden_pressure_plate.click_off",
                "block.wooden_pressure_plate.click_on",
                "block.wooden_trapdoor.close",
                "block.wooden_trapdoor.open",
                "block.wool.break",
                "block.wool.fall",
                "block.wool.hit",
                "block.wool.place",
                "block.wool.step",
                "enchant.thorns.hit",
                "entity.allay.ambient_with_item",
                "entity.allay.ambient_without_item",
                "entity.allay.death",
                "entity.allay.hurt",
                "entity.allay.item_given",
                "entity.allay.item_taken",
                "entity.allay.item_thrown",
                "entity.armadillo.ambient",
                "entity.armadillo.brush",
                "entity.armadillo.death",
                "entity.armadillo.eat",
                "entity.armadillo.hurt",
                "entity.armadillo.hurt_reduced",
                "entity.armadillo.land",
                "entity.armadillo.peek",
                "entity.armadillo.roll",
                "entity.armadillo.scute_drop",
                "entity.armadillo.step",
                "entity.armadillo.unroll_finish",
                "entity.armadillo.unroll_start",
                "entity.armor_stand.break",
                "entity.armor_stand.fall",
                "entity.armor_stand.hit",
                "entity.armor_stand.place",
                "entity.arrow.hit",
                "entity.arrow.hit_player",
                "entity.arrow.shoot",
                "entity.axolotl.attack",
                "entity.axolotl.death",
                "entity.axolotl.hurt",
                "entity.axolotl.idle_air",
                "entity.axolotl.idle_water",
                "entity.axolotl.splash",
                "entity.axolotl.swim",
                "entity.bat.ambient",
                "entity.bat.death",
                "entity.bat.hurt",
                "entity.bat.loop",
                "entity.bat.takeoff",
                "entity.bee.death",
                "entity.bee.hurt",
                "entity.bee.loop",
                "entity.bee.loop_aggressive",
                "entity.bee.pollinate",
                "entity.bee.sting",
                "entity.blaze.ambient",
                "entity.blaze.burn",
                "entity.blaze.death",
                "entity.blaze.hurt",
                "entity.blaze.shoot",
                "entity.boat.paddle_land",
                "entity.boat.paddle_water",
                "entity.bogged.ambient",
                "entity.bogged.death",
                "entity.bogged.hurt",
                "entity.bogged.shear",
                "entity.bogged.step",
                "entity.breeze.charge",
                "entity.breeze.death",
                "entity.breeze.deflect",
                "entity.breeze.hurt",
                "entity.breeze.idle_air",
                "entity.breeze.idle_ground",
                "entity.breeze.inhale",
                "entity.breeze.jump",
                "entity.breeze.land",
                "entity.breeze.shoot",
                "entity.breeze.slide",
                "entity.breeze.whirl",
                "entity.breeze.wind_burst",
                "entity.camel.ambient",
                "entity.camel.dash",
                "entity.camel.dash_ready",
                "entity.camel.death",
                "entity.camel.eat",
                "entity.camel.hurt",
                "entity.camel.saddle",
                "entity.camel.sit",
                "entity.camel.stand",
                "entity.camel.step",
                "entity.camel.step_sand",
                "entity.cat.ambient",
                "entity.cat.beg_for_food",
                "entity.cat.death",
                "entity.cat.eat",
                "entity.cat.hiss",
                "entity.cat.hurt",
                "entity.cat.purr",
                "entity.cat.purreow",
                "entity.cat.stray_ambient",
                "entity.chicken.ambient",
                "entity.chicken.death",
                "entity.chicken.egg",
                "entity.chicken.hurt",
                "entity.chicken.step",
                "entity.cod.ambient",
                "entity.cod.death",
                "entity.cod.flop",
                "entity.cod.hurt",
                "entity.cow.ambient",
                "entity.cow.death",
                "entity.cow.hurt",
                "entity.cow.milk",
                "entity.cow.step",
                "entity.creeper.death",
                "entity.creeper.hurt",
                "entity.creeper.primed",
                "entity.dolphin.ambient",
                "entity.dolphin.ambient_water",
                "entity.dolphin.attack",
                "entity.dolphin.death",
                "entity.dolphin.eat",
                "entity.dolphin.hurt",
                "entity.dolphin.jump",
                "entity.dolphin.play",
                "entity.dolphin.splash",
                "entity.dolphin.swim",
                "entity.donkey.ambient",
                "entity.donkey.angry",
                "entity.donkey.chest",
                "entity.donkey.death",
                "entity.donkey.eat",
                "entity.donkey.hurt",
                "entity.donkey.jump",
                "entity.dragon_fireball.explode",
                "entity.drowned.ambient",
                "entity.drowned.ambient_water",
                "entity.drowned.death",
                "entity.drowned.death_water",
                "entity.drowned.hurt",
                "entity.drowned.hurt_water",
                "entity.drowned.shoot",
                "entity.drowned.step",
                "entity.drowned.swim",
                "entity.egg.throw",
                "entity.elder_guardian.ambient",
                "entity.elder_guardian.ambient_land",
                "entity.elder_guardian.curse",
                "entity.elder_guardian.death",
                "entity.elder_guardian.death_land",
                "entity.elder_guardian.flop",
                "entity.elder_guardian.hurt",
                "entity.elder_guardian.hurt_land",
                "entity.ender_dragon.ambient",
                "entity.ender_dragon.death",
                "entity.ender_dragon.flap",
                "entity.ender_dragon.growl",
                "entity.ender_dragon.hurt",
                "entity.ender_dragon.shoot",
                "entity.ender_eye.death",
                "entity.ender_eye.launch",
                "entity.ender_pearl.throw",
                "entity.enderman.ambient",
                "entity.enderman.death",
                "entity.enderman.hurt",
                "entity.enderman.scream",
                "entity.enderman.stare",
                "entity.enderman.teleport",
                "entity.endermite.ambient",
                "entity.endermite.death",
                "entity.endermite.hurt",
                "entity.endermite.step",
                "entity.evoker.ambient",
                "entity.evoker.cast_spell",
                "entity.evoker.celebrate",
                "entity.evoker.death",
                "entity.evoker.hurt",
                "entity.evoker.prepare_attack",
                "entity.evoker.prepare_summon",
                "entity.evoker.prepare_wololo",
                "entity.evoker_fangs.attack",
                "entity.experience_bottle.throw",
                "entity.experience_orb.pickup",
                "entity.firework_rocket.blast",
                "entity.firework_rocket.blast_far",
                "entity.firework_rocket.large_blast",
                "entity.firework_rocket.large_blast_far",
                "entity.firework_rocket.launch",
                "entity.firework_rocket.shoot",
                "entity.firework_rocket.twinkle",
                "entity.firework_rocket.twinkle_far",
                "entity.fish.swim",
                "entity.fishing_bobber.retrieve",
                "entity.fishing_bobber.splash",
                "entity.fishing_bobber.throw",
                "entity.fox.aggro",
                "entity.fox.ambient",
                "entity.fox.bite",
                "entity.fox.death",
                "entity.fox.eat",
                "entity.fox.hurt",
                "entity.fox.screech",
                "entity.fox.sleep",
                "entity.fox.sniff",
                "entity.fox.spit",
                "entity.fox.teleport",
                "entity.frog.ambient",
                "entity.frog.death",
                "entity.frog.eat",
                "entity.frog.hurt",
                "entity.frog.lay_spawn",
                "entity.frog.long_jump",
                "entity.frog.step",
                "entity.frog.tongue",
                "entity.generic.big_fall",
                "entity.generic.burn",
                "entity.generic.death",
                "entity.generic.drink",
                "entity.generic.eat",
                "entity.generic.explode",
                "entity.generic.extinguish_fire",
                "entity.generic.hurt",
                "entity.generic.small_fall",
                "entity.generic.splash",
                "entity.generic.swim",
                "entity.ghast.ambient",
                "entity.ghast.death",
                "entity.ghast.hurt",
                "entity.ghast.scream",
                "entity.ghast.shoot",
                "entity.ghast.warn",
                "entity.glow_item_frame.add_item",
                "entity.glow_item_frame.break",
                "entity.glow_item_frame.place",
                "entity.glow_item_frame.remove_item",
                "entity.glow_item_frame.rotate_item",
                "entity.glow_squid.ambient",
                "entity.glow_squid.death",
                "entity.glow_squid.hurt",
                "entity.glow_squid.squirt",
                "entity.goat.ambient",
                "entity.goat.death",
                "entity.goat.eat",
                "entity.goat.horn_break",
                "entity.goat.hurt",
                "entity.goat.long_jump",
                "entity.goat.milk",
                "entity.goat.prepare_ram",
                "entity.goat.ram_impact",
                "entity.goat.screaming.ambient",
                "entity.goat.screaming.death",
                "entity.goat.screaming.eat",
                "entity.goat.screaming.hurt",
                "entity.goat.screaming.long_jump",
                "entity.goat.screaming.milk",
                "entity.goat.screaming.prepare_ram",
                "entity.goat.screaming.ram_impact",
                "entity.goat.step",
                "entity.guardian.ambient",
                "entity.guardian.ambient_land",
                "entity.guardian.attack",
                "entity.guardian.death",
                "entity.guardian.death_land",
                "entity.guardian.flop",
                "entity.guardian.hurt",
                "entity.guardian.hurt_land",
                "entity.hoglin.ambient",
                "entity.hoglin.angry",
                "entity.hoglin.attack",
                "entity.hoglin.converted_to_zombified",
                "entity.hoglin.death",
                "entity.hoglin.hurt",
                "entity.hoglin.retreat",
                "entity.hoglin.step",
                "entity.horse.ambient",
                "entity.horse.angry",
                "entity.horse.armor",
                "entity.horse.breathe",
                "entity.horse.death",
                "entity.horse.eat",
                "entity.horse.gallop",
                "entity.horse.hurt",
                "entity.horse.jump",
                "entity.horse.land",
                "entity.horse.saddle",
                "entity.horse.step",
                "entity.horse.step_wood",
                "entity.hostile.big_fall",
                "entity.hostile.death",
                "entity.hostile.hurt",
                "entity.hostile.small_fall",
                "entity.hostile.splash",
                "entity.hostile.swim",
                "entity.husk.ambient",
                "entity.husk.converted_to_zombie",
                "entity.husk.death",
                "entity.husk.hurt",
                "entity.husk.step",
                "entity.illusioner.ambient",
                "entity.illusioner.cast_spell",
                "entity.illusioner.death",
                "entity.illusioner.hurt",
                "entity.illusioner.mirror_move",
                "entity.illusioner.prepare_blindness",
                "entity.illusioner.prepare_mirror",
                "entity.iron_golem.attack",
                "entity.iron_golem.damage",
                "entity.iron_golem.death",
                "entity.iron_golem.hurt",
                "entity.iron_golem.repair",
                "entity.iron_golem.step",
                "entity.item.break",
                "entity.item.pickup",
                "entity.item_frame.add_item",
                "entity.item_frame.break",
                "entity.item_frame.place",
                "entity.item_frame.remove_item",
                "entity.item_frame.rotate_item",
                "entity.leash_knot.break",
                "entity.leash_knot.place",
                "entity.lightning_bolt.impact",
                "entity.lightning_bolt.thunder",
                "entity.lingering_potion.throw",
                "entity.llama.ambient",
                "entity.llama.angry",
                "entity.llama.chest",
                "entity.llama.death",
                "entity.llama.eat",
                "entity.llama.hurt",
                "entity.llama.spit",
                "entity.llama.step",
                "entity.llama.swag",
                "entity.magma_cube.death",
                "entity.magma_cube.death_small",
                "entity.magma_cube.hurt",
                "entity.magma_cube.hurt_small",
                "entity.magma_cube.jump",
                "entity.magma_cube.squish",
                "entity.magma_cube.squish_small",
                "entity.minecart.inside",
                "entity.minecart.inside.underwater",
                "entity.minecart.riding",
                "entity.mooshroom.convert",
                "entity.mooshroom.eat",
                "entity.mooshroom.milk",
                "entity.mooshroom.shear",
                "entity.mooshroom.suspicious_milk",
                "entity.mule.ambient",
                "entity.mule.angry",
                "entity.mule.chest",
                "entity.mule.death",
                "entity.mule.eat",
                "entity.mule.hurt",
                "entity.mule.jump",
                "entity.ocelot.ambient",
                "entity.ocelot.death",
                "entity.ocelot.hurt",
                "entity.painting.break",
                "entity.painting.place",
                "entity.panda.aggressive_ambient",
                "entity.panda.ambient",
                "entity.panda.bite",
                "entity.panda.cant_breed",
                "entity.panda.death",
                "entity.panda.eat",
                "entity.panda.hurt",
                "entity.panda.pre_sneeze",
                "entity.panda.sneeze",
                "entity.panda.step",
                "entity.panda.worried_ambient",
                "entity.parrot.ambient",
                "entity.parrot.death",
                "entity.parrot.eat",
                "entity.parrot.fly",
                "entity.parrot.hurt",
                "entity.parrot.imitate.blaze",
                "entity.parrot.imitate.bogged",
                "entity.parrot.imitate.breeze",
                "entity.parrot.imitate.creeper",
                "entity.parrot.imitate.drowned",
                "entity.parrot.imitate.elder_guardian",
                "entity.parrot.imitate.ender_dragon",
                "entity.parrot.imitate.endermite",
                "entity.parrot.imitate.evoker",
                "entity.parrot.imitate.ghast",
                "entity.parrot.imitate.guardian",
                "entity.parrot.imitate.hoglin",
                "entity.parrot.imitate.husk",
                "entity.parrot.imitate.illusioner",
                "entity.parrot.imitate.magma_cube",
                "entity.parrot.imitate.phantom",
                "entity.parrot.imitate.piglin",
                "entity.parrot.imitate.piglin_brute",
                "entity.parrot.imitate.pillager",
                "entity.parrot.imitate.ravager",
                "entity.parrot.imitate.shulker",
                "entity.parrot.imitate.silverfish",
                "entity.parrot.imitate.skeleton",
                "entity.parrot.imitate.slime",
                "entity.parrot.imitate.spider",
                "entity.parrot.imitate.stray",
                "entity.parrot.imitate.vex",
                "entity.parrot.imitate.vindicator",
                "entity.parrot.imitate.warden",
                "entity.parrot.imitate.witch",
                "entity.parrot.imitate.wither",
                "entity.parrot.imitate.wither_skeleton",
                "entity.parrot.imitate.zoglin",
                "entity.parrot.imitate.zombie",
                "entity.parrot.imitate.zombie_villager",
                "entity.parrot.step",
                "entity.phantom.ambient",
                "entity.phantom.bite",
                "entity.phantom.death",
                "entity.phantom.flap",
                "entity.phantom.hurt",
                "entity.phantom.swoop",
                "entity.pig.ambient",
                "entity.pig.death",
                "entity.pig.hurt",
                "entity.pig.saddle",
                "entity.pig.step",
                "entity.piglin.admiring_item",
                "entity.piglin.ambient",
                "entity.piglin.angry",
                "entity.piglin.celebrate",
                "entity.piglin.converted_to_zombified",
                "entity.piglin.death",
                "entity.piglin.hurt",
                "entity.piglin.jealous",
                "entity.piglin.retreat",
                "entity.piglin.step",
                "entity.piglin_brute.ambient",
                "entity.piglin_brute.angry",
                "entity.piglin_brute.converted_to_zombified",
                "entity.piglin_brute.death",
                "entity.piglin_brute.hurt",
                "entity.piglin_brute.step",
                "entity.pillager.ambient",
                "entity.pillager.celebrate",
                "entity.pillager.death",
                "entity.pillager.hurt",
                "entity.player.attack.crit",
                "entity.player.attack.knockback",
                "entity.player.attack.nodamage",
                "entity.player.attack.strong",
                "entity.player.attack.sweep",
                "entity.player.attack.weak",
                "entity.player.big_fall",
                "entity.player.breath",
                "entity.player.burp",
                "entity.player.death",
                "entity.player.hurt",
                "entity.player.hurt_drown",
                "entity.player.hurt_freeze",
                "entity.player.hurt_on_fire",
                "entity.player.hurt_sweet_berry_bush",
                "entity.player.levelup",
                "entity.player.small_fall",
                "entity.player.splash",
                "entity.player.splash.high_speed",
                "entity.player.swim",
                "entity.player.teleport",
                "entity.polar_bear.ambient",
                "entity.polar_bear.ambient_baby",
                "entity.polar_bear.death",
                "entity.polar_bear.hurt",
                "entity.polar_bear.step",
                "entity.polar_bear.warning",
                "entity.puffer_fish.ambient",
                "entity.puffer_fish.blow_out",
                "entity.puffer_fish.blow_up",
                "entity.puffer_fish.death",
                "entity.puffer_fish.flop",
                "entity.puffer_fish.hurt",
                "entity.puffer_fish.sting",
                "entity.rabbit.ambient",
                "entity.rabbit.attack",
                "entity.rabbit.death",
                "entity.rabbit.hurt",
                "entity.rabbit.jump",
                "entity.ravager.ambient",
                "entity.ravager.attack",
                "entity.ravager.celebrate",
                "entity.ravager.death",
                "entity.ravager.hurt",
                "entity.ravager.roar",
                "entity.ravager.step",
                "entity.ravager.stunned",
                "entity.salmon.ambient",
                "entity.salmon.death",
                "entity.salmon.flop",
                "entity.salmon.hurt",
                "entity.sheep.ambient",
                "entity.sheep.death",
                "entity.sheep.hurt",
                "entity.sheep.shear",
                "entity.sheep.step",
                "entity.shulker.ambient",
                "entity.shulker.close",
                "entity.shulker.death",
                "entity.shulker.hurt",
                "entity.shulker.hurt_closed",
                "entity.shulker.open",
                "entity.shulker.shoot",
                "entity.shulker.teleport",
                "entity.shulker_bullet.hit",
                "entity.shulker_bullet.hurt",
                "entity.silverfish.ambient",
                "entity.silverfish.death",
                "entity.silverfish.hurt",
                "entity.silverfish.step",
                "entity.skeleton.ambient",
                "entity.skeleton.converted_to_stray",
                "entity.skeleton.death",
                "entity.skeleton.hurt",
                "entity.skeleton.shoot",
                "entity.skeleton.step",
                "entity.skeleton_horse.ambient",
                "entity.skeleton_horse.ambient_water",
                "entity.skeleton_horse.death",
                "entity.skeleton_horse.gallop_water",
                "entity.skeleton_horse.hurt",
                "entity.skeleton_horse.jump_water",
                "entity.skeleton_horse.step_water",
                "entity.skeleton_horse.swim",
                "entity.slime.attack",
                "entity.slime.death",
                "entity.slime.death_small",
                "entity.slime.hurt",
                "entity.slime.hurt_small",
                "entity.slime.jump",
                "entity.slime.jump_small",
                "entity.slime.squish",
                "entity.slime.squish_small",
                "entity.sniffer.death",
                "entity.sniffer.digging",
                "entity.sniffer.digging_stop",
                "entity.sniffer.drop_seed",
                "entity.sniffer.eat",
                "entity.sniffer.happy",
                "entity.sniffer.hurt",
                "entity.sniffer.idle",
                "entity.sniffer.scenting",
                "entity.sniffer.searching",
                "entity.sniffer.sniffing",
                "entity.sniffer.step",
                "entity.snow_golem.ambient",
                "entity.snow_golem.death",
                "entity.snow_golem.hurt",
                "entity.snow_golem.shear",
                "entity.snow_golem.shoot",
                "entity.snowball.throw",
                "entity.spider.ambient",
                "entity.spider.death",
                "entity.spider.hurt",
                "entity.spider.step",
                "entity.splash_potion.break",
                "entity.splash_potion.throw",
                "entity.squid.ambient",
                "entity.squid.death",
                "entity.squid.hurt",
                "entity.squid.squirt",
                "entity.stray.ambient",
                "entity.stray.death",
                "entity.stray.hurt",
                "entity.stray.step",
                "entity.strider.ambient",
                "entity.strider.death",
                "entity.strider.eat",
                "entity.strider.happy",
                "entity.strider.hurt",
                "entity.strider.retreat",
                "entity.strider.saddle",
                "entity.strider.step",
                "entity.strider.step_lava",
                "entity.tadpole.death",
                "entity.tadpole.flop",
                "entity.tadpole.grow_up",
                "entity.tadpole.hurt",
                "entity.tnt.primed",
                "entity.tropical_fish.ambient",
                "entity.tropical_fish.death",
                "entity.tropical_fish.flop",
                "entity.tropical_fish.hurt",
                "entity.turtle.ambient_land",
                "entity.turtle.death",
                "entity.turtle.death_baby",
                "entity.turtle.egg_break",
                "entity.turtle.egg_crack",
                "entity.turtle.egg_hatch",
                "entity.turtle.hurt",
                "entity.turtle.hurt_baby",
                "entity.turtle.lay_egg",
                "entity.turtle.shamble",
                "entity.turtle.shamble_baby",
                "entity.turtle.swim",
                "entity.vex.ambient",
                "entity.vex.charge",
                "entity.vex.death",
                "entity.vex.hurt",
                "entity.villager.ambient",
                "entity.villager.celebrate",
                "entity.villager.death",
                "entity.villager.hurt",
                "entity.villager.no",
                "entity.villager.trade",
                "entity.villager.work_armorer",
                "entity.villager.work_butcher",
                "entity.villager.work_cartographer",
                "entity.villager.work_cleric",
                "entity.villager.work_farmer",
                "entity.villager.work_fisherman",
                "entity.villager.work_fletcher",
                "entity.villager.work_leatherworker",
                "entity.villager.work_librarian",
                "entity.villager.work_mason",
                "entity.villager.work_shepherd",
                "entity.villager.work_toolsmith",
                "entity.villager.work_weaponsmith",
                "entity.villager.yes",
                "entity.vindicator.ambient",
                "entity.vindicator.celebrate",
                "entity.vindicator.death",
                "entity.vindicator.hurt",
                "entity.wandering_trader.ambient",
                "entity.wandering_trader.death",
                "entity.wandering_trader.disappeared",
                "entity.wandering_trader.drink_milk",
                "entity.wandering_trader.drink_potion",
                "entity.wandering_trader.hurt",
                "entity.wandering_trader.no",
                "entity.wandering_trader.reappeared",
                "entity.wandering_trader.trade",
                "entity.wandering_trader.yes",
                "entity.warden.agitated",
                "entity.warden.ambient",
                "entity.warden.angry",
                "entity.warden.attack_impact",
                "entity.warden.death",
                "entity.warden.dig",
                "entity.warden.emerge",
                "entity.warden.heartbeat",
                "entity.warden.hurt",
                "entity.warden.listening",
                "entity.warden.listening_angry",
                "entity.warden.nearby_close",
                "entity.warden.nearby_closer",
                "entity.warden.nearby_closest",
                "entity.warden.roar",
                "entity.warden.sniff",
                "entity.warden.sonic_boom",
                "entity.warden.sonic_charge",
                "entity.warden.step",
                "entity.warden.tendril_clicks",
                "entity.wind_charge.throw",
                "entity.wind_charge.wind_burst",
                "entity.witch.ambient",
                "entity.witch.celebrate",
                "entity.witch.death",
                "entity.witch.drink",
                "entity.witch.hurt",
                "entity.witch.throw",
                "entity.wither.ambient",
                "entity.wither.break_block",
                "entity.wither.death",
                "entity.wither.hurt",
                "entity.wither.shoot",
                "entity.wither.spawn",
                "entity.wither_skeleton.ambient",
                "entity.wither_skeleton.death",
                "entity.wither_skeleton.hurt",
                "entity.wither_skeleton.step",
                "entity.wolf.ambient",
                "entity.wolf.death",
                "entity.wolf.growl",
                "entity.wolf.howl",
                "entity.wolf.hurt",
                "entity.wolf.pant",
                "entity.wolf.shake",
                "entity.wolf.step",
                "entity.wolf.whine",
                "entity.zoglin.ambient",
                "entity.zoglin.angry",
                "entity.zoglin.attack",
                "entity.zoglin.death",
                "entity.zoglin.hurt",
                "entity.zoglin.step",
                "entity.zombie.ambient",
                "entity.zombie.attack_iron_door",
                "entity.zombie.attack_wooden_door",
                "entity.zombie.break_wooden_door",
                "entity.zombie.converted_to_drowned",
                "entity.zombie.death",
                "entity.zombie.destroy_egg",
                "entity.zombie.hurt",
                "entity.zombie.infect",
                "entity.zombie.step",
                "entity.zombie_horse.ambient",
                "entity.zombie_horse.death",
                "entity.zombie_horse.hurt",
                "entity.zombie_villager.ambient",
                "entity.zombie_villager.converted",
                "entity.zombie_villager.cure",
                "entity.zombie_villager.death",
                "entity.zombie_villager.hurt",
                "entity.zombie_villager.step",
                "entity.zombified_piglin.ambient",
                "entity.zombified_piglin.angry",
                "entity.zombified_piglin.death",
                "entity.zombified_piglin.hurt",
                "event.mob_effect.bad_omen",
                "event.mob_effect.raid_omen",
                "event.mob_effect.trial_omen",
                "event.raid.horn",
                "item.armor.equip_chain",
                "item.armor.equip_diamond",
                "item.armor.equip_elytra",
                "item.armor.equip_generic",
                "item.armor.equip_gold",
                "item.armor.equip_iron",
                "item.armor.equip_leather",
                "item.armor.equip_netherite",
                "item.armor.equip_turtle",
                "item.armor.equip_wolf",
                "item.armor.unequip_wolf",
                "item.axe.scrape",
                "item.axe.strip",
                "item.axe.wax_off",
                "item.bone_meal.use",
                "item.book.page_turn",
                "item.book.put",
                "item.bottle.empty",
                "item.bottle.fill",
                "item.bottle.fill_dragonbreath",
                "item.brush.brushing.generic",
                "item.brush.brushing.gravel",
                "item.brush.brushing.gravel.complete",
                "item.brush.brushing.sand",
                "item.brush.brushing.sand.complete",
                "item.bucket.empty",
                "item.bucket.empty_axolotl",
                "item.bucket.empty_fish",
                "item.bucket.empty_lava",
                "item.bucket.empty_powder_snow",
                "item.bucket.empty_tadpole",
                "item.bucket.fill",
                "item.bucket.fill_axolotl",
                "item.bucket.fill_fish",
                "item.bucket.fill_lava",
                "item.bucket.fill_powder_snow",
                "item.bucket.fill_tadpole",
                "item.bundle.drop_contents",
                "item.bundle.insert",
                "item.bundle.remove_one",
                "item.chorus_fruit.teleport",
                "item.crop.plant",
                "item.crossbow.hit",
                "item.crossbow.loading_end",
                "item.crossbow.loading_middle",
                "item.crossbow.loading_start",
                "item.crossbow.quick_charge_1",
                "item.crossbow.quick_charge_2",
                "item.crossbow.quick_charge_3",
                "item.crossbow.shoot",
                "item.dye.use",
                "item.elytra.flying",
                "item.firecharge.use",
                "item.flintandsteel.use",
                "item.glow_ink_sac.use",
                "item.goat_horn.sound.0",
                "item.goat_horn.sound.1",
                "item.goat_horn.sound.2",
                "item.goat_horn.sound.3",
                "item.goat_horn.sound.4",
                "item.goat_horn.sound.5",
                "item.goat_horn.sound.6",
                "item.goat_horn.sound.7",
                "item.hoe.till",
                "item.honey_bottle.drink",
                "item.honeycomb.wax_on",
                "item.ink_sac.use",
                "item.lodestone_compass.lock",
                "item.mace.smash_air",
                "item.mace.smash_ground",
                "item.mace.smash_ground_heavy",
                "item.nether_wart.plant",
                "item.ominous_bottle.dispose",
                "item.shield.block",
                "item.shield.break",
                "item.shovel.flatten",
                "item.spyglass.stop_using",
                "item.spyglass.use",
                "item.totem.use",
                "item.trident.hit",
                "item.trident.hit_ground",
                "item.trident.return",
                "item.trident.riptide_1",
                "item.trident.riptide_2",
                "item.trident.riptide_3",
                "item.trident.throw",
                "item.trident.thunder",
                "item.wolf_armor.break",
                "item.wolf_armor.crack",
                "item.wolf_armor.damage",
                "item.wolf_armor.repair",
                "music.creative",
                "music.credits",
                "music.dragon",
                "music.end",
                "music.game",
                "music.menu",
                "music.nether.basalt_deltas",
                "music.nether.crimson_forest",
                "music.nether.nether_wastes",
                "music.nether.soul_sand_valley",
                "music.nether.warped_forest",
                "music.overworld.badlands",
                "music.overworld.bamboo_jungle",
                "music.overworld.cherry_grove",
                "music.overworld.deep_dark",
                "music.overworld.desert",
                "music.overworld.dripstone_caves",
                "music.overworld.flower_forest",
                "music.overworld.forest",
                "music.overworld.frozen_peaks",
                "music.overworld.grove",
                "music.overworld.jagged_peaks",
                "music.overworld.jungle",
                "music.overworld.lush_caves",
                "music.overworld.meadow",
                "music.overworld.old_growth_taiga",
                "music.overworld.snowy_slopes",
                "music.overworld.sparse_jungle",
                "music.overworld.stony_peaks",
                "music.overworld.swamp",
                "music.under_water",
                "music_disc.11",
                "music_disc.13",
                "music_disc.5",
                "music_disc.blocks",
                "music_disc.cat",
                "music_disc.chirp",
                "music_disc.creator",
                "music_disc.creator_music_box",
                "music_disc.far",
                "music_disc.mall",
                "music_disc.mellohi",
                "music_disc.otherside",
                "music_disc.pigstep",
                "music_disc.precipice",
                "music_disc.relic",
                "music_disc.stal",
                "music_disc.strad",
                "music_disc.wait",
                "music_disc.ward",
                "particle.soul_escape",
                "ui.button.click",
                "ui.cartography_table.take_result",
                "ui.loom.select_pattern",
                "ui.loom.take_result",
                "ui.stonecutter.select_recipe",
                "ui.stonecutter.take_result",
                "ui.toast.challenge_complete",
                "ui.toast.in",
                "ui.toast.out",
                "weather.rain",
                "weather.rain.above",
            ]
        },
        "vanilla_and_custom_sound": {
            "$id": "vanilla_and_custom_sound",
            "type": "string",
            "markdownDescription": "Vanilla and custom sounds",
            "anyOf": [{"$ref": "#/$defs/vanilla_sound"}, {"type": "string"}]
        },
        "bukkit_sound_category": {
            "$id": "bukkit_sound_category",
            "markdownDescription": "Category of the sound.", 
            "type": "string",
            "enum": ["MASTER", "MUSIC", "RECORDS", "WEATHER", "BLOCKS", "HOSTILE", "NEUTRAL", "PLAYERS", "AMBIENT", "VOICE"]
        },
        "bukkit_entity_type": {
            "$id": "bukkit_entity_type",
            "type": "string",
            "markdownDescription": "Vanilla entities",
            "enum": [
                'ACACIA_BOAT',
                'ACACIA_CHEST_BOAT',
                'ALLAY',
                'AREA_EFFECT_CLOUD',
                'ARMADILLO',
                'ARMOR_STAND',
                'ARROW',
                'AXOLOTL',
                'BAMBOO_CHEST_RAFT',
                'BAMBOO_RAFT',
                'BAT',
                'BEE',
                'BIRCH_BOAT',
                'BIRCH_CHEST_BOAT',
                'BLAZE',
                'BLOCK_DISPLAY',
                'BOGGED',
                'BREEZE',
                'BREEZE_WIND_CHARGE',
                'CAMEL',
                'CAT',
                'CAVE_SPIDER',
                'CHERRY_BOAT',
                'CHERRY_CHEST_BOAT',
                'CHEST_MINECART',
                'CHICKEN',
                'COD',
                'COMMAND_BLOCK_MINECART',
                'COW',
                'CREAKING',
                'CREAKING_TRANSIENT',
                'CREEPER',
                'DARK_OAK_BOAT',
                'DARK_OAK_CHEST_BOAT',
                'DOLPHIN',
                'DONKEY',
                'DRAGON_FIREBALL',
                'DROWNED',
                'EGG',
                'ELDER_GUARDIAN',
                'END_CRYSTAL',
                'ENDER_DRAGON',
                'ENDER_PEARL',
                'ENDERMAN',
                'ENDERMITE',
                'EVOKER',
                'EVOKER_FANGS',
                'EXPERIENCE_BOTTLE',
                'EXPERIENCE_ORB',
                'EYE_OF_ENDER',
                'FALLING_BLOCK',
                'FIREBALL',
                'FIREWORK_ROCKET',
                'FISHING_BOBBER',
                'FOX',
                'FROG',
                'FURNACE_MINECART',
                'GHAST',
                'GIANT',
                'GLOW_ITEM_FRAME',
                'GLOW_SQUID',
                'GOAT',
                'GUARDIAN',
                'HOGLIN',
                'HOPPER_MINECART',
                'HORSE',
                'HUSK',
                'ILLUSIONER',
                'INTERACTION',
                'IRON_GOLEM',
                'ITEM',
                'ITEM_DISPLAY',
                'ITEM_FRAME',
                'JUNGLE_BOAT',
                'JUNGLE_CHEST_BOAT',
                'LEASH_KNOT',
                'LIGHTNING_BOLT',
                'LLAMA',
                'LLAMA_SPIT',
                'MAGMA_CUBE',
                'MANGROVE_BOAT',
                'MANGROVE_CHEST_BOAT',
                'MARKER',
                'MINECART',
                'MOOSHROOM',
                'MULE',
                'OAK_BOAT',
                'OAK_CHEST_BOAT',
                'OCELOT',
                'OMINOUS_ITEM_SPAWNER',
                'PAINTING',
                'PALE_OAK_BOAT',
                'PALE_OAK_CHEST_BOAT',
                'PANDA',
                'PARROT',
                'PHANTOM',
                'PIG',
                'PIGLIN',
                'PIGLIN_BRUTE',
                'PILLAGER',
                'PLAYER',
                'POLAR_BEAR',
                'POTION',
                'PUFFERFISH',
                'RABBIT',
                'RAVAGER',
                'SALMON',
                'SHEEP',
                'SHULKER',
                'SHULKER_BULLET',
                'SILVERFISH',
                'SKELETON',
                'SKELETON_HORSE',
                'SLIME',
                'SMALL_FIREBALL',
                'SNIFFER',
                'SNOW_GOLEM',
                'SNOWBALL',
                'SPAWNER_MINECART',
                'SPECTRAL_ARROW',
                'SPIDER',
                'SPRUCE_BOAT',
                'SPRUCE_CHEST_BOAT',
                'SQUID',
                'STRAY',
                'STRIDER',
                'TADPOLE',
                'TEXT_DISPLAY',
                'TNT',
                'TNT_MINECART',
                'TRADER_LLAMA',
                'TRIDENT',
                'TROPICAL_FISH',
                'TURTLE',
                'UNKNOWN',
                'VEX',
                'VILLAGER',
                'VINDICATOR',
                'WANDERING_TRADER',
                'WARDEN',
                'WIND_CHARGE',
                'WITCH',
                'WITHER',
                'WITHER_SKELETON',
                'WITHER_SKULL',
                'WOLF',
                'ZOGLIN',
                'ZOMBIE',
                'ZOMBIE_HORSE',
                'ZOMBIE_VILLAGER',
                'ZOMBIFIED_PIGLIN',
            ]
        },
        "bukkit_particle": {
            "$id": "bukkit_particle",
            "type": "string",
            "markdownDescription": "Vanilla particles",
            "enum": [
                'ANGRY_VILLAGER',
                'ASH',
                'BLOCK',
                'BLOCK_CRUMBLE',
                'BLOCK_MARKER',
                'BUBBLE',
                'BUBBLE_COLUMN_UP',
                'BUBBLE_POP',
                'CAMPFIRE_COSY_SMOKE',
                'CAMPFIRE_SIGNAL_SMOKE',
                'CHERRY_LEAVES',
                'CLOUD',
                'COMPOSTER',
                'CRIMSON_SPORE',
                'CRIT',
                'CURRENT_DOWN',
                'DAMAGE_INDICATOR',
                'DOLPHIN',
                'DRAGON_BREATH',
                'DRIPPING_DRIPSTONE_LAVA',
                'DRIPPING_DRIPSTONE_WATER',
                'DRIPPING_HONEY',
                'DRIPPING_LAVA',
                'DRIPPING_OBSIDIAN_TEAR',
                'DRIPPING_WATER',
                'DUST',
                'DUST_COLOR_TRANSITION',
                'DUST_PILLAR',
                'DUST_PLUME',
                'EFFECT',
                'EGG_CRACK',
                'ELDER_GUARDIAN',
                'ELECTRIC_SPARK',
                'ENCHANT',
                'ENCHANTED_HIT',
                'END_ROD',
                'ENTITY_EFFECT',
                'EXPLOSION',
                'EXPLOSION_EMITTER',
                'FALLING_DRIPSTONE_LAVA',
                'FALLING_DRIPSTONE_WATER',
                'FALLING_DUST',
                'FALLING_HONEY',
                'FALLING_LAVA',
                'FALLING_NECTAR',
                'FALLING_OBSIDIAN_TEAR',
                'FALLING_SPORE_BLOSSOM',
                'FALLING_WATER',
                'FIREWORK',
                'FISHING',
                'FLAME',
                'FLASH',
                'GLOW',
                'GLOW_SQUID_INK',
                'GUST',
                'GUST_EMITTER_LARGE',
                'GUST_EMITTER_SMALL',
                'HAPPY_VILLAGER',
                'HEART',
                'INFESTED',
                'INSTANT_EFFECT',
                'ITEM',
                'ITEM_COBWEB',
                'ITEM_SLIME',
                'ITEM_SNOWBALL',
                'LANDING_HONEY',
                'LANDING_LAVA',
                'LANDING_OBSIDIAN_TEAR',
                'LARGE_SMOKE',
                'LAVA',
                'MYCELIUM',
                'NAUTILUS',
                'NOTE',
                'OMINOUS_SPAWNING',
                'POOF',
                'PORTAL',
                'RAID_OMEN',
                'RAIN',
                'REVERSE_PORTAL',
                'SCRAPE',
                'SCULK_CHARGE',
                'SCULK_CHARGE_POP',
                'SCULK_SOUL',
                'SHRIEK',
                'SMALL_FLAME',
                'SMALL_GUST',
                'SMOKE',
                'SNEEZE',
                'SNOWFLAKE',
                'SONIC_BOOM',
                'SOUL',
                'SOUL_FIRE_FLAME',
                'SPIT',
                'SPLASH',
                'SPORE_BLOSSOM_AIR',
                'SQUID_INK',
                'SWEEP_ATTACK',
                'TOTEM_OF_UNDYING',
                'TRAIL',
                'TRIAL_OMEN',
                'TRIAL_SPAWNER_DETECTION',
                'TRIAL_SPAWNER_DETECTION_OMINOUS',
                'UNDERWATER',
                'VAULT_CONNECTION',
                'VIBRATION',
                'WARPED_SPORE',
                'WAX_OFF',
                'WAX_ON',
                'WHITE_ASH',
                'WHITE_SMOKE',
                'WITCH',
            ]
        },
        "bukkit_effect": {
            "$id": "bukkit_effect",
            "type": "string",
            "markdownDescription": "Bukkit effect",
            "enum": [
                'ANVIL_BREAK',
                'ANVIL_LAND',
                'ANVIL_USE',
                'BAT_TAKEOFF',
                'BLAZE_SHOOT',
                'BONE_MEAL_USE',
                'BOOK_PAGE_TURN',
                'BOW_FIRE',
                'BREWING_STAND_BREW',
                'CHORUS_FLOWER_DEATH',
                'CHORUS_FLOWER_GROW',
                'CLICK1',
                'CLICK2',
                'COMPOSTER_FILL_ATTEMPT',
                'COPPER_WAX_OFF',
                'COPPER_WAX_ON',
                'DOOR_CLOSE',
                'DOOR_TOGGLE',
                'DRAGON_BREATH',
                'DRIPPING_DRIPSTONE',
                'ELECTRIC_SPARK',
                'END_GATEWAY_SPAWN',
                'END_PORTAL_FRAME_FILL',
                'ENDER_DRAGON_DESTROY_BLOCK',
                'ENDER_SIGNAL',
                'ENDERDRAGON_GROWL',
                'ENDERDRAGON_SHOOT',
                'ENDEREYE_LAUNCH',
                'EXTINGUISH',
                'FENCE_GATE_CLOSE',
                'FENCE_GATE_TOGGLE',
                'FIREWORK_SHOOT',
                'GHAST_SHOOT',
                'GHAST_SHRIEK',
                'GRINDSTONE_USE',
                'HUSK_CONVERTED_TO_ZOMBIE',
                'INSTANT_POTION_BREAK',
                'IRON_DOOR_CLOSE',
                'IRON_DOOR_TOGGLE',
                'IRON_TRAPDOOR_CLOSE',
                'IRON_TRAPDOOR_TOGGLE',
                'LAVA_INTERACT',
                'MOBSPAWNER_FLAMES',
                'OXIDISED_COPPER_SCRAPE',
                'PHANTOM_BITE',
                'POINTED_DRIPSTONE_DRIP_LAVA_INTO_CAULDRON',
                'POINTED_DRIPSTONE_DRIP_WATER_INTO_CAULDRON',
                'POINTED_DRIPSTONE_LAND',
                'PORTAL_TRAVEL',
                'POTION_BREAK',
                'RECORD_PLAY',
                'REDSTONE_TORCH_BURNOUT',
                'SKELETON_CONVERTED_TO_STRAY',
                'SMITHING_TABLE_USE',
                'SMOKE',
                'SPONGE_DRY',
                'STEP_SOUND',
                'TRAPDOOR_CLOSE',
                'TRAPDOOR_TOGGLE',
                'VILLAGER_PLANT_GROW',
                'WITHER_BREAK_BLOCK',
                'WITHER_SHOOT',
                'ZOMBIE_CHEW_IRON_DOOR',
                'ZOMBIE_CHEW_WOODEN_DOOR',
                'ZOMBIE_CONVERTED_TO_DROWNED',
                'ZOMBIE_CONVERTED_VILLAGER',
                'ZOMBIE_DESTROY_DOOR',
                'ZOMBIE_INFECT',
            ]
        },
        "bukkit_potion_effect_type": {
            "$id": "bukkit_potion_effect_type",
            "type": "string",
            "markdownDescription": "Bukkit potion effect type",
            "enum": [
                'ABSORPTION',
                'BAD_OMEN',
                'BLINDNESS',
                'CONDUIT_POWER',
                'DARKNESS',
                'DOLPHINS_GRACE',
                'FIRE_RESISTANCE',
                'GLOWING',
                'HASTE',
                'HEALTH_BOOST',
                'HERO_OF_THE_VILLAGE',
                'HUNGER',
                'INFESTED',
                'INSTANT_DAMAGE',
                'INSTANT_HEALTH',
                'INVISIBILITY',
                'JUMP_BOOST',
                'LEVITATION',
                'LUCK',
                'MINING_FATIGUE',
                'NAUSEA',
                'NIGHT_VISION',
                'OOZING',
                'POISON',
                'RAID_OMEN',
                'REGENERATION',
                'RESISTANCE',
                'SATURATION',
                'SLOW_FALLING',
                'SLOWNESS',
                'SPEED',
                'STRENGTH',
                'TRIAL_OMEN',
                'UNLUCK',
                'WATER_BREATHING',
                'WEAKNESS',
                'WEAVING',
                'WIND_CHARGED',
                'WITHER',
            ]
        },
        "bukkit_biome": {
            "$id": "bukkit_biome",
            "type": "string",
            "markdownDescription": "Bukkit biome",
            "enum": [
                'BADLANDS',
                'BAMBOO_JUNGLE',
                'BASALT_DELTAS',
                'BEACH',
                'BIRCH_FOREST',
                'CHERRY_GROVE',
                'COLD_OCEAN',
                'CRIMSON_FOREST',
                'CUSTOM',
                'DARK_FOREST',
                'DEEP_COLD_OCEAN',
                'DEEP_DARK',
                'DEEP_FROZEN_OCEAN',
                'DEEP_LUKEWARM_OCEAN',
                'DEEP_OCEAN',
                'DESERT',
                'DRIPSTONE_CAVES',
                'END_BARRENS',
                'END_HIGHLANDS',
                'END_MIDLANDS',
                'ERODED_BADLANDS',
                'FLOWER_FOREST',
                'FOREST',
                'FROZEN_OCEAN',
                'FROZEN_PEAKS',
                'FROZEN_RIVER',
                'GROVE',
                'ICE_SPIKES',
                'JAGGED_PEAKS',
                'JUNGLE',
                'LUKEWARM_OCEAN',
                'LUSH_CAVES',
                'MANGROVE_SWAMP',
                'MEADOW',
                'MUSHROOM_FIELDS',
                'NETHER_WASTES',
                'OCEAN',
                'OLD_GROWTH_BIRCH_FOREST',
                'OLD_GROWTH_PINE_TAIGA',
                'OLD_GROWTH_SPRUCE_TAIGA',
                'PALE_GARDEN',
                'PLAINS',
                'RIVER',
                'SAVANNA',
                'SAVANNA_PLATEAU',
                'SMALL_END_ISLANDS',
                'SNOWY_BEACH',
                'SNOWY_PLAINS',
                'SNOWY_SLOPES',
                'SNOWY_TAIGA',
                'SOUL_SAND_VALLEY',
                'SPARSE_JUNGLE',
                'STONY_PEAKS',
                'STONY_SHORE',
                'SUNFLOWER_PLAINS',
                'SWAMP',
                'TAIGA',
                'THE_END',
                'THE_VOID',
                'WARM_OCEAN',
                'WARPED_FOREST',
                'WINDSWEPT_FOREST',
                'WINDSWEPT_GRAVELLY_HILLS',
                'WINDSWEPT_HILLS',
                'WINDSWEPT_SAVANNA',
                'WOODED_BADLANDS',
            ]
        },
        "colors": {
            "$id": "colors",
            "markdownDescription": "Valid colors can be obtained from here: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Color.html\nIf you want very precise color you can use this website to get the Decimal value: https://www.mathsisfun.com/hexadecimal-decimal-colors.html",
            "kind": 19,
            "default": "WHITE",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        "WHITE",
                        "SILVER",
                        "GRAY",
                        "BLACK",
                        "RED",
                        "MAROON",
                        "YELLOW",
                        "OLIVE",
                        "LIME",
                        "GREEN",
                        "AQUA",
                        "TEAL",
                        "BLUE",
                        "NAVY",
                        "FUCHSIA",
                        "PURPLE",
                        "ORANGE"
                    ]
                },
                {"type": "integer"}
            ]
        },
        "specific_properties": {
            "$id": "specific_properties",
            "type": "object",
            "properties": {
                "block": {
                    "required": ["placed_model"],
                    "properties": {
                        "placed_model": {
                            "type": "object",
                            "required": ["type"],
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "REAL_NOTE",
                                        "REAL_TRANSPARENT",
                                        "REAL_WIRE",
                                        "TILE",
                                        "REAL",
                                        "FIRE"
                                    ],
                                    "default": "REAL_NOTE",
                                    "markdownDescription": "(USE THE MOUSE SCROLL WHELL for more..)\nThis property can have these value:\n\n**REAL_WIRE**\nuses a real block (tripwire), no lag, no entities, 100% real blocks.\ndownside: Max of 127 blocks in total.\n\n**REAL_TRANSPARENT**\nuses a real block (chorus), no lag, no entities, 100% real blocks, also with transparency support!\ndownside: max of 63 blocks in total\n\n**TILE**\nuses tile blocks (modified spawner with custom skin). It's not an entity but it have some downsides. Good thing is that you can create infinite blocks, there is no amount limit like REAL blocks.\ndownsides:\nnot a 100% real block, it's a retextured spawner\ntexture/model vanishes on high distance, so it will reveal the spawner vanilla texture\nit could cause clientside lag if A LOT of blocks are in the player field of view, but only on lowend PCs.\n\n**REAL_NOTE**\nuses a real block (note_block), no lag, no entities, 100% real blocks.\ndownside: no support for transparency. Max of 750 blocks in total.\n**REAL**\nuses a real block (mushroom), no lag, no entities, 100% real blocks.\ndownside: max of 191 blocks in total\n\n**FIRE**\nthis is a special type of block, it's the fire block.\ndownside: only a max of 14 custom fires is possible, so be sure to create only the ones you need.\n"
                                },
                                "break_particles": {
                                    "markdownDescription": "Specify if you want to use the break particle of the material used to create the block (BLOCK), or your a texture (ITEM) or let the game handle it (VANILLA)",
                                    "type": "string",
                                    "enum": ["VANILLA", "BLOCK", "ITEM"]
                                },
                                "break_particles_material": {
                                    "markdownDescription": "Alternative to 'break_particles' property.\n\nSpecify which texture the break particle will have (more control compared to break_particles).\n**Accepts only vanilla blocks and custom items!**",
                                    "$ref": "#/$defs/vanilla_and_custom_blocks"
                                },
                                "shift_up": {
                                    "type": "boolean",
                                    "markdownDescription": "This allows to make some blocks placed one block up. This is useful for REAL_WIRE blocks to create tall plants."
                                },
                                "placeable_on_other_real_wire": {
                                    "type": "boolean",
                                    "markdownDescription": "This allows to make this REAL_WIRE block placeable on top of another REAL_WIRE block."
                                },
                                "placeable_on_water": {
                                    "type": "boolean",
                                    "markdownDescription": "This allows to make this block placeable directly on water surface."
                                },
                                "placeable_on_lava": {
                                    "type": "boolean",
                                    "markdownDescription": "This allows to make this block placeable directly on lava surface."
                                },
                                "custom_variants" : {
                                    "type": "object",
                                    "kind": 5,
                                    "detail": "(Custom block variant)",
                                    "additionalProperties": {
                                        "type": "object",
                                        "$ref": "#/$defs/custom_block_variant"
                                    },
                                    "properties": {
                                        "variant_1": {
                                            "type": "object",
                                            "$ref": "#/$defs/custom_block_variant"
                                        },
                                        "variant_2": {
                                            "type": "object",
                                            "$ref": "#/$defs/custom_block_variant"
                                        },
                                        "variant_3": {
                                            "type": "object",
                                            "$ref": "#/$defs/custom_block_variant"
                                        },
                                        "variant_xxx": {
                                            "type": "object",
                                            "$ref": "#/$defs/custom_block_variant"
                                        }
                                    }
                                },
                                "rotx": {
                                    "type": "integer",
                                    "markdownDescription": "This allows you to specify a rotation for a particular model. This is an option for expert users.\nThe specified rotation is STATIC, it's not dynamic. This is useful only if you want to create multiple variants of the same block without having to create a separate model manually."
                                },
                                "roty": {
                                    "type": "integer",
                                    "markdownDescription": "This allows you to specify a rotation for a particular model. This is an option for expert users.\nThe specified rotation is STATIC, it's not dynamic. This is useful only if you want to create multiple variants of the same block without having to create a separate model manually."
                                }
                            }
                        },
                        "hardness": {"markdownDescription": "Mining hardness", "type": "number"},
                        "blast_resistance": {
                            "markdownDescription": "Explosion resistance. It is hardness*3 by default if you don't set blast_resistance.",
                            "type": "number"
                        },
                        "no_explosion": {
                            "markdownDescription": "Totally immune from explosions, ignoring blast_resistance",
                            "type": "boolean"
                        },
                        "sound": {
                            "properties": {
                                "break": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                },
                                "place": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                },
                                "hit": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                },
                                "step": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                },
                                "fall": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                }
                            }
                        },
                        "cancel_drop": {
                            "type": "boolean",
                            "markdownDescription": "(**OLD NAME**, use the new `drop_when_mined` instead.). This option allows you to avoid the block from being dropped when broken by players.",
                            "deprecated": true,
                            "doNotSuggest": true
                        },
                        "drop_when_mined": {
                            "type": "boolean",
                            "markdownDescription": "Set if the block should drop when mined by a player.",
                            "default": true
                        },
                        "drop_on_silk_touch": {
                            "type": "boolean",
                            "markdownDescription": "Set if the block should drop when mined by a player with silk touch enchanted tool.",
                        },
                        "drop_on_shears": {
                            "type": "boolean",
                            "markdownDescription": "Set if the block should drop when mined by a player with shears.",
                        },
                        "light_level": {
                            "type": "integer",
                            "markdownDescription": "Set this to make the block emit light.",
                            "minimum": 1,
                            "maximum": 15
                        },
                        "permission_suffix": {
                            "properties": {
                                "break": {
                                    "type": "string",
                                    "markdownDescription": "Partial permission used to allow a player to break the block.\n\nFor example `iasurvival.ruby_block` is a suffix permission for `ia.user.block.break.iasurvival.ruby_block`."
                                },
                                "place": {
                                    "type": "string",
                                    "markdownDescription": "Partial permission used to allow a player to place the block.\n\nFor example `iasurvival.ruby_block` is a suffix permission for `ia.user.block.place.iasurvival.ruby_block`."
                                }
                            }
                        },
                        "break_tools_blacklist": {
                            "type": "array",
                            "markdownDescription": "Blacklist of tools that cannot break this block",
                            "items": {
                                "anyOf": [
                                    {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                    {
                                        "type": "string",
                                        "enum": [
                                            "HAND",
                                            "hand",
                                            "pickaxe",
                                            "PICKAXE",
                                            "axe",
                                            "AXE",
                                            "SHOVEL",
                                            "shovel",
                                            "hoe",
                                            "HOE",
                                            "sword",
                                            "SWORD"
                                        ]
                                    },
                                    {"additionalProperties": {"type": "string"}}
                                ]
                            }
                        },
                        "break_tools_whitelist": {
                            "type": "array",
                            "markdownDescription": "Whitelist of tools that cannot break this block",
                            "items": {
                                "anyOf": [
                                    {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                    {
                                        "type": "string",
                                        "enum": [
                                            "HAND",
                                            "hand",
                                            "pickaxe",
                                            "PICKAXE",
                                            "axe",
                                            "AXE",
                                            "SHOVEL",
                                            "shovel",
                                            "hoe",
                                            "HOE",
                                            "sword",
                                            "SWORD"
                                        ]
                                    },
                                    {"additionalProperties": {"type": "string"}}
                                ]
                            }
                        },
                        "events_tools_whitelist": {
                            "type": "array",
                            "markdownDescription": "Whitelist of tools that can run events on this block (placed_block.interact)",
                            "items": {
                                "anyOf": [
                                    {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                    {
                                        "type": "string",
                                        "enum": [
                                            "HAND",
                                            "hand",
                                            "pickaxe",
                                            "PICKAXE",
                                            "axe",
                                            "AXE",
                                            "SHOVEL",
                                            "shovel",
                                            "hoe",
                                            "HOE",
                                            "sword",
                                            "SWORD"
                                        ]
                                    },
                                    {"additionalProperties": {"type": "string"}}
                                ]
                            }
                        },
                        "events_tools_blacklist": {
                            "type": "array",
                            "markdownDescription": "Blacklist of tools that can't run events on this block (placed_block.interact)",
                            "items": {
                                "anyOf": [
                                    {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                    {
                                        "type": "string",
                                        "enum": [
                                            "HAND",
                                            "hand",
                                            "pickaxe",
                                            "PICKAXE",
                                            "axe",
                                            "AXE",
                                            "SHOVEL",
                                            "shovel",
                                            "hoe",
                                            "HOE",
                                            "sword",
                                            "SWORD"
                                        ]
                                    },
                                    {"additionalProperties": {"type": "string"}}
                                ]
                            }
                        }
                    }
                },
                "bow": {
                    "properties": {
                        "glow_arrows": {"type": "boolean", "default": false},
                        "fire_arrows": {"type": "boolean", "default": false},
                        "arrow_damage": {"type": "number", "default": 1}
                    }
                },
                "crossbow": {
                    "properties": {
                        "glow_arrows": {"type": "boolean", "default": false},
                        "fire_arrows": {"type": "boolean", "default": false},
                        "arrow_damage": {"type": "number", "default": 1},
                        "multishot": {"type": "boolean", "default": false},
                        "firework": {"type": "boolean", "default": false}
                    }
                },
                "seed": {
                    "properties": {
                        "crop_block": {
                            "anyOf": [
                                {
                                    "type": "string",
                                    "enum": [
                                        "WHEAT",
                                        "BEETROOT",
                                        "CARROTS",
                                        "POTATOES",
                                        "COCOA",
                                        "BAMBOO",
                                        "SUGAR_CANE",
                                        "SWEET_BERRY_BUSH",
                                        "KELP_PLANT",
                                        "SEA_PICKLE",
                                        "NETHER_WART"
                                    ]
                                },
                                {"type": "string", "default": "WHEAT"}
                            ]
                        },
                        "results": {
                            "markdownDescription": "List of the possible result drops and their chances",
                            "type": "object",
                            "additionalProperties": {
                                "type": "object",
                                "$ref": "#/$defs/result"
                            },
                            "properties": {
                                "change_me": {"type": "object", "$ref": "#/$defs/result"},
                                "change_me_2": {"type": "object", "$ref": "#/$defs/result"},
                                "change_me_xxx": {"type": "object", "$ref": "#/$defs/result"}
                            }
                        }
                    }
                },
                "armor": {
                    "markdownDescription": "Old way of creating custom armors. For Minecraft 1.21.1 and lower.\n\nIf your server accepts 1.21.2 and higher, use the `custom_armor` property instead.",
                    "properties": {
                        "custom_armor": {
                            "type": "string",
                            "markdownDescription": "Specify a name from previously created 'armors_rendering' textures for this armor piece.\nRead more: https://itemsadder.devs.beer/plugin-usage/adding-content/advanced/custom-armors/\n\nIf you decide to specify 'custom_armor' you can avoid setting the 'color' property here."
                        },
                        "slot": {
                            "type": "string",
                            "enum": [
                                "HEAD",
                                "CHEST",
                                "LEGS",
                                "FEET",
                                "head",
                                "chest",
                                "legs",
                                "feet"
                            ],
                            "default": "HEAD"
                        },
                        "color": {
                            "kind": 19,
                            "default": "ff0000",
                            "anyOf": [
                                {
                                    "type": "string",
                                    "enum": [
                                        "ff7e7e",
                                        "75bebe",
                                        "16d4ff",
                                        "530766",
                                        "00ff72",
                                        "010002",
                                        "570e11",
                                        "d36823",
                                        "ff0000"
                                    ]
                                },
                                {"type": "integer"},
                                {
                                    "patternProperties": {
                                        "^(#|)[0-9a-f]{3,6}$": {"type": "string"}
                                    }
                                }
                            ]
                        },
                        "can_wear": {"type": "boolean", "kind": 4}
                    }
                },
                "potion": {
                    "properties": {
                        "type": {"$ref": "#/$defs/vanilla_potion_type"},
                        "color": {"$ref": "#/$defs/colors"},
                        "effects": {
                            "type": "object",
                            "kind": 5,
                            "detail": "(collection)",
                            "description": "Attach multiple potion effects to this potion to create a completely custom potion.",
                            "additionalProperties": {
                                "type": "object",
                                "$ref": "#/$defs/custom_potion_effect"
                            },
                            "properties": {
                                "effect_1": {
                                    "$ref": "#/$defs/custom_potion_effect"
                                },
                                "effect_2": {
                                    "$ref": "#/$defs/custom_potion_effect"
                                },
                                "effect_xxx": {
                                    "$ref": "#/$defs/custom_potion_effect"
                                }
                            }
                        }
                    }
                },
                "leather_horse_armor": {
                    "properties": {
                        "color": {"$ref": "#/$defs/colors"},
                        "can_be_recolored_in_crafting_table": {
                            "markdownDescription": "Can be recolored by putting it into the crafting table with a dye item (vanilla behaviour for dyeable items).",
                            "type": "boolean",
                            "default": false,
                        }
                    }
                },
                "book": {
                    "properties": {
                        "author": {"type": "string", "default": "ItemsAdder"},
                        "generation": {
                            "type": "string",
                            "enum": [
                                "ORIGINAL",
                                "COPY_OF_ORIGINAL",
                                "COPY_OF_COPY",
                                "TATTERED"
                            ],
                            "default": "ORIGINAL"
                        },
                        "pages": {"items": {"type": "string"}}
                    }
                }
            }
        },
        "item": {
            "$id": "item",
            "markdownDescription": "Custom item",
            "type": "object",
            "additionalProperties": true,
            "anyOf": [
                { "required": ["resource", "name"] },
                { "required": ["resource", "display_name"] }
            ],
            "properties": {
                "enabled": {
                    "markdownDescription": "With this setting you can disable an item completely.\n**Obviously if a player has it in inventory it won't be removed, he still will own it.\nSame thing for blocks, but when broken they won't drop anymore**",
                    "type": "boolean",
                    "default": true,
                    "kind": 0
                },
                "template": {
                    "type": "boolean",
                    "kind": 7,
                    "markdownDescription": "Templates are special items that won't appear ingame, they are used as properties holders for other items.\nThey allow you to write common properties in one item and add them automatically to other items without constant copy and paste.\n\nhttps://itemsadder.devs.beer/plugin-usage/adding-content/advanced/item-properties/basic/templates-and-variants\n\nThis is useful to create items with the same logic but different texture/model, name, lore (for example I use it to create a furniture with different woods without having to copy and paste the \"furniture\" behaviour everytime)."
                },
                "variant_of": {
                    "type": "string",
                    "kind": 5,
                    "markdownDescription": "Name of the template you want to use.\nVariants are items that will appear ingame and will inherit properties of template items.\n\nhttps://itemsadder.devs.beer/plugin-usage/adding-content/advanced/item-properties/basic/templates-and-variants\n\nThis is useful to create items with the same logic but different texture/model, name, lore (for example I use it to create a furniture with different woods without having to copy and paste the \"furniture\" behaviour everytime)."
                },
                "display_name": {
                    "markdownDescription": "(**OLD NAME**, use `name` instead). Display name of the item.\nYou can set a **text** or an identifier from a **dictionary** file.\n\nGet more info about translations here: https://itemsadder.devs.beer/plugin-usage/languages",
                    "type": "string",
                    "doNotSuggest": true,
                    "deprecated": true
                },
                "name": {
                    "markdownDescription": "Item name.\nYou can set a **text** or an identifier from a **dictionary** file.\n\nGet more info about translations here: https://itemsadder.devs.beer/plugin-usage/languages",
                    "type": "string",
                    "kind": 18
                },
                "permission_suffix": {
                    "type": "string",
                    "markdownDescription": "Partial permission of the item.\n\nFor example `iasurvival.ruby_block` is a suffix permission for `ia.user.ia.seeitem.iasurvival.ruby_block` and might be extended in the future for new plugin permissions."
                },
                "mmoitem": {
                    "markdownDescription": "Special property to mark item as MMOITEM https://www.spigotmc.org/resources/39267/",
                    "additionalProperties": false,
                    "properties": {
                        "type": {
                         "markdownDescription": "MMOITEM Type (check MMOItems docs)",
                            "type": "string"
                        },
                        "id": {
                            "markdownDescription": "MMOITEM id (check MMOItems docs)",
                            "type": "string"
                        },
                        "use_mmoitem_displayname": {
                            "markdownDescription": "Use the display name of MMOitems item instead of the one from ItemsAdder. Default `false`.",
                            "type": "string"
                        },
                    }
                },
                "resource": {
                    "markdownDescription": "Resource pack model generator settings.\n`material` property is required for every item.\nHowever custom armors do not require this setting.\nCustom armors default item material will be leather if not specified.",
                    "type": "object",
                    "properties": {
                        "material": {"$ref": "#/$defs/bukkit_materials", "default": "PAPER"},
                        "generate": {
                            "type": "boolean",
                            "markdownDescription": "`true` to automatically generate the JSON model from your textures.\n\n`false` to create the model by yourself.\n\nSet to `true` if you want to use `textures`.\nSet `false` if you want to use `model_path`."
                        },
                        "custom_model_data": {
                            "type": "integer",
                            "markdownDescription": "Force the usage of a defined `custom_model_data` (`CustomModelData`).\nhttps://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/resource#manually-specify-custom_model_data"
                        },
                        "model_id": {
                            "type": "integer",
                            "markdownDescription": "(**OLD NAME**, use `custom_model_data` instead). If you want to force the usage of a defined `custom_model_data` (CustomModelData) you can set this value.\nhttps://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/resource#manually-specify-custom_model_data",
                            "doNotSuggest": true,
                            "deprecated": true
                        },
                    },
                    "if": {
                        "properties": {"generate": {"const" : true}},
                        "required": ["generate"]
                    },
                    "then": {
                        "properties": {
                            "textures": {
                            "items": {"type": "string"},
                            "title": "Set `generate: true` to use this!",
                            "markdownDescription": "Specifies the textures layers to be used to generate the model. You usually will need only 1 layer.\nIf you are creating a block you can set a texture for each face of the block in this order:\n- block/block_down.png\n- block/block_east.png\n- block/block_north.png\n- block/block_south.png\n- block/block_up.png\n- block/block_west.png",
                            "defaultSnippets": [
                                {"body": "item/$0.png"},
                                {"body": "block/$0.png"}
                            ],
                            "default": [""]
                            },
                            "texture": {
                                "type": "string",
                                "title": "Set `generate: true` to use this!",
                                "markdownDescription": "Specifies the texture layer to be used to generate the model.\nIf you are creating a block you can set a texture for each face of the block in this order:\n- block/block_down.png\n- block/block_east.png\n- block/block_north.png\n- block/block_south.png\n- block/block_up.png\n- block/block_west.png",
                                "defaultSnippets": [
                                    {"body": "item/$0.png"},
                                    {"body": "block/$0.png"}
                                ]
                            }
                        }
                    },
                    "else" : {
                        "properties": {
                            "model_path": {
                                "type": "string",
                                "title": "Set `generate: false` to use this!",
                                "defaultSnippets": [{"body": "item/$0"}, {"body": "block/$0"}]
                            }
                        },
                        "required": ["model_path"]
                    }
                },
                "lore": {
                    "markdownDescription": "Lore of the item",
                    "items": {"type": "string"}
                },
                "attribute_modifiers": {
                    "markdownDescription": "Slot in which the item has effect",
                    "type": "object",
                    "properties": {
                        "mainhand": {"$ref": "#/$defs/attribute_modifiers"},
                        "offhand": {"$ref": "#/$defs/attribute_modifiers"},
                        "head": {"$ref": "#/$defs/attribute_modifiers"},
                        "chest": {"$ref": "#/$defs/attribute_modifiers"},
                        "legs": {"$ref": "#/$defs/attribute_modifiers"},
                        "feet": {"$ref": "#/$defs/attribute_modifiers"}
                    }
                },
                "durability": {
                    "markdownDescription": "Durability of the item",
                    "type": "object",
                    "properties": {
                        "max_custom_durability": {
                            "type": "integer",
                            "markdownDescription": "(**OLD NAME**, please use `max_durability`).\nMax durability of the item. If not specified ItemsAdder will use default material max durability",
                            "doNotSuggest": true,
                            "deprecated": true
                        },
                        "custom_durability": {
                            "type": "integer",
                            "markdownDescription": "(**OLD NAME**, please use `durability`).\nCurrent durability of the item (when crafted or obtained with command).\nIf not specified ItemsAdder will use material max durability (undamaged)",
                            "doNotSuggest": true,
                            "deprecated": true
                        },
                        "max_durability": {
                            "type": "integer",
                            "markdownDescription": "Max durability of the item. If not specified ItemsAdder will use default material max durability",
                            "default": 1562
                        },
                        "durability": {
                            "type": "integer",
                            "markdownDescription": "Current durability of the item (when crafted or obtained with command).\nIf not specified ItemsAdder will use material max durability (undamaged)"
                        },
                        "disappear_when_broken": {
                            "type": "boolean",
                            "markdownDescription": "If the item should disappear when broken"
                        },
                        "unbreakable": {
                            "type": "boolean",
                            "markdownDescription": "If the item can get damage"
                        },
                        "repair_cost": {
                            "type": "integer",
                            "markdownDescription": "Initial cost to repair the item in an anvil"
                        },
                        "usages": {
                            "type": "integer",
                            "markdownDescription": "Usages of the item before it disappears (you must handle usages using an event and action (decrement_usages) https://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/events/actions"
                        }
                    }
                },
                "item_flags": {
                    "markdownDescription": "Vanilla Minecraft item flags.\nSpecial item flags that can hide some vanilla info of the item.\nYou can find a detailed info list here: https://hub.spigotmc.org/javadocs/spigot/org/bukkit/inventory/ItemFlag.html",
                    "items": {
                        "type": "string",
                        "enum": [
                            "HIDE_ATTRIBUTES",
                            "HIDE_DESTROYS",
                            "HIDE_ENCHANTS",
                            "HIDE_PLACED_ON",
                            "HIDE_POTION_EFFECTS",
                            "HIDE_UNBREAKABLE"
                        ]
                    }
                },
                "max_stack_size": {
                    "type": "integer",
                    "markdownDescription": "Max stack size of the item",
                },
                "consumable": {
                    "markdownDescription": "## Available on `1.21.2+` clients/servers only!\nConsumable item. Can be eaten or drank or used in a general way if no food properties are set.",
                    "properties": {
                        "nutrition": {
                            "type": "integer",
                            "markdownDescription": "Nutrition value of the food item. Not mandatory."
                        },
                        "saturation": {
                            "type": "number",
                            "markdownDescription": "Saturation value of the food item. Not mandatory."
                        },
                        "can_always_eat": {
                            "type": "boolean",
                            "markdownDescription": "If the player can eat the food item even if they are not hungry. Not mandatory."
                        },
                        "consume_seconds": {
                            "type": "integer",
                            "markdownDescription": "How many seconds it takes to consume the food item."
                        },
                        "sound": {
                            "type": "string",
                            "markdownDescription": "Sound of the food item when eaten. Available on `1.21.2+` clients only!",
                            "$ref": "#/$defs/vanilla_and_custom_sound"
                        },
                        "particles": {
                            "type": "boolean",
                            "markdownDescription": "If the particles of the food item should be shown. Available on `1.21.2+` clients only!"
                        },
                        "animation": {
                            "type": "string",
                            "markdownDescription": "Animation of the food item when eaten. Available on `1.21.2+` clients only!",
                            "enum": ["none", "eat", "drink", "block", "bow", "spear", "crossbow", "spyglass", "toot_horn", "brush"]
                        },
                        "effects": {
                            "type": "object",
                            "markdownDescription": "Effects of the consumable item when consumed",
                            "patternProperties": {
                                "apply_status_effects.*": { "$ref": "#/$defs/consumable_effect_apply_status_effects" },
                                "remove_status_effects.*": { "$ref": "#/$defs/consumable_effect_remove_status_effects" },
                                "play_sound.*": { "$ref": "#/$defs/consumable_effect_play_sound" },
                                "clear_all_status_effects.*": { "$ref": "#/$defs/consumable_effect_clear_all_status_effects" },
                                "teleport_randomly.*": { "$ref": "#/$defs/consumable_effect_teleport_randomly" }
                            },
                            "properties": {
                                "apply_status_effects": { "$ref": "#/$defs/consumable_effect_apply_status_effects" },
                                "remove_status_effects": { "$ref": "#/$defs/consumable_effect_remove_status_effects" },
                                "play_sound": { "$ref": "#/$defs/consumable_effect_play_sound" },
                                "clear_all_status_effects": { "$ref": "#/$defs/consumable_effect_clear_all_status_effects" },
                                "teleport_randomly": { "$ref": "#/$defs/consumable_effect_teleport_randomly" },
                            }
                        }
                    }
                },
                "food": {
                    "type": "object",
                    "markdownDescription": "OLD NAME, use `consumable` instead!",
                    "doNotSuggest": true,
                    "deprecated": true
                },
                "equipment": {
                    "type": "object",
                    "markdownDescription": "## Available on `1.21.2+` clients/servers only!\nIf present, this item can be equipped by players in the selected slot.",
                    "properties": {
                        "id": {
                            "type": "string",
                            "markdownDescription": "Equipment ID. Must be a valid ID of an equipment created under the `equipments` section."
                        },
                        "legacy_armor_rendering_id": {
                            "type": "string",
                            "markdownDescription": "Legacy armor rendering ID. Must be a valid ID of a legacy armor rendering created under the `legacy_armor_renderings` section."
                        },
                        "slot": {
                            "type": "string",
                            "markdownDescription": "Slot in which this item can be equipped. This is automatically set if the item is a vanilla armor piece.\nExample: `material: IRON_HELMET` will automatically set `slot: HEAD`.",
                            "enum": [
                                "HEAD",
                                "CHEST",
                                "LEGS",
                                "FEET"
                            ],
                        },
                        "camera_overlay_id": {
                            "type": "string",
                            "markdownDescription": "(optional): namespaced ID of the overlay texture to use when equipped. Example: `minecraft:misc/pumpkinblur` (which addresses `assets/minecraft/textures/misc/pumpkinblur.png`)."
                        },
                        "sound": {
                            "type": "string",
                            "markdownDescription": "(optional): sound to play when equipped. Example: `minecraft:item.armor.equip_iron`.",
                            "$ref": "#/$defs/vanilla_and_custom_sound"
                        },
                        "dispensable": {
                            "type": "boolean",
                            "markdownDescription": "(default: `true`), whether the item can be equipped by using a Dispenser."
                        },
                        "swappable": {
                            "type": "boolean",
                            "markdownDescription": "boolean (default: `true`), whether the item can be equipped into the relevant slot by right-clicking."
                        },
                        "allowed_entities": {
                            "type": "array",
                            "markdownDescription": "(optional): Entity ID, Entity Tag, or list of Entity IDs to limit which entities can equip this item\nIf not specified, any entity (that can wear this kind of equipment) is allowed to equip this item",
                            "items": {
                                "markdownDescription": "**Accepts only vanilla mobs**",
                                "$ref": "#/$defs/bukkit_entity_type"
                            }
                        },
                        "damage_on_hurt": {
                            "type": "boolean",
                            "markdownDescription": "(default: `true`), whether this item will be damaged when the wearing entity is damaged."
                        },
                        "slot_attribute_modifiers": {
                            "markdownDescription": "(optional) Attribute modifiers to be applied when equipped on the previously specified `slot`.",
                            "$ref": "#/$defs/attribute_modifiers"
                        },
                        "glider": {
                            "type": "boolean",
                            "markdownDescription": "(default: `false`), whether this item can be used to glide (without the ELytra)."
                        }
                    }
                },
                "tooltip_style": {
                    "type": "string",
                    "markdownDescription": "## Available on `1.21.2+` clients/servers only!\nNamespaced ID for a tooltip style. If present, this item can use custom sprites for its tooltip background and frame.\n`<namespace>:tooltip/<path>_background` and `<namespace>:tooltip/<path>_frame`.\n## Example:\n`my_items:tooltip/red` requires `my_items/textures/tooltip/red_frame.png` and `my_items/textures/tooltip/red_background.png`."
                },
                "fire_resistant": {
                    "type": "boolean",
                    "markdownDescription": "If the item is fire resistant, like nethgerite items."
                },
                "hide_tooltip": {
                    "type": "boolean",
                    "markdownDescription": "If the item tooltip should be hidden."
                },
                "glint": {
                    "type": "boolean",
                    "markdownDescription": "Overrides the enchantment glint effect on an item.\nIf `true`, an item without an enchantment glint will display a glint.\nIf `false`, an item with a glint will not display this glint (either from enchantments or intrinsic properties of the item)."
                },
                "enchantment_glint_override": {
                    "type": "boolean",
                    "doNotSuggest": true,
                    "deprecated": true,
                    "markdownDescription": "(**OLD NAME**, use `glint` instead). Overrides the enchantment glint effect on an item.\nIf `true`, an item without an enchantment glint will display a glint.\nIf `false`, an item with a glint will not display this glint (either from enchantments or intrinsic properties of the item)."
                },
                "enchants": {
                    "markdownDescription": "Set default enchants to this item.\nhttps://hub.spigotmc.org/javadocs/spigot/org/bukkit/enchantments/Enchantment.html\n\nYou can set also the enchant level, for example: \n- DIG_SPEED:5\n\nYou can also set other plugins enchants (if they provide your the ID), for example:- my_custom_plugin:custom_enchant:6\n- blast_mining:1\n",
                    "type": "array",
                    "items": {
                        "anyOf": [{"$ref": "#/$defs/vanilla_enchants"}, {"type": "string"}]
                    }
                },
                "blocked_enchants": {
                    "markdownDescription": "Special item property that disables enchants for this item, so your users won't be able to enchant it.\nhttps://hub.spigotmc.org/javadocs/spigot/org/bukkit/enchantments/Enchantment.html",
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {"$ref": "#/$defs/vanilla_enchants"},
                            {"type": "string", "enum": ["ALL"], "default": "ALL"}
                        ]
                    }
                },
                "specific_properties": {
                    "type": "object",
                    "$ref": "#/$defs/specific_properties"
                },
                "nbt": {
                    "markdownDescription": "(**OLD NAME**, use `components_nbt_file` instead).\nCustom NBT properties for this custom item. Read here for more information: https://itemsadder.devs.beer/plugin-usage/adding-content/advanced/custom-nbt",
                    "type": "string",
                    "doNotSuggest": true,
                    "deprecated": true
                },
                "components_nbt_file": {
                    "markdownDescription": "Path for the custom NBT properties file for this custom item.\nExample: `my_item_nbt.json`.\nRead here for more information: https://itemsadder.devs.beer/plugin-usage/adding-content/advanced/custom-nbt",
                    "type": "string"
                },
                "drop": {
                    "markdownDescription": "Customize some aspects of how the dropped item appears.",
                    "properties": {
                        "show_name": {
                            "markdownDescription": "You can make a drop show its name.\nVery useful for rare items.",
                            "type": "boolean"
                        },
                        "glow": {
                            "markdownDescription": "You can make an item glowing when dropped on the ground.\nVery useful for rare items.",
                            "required": ["enabled"],
                            "properties": {
                                "enabled": {"type": "boolean", "default": true},
                                "color": {
                                    "type": "string",
                                    "default": "AQUA",
                                    "enum": [
                                        "BLACK",
                                        "DARK_BLUE",
                                        "DARK_GREEN",
                                        "DARK_AQUA",
                                        "DARK_RED",
                                        "DARK_PURPLE",
                                        "GOLD",
                                        "GRAY",
                                        "DARK_GRAY",
                                        "BLUE",
                                        "GREEN",
                                        "AQUA",
                                        "RED",
                                        "PURPLE",
                                        "YELLOW",
                                        "WHITE",
                                        "NONE"
                                    ]
                                }
                            }
                        }
                    }
                },
                "behaviours": {"type": "object", "$ref": "#/$defs/behaviours"},
                "events_cooldown": {
                    "type": "integer",
                    "markdownDescription": "(**OLD NAME** OF THE property `events_settings.cooldown.ticks`.\n\nUse it instead.)",
                    "doNotSuggest": true,
                    "deprecated": true
                },
                "events_settings": {
                    "type": "object",
                    "markdownDescription": "Special settings for events.",
                    "properties": {
                        "cooldown": {
                            "type": "object",
                            "markdownDescription": "Cooldown settings for this item.",
                            "properties": {
                                "ticks": {
                                    "type": "integer",
                                    "markdownDescription": "Cooldown in ticks before user can activate events of this item",
                                    "defaultSnippets": [
                                        {"body": "20", "label": "20 (1 second)"},
                                        {"body": "40", "label": "40 (2 seconds)"},
                                        {"body": "60", "label": "60 (3 seconds)"},
                                        {"body": "100", "label": "100 (5 seconds)"},
                                        {"body": "200", "label": "200 (10 seconds)"},
                                        {"body": "400", "label": "400 (20 seconds)"},
                                        {"body": "1200", "label": "1200 (1 minute)"},
                                        {"body": "6000", "label": "6000 (5 minutes)"},
                                        {"body": "12000", "label": "12000 (10 minutes)"},
                                        {"body": "24000", "label": "24000 (20 minutes)"},
                                        {"body": "36000", "label": "36000 (30 minutes)"},
                                        {"body": "72000", "label": "72000 (1 hour)"},
                                        {"body": "2147483647", "label": "2147483647 (forever)"}
                                    ]
                                },
                                "indicator": {
                                    "type": "string",
                                    "markdownDescription": "Type of cooldown indicator, for now there is only HIDDEN and TITLE",
                                    "enum": [
                                        "HIDDEN",
                                        "VANILLA",
                                        "TITLE",
                                        "BOSSBAR",
                                        "HUD"
                                    ]
                                }
                            },
                            "if": {
                                "properties": {"indicator": {"const" : "BOSSBAR"}}
                            },
                            "then": {
                                "properties": {
                                    "bossbar": {
                                        "type": "object",
                                        "markdownDescription": "Properties for the bossbar indicator.",
                                        "properties": {
                                            "color": {
                                                "type": "string",
                                                "enum": [
                                                    "PINK",
                                                    "BLUE",
                                                    "RED",
                                                    "GREEN",
                                                    "YELLOW",
                                                    "PURPLE",
                                                    "WHITE"
                                                ]
                                            },
                                            "style": {
                                                "type": "string",
                                                "enum": [
                                                    "SOLID",
                                                    "SEGMENTED_6",
                                                    "SEGMENTED_10",
                                                    "SEGMENTED_12",
                                                    "SEGMENTED_20"
                                                ]
                                            }   
                                        }
                                    }
                                }
                            },
                            "else" : {
                                "if": {
                                    "properties": {"indicator": {"const" : "HUD"}}
                                },
                                "then": {
                                    "properties": {
                                        "custom_hud": {
                                            "type": "string",
                                            "markdownDescription": "Namespaced ID if the custom hud used for this cooldown. Default value `_iainternal:small_cooldown_bar`.",
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "all_actions_permission": {
                    "type": "string",
                    "markdownDescription": "Permission needed to execute any of the actions of each event.\nIf you want to set a different permission to eachaction you can add the 'permission' attribute on each action instead."
                },
                "events": {"type": "object", "$ref": "#/$defs/events"},
                "permission": {
                    "type": "string",
                    "markdownDescription": "**OLD NAME** OF THE property `permission_suffix`.\n\nUse `permission_suffix` instead.",
                    "doNotSuggest": true,
                    "deprecated": true
                }
            }
        },
        "ia_categories": {
            "$id": "ia_categories",
            "title": "/ia category",
            "type": "object",
            "required": ["items"],
            "properties": {
                "enabled": {
                    "markdownDescription": "Enable the category",
                    "type": "boolean",
                    "default": true,
                    "kind": 0
                },
                "name": {
                    "markdownDescription": "Display name of the category.\nYou can set a **text** or an identifier from a **dictionary** file.\n\nGet more info about dictionaries here: https://itemsadder.devs.beer/plugin-usage/adding-content/translation",
                    "type": "string",
                    "default": "display-name-"
                },
                "title": {
                    "markdownDescription": "Display name of the category, inside the category view itself. Value of 'name' attribute will be used if not specified.",
                    "type": "string"
                },
                "permission": {
                    "markdownDescription": "Permission of the category",
                    "type": "string"
                },
                "skip_if_already": {
                    "type": "boolean",
                    "markdownDescription": "Skip this category if ItemsAdder already registered one with the same name from another .yml file"
                },
                "icon": {
                    "markdownDescription": "Icon of this category. Can be a custom item or a vanilla material",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                },
                "font_image": {
                    "type": "object",
                    "markdownDescription": "Font image to be used as background of the category. Usually used for custom categories.",
                    "properties": {
                        "name": {
                            "type": "string",
                            "markdownDescription": "Namespaced ID of the font_image to be used as background. (example: 'mcguis:blank_menu')"
                        },
                        "x_position_pixels": {
                            "type": "integer",
                            "markdownDescription": "Shift the font_image of some pixels on the X axis. Usually set to -16"
                        }
                    }
                },
                "title_position_pixels": {
                    "type": "integer",
                    "markdownDescription": "Shift the title text of some pixels on the X axis. Usually set to 0"
                },
                "show_all_items": {
                    "type": "boolean",
                    "markdownDescription": "Show all items in this category (you can exclude some items using the hide_items attribute)"
                },
                "items": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_materials_and_customitems"}
                },
                "hide_items": {
                    "type": "array",
                    "markdownDescription": "List of items to be hidden from this category (useful if you're using show_all_items property)",
                    "items": {"$ref": "#/$defs/bukkit_materials_and_customitems"}
                }
            }
        },
        "liquid": {
            "$id": "liquid",
            "title": "Custom liquid",
            "type": "object",
            "properties": {"color": {"$ref": "#/$defs/colors"}}
        },
        "minecraft_lang_overwrite": {
            "$id": "minecraft_lang_overwrite",
            "type": "object",
            "markdownDescription": "Easily customize entries in the Minecraft languages files.",
            "properties": {
                "enabled": {
                    "type": "boolean"
                },
                "languages": {
                    "type": "array",
                    "markdownDescription": "All the languages where you want to change these text in.\n\nYou should set it to only the languages of your playerbase to avoid useless resourcepack size increase. Set to `ALL` to support every user possible language.",
                    "items": {
                        "anyOf": [
                            {"type": "string", "enum": ["ALL"], "default": "ALL", "markdownDescription": "Set to `ALL` to support every user possible language. No need to add other languages in this list."},
                            {
                                "type": "string",
                                "enum": [
                                    "af_za",
                                    "ar_sa",
                                    "ast_es",
                                    "az_az",
                                    "bar",
                                    "be_by",
                                    "bg_bg",
                                    "brb",
                                    "br_fr",
                                    "bs_ba",
                                    "ca_es",
                                    "cs_cz",
                                    "cy_gb",
                                    "da_dk",
                                    "de_at",
                                    "de_ch",
                                    "de_de",
                                    "el_gr",
                                    "enp",
                                    "enws",
                                    "en_au",
                                    "en_ca",
                                    "en_gb",
                                    "en_nz",
                                    "en_pt",
                                    "en_us",
                                    "eo_uy",
                                    "es_ar",
                                    "es_cl",
                                    "es_es",
                                    "es_mx",
                                    "es_uy",
                                    "es_ve",
                                    "et_ee",
                                    "eu_es",
                                    "fa_ir",
                                    "fil_ph",
                                    "fi_fi",
                                    "fo_fo",
                                    "fra_de",
                                    "fr_ca",
                                    "fr_fr",
                                    "fy_nl",
                                    "ga_ie",
                                    "gd_gb",
                                    "gl_es",
                                    "gv_im",
                                    "haw_us",
                                    "he_il",
                                    "hi_in",
                                    "hr_hr",
                                    "hu_hu",
                                    "hy_am",
                                    "id_id",
                                    "ig_ng",
                                    "io_en",
                                    "is_is",
                                    "it_it",
                                    "ja_jp",
                                    "jbo_en",
                                    "kab_kab",
                                    "ka_ge",
                                    "kk_kz",
                                    "kn_in",
                                    "ko_kr",
                                    "ksh",
                                    "kw_gb",
                                    "la_la",
                                    "lb_lu",
                                    "li_li",
                                    "lol_us",
                                    "lt_lt",
                                    "lv_lv",
                                    "mi_nz",
                                    "mk_mk",
                                    "mn_mn",
                                    "moh_ca",
                                    "ms_my",
                                    "mt_mt",
                                    "nds_de",
                                    "nl_be",
                                    "nl_nl",
                                    "nn_no",
                                    "no_no",
                                    "nuk",
                                    "oc_fr",
                                    "oj_ca",
                                    "ovd",
                                    "pl_pl",
                                    "pt_br",
                                    "pt_pt",
                                    "qya_aa",
                                    "ro_ro",
                                    "ru_ru",
                                    "se_no",
                                    "sk_sk",
                                    "sl_si",
                                    "so_so",
                                    "sq_al",
                                    "sr_sp",
                                    "sv_se",
                                    "swg",
                                    "sxu",
                                    "szl",
                                    "ta_in",
                                    "th_th",
                                    "tlh_aa",
                                    "tr_tr",
                                    "tt_ru",
                                    "tzl_tzl",
                                    "uk_ua",
                                    "val_es",
                                    "vec_it",
                                    "vi_vn",
                                    "yo_ng",
                                    "zh_cn",
                                    "zh_tw"
                                ]
                            }
                        ]
                    }
                },
                "entries": {
                    "type": "object",
                    "kind": 5,
                    "markdownDescription": "List of language attributes to replace with their replacement value.",
                    "additionalProperties": {
                        "type": "string",
                        "markdownDescription": "Language attribute to replace, example: menu.shareToLan",
                        "default": "menu.shareToLan"
                    },
                    "properties": {
                        "menu.shareToLan": {
                            "type": "string",
                            "markdownDescription": "Example language attribute to replace",
                            "default": "Open to LAN"
                        }
                    }
                }
            }
        },
        "loots_result": {
            "$id": "loots_result",
            "type": "object",
            "required": ["item", "min_amount", "max_amount", "chance"],
            "properties": {
                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                "min_amount": {"type": "integer", "default": 1},
                "max_amount": {"type": "integer", "default": 1},
                "chance": {"type": "number", "default": 99.9},
                "ignore_fortune": {"type": "boolean", "default": false}
            }
        },
        "result": {
            "$id": "result",
            "type": "object",
            "required": ["item", "min_amount", "max_amount", "chance"],
            "properties": {
                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                "min_amount": {"type": "integer", "default": 1},
                "max_amount": {"type": "integer", "default": 1},
                "chance": {"type": "number", "default": 99.9}
            }
        },
        "exp_result": {
            "$id": "exp_result",
            "type": "object",
            "required": ["min_amount", "max_amount", "chance"],
            "properties": {
                "min_amount": {"type": "integer", "default": 1},
                "max_amount": {"type": "integer", "default": 1},
                "chance": {"type": "number", "default": 99.9}
            }
        },
        "recipe.craft": {
            "$id": "recipe.craft",
            "type": "object",
            "markdownDescription": "Crafting table recipe",
            "required": ["ingredients", "result"],
            "properties": {
                "enabled": {"type": "boolean", "default": true},
                "permission_suffix": {"type": "string"},
                "shapeless": {
                    "markdownDescription": "Allow the player to place the ingredients anywhere in the crafting table.",
                    "type": "boolean"
                },
                "ingredients": {"$ref": "#/$defs/ingredients"},
                "result": {
                    "required": ["item"],
                    "properties": {
                        "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                        "amount": {"type": "integer", "default": 1}
                    }
                },
                "return_items": {
                    "markdownDescription": "Items to be replaced in the grid after crafting.",
                    "properties": {
                        "decrement_durability": {
                            "markdownDescription": "Decrement the durability of a particular item in the grid after crafting.",
                            "additionalProperties": {
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "$ref": "#/$defs/bukkit_materials_and_customitems"
                                    },
                                    "amount": {"type": "integer", "default": 1}
                                }
                            }
                        },
                        "increment_durability": {
                            "markdownDescription": "Increment the durability of a particular item in the grid after crafting.",
                            "additionalProperties": {
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "$ref": "#/$defs/bukkit_materials_and_customitems"
                                    },
                                    "amount": {"type": "integer", "default": 1}
                                }
                            }
                        },
                        "replace": {
                            "markdownDescription": `Replace a particular item in the grid with another item after crafting..\n## Examples:
                            \`\`\`
                            return_items:
                              replace:
                                my_item: another_item
                                
                            return_items:
                              replace:
                                LAVE_BUCKET: BUCKET
                            \`\`\`
                            `,
                            "properties": {
                                
                            },
                            "additionalProperties": {
                                "type": "string",
                                "$ref": "#/$defs/bukkit_materials_and_customitems"
                            }
                        },
                        "play_sound": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"},
                                "category": {"$ref": "#/$defs/bukkit_sound_category"},
                                "stop_previous": {"type": "boolean"},
                            }
                        }
                    }
                }
            },
            "if": {
                "properties" : { "shapeless" : {"const" : false} }
            },
            "then": {
                "required": ["pattern"],
                "properties" : { 
                    "pattern": {
                        "type": "array",
                        "markdownDescription": "Example:\n\npattern:\n  - XXX\n  - XOX\n  - XXX\n\nThis will make a recipe that requires 1 item in the center.\n\nYou can create multiple patterns per recipe, just make sure that the attribute starts with 'pattern' text. For example pattern_2.",
                        "items": {"type": "string", "examples": ["XXX"]}
                    },
                    "pattern_1": {
                        "type": "array",
                        "markdownDescription": "Example:\n\npattern:\n  - XXX\n  - XOX\n  - XXX\n\nThis will make a recipe that requires 1 item in the center.",
                        "items": {"type": "string", "examples": ["XXX"]}
                    },
                    "pattern_2": {
                        "type": "array",
                        "markdownDescription": "Example:\n\npattern:\n  - XXX\n  - XOX\n  - XXX\n\nThis will make a recipe that requires 1 item in the center.",
                        "items": {"type": "string", "examples": ["XXX"]}
                    },
                    "pattern_X": {
                        "type": "array",
                        "markdownDescription": "Example:\n\npattern:\n  - XXX\n  - XOX\n  - XXX\n\nThis will make a recipe that requires 1 item in the center.",
                        "items": {"type": "string", "examples": ["XXX"]}
                    }
                }
            }
        },
        "craft_recipe_ingredient": {
            "type": ["string", "object"],
            "$ref": "#/$defs/bukkit_materials_and_customitems",
            "markdownDescription": "You can specify a vanilla material, custom item or potion.\n\n**Examples:**\n\n A: STONE\n\nB:\n\n  type: POTION\n\n  potion_type: fire_resistance",
            "properties": {
                "item": {
                    "markdownDescription": "You can specify a vanilla material, custom item or potion.\n\n**Examples:**\n\n A: STONE\n\nB:\n\n  type: POTION\n\n  potion_type: fire_resistance",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                },
            },
            "if": {
                "properties": {"item": {"const" : "POTION"}}
            },
            "then": {
                "required": ["potion_type"],
                "properties": {
                    "potion_type": {
                        "$ref": "#/$defs/vanilla_potion_type"
                    }
                }
            },
            "else": {
                "if": {
                    "properties": {"item": {"const" : "SPLASH_POTION"}},
                },
                "then": {
                    "required": ["potion_type"],
                    "properties": {
                        "potion_type": {
                            "$ref": "#/$defs/vanilla_potion_type"
                        }
                    }
                }
            }
        },
        "ingredients": {
            "$id": "ingredients",
            "type": "object",
            "markdownDescription": "Here you can specify what a pattern character means.\n\nFor example you can set **M: STONE**, which would tell ItemsAdder that the **M** in pattern is a **STONE** item\n\nYou can specify a vanilla material, custom item or potion.\n\n**Examples:**\n\n A: STONE\n\nB:\n\n  type: POTION\n\n  potion_type: fire_resistance",
            "properties": {
                "A": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "B": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "C": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "D": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "E": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "F": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "G": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "H": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "I": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "J": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "K": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "L": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "M": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "N": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "O": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "P": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "Q": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "R": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "S": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "T": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "U": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "V": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "W": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "Y": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "Z": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "a": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "b": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "c": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "d": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "e": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "f": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "g": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "h": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "i": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "j": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "k": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "l": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "m": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "n": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "o": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "p": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "q": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "r": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "s": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "t": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "u": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "v": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "w": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "y": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                },
                "z": {
                    "$ref": "#/$defs/craft_recipe_ingredient"
                }
            }
        },
        "recipe.cooking": {
            "$id": "recipe.cooking",
            "type": "object",
            "required": ["machines", "ingredient", "result"],
            "properties": {
                "enabled": {"type": "boolean", "default": true},
                "permission_suffix": {"type": "string"},
                "machines": {
                    "type": "array",
                    "markdownDescription": "List of the machines that will have this recipe available",
                    "items": {
                        "type": "string",
                        "enum": ["FURNACE", "BLAST_FURNACE", "SMOKER"]
                    }
                },
                "ingredient": {
                    "type": "object",
                    "required": ["item"],
                    "properties": {
                        "item": {
                            "type": "string",
                            "$ref": "#/$defs/bukkit_materials_and_customitems"
                        }
                    }
                },
                "exp": {"type": "number"},
                "cook_time": {"type": "integer"},
                "result": {
                    "required": ["item"],
                    "properties": {
                        "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                        "amount": {"type": "integer", "default": 1},
                    }
                }
            }
        },
        "recipe.anvil_repair": {
            "$id": "recipe.anvil_repair",
            "type": "object",
            "required": ["ingredient", "item"],
            "properties": {
                "enabled": {"type": "boolean", "default": true},
                "permission_suffix": {"type": "string"},
                "ingredient": {
                    "type": "string",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                },
                "item": {
                    "type": "string",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                }
            }
        },
        "recipe.smithing": {
            "$id": "recipe.smithing",
            "type": "object",
            "required": ["base", "addition", "result"],
            "properties": {
                "enabled": {"type": "boolean", "default": true},
                "permission_suffix": {"type": "string"},
                "base": {
                    "type": "string",
                    "markdownDescription" : "The base item (can be a custom item or vanilla material) on the first slot.",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                },
                "addition": {
                    "type": "string",
                    "markdownDescription" : "The mineral item (can be a custom item or vanilla material) on the second slot.",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                },
                "result": {
                    "type": "object",
                    "markdownDescription" : "The resulting item (can be a custom item or vanilla material) which will be merged into the first slot item.",
                    "required": ["item"],
                    "properties": {
                        "item": {
                            "markdownDescription" : "The resulting item (can be a custom item or vanilla material) which will be merged into the first slot item.",
                            "$ref": "#/$defs/bukkit_materials_and_customitems"
                        },
                        "amount": {"type": "integer", "default": 1},
                        "move_attributes": {
                            "type": "object",
                            "markdownDescription" : "The attributes to be moved from the first item to the result item.",
                            "properties": {
                                "name": {"type": "boolean", "markdownDescription" : "Default: `true`"},
                                "lore": {"type": "boolean", "markdownDescription" : "Default: `true`"},
                                "enchants": {"type": "boolean", "markdownDescription" : "Default: `true`"},
                                "durability": {"type": "boolean", "markdownDescription" : "Default: `false`"},
                                "custom_model_data": {
                                    "markdownDescription" : "Expert users: Move the `custom_model_data` from the `base` to the `result`. Use this property only if you know what you are doing. Default: `false`",
                                    "type": "boolean"
                                },
                                "material": {
                                    "markdownDescription" : "Expert users: Move the material from the `base` to the `result`. Use this property only if you know what you are doing. Default: `false`",
                                    "type": "boolean"
                                },
                                "other_nbt": {
                                    "markdownDescription" : "Expert users: Move custom NBT data (`minecraft:custom_data`) from the `base` to the `result`. Use this property only if you know what you are doing. Default: `false`",
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            }
        },
        "loot.block": {
            "$id": "loot.block",
            "type": "object",
            "requires": ["type", "items"],
            "properties": {
                "enabled": {"type": "boolean"},
                "type": {
                    "markdownDescription": "**Accepts only blocks, don't set items as type!**",
                    "$ref": "#/$defs/vanilla_and_custom_blocks"
                },
                "nbt": {"$ref": "#/$defs/nbt"},
                "drop_only_first": {
                    "type": "boolean",
                    "markdownDescription": "This allows you to stop the plugin from dropping each of the items that succeed into extracting a correct chance to be dropped. \nWARNING: this would make your items harder to be dropped."
                },
                "items": {
                    "markdownDescription": "List of the possible result drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loots_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/loots_result"}
                    }
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "worlds": {
                    "type": "array",
                    "markdownDescription": "https://itemsadder.devs.beer/plugin-usage/adding-content/loots#per-world-loots\n\nLoots will drop in all worlds if you don't specify any world.\nThe special * character allows any world starting with a particular text.\nIn this example every world starting with world_ will match and will drop loots.\n\nThe special ! character denies the loot to be dropped in any world starting with a particular text.\nIn this example every world starting with private_ will match and won't allow dropping loots.\n\nYou can also specify precise world names, in this example example2 won't allow loots to be dropped.\nYou can also specify precise world names, in this example example1 will allow loots to be dropped.",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": ["world", "world_nether", "world_the_end", "!world_*", "world_*"],
                                "default": "world"
                            }
                        ]
                    }
                },
                "exp": {
                    "markdownDescription": "List of the possible result EXP drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/exp_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/exp_result"}
                    }
                }
            }
        },
        "loot.mobs": {
            "$id": "loot.mobs",
            "type": "object",
            "requires": ["type", "items"],
            "properties": {
                "enabled": {"type": "boolean"},
                "type": {
                    "markdownDescription": "**Accepts only vanilla mobs**",
                    "$ref": "#/$defs/bukkit_entity_type"
                },
                "drop_only_first": {
                    "type": "boolean",
                    "markdownDescription": "This allows you to stop the plugin from dropping each of the items that succeed into extracting a correct chance to be dropped. \nWARNING: this would make your items harder to be dropped."
                },
                "items": {
                    "markdownDescription": "List of the possible result drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loots_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/loots_result"}
                    }
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "exp": {
                    "markdownDescription": "List of the possible result EXP drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/exp_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/exp_result"}
                    }
                },
                "nbt": {"$ref": "#/$defs/nbt"},
                "metadata": {
                    "type": "object",
                    "markdownDescription": "Special property to specify which metadata (Bukkit) data must match",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/metadata_matcher"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/metadata_matcher"},
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/metadata_matcher"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/metadata_matcher"
                        }
                    }
                }
            }
        },
        "metadata_matcher": {
            "$id": "metadata_matcher",
            "type": "object",
            "required": ["name", "value", "type"],
            "properties": {
                "name": {"type": "string", "default": "ItemsAdderMob"},
                "value": {"type": "string", "default": "iamobs:red_ender_dragon"},
                "type": {
                    "type": "string",
                    "enum": ["string", "int", "float", "double", "byte", "short"]
                }
            }
        },
        "loot.fishing": {
            "$id": "loot.fishing",
            "type": "object",
            "requires": ["items"],
            "properties": {
                "enabled": {"type": "boolean"},
                "drop_only_first": {
                    "type": "boolean",
                    "markdownDescription": "This allows you to stop the plugin from dropping each of the items that succeed into extracting a correct chance to be dropped. \nWARNING: this would make your items harder to be dropped."
                },
                "items": {
                    "markdownDescription": "List of the possible result drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/loots_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/loots_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/loots_result"}
                    }
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "exp": {
                    "markdownDescription": "List of the possible result EXP drops and their chances",
                    "type": "object",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/exp_result"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/exp_result"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/exp_result"}
                    }
                }
            }
        },
        "block_populator": {
            "$id": "block_populator",
            "type": "object",
            "required": [
                "block",
                "worlds",
                "chunk_chance",
                "max_height",
                "min_height",
                "vein_blocks",
                "chunk_veins"
            ],
            "properties": {
                "block": {
                    "type": "string",
                    "markdownDescription": "Custom ItemsAdder block.\n**Do not use Vanilla blocks, they are not supported**"
                },
                "worlds": {
                    "type": "array",
                    "markdownDescription": "Worlds list in which you want to spawn ores",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": ["world", "world_nether", "world_the_end"],
                                "default": "world"
                            }
                        ]
                    }
                },
                "replaceable_blocks": {
                    "markdownDescription": "Blocks that can be replaced when the ore vein is spawned",
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "chunk_chance": {"type": "number", "default": 70.9},
                "max_height": {"type": "integer", "default": 45},
                "min_height": {"type": "integer", "default": 25},
                "vein_blocks": {"type": "integer", "default": 6},
                "chunk_veins": {"type": "integer", "default": 1}
            }
        },
        "surface_decorators": {
            "$id": "surface_decorators",
            "type": "object",
            "required": [
                "block",
                "worlds",
                "chance",
                "max_height",
                "min_height",
                "amount"
            ],
            "properties": {
                "block": {
                    "type": "string",
                    "markdownDescription": "Custom ItemsAdder block.\n**Do not use Vanilla blocks, they are not supported**"
                },
                "worlds": {
                    "type": "array",
                    "markdownDescription": "Worlds list in which you want to spawn blocks",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": ["world", "world_nether", "world_the_end"],
                                "default": "world"
                            }
                        ]
                    }
                },
                "bottom_blocks": {
                    "markdownDescription": "The custom block will be spawned only if one of these material is available on the surface of the chunk.",
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "chance": {"type": "number", "default": 70.9},
                "max_height": {"type": "integer", "default": 45},
                "min_height": {"type": "integer", "default": 25},
                "amount": {"type": "integer", "default": 6}
            }
        },
        "cave_decorators": {
            "$id": "cave_decorators",
            "type": "object",
            "required": [
                "block",
                "worlds",
                "chance",
                "max_height",
                "min_height",
                "amount"
            ],
            "properties": {
                "block": {
                    "type": "string",
                    "markdownDescription": "Custom ItemsAdder block.\n**Do not use Vanilla blocks, they are not supported**"
                },
                "worlds": {
                    "type": "array",
                    "markdownDescription": "Worlds list in which you want to spawn blocks",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": ["world", "world_nether", "world_the_end"],
                                "default": "world"
                            }
                        ]
                    }
                },
                "bottom_blocks": {
                    "markdownDescription": "The custom block will be spawned only if one of these material is available in the caves.",
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "chance": {"type": "number", "default": 70.9},
                "max_height": {"type": "integer", "default": 45},
                "min_height": {"type": "integer", "default": 25},
                "amount": {"type": "integer", "default": 6},
                "position": {"type": "string", "enum": ["SURFACE", "CEILING"]}
            }
        },
        "trees_populators": {
            "$id": "trees_populators",
            "type": "object",
            "required": [
                "worlds",
                "chance",
                "max_height",
                "min_height",
                "amount",
                "iterations",
                "log",
                "leaves"
            ],
            "properties": {
                "log": {
                    "type": "string",
                    "markdownDescription": "Custom ItemsAdder block.\n**Do not use Vanilla blocks, they are not supported**"
                },
                "leaves": {
                    "type": "string",
                    "markdownDescription": "Custom ItemsAdder block.\n**Do not use Vanilla blocks, they are not supported**"
                },
                "tree_type": {
                    "type": "string",
                    "enum": [
                        "TREE",
                        "BIG_TREE",
                        "REDWOOD",
                        "TALL_REDWOOD",
                        "BIRCH",
                        "JUNGLE",
                        "SMALL_JUNGLE",
                        "COCOA_TREE",
                        "JUNGLE_BUSH",
                        "RED_MUSHROOM",
                        "BROWN_MUSHROOM",
                        "SWAMP",
                        "ACACIA",
                        "DARK_OAK",
                        "MEGA_REDWOOD",
                        "TALL_BIRCH",
                        "CHORUS_PLANT",
                        "CRIMSON_FUNGUS",
                        "WARPED_FUNGUS"
                    ],
                    "markdownDescription": "Big trees COULD cause some lag on generation, please use only small tree types."
                },
                "worlds": {
                    "type": "array",
                    "markdownDescription": "Worlds list in which you want to spawn ores",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": ["world", "world_nether", "world_the_end"],
                                "default": "world"
                            }
                        ]
                    }
                },
                "bottom_blocks": {
                    "markdownDescription": "The custom tree will be spawned only if one of these material is available on the surface of the chunk.",
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/bukkit_biome"}
                },
                "chance": {"type": "number", "default": 70.9},
                "max_height": {"type": "integer", "default": 45},
                "min_height": {"type": "integer", "default": 25},
                "amount": {"type": "integer", "default": 6},
                "iterations": {"type": "integer", "default": 1}
            }
        },
        "behaviours": {
            "$id": "behaviours",
            "type": "object",
            "markdownDescription": "Adds special functionality to this item",
            "properties": {
                "hat": {
                    "type": "boolean",
                    "markdownDescription": "Tells ItemsAdder that this item is a hat.\nYou will be able to wear it on your head."
                },
                "keep_on_death": {
                    "type": "boolean",
                    "markdownDescription": "This allows you to let the players keep the item when they die."
                },
                "music_disc": {"$ref": "#/$defs/behaviour.music_disc"},
                "gun": {"$ref": "#/$defs/behaviour.gun"},
                "furniture_sit": {"$ref": "#/$defs/behaviour.furniture_sit"},
                "furniture": {"$ref": "#/$defs/behaviour.furniture"},
                "complex_furniture": {"$ref": "#/$defs/behaviour.complex_furniture"},
                "entity_summoner": {"$ref": "#/$defs/behaviour.entity_summoner"},
                "block_trade_machine": {"$ref": "#/$defs/behaviour.trade_machine"},
                "furniture_trade_machine": {"$ref": "#/$defs/behaviour.trade_machine"},
                "vehicle": {"$ref": "#/$defs/behaviour.vehicle"},
                "mob": {"$ref": "#/$defs/behaviour.mob"},
                "liquid_analyzer": {
                    "type": "boolean",
                    "markdownDescription": "Tells ItemsAdder that this item is a liquid analyzer.\nYou will be able to check which custom liquid you're looking at."
                },
                "liquid_bucket": {"$ref": "#/$defs/behaviour.liquid_bucket"},
                "fuel": {"$ref": "#/$defs/behaviour.fuel"},
                "sapling": {
                    "type": "object",
                    "properties": {
                        "tree_populator": {
                            "type": "string",
                            "markdownDescription": "The tree_populator to spawn on right click."
                        }
                    }
                }
            }
        },
        "behaviour.music_disc": {
            "$id": "behaviour.music_disc",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a music disc.\nYou will be able to put it inside a jukebox and make it play a song.",
            "required": ["song"],
            "properties": {
                "enabled": {"type": "boolean"},
                "song": {
                    "type": "object",
                    "markdownDescription": "Song properties",
                    "properties": {
                        "name": {
                            "type": "string",
                            "markdownDescription": "Specify a song name you defined in the songs.json file.\nPlease refer to the tutorial here: https://itemsadder.devs.beer/plugin-usage/adding-content/sounds"
                        },
                        "markdownDescription": {
                            "type": "string",
                            "markdownDescription": "markdownDescription of the song. This will be shown in Actionbar when you put the disc inside a jukebox"
                        }
                    }
                }
            }
        },
        "behaviour.gun": {
            "$id": "behaviour.gun",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a gun.\nYou will be able to shot and reload it.",
            "required": ["projectile"],
            "properties": {
                "enabled": {"type": "boolean"},
                "projectile": {
                    "markdownDescription": "Which item will be used as projectile for the gun",
                    "$ref": "#/$defs/bukkit_materials_and_customitems"
                }
            }
        },
        "behaviour.furniture_sit": {
            "$id": "behaviour.furniture_sit",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a chair.\nYou will be able to sit on it rightclicking the furniture hitbox.",
            "required": ["sit_height"],
            "properties": {
                "enabled": {"type": "boolean"},
                "sit_height": {
                    "markdownDescription": "Height of the sit position",
                    "type": "number"
                },
                "opposite_direction": {
                    "type": "boolean",
                    "markdownDescription": "Default: true. Enable if you want the player rotate of 180 degrees when they sit on this furniture."
                },
                "sit_all_solid_blocks": {
                    "type": "boolean",
                    "markdownDescription": "Default: true. Enable if you want the player to be able to sit on every BARRIER block of the furniture (for multi-seats chairs).\n\nThis works only on solid furnitures!"
                }
            }
        },
        "behaviour.furniture": {
            "$id": "behaviour.furniture",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a furniture.\nYou will be able to place it on rightclick and remove it attacking the placed entity.\n\nLimitations of furnitures:\n- non solid furnitures can't receive interact events, they can only be removed using mouse left click but cannot be interacted with (only solid furnitures can get interact events).\n- max size of the hitbox is 3x3x3 for performance reasons",
            "properties": {
                "enabled": {"type": "boolean"},
                "entity": {
                    "type": "string",
                    "markdownDescription": "Type of entity to use to create this furniture.",
                    "enum": ["item_display", "armor_stand", "item_frame", "glow_item_frame"]
                },
                "gravity": {
                    "type": "boolean",
                    "markdownDescription": "If the furniture has gravity"
                },
                "small": {
                    "type": "boolean",
                    "markdownDescription": "If the furniture is small or big, be sure to base your 3D model on this setting.\nResize your model using Blockbench accordingly"
                },
                "fixed_rotation": {
                    "type": "boolean",
                    "markdownDescription": "If the furniture has fixed rotation (to place it precisely, for example use it for a wall picture)"
                },
                "light_level": {
                    "type": "integer",
                    "markdownDescription": "Set this to make the furniture emit light.",
                    "minimum": 1,
                    "maximum": 15
                },
                "shift_interact_rotate": {
                    "type": "boolean",
                    "markdownDescription": "Default is `true`. If `true` the custom `item_frame` furniture can be rotated on shift interaction (right-click)."
                },
                "solid": {
                    "type": "boolean",
                    "markdownDescription": "If the furniture is solid. ItemsAdder will add hitbox made of BARRIER blocks to simulate furniture collisions.\nYou can customize hitbox size using 'hitbox' property."
                },
                "hitbox": {
                    "type": "object",
                    "markdownDescription": "This is the hitbox of the furniture. Hitbox is the area that the player can click to remove the furniture.\nIt can be solid if 'solid' property is 'true'",
                    "properties": {
                        "length": {"type": "number"},
                        "width": {"type": "number"},
                        "height": {"type": "number"},
                        "length_offset": {"type": "number"},
                        "width_offset": {"type": "number"},
                        "height_offset": {"type": "number"}
                    }
                },
                "opposite_direction": {
                    "type": "boolean",
                    "markdownDescription": "Makes the model rotate 180 degrees automatically when placed"
                },
                "permission_suffix": {
                    "properties": {
                        "break": {
                            "type": "string",
                            "markdownDescription": "Partial permission used to allow a player to break the furniture.\n\nFor example `example.red_chair` is a suffix permission for `ia.user.furniture.break.example.red_chair`."
                        },
                        "place": {
                            "type": "string",
                            "markdownDescription": "Partial permission used to allow a player to place the furniture.\n\nFor example `example.red_chair` is a suffix permission for `ia.user.furniture.place.example.red_chair`."
                        }
                    }
                },
                "sound": {
                    "properties": {
                        "break": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        },
                        "place": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        }
                    }
                },
                "placeable_on": {
                    "type": "object",
                    "markdownDescription": "You can decide the valid placement locations of the furniture.\n\nTHIS IS VALID ONLY FOR item_frame FURNITURE!",
                    "properties": {
                        "walls": {"type": "boolean"},
                        "ceiling": {"type": "boolean"},
                        "floor": {"type": "boolean"}
                    }
                },
                "cancel_drop": {
                    "type": "boolean",
                    "markdownDescription": "(**OLD NAME**, use the new `drop_when_mined` instead.). This option allows you to avoid furniture from being dropped when broken by players.",
                    "deprecated": true,
                    "doNotSuggest": true
                },
                "drop_when_mined": {
                    "type": "boolean",
                    "markdownDescription": "This option allows you to avoid furniture from being dropped when broken by players."
                },
                "display_transformation": {
                    "type": "object",
                    "markdownDescription": "`item_display` property that allows to resize, move or rotate the model freely.",
                    "properties": {
                        "adjust_legacy_model": {
                            "type": "string",
                            "markdownDescription": "Fixes models created for `item_frame` or `armor_stand` to work correctly with `item_display` without having to adjust all models manually.",
                            "enum": [
                                "armor_stand",
                                "small_armor_stand",
                                "item_frame"
                            ]
                        },
                        "transform": {
                            "type": "string",
                            "enum": [
                                "HEAD",
                                "FIXED",
                                "THIRDPERSON_LEFTHAND",
                                "THIRDPERSON_RIGHTHAND",
                                "FIRSTPERSON_LEFTHAND",
                                "FIRSTPERSON_RIGHTHAND",
                                "GUI",
                                "GROUND"
                            ]
                        },
                        "right_rotation":{"$ref": "#/$defs/item_display.translation.rotation"},
                        "left_rotation": {"$ref": "#/$defs/item_display.translation.rotation"},
                        "translation": {
                            "type": "object",
                            "properties": {
                                "x": {
                                    "type": "number"
                                },
                                "y": {
                                    "type": "number"
                                },
                                "z": {
                                    "type": "number"
                                }
                            }
                        },
                        "scale": {
                            "type": "object",
                            "properties": {
                                "x": {
                                    "type": "number"
                                },
                                "y": {
                                    "type": "number"
                                },
                                "z": {
                                    "type": "number"
                                }
                            }
                        }
                    }
                },
            }
        },
        "behaviour.complex_furniture": {
            "$id": "behaviour.complex_furniture",
            "type": "object",
            "markdownDescription": "Creates a complex furniture using a custom entity. They can be animated and have more rotations steps (not limited to 22.5 degrees).",
            "properties": {
                "enabled": {"type": "boolean"},
                "entity": {
                    "type": "string",
                    "markdownDescription": "Custom entity ID",
                },
                "static": {
                    "type": "boolean",
                    "markdownDescription": "(default `false`) if the model is static, it will not be animated."
                },
                "light_level": {
                    "type": "integer",
                    "markdownDescription": "Set this to make the furniture emit light.",
                    "minimum": 1,
                    "maximum": 15
                },
                "solid": {
                    "type": "boolean",
                    "markdownDescription": "(default `false`) Solid furniture. Uses BARRIER block to simulate collisions."
                },
                "permission_suffix": {
                    "type": "string",
                    "markdownDescription": "Partial permission used to allow a player to place/break the complex furniture.\n\nFor example `example.ceiling_fan` is a suffix permission for `ia.user.complex_furniture.break.example.ceiling_fan`."
                },
                "sound": {
                    "properties": {
                        "break": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        },
                        "place": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        }
                    }
                },
                "drop_when_mined": {
                    "type": "boolean",
                    "markdownDescription": "(default `true`) This option allows you to avoid furniture from being dropped when broken by players."
                },
                "max_per_chunk": {
                    "type": "integer",
                    "markdownDescription": "Maximum number of complex furniture that can be placed in a chunk. Overrides the `config.yml` setting `max_per_chunk`."
                },
                "placement_offset": {
                    "type": "object",
                    "markdownDescription": "Offset the placement of the complex furniture.",
                    "properties": {
                        "ceiling": {
                            "type": "number",
                            "markdownDescription": "Offset the placement of the complex furniture on the ceiling. Can be positive or negative."
                        },
                        "floor": {
                            "type": "number",
                            "markdownDescription": "Offset the placement of the complex furniture on the floor. Can be positive or negative."
                        },
                        "wall": {
                            "type": "number",
                            "markdownDescription": "Offset the placement of the complex furniture on the wall. Can be positive or negative."
                        }
                    }
                }
            }
        },
        "behaviour.entity_summoner": {
            "$id": "behaviour.entity_summoner",
            "type": "object",
            "markdownDescription": "Spawn a specific vanilla entity or custom entity on interaction. Similar to the vanilla spawn egg",
            "properties": {
                "enabled": {"type": "boolean"},
                "entity": {
                    "anyOf": [
                        {"$ref": "#/$defs/bukkit_entity_type"},
                        {"type": "string"}
                    ]
                },
                "max_per_chunk": {
                    "type": "integer",
                    "markdownDescription": "Maximum number of entities that can be spawned in a chunk."
                },
                "decrement_durability": {
                    "type": "boolean",
                    "markdownDescription": "Decrement the item durability when the entity is spawned."
                },
                "decrement_amount": {
                    "type": "integer",
                    "markdownDescription": "(default `1`) amount of durability to decrement when the entity is spawned."
                },
            }
        },
        "item_display.translation.rotation": {
            "$id": "item_display.translation.rotation",
            "type": "object",
            "markdownDescription": "Rotate the model. Use `axis_angle` or `quaternion`, not both.",
            "oneOf": [
                {
                    "properties": {
                        "axis_angle": {
                            "type": "object",
                            "required": ["angle", "axis"],
                            "properties": {
                                "angle": {
                                    "type": "number"
                                },
                                "axis": {
                                    "type": "object",
                                    "properties": {
                                        "x": {
                                            "type": "number"
                                        },
                                        "y": {
                                            "type": "number"
                                        },
                                        "z": {
                                            "type": "number"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "required": ["axis_angle"]
                },
                {
                    "properties": {
                        "quaternion": {
                            "type": "object",
                            "properties": {
                                "x": {
                                    "type": "number"
                                },
                                "y": {
                                    "type": "number"
                                },
                                "z": {
                                    "type": "number"
                                },
                                "w": {
                                    "type": "number"
                                }
                            }
                        }
                    },
                    "required": ["quaternion"]
                }
            ]
        },
        "behaviour.trade_machine": {
            "$id": "behaviour.trade_machine",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a trade machine.\nYou will be able to trade item with this machine like a villager",
            "properties": {
                "enabled": {"type": "boolean"},
                "title": {"type": "string"},
                "gui_texture": {
                    "type": "object",
                    "markdownDescription": "Reskin your trading GUI with a custom texture. Keep in mind that the title will be removed if you reskin this GUI.",
                    "left": {
                        "type": "string",
                        "markdownDescription": "This is the left texture of the trading GUI. Use a font_image name here."
                    },
                    "right": {
                        "type": "string",
                        "markdownDescription": "This is the right texture of the trading GUI. Use a font_image name here."
                    }
                },
                "trades_list": {
                    "type": "object",
                    "markdownDescription": "List of the trades this machine accepts",
                    "kind": 5,
                    "detail": "(collection)",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/trade_item"
                    },
                    "properties": {
                        "change_me": {"type": "object", "$ref": "#/$defs/trade_item"},
                        "change_me_2": {"type": "object", "$ref": "#/$defs/trade_item"},
                        "change_me_xxx": {"type": "object", "$ref": "#/$defs/trade_item"}
                    }
                }
            }
        },
        "trade_item": {
            "$id": "trade_item",
            "type": "object",
            "markdownDescription": "Trade recipe",
            "required": ["ingredients"],
            "properties": {
                "ingredients": {
                    "type": "object",
                    "markdownDescription": "Ingredients needed for this recipe",
                    "required": ["slot1"],
                    "properties": {
                        "slot1": {
                            "type": "object",
                            "required": ["item"],
                            "properties": {
                                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                "amount": {"type": "integer", "minimum": 1, "maximum": 64}
                            }
                        },
                        "slot2": {
                            "type": "object",
                            "required": ["item"],
                            "properties": {
                                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                                "amount": {"type": "integer", "minimum": 1, "maximum": 64}
                            }
                        }
                    }
                },
                "result": {
                    "type": "object",
                    "markdownDescription": "Resulting item for this recipe",
                    "required": ["item"],
                    "properties": {
                        "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                        "amount": {"type": "integer", "minimum": 1, "maximum": 64}
                    }
                }
            }
        },
        "behaviour.vehicle": {
            "$id": "behaviour.vehicle",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a vehicle.\nYou will be able to sit on it and move around / in air. You can also set fuel settings.",
            "required": ["sit_height"],
            "properties": {
                "enabled": {"type": "boolean"},
                "sit_height": {
                    "markdownDescription": "Height of the sit position",
                    "type": "number"
                },
                "fixed_rotation": {
                    "type": "boolean",
                    "markdownDescription": "If the vehicle has fixed rotation (to place it precisely)"
                },
                "small": {
                    "type": "boolean",
                    "markdownDescription": "If the vehicle is small or big, be sure to base your 3D model on this setting.\nResize your model using Blockbench accordingly"
                },
                "step_height": {
                    "type": "number",
                    "markdownDescription": "Autojump height",
                    "default": 0.3
                },
                "speed": {
                    "type": "object",
                    "markdownDescription": "Different speed of the vehicle based on actions",
                    "properties": {
                        "drive": {"type": "number", "markdownDescription": "Normal drive speed"},
                        "jump": {"type": "number", "markdownDescription": "Jump speed"},
                        "fly": {"type": "number", "markdownDescription": "Fly speed"}
                    }
                },
                "sound": {
                    "properties": {
                        "break": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        },
                        "place": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        }
                    }
                },
                "fuel": {
                    "type": "object",
                    "markdownDescription": "Fuel settings",
                    "properties": {
                        "start": {
                            "type": "number",
                            "markdownDescription": "Start fuel value when you craft/get this vehicle"
                        },
                        "max": {
                            "type": "number",
                            "markdownDescription": "Max fuel value this vehicle can reach"
                        },
                        "items": {
                            "markdownDescription": "Vehicle accepted fuel vanilla materials/custom items.\n\nYou can set **any Vanilla material** or your **custom items**. (it **won't autocomplete** everything here, just some examples)",
                            "additionalProperties": {"type": "integer", "default": 1},
                            "properties": {
                                "COAL": {"type": "integer", "default": 1},
                                "COAL_BLOCK": {"type": "integer", "default": 8},
                                "GOLD_INGOT": {"type": "integer", "default": 16}
                            }
                        }
                    }
                },
                "hitbox": {
                    "type": "object",
                    "markdownDescription": "Size of the vehicle. \n\nThis is the hitbox used when you drive the vehicles (hit walls/blocks).",
                    "properties": {
                        "length": {"type": "number"},
                        "width": {"type": "number"},
                        "height": {"type": "number"}
                    }
                },
                "smoke": {
                    "type": "object",
                    "markdownDescription": "Exhaust smoke effect",
                    "properties": {
                        "amount": {"type": "number", "default": 1},
                        "x": {"type": "number"},
                        "y": {"type": "number"},
                        "z": {"type": "number"}
                    }
                }
            }
        },
        "behaviour.mob": {
            "$id": "behaviour.mob",
            "type": "object",
            "markdownDescription": "(This is an old feature, it probably will be removed in the future.)\nTells ItemsAdder that this item is a custom mob.\nYou will be able to spawn it using eggs (create them), spawn in the world and drop items on death (loots).",
            "required": ["ai"],
            "doNotSuggest": true,
            "deprecated": true,
            "properties": {
                "enabled": {"type": "boolean"},
                "ai": {
                    "markdownDescription": "AI of the mob.\n**Accepts only vanilla mobs**",
                    "$ref": "#/$defs/bukkit_entity_type"
                },
                "visual": {
                    "markdownDescription": "Appearence of the mob.\nDEFAULT is ZOMBIE because it can holt items on head.\n**Accepts only vanilla mobs**\n\n",
                    "$ref": "#/$defs/bukkit_entity_type"
                },
                "animation": {
                    "markdownDescription": "Items models used as animation for the mob",
                    "properties": {
                        "attack": {
                            "type": "string",
                            "markdownDescription": "Item used to represent the attack animation of this mob"
                        },
                        "walk": {
                            "type": "string",
                            "markdownDescription": "Item used to represent the walk animation of this mob"
                        }
                    }
                },
                "invisible": {
                    "type": "boolean",
                    "markdownDescription": "If the vanilla entity is invisible. **true** by default"
                },
                "boss_bar": {
                    "type": "object",
                    "required": ["enabled"],
                    "markdownDescription": "Show bossbar even if IA is not of a boss (WITHER, ENDER_DRAGON)",
                    "properties": {
                        "enabled": {"type": "boolean"},
                        "style": {
                            "type": "string",
                            "enum": [
                                "SOLID",
                                "SEGMENTED_6",
                                "SEGMENTED_10",
                                "SEGMENTED_12",
                                "SEGMENTED_20"
                            ]
                        },
                        "color": {
                            "type": "string",
                            "enum": [
                                "PINK",
                                "BLUE",
                                "RED",
                                "GREEN",
                                "YELLOW",
                                "PURPLE",
                                "WHITE"
                            ]
                        }
                    }
                },
                "baby": {
                    "type": "boolean",
                    "markdownDescription": "If the vanilla entity is a baby. This is useful for ZOMBIE type to have a smaller entity"
                },
                "hit_color": {
                    "type": "string",
                    "markdownDescription": "Color shown when the entity takes damage.\nSet any color in HEX or name (just like armors).\n\n **DEFAULT** is: ff7e7e"
                },
                "clear_inventory": {
                    "type": "boolean",
                    "markdownDescription": "Clear inventory on spawn (because sometimes ZOMBIES and other mobs spawn with swords/armors)"
                },
                "lock_head_rotation": {
                    "properties": {"x": {"type": "number"}, "y": {"type": "number"}}
                },
                "y_offset": {
                    "type": "number",
                    "markdownDescription": "This tells ItemsAdder to shift the mob on the Y axis. Useful for SQUIDs and other mobs."
                },
                "upside_down": {"markdownDescription": "Dinnerbone", "type": "boolean"},
                "size": {"markdownDescription": "Size of Slime, Phantom...", "type": "integer"},
                "max_health": {"type": "number"},
                "speed": {
                    "properties": {
                        "movement": {"type": "number"},
                        "flying": {"type": "number"}
                    }
                },
                "special": {
                    "wither_projectile": {
                        "type": "string",
                        "enum": [
                            "ARROW",
                            "THROWN_EXP_BOTTLE",
                            "EGG",
                            "ENDER_PEARL",
                            "FIREBALL",
                            "FISHING_HOOK",
                            "SPLASH_POTION",
                            "SNOWBALL",
                            "TRIDENT"
                        ]
                    }
                },
                "potion_effects": {
                    "patternProperties": {
                        "^potion_effect(.*)$": {
                            "type": "object",
                            "markdownDescription": "Apply potion effect to the mob on spawn",
                            "properties": {
                                "every_ticks": {"$ref": "#/$defs/ticks"},
                                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                                "amplifier": {"$ref": "#/$defs/potion_amplifier"},
                                "duration": {"$ref": "#/$defs/ticks"},
                                "ambient": {"type": "boolean"}
                            }
                        }
                    },
                    "properties": {
                        "potion_effect": {
                            "type": "object",
                            "markdownDescription": "Apply potion effect to the mob on spawn",
                            "properties": {
                                "every_ticks": {"$ref": "#/$defs/ticks"},
                                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                                "amplifier": {"$ref": "#/$defs/potion_amplifier"},
                                "duration": {"$ref": "#/$defs/ticks"},
                                "ambient": {"type": "boolean"}
                            }
                        }
                    }
                },
                "replace_mobs_spawn": {
                    "type": "object",
                    "additionalProperties": {"$ref": "#/$defs/replace_mobs_spawn"},
                    "properties": {
                        "change_me": {"$ref": "#/$defs/replace_mobs_spawn"},
                        "change_me_2": {"$ref": "#/$defs/replace_mobs_spawn"},
                        "change_me_xxx": {"$ref": "#/$defs/replace_mobs_spawn"}
                    }
                }
            }
        },
        "replace_mobs_spawn": {
            "$id": "replace_mobs_spawn",
            "type": "object",
            "properties": {
                "type": {
                    "markdownDescription": "**Accepts only vanilla mobs**",
                    "$ref": "#/$defs/bukkit_entity_type"
                },
                "reason": {
                    "enum": [
                        "NATURAL",
                        "JOCKEY",
                        "SPAWNER",
                        "EGG",
                        "SPAWNER_EGG",
                        "LIGHTNING",
                        "BUILD_SNOWMAN",
                        "BUILD_IRONGOLEM",
                        "BUILD_WITHER",
                        "VILLAGE_DEFENSE",
                        "VILLAGE_INVASION",
                        "BREEDING",
                        "SLIME_SPLIT",
                        "REINFORCEMENTS",
                        "NETHER_PORTAL",
                        "DISPENSE_EGG",
                        "INFECTION",
                        "CURED",
                        "OCELOT_BABY",
                        "SILVERFISH_BLOCK",
                        "MOUNT",
                        "TRAP",
                        "ENDER_PEARL",
                        "SHOULDER_ENTITY",
                        "DROWNED",
                        "EXPLOSION",
                        "RAID",
                        "PATROL",
                        "BEEHIVE",
                        "PIGLIN_ZOMBIFIED",
                        "CUSTOM",
                        "DEFAULT"
                    ]
                },
                "chance": {"type": "number", "default": 99.9},
                "max_sky_light": {
                    "type": "integer",
                    "markdownDescription": "Max light that triggers this action. 15 is outside",
                    "minimum": -1,
                    "maximum": 16
                },
                "time": {
                    "properties": {
                        "start": {"enum": ["ANY", "DAY", "NOON", "NIGHT", "MIDNIGHT"]},
                        "end": {"enum": ["ANY", "DAY", "NOON", "NIGHT", "MIDNIGHT"]}
                    }
                }
            }
        },
        "behaviour.liquid_bucket": {
            "$id": "behaviour.liquid_bucket",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a liquid bucket.\nYou will be able to place a custom liquid and get it back.",
            "properties": {
                "enabled": {"type": "boolean"},
                "name": {"type": "string", "markdownDescription": "Liquid identifier."}
            }
        },
        "behaviour.fuel": {
            "$id": "behaviour.fuel",
            "type": "object",
            "markdownDescription": "Tells ItemsAdder that this item is a custom fuel.\nYou will be able to place a this item in furnaces. PLEASE MAKE SURE TO USE ONLY MATERAILS THAT ARE ALREADY FUEL IN MINECRAFT! For example COAL, COAL_BLOCK, LAVA_BUCKET...",
            "properties": {
                "enabled": {"type": "boolean"},
                "burn_ticks": {
                    "type": "integer",
                    "markdownDescription": "Duration of the fuel in ticks (20 ticks = 1 second). Vanilla COAL burns for 1600 ticks"
                },
                "machines": {
                    "type": "array",
                    "markdownDescription": "List of the machines that will accept this fuel",
                    "items": {
                        "type": "string",
                        "enum": ["FURNACE", "BLAST_FURNACE", "SMOKER"]
                    }
                }
            }
        },
        "events": {
            "$id": "events",
            "type": "object",
            "properties": {
                "block_break": {
                    "markdownDescription": "Triggered when you break a block with this item",
                    "$ref": "#/$defs/actions"
                },
                "attack": {
                    "markdownDescription": "Triggered when you attack an entity with this item",
                    "$ref": "#/$defs/actions"
                },
                "kill": {
                    "markdownDescription": "Triggered when you kill an entity with this item",
                    "$ref": "#/$defs/actions"
                },
                "interact": {
                    "$ref": "#/$defs/interact",
                    "markdownDescription": "Triggered when you interact...\n\n**(both mainhand and offhand trigger this event)**",
                },
                "interact_mainhand": {
                    "$ref": "#/$defs/interact",
                    "markdownDescription": "Triggered when you interact...\n\n**(only mainhand triggers this event)**",
                },
                "interact_offhand": {
                    "$ref": "#/$defs/interact",
                    "markdownDescription": "Triggered when you interact...\n\n**(only offhand triggers this event)**",
                },
                "drop": {
                    "markdownDescription": "Triggered when you drop this item",
                    "$ref": "#/$defs/actions"
                },
                "pickup": {
                    "markdownDescription": "Triggered when you pickup this item",
                    "$ref": "#/$defs/actions"
                },
                "eat": {
                    "markdownDescription": "Triggered when you eat this item",
                    "$ref": "#/$defs/actions"
                },
                "drink": {
                    "markdownDescription": "Triggered when you drink this item",
                    "$ref": "#/$defs/actions"
                },
                "bow_shot": {
                    "markdownDescription": "Triggered when you shot with this item (works only if it's a **BOW**)",
                    "$ref": "#/$defs/actions"
                },
                "gun_shot": {
                    "markdownDescription": "Triggered when you shot with this item (works only if this item has the **gun behaviour**)",
                    "$ref": "#/$defs/actions"
                },
                "gun_no_ammo": {
                    "markdownDescription": "Triggered when you shot with this item and you have no ammo (works only if this item has the **gun behaviour**)",
                    "$ref": "#/$defs/actions"
                },
                "gun_reload": {
                    "markdownDescription": "Triggered when you shot with this item and you reload (works only if this item has the **gun behaviour**)",
                    "$ref": "#/$defs/actions"
                },
                "book_write": {
                    "markdownDescription": "Triggered when you write this book (works only if this item is a **WRITABLE_BOOK**)",
                    "$ref": "#/$defs/actions"
                },
                "book_read": {
                    "markdownDescription": "Triggered when you read this book (works only if this item is a **WRITTEN_BOOK**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_start": {
                    "markdownDescription": "Triggered when you start fishing with this item (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_caught": {
                    "markdownDescription": "Triggered when you get a fish with this item (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_failed": {
                    "markdownDescription": "Triggered when you fail fishing with this item (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_cancel": {
                    "markdownDescription": "Triggered when you cancel fishing with this item (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_bite": {
                    "markdownDescription": "Triggered when a fish bites the hook of this item (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "fishing_in_ground": {
                    "markdownDescription": "Triggered when the hook of this item hits the ground (works only if this item is a **FISHING_ROD**)",
                    "$ref": "#/$defs/actions"
                },
                "wear": {
                    "markdownDescription": "Triggered when you wear this item",
                    "$ref": "#/$defs/actions"
                },
                "unwear": {
                    "markdownDescription": "Triggered when you unwear this item",
                    "$ref": "#/$defs/actions"
                },
                "held": {
                    "markdownDescription": "Triggered when you held this item in mainhand",
                    "$ref": "#/$defs/actions"
                },
                "held_offhand": {
                    "markdownDescription": "Triggered when you held this item in offhand",
                    "$ref": "#/$defs/actions"
                },
                "unheld": {
                    "markdownDescription": "Triggered when you unheld this item from mainhand",
                    "$ref": "#/$defs/actions"
                },
                "unheld_offhand": {
                    "markdownDescription": "Triggered when you unheld this item from offhand",
                    "$ref": "#/$defs/actions"
                },
                "item_throw": {
                    "markdownDescription": "Triggered when you throw this item (works only with ARROW material and throwable items like **SNOWBALL**, **ENDER_PEARL**...)",
                    "$ref": "#/$defs/actions"
                },
                "item_hit_ground": {
                    "markdownDescription": "Triggered when this item hits the ground after you have thrown it (works only with ARROW material and throwable items like **SNOWBALL**, **ENDER_PEARL**...)",
                    "$ref": "#/$defs/actions"
                },
                "item_hit_entity": {
                    "markdownDescription": "Triggered when this item hits an entity after you have thrown it (works only with ARROW material and throwable items like **SNOWBALL**, **ENDER_PEARL**...)",
                    "$ref": "#/$defs/actions"
                },
                "item_break": {
                    "markdownDescription": "Triggered when an item is broken (has 0 durability and disappears)",
                    "$ref": "#/$defs/actions"
                },
                "placed_block": {
                    "type": "object",
                    "markdownDescription": "Placed Custom block actions",
                    "properties": {
                        "interact": {
                            "markdownDescription": "Triggered when you interact this placed item. **Must be a custom block**",
                            "$ref": "#/$defs/actions"
                        },
                        "break": {
                            "markdownDescription": "Triggered when you break this placed item. **Must be a custom block**",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "placed_furniture": {
                    "type": "object",
                    "markdownDescription": "Placed furniture actions",
                    "properties": {
                        "interact": {
                            "markdownDescription": "Triggered when you interact with furniture.",
                            "$ref": "#/$defs/actions"
                        },
                        "break": {
                            "markdownDescription": "Triggered when you break a furniture.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "holding_item": {
                    "type": "object",
                    "properties": {
                        "player_damaged_by_entity": {
                            "markdownDescription": "Triggered while the player is holding this item in the mainhand and gets attacked by an entity.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "holding_item_offhand": {
                    "type": "object",
                    "properties": {
                        "player_damaged_by_entity": {
                            "markdownDescription": "Triggered while the player is holding this item in the offhand and gets attacked by an entity.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "equipped_armor_item": {
                    "type": "object",
                    "properties": {
                        "player_damaged_by_entity": {
                            "markdownDescription": "Triggered while the player is wearing this armor piece and gets attacked by an entity.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "bucket_empty": {
                    "markdownDescription": "Triggered when this bucket is empty (works only with **WATER_BUCKET** and **MILK_BUCKET**)",
                    "$ref": "#/$defs/actions"
                },
                "bucket_fill": {
                    "markdownDescription": "Triggered when this bucket is filled (works only with **BUCKET**)",
                    "$ref": "#/$defs/actions"
                },
                "item_frame": {
                    "type": "object",
                    "markdownDescription": "Events related to vanilla item_frame",
                    "properties": {
                        "put_item": {
                            "markdownDescription": "Triggered when you put this item on an item_frame.",
                            "$ref": "#/$defs/actions"
                        },
                        "remove_item": {
                            "markdownDescription": "Triggered when you remove this item from an item_frame.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
                "armor_stand": {
                    "type": "object",
                    "markdownDescription": "Events related to vanilla armor_stand",
                    "properties": {
                        "put_item": {
                            "markdownDescription": "Triggered when you put this item on an armor_stand.",
                            "$ref": "#/$defs/actions"
                        },
                        "remove_item": {
                            "markdownDescription": "Triggered when you remove this item from an armor_stand.",
                            "$ref": "#/$defs/actions"
                        }
                    }
                },
            }
        },
        "actions": {
            "$id": "actions",
            "type": "object",
            "markdownDescription": "Actions to be executed on this event.\n\nYou can set as many actions as you wish, you can event put the **same action multiple times**, you just have to make them start with the correct name, then append a _1, _2, _3...\nExample: play_sound_1, play_sound_2, play_sound_3\n\nMore info here: https://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/events/actions",
            "patternProperties": {
                "^play_sound(.*)$": {"$ref": "#/$defs/play_sound"},
                "^stop_sound(.*)$": {"$ref": "#/$defs/stop_sound"},
                "^cancel(.*)$": {"$ref": "#/$defs/cancel"},
                "^execute_commands(.*)$": {"$ref": "#/$defs/execute_commands"},
                "^play_particle(.*)$": {"$ref": "#/$defs/play_particle"},
                "^shoot_particle(.*)$": {"$ref": "#/$defs/shoot_particle"},
                "^play_effect(.*)$": {"$ref": "#/$defs/play_effect"},
                "^increment_durability(.*)$": {
                    "$ref": "#/$defs/decrement_increment_durability"
                },
                "^decrement_durability(.*)$": {
                    "$ref": "#/$defs/decrement_increment_durability"
                },
                "^decrement_usages(.*)$": {"$ref": "#/$defs/decrement_usages"},
                "^increment_amount(.*)$": {"$ref": "#/$defs/increment_amount"},
                "^decrement_amount(.*)$": {"$ref": "#/$defs/decrement_amount"},
                "^drop_exp(.*)$": {"$ref": "#/$defs/drop_exp"},
                "^feed(.*)$": {"$ref": "#/$defs/feed"},
                "^replace_properties(.*)$": {"$ref": "#/$defs/replace_properties"},
                "^give_item(.*)$": {"$ref": "#/$defs/give_item"},
                "^replace_near_blocks(.*)$": {"$ref": "#/$defs/replace_near_blocks"},
                "^glow_near_blocks(.*)$": {"$ref": "#/$defs/glow_near_blocks"},
                "^replace_block(.*)$": {"$ref": "#/$defs/replace_block"},
                "^multiple_break(.*)$": {"$ref": "#/$defs/multiple_break"},
                "^potion_effect(.*)$": {"$ref": "#/$defs/potion_effect"},
                "^remove_potion_effect(.*)$": {"$ref": "#/$defs/remove_potion_effect"},
                "^explosion(.*)$": {"$ref": "#/$defs/explosion"},
                "^damage_near_entities(.*)$": {"$ref": "#/$defs/damage_near_entities"},
                "^damage_entity_in_sight(.*)$": {
                    "$ref": "#/$defs/damage_entity_in_sight"
                },
                "^damage_entity(.*)$": {"$ref": "#/$defs/damage_entity"},
                "^target_potion_effect(.*)$": {"$ref": "#/$defs/target_potion_effect"},
                "^target_remove_potion_effect(.*)$": {
                    "$ref": "#/$defs/target_remove_potion_effect"
                },
                "^increment_player_stat(.*)$": {"$ref": "#/$defs/increment_player_stat"},
                "^decrement_player_stat(.*)$": {"$ref": "#/$defs/decrement_player_stat"},
                "^set_block(.*)$": {"$ref": "#/$defs/set_block"},
                "^place_furniture(.*)$": {"$ref": "#/$defs/place_furniture"},
                "^drop_item(.*)$": {"$ref": "#/$defs/drop_item"}
            },
            "properties": {
                "play_sound": {"$ref": "#/$defs/play_sound"},
                "stop_sound": {"$ref": "#/$defs/stop_sound"},
                "cancel": {"$ref": "#/$defs/cancel"},
                "execute_commands": {"$ref": "#/$defs/execute_commands"},
                "play_particle": {"$ref": "#/$defs/play_particle"},
                "shoot_particle": {"$ref": "#/$defs/shoot_particle"},
                "play_effect": {"$ref": "#/$defs/play_effect"},
                "increment_durability": {
                    "$ref": "#/$defs/decrement_increment_durability"
                },
                "decrement_durability": {
                    "$ref": "#/$defs/decrement_increment_durability"
                },
                "decrement_usages": {"$ref": "#/$defs/decrement_usages"},
                "increment_amount": {"$ref": "#/$defs/increment_amount"},
                "decrement_amount": {"$ref": "#/$defs/decrement_amount"},
                "drop_exp": {"$ref": "#/$defs/drop_exp"},
                "feed": {"$ref": "#/$defs/feed"},
                "replace_properties": {"$ref": "#/$defs/replace_properties"},
                "give_item": {"$ref": "#/$defs/give_item"},
                "replace_near_blocks": {"$ref": "#/$defs/replace_near_blocks"},
                "glow_near_blocks": {"$ref": "#/$defs/glow_near_blocks"},
                "replace_block": {"$ref": "#/$defs/replace_block"},
                "multiple_break": {"$ref": "#/$defs/multiple_break"},
                "potion_effect": {"$ref": "#/$defs/potion_effect"},
                "remove_potion_effect": {"$ref": "#/$defs/remove_potion_effect"},
                "explosion": {"$ref": "#/$defs/explosion"},
                "damage_near_entities": {"$ref": "#/$defs/damage_near_entities"},
                "damage_entity_in_sight": {"$ref": "#/$defs/damage_entity_in_sight"},
                "damage_entity": {"$ref": "#/$defs/damage_entity"},
                "target_potion_effect": {"$ref": "#/$defs/target_potion_effect"},
                "target_remove_potion_effect": {
                    "$ref": "#/$defs/target_remove_potion_effect"
                },
                "increment_player_stat": {"$ref": "#/$defs/increment_player_stat"},
                "decrement_player_stat": {"$ref": "#/$defs/decrement_player_stat"},
                "play_totem_animation": {"$ref": "#/$defs/play_totem_animation"},
                "drop_item": {"$ref": "#/$defs/drop_item"},
                "set_block": {"$ref": "#/$defs/set_block"},
                "place_furniture": {"$ref": "#/$defs/place_furniture"}
            }
        },
        "interact": {
            "$id": "interact",
            "type": "object",
            "markdownDescription": "Triggered when you interact ...",
            "properties": {
                "entity": {
                    "markdownDescription": "... with an entity with this item",
                    "$ref": "#/$defs/actions"
                },
                "left": {
                    "markdownDescription": "... with a block (left click) with this item",
                    "$ref": "#/$defs/actions"
                },
                "right": {
                    "markdownDescription": "... with a block (right click) with this item",
                    "$ref": "#/$defs/actions"
                },
                "left_shift": {
                    "markdownDescription": "... with a block (left shift click) with this item",
                    "$ref": "#/$defs/actions"
                },
                "right_shift": {
                    "markdownDescription": "... with a block (right shift click) with this item",
                    "$ref": "#/$defs/actions"
                }
            }
        },
        "command": {
            "$id": "command",
            "type": "object",
            "required": ["command"],
            "properties": {
                "command": {
                    "type": "string",
                    "markdownDescription": "Command to be executed (**without** the **/**)\n\n\nYou can use these placeholders:\n\n`{player}` is the player who used this item\n\n`{target-player}` is the player interacted/attacked\n\n`{target-x}` is the x location of player/block interacted/attacked\n\n`{target-y}` is the x location of player/block interacted/attacked\n\n`{target-z}` is the x location of player/block interacted/attacked\n\n`{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).\n\n\nExample: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`",
                    "defaultSnippets": [
                        {
                            "body": "minecraft:tell {player} Test", 
                            "description": "Example tell command"
                        },
                        {
                            "body": "minecraft:give {player} minecraft:diamond 1", 
                            "description": "Example give command"
                        },
                        {
                            "body": "execute at {player} run minecraft:tp LoneDev ~ ~2 ~", 
                            "description": "Example teleport +2 on Y axis"
                        },
                        {
                            "body": "minecraft:tp {player} {target-x} 200 {target-z}", 
                            "description": "Example teleport on same x, z but 200 on Y axis"
                        }

                    ]
                },
                "as_console": {"type": "boolean", "examples": [false]},
                "flow_success_if_message_contains": {
                    "type": "string",
                    "markdownDescription": "The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status."
                }
            }
        },
        "action_delay.prop": {
            "$id": "action_delay.prop",
            "type": "integer",
            "markdownDescription": "Delay in ticks before starting this action"
        },
        "flow.prop": {
            "$id": "flow.prop",
            "type": "object",
            "markdownDescription": "Advanced options to change the flow of actions for this event section.",
            "properties": {
                "stop_if_last_success": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this and the next actions if the previous action **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "stop_if_last_fail": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this and the next actions if the previous action **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_last_success": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this action if the previous action **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_last_fail": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this action if the previous action **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "stop_if_any_success": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "stop_if_any_fail": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_any_success": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this action if **ANY** of the previous actions **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_any_fail": {
                    "type": "boolean",
                    "markdownDescription": "Doesn't execute this action if **ANY** of the previous actions **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "stop_if_success": {
                    "type": "string",
                    "markdownDescription": "Doesn't execute this and the next actions if a specific previous action **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "stop_if_fail": {
                    "type": "string",
                    "markdownDescription": "Doesn't execute this and the next actions if a specific previous action **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_success": {
                    "type": "string",
                    "markdownDescription": "Doesn't execute this action if a specific previous action **succeeded**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                },
                "skip_if_fail": {
                    "type": "string",
                    "markdownDescription": "Doesn't execute this action if a specific previous action **failed**.\n\nUSE ONLY ONE OF `stop_` or `skip_`."
                }
            },
            /*"oneOf": [
                {
                    "type": "object",
                    "properties": {
                        "stop_if_last_success": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this and the next actions if the previous action **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "stop_if_last_fail": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this and the next actions if the previous action **failed**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_last_success": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this action if the previous action **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_last_fail": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this action if the previous action **failed**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "stop_if_any_success": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "stop_if_any_fail": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this and the next actions if **ANY** of the previous actions **failed**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_any_success": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this action if **ANY** of the previous actions **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_any_fail": {
                            "type": "boolean",
                            "markdownDescription": "Doesn't execute this action if **ANY** of the previous actions **failed**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "stop_if_success": {
                            "type": "string",
                            "markdownDescription": "Doesn't execute this and the next actions if a specific previous action **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "stop_if_fail": {
                            "type": "string",
                            "markdownDescription": "Doesn't execute this and the next actions if a specific previous action **failed**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_success": {
                            "type": "string",
                            "markdownDescription": "Doesn't execute this action if a specific previous action **succeeded**."
                        },
                    },
                    "additionalProperties": false
                },
                {
                    "type": "object",
                    "properties": {
                        "skip_if_fail": {
                            "type": "string",
                            "markdownDescription": "Doesn't execute this action if a specific previous action **failed**."
                        }
                    },
                    "additionalProperties": false
                }
            ],*/
        },
        "action_permission.prop": {
            "$id": "action_permission.prop",
            "type": "string",
            "markdownDescription": "Permission needed to execute this action"
        },
        "play_sound": {
            "$id": "play_sound",
            "markdownDescription": "Play a Vanilla sound or Custom sound",
            "required": ["name", "volume", "pitch"],
            "properties": {
                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                "volume": {"type": "number", "minimum": 0},
                "pitch": {"type": "number", "minimum": 0, "maximum": 2},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "category": {"$ref": "#/$defs/bukkit_sound_category"},
                "permission": {"$ref": "#/$defs/action_permission.prop"},
                "stop_previous": {"type": "boolean"},
            }
        },
        "stop_sound": {
            "$id": "stop_sound",
            "markdownDescription": "Stop a Vanilla sound or Custom sound",
            "required": ["name"],
            "properties": {
                "name": {"$ref": "#/$defs/vanilla_and_custom_sound"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "cancel": {
            "$id": "cancel",
            "type": "boolean",
            "markdownDescription": "Cancel the event that triggered this action",
            "examples": [true]
        },
        "execute_commands": {
            "$id": "execute_commands",
            "markdownDescription": "Execute these commands",
            "additionalProperties": {"$ref": "#/$defs/command"},
            "properties": {
                "change_me_1": {"$ref": "#/$defs/command"},
                "change_me_2": {"$ref": "#/$defs/command"},
                "change_me_3": {"$ref": "#/$defs/command"},
                "change_me_4": {"$ref": "#/$defs/command"},
                "change_me_xx": {"$ref": "#/$defs/command"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "play_particle": {
            "$id": "play_particle",
            "markdownDescription": "Play this particle",
            "required": ["name"],
            "properties": {
                "name": {"$ref": "#/$defs/bukkit_particle"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "shoot_particle": {
            "$id": "shoot_particle",
            "markdownDescription": "Shoot this particle",
            "required": ["name", "distance"],
            "properties": {
                "name": {"$ref": "#/$defs/bukkit_particle"},
                "distance": {"type": "integer", "default": 7},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "play_effect": {
            "$id": "play_effect",
            "markdownDescription": "Play this effect",
            "required": ["name"],
            "properties": {
                "name": {"$ref": "#/$defs/bukkit_effect"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "decrement_increment_durability": {
            "$id": "decrement_increment_durability",
            "markdownDescription": "Decrement/increment this item durability",
            "required": ["amount"],
            "properties": {
                "amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "decrement_usages": {
            "$id": "decrement_usages",
            "markdownDescription": "Decrement this item usages",
            "required": ["amount"],
            "properties": {
                "amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "increment_amount": {
            "$id": "increment_amount",
            "markdownDescription": "Increment this item amount",
            "required": ["amount"],
            "properties": {
                "amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "decrement_amount": {
            "$id": "decrement_amount",
            "markdownDescription": "Decrement this item amount",
            "required": ["amount"],
            "properties": {
                "amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "drop_exp": {
            "$id": "drop_exp",
            "markdownDescription": "Drop exp",
            "required": ["chance", "min_amount", "max_amount"],
            "properties": {
                "chance": {"type": "number"},
                "min_amount": {"type": "integer"},
                "max_amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "feed": {
            "$id": "feed",
            "markdownDescription": "Feed player",
            "required": ["amount"],
            "properties": {
                "amount": {
                    "type": "integer",
                    "markdownDescription": "Vanilla saturation and feed values: https://minecraft.gamepedia.com/Hunger#Food_level_and_saturation_level_restoration"
                },
                "saturation": {
                    "type": "number",
                    "markdownDescription": "Vanilla saturation and feed values: https://minecraft.gamepedia.com/Hunger#Food_level_and_saturation_level_restoration"
                },
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "replace_properties": {
            "$id": "replace_properties",
            "markdownDescription": "Replace this item properties",
            "required": ["custom_model_data"],
            "properties": {
                "custom_model_data": {
                    "type": "object",
                    "required": ["copy_from_item"],
                    "properties": {
                        "copy_from_item": {"type": "string"},
                        "restorable": {
                            "type": "boolean",
                            "markdownDescription": "Can this change be reverted?"
                        },
                        "delay": {"$ref": "#/$defs/action_delay.prop"},
                        "flow": {"$ref": "#/$defs/flow.prop"},
                        "permission": {"$ref": "#/$defs/action_permission.prop"}
                    }
                }
            }
        },
        "give_item": {
            "$id": "give_item",
            "markdownDescription": "Give this player an item",
            "required": ["item"],
            "properties": {
                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                "amount": {"type": "integer"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "replace_near_blocks": {
            "$id": "replace_near_blocks",
            "markdownDescription": "Replace vanilla/custom blocks near interact location (or near the player if this event is not an interact one)",
            "oneOf": [{"required": ["from"]}, {"required": ["from_multiple"]}],
            "required": ["to", "radius", "decrement_durability"],
            "properties": {
                "from": {"$ref": "#/$defs/vanilla_and_custom_blocks"},
                "from_multiple": {
                    "type": "array",
                    "markdownDescription": "List of vanilla/custom blocks to replace",
                    "items": {"$ref": "#/$defs/vanilla_and_custom_blocks"}
                },
                "to": {"$ref": "#/$defs/vanilla_and_custom_blocks"},
                "radius": {
                    "type": "object",
                    "required": ["x", "y", "z"],
                    "properties": {
                        "x": {"type": "integer"},
                        "y": {"type": "integer"},
                        "z": {"type": "integer"}
                    }
                },
                "decrement_durability": {
                    "type": "integer",
                    "markdownDescription": "Decrement durability amount"
                },
                "decrement_amount": {
                    "type": "integer",
                    "markdownDescription": "Decrement item amount"
                },
                "no_physics": {"type": "boolean", "examples": [false]},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "glow_near_blocks": {
            "$id": "glow_near_blocks",
            "type": "object",
            "markdownDescription": "Glow blocks near interact location (or near the player if this event is not an interact one)",
            "required": ["radius", "material"],
            "properties": {
                "material": {"$ref": "#/$defs/bukkit_blocks"},
                "radius": {
                    "type": "object",
                    "required": ["x", "y", "z"],
                    "properties": {
                        "x": {"type": "integer"},
                        "y": {"type": "integer"},
                        "z": {"type": "integer"}
                    }
                },
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "replace_block": {
            "$id": "replace_block",
            "markdownDescription": "Replace vanilla/custom blocks in interact location (or on the player location if this event is not an interact one)",
            "required": ["from", "to", "decrement_durability"],
            "properties": {
                "from": {"$ref": "#/$defs/vanilla_and_custom_blocks"},
                "to": {"$ref": "#/$defs/vanilla_and_custom_blocks"},
                "decrement_durability": {
                    "type": "integer",
                    "markdownDescription": "Decrement durability amount"
                },
                "decrement_amount": {
                    "type": "integer",
                    "markdownDescription": "Decrement item amount"
                },
                "no_physics": {"type": "boolean", "examples": [false]},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "multiple_break": {
            "$id": "multiple_break",
            "markdownDescription": "Break multiple blocks around the center of broken block",
            "required": ["size", "keep_ores", "drop_all_blocks"],
            "properties": {
                "size": {"type": "integer", "default": 3},
                "depth": {"type": "integer"},
                "keep_ores": {"type": "boolean", "default": true},
                "drop_all_blocks": {
                    "type": "object",
                    "required": ["enabled", "need_silk_touch"],
                    "properties": {
                        "enabled": {"type": "boolean", "default": true},
                        "need_silk_touch": {"type": "boolean", "default": true}
                    }
                },
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "potion_effect": {
            "$id": "potion_effect",
            "markdownDescription": "Apply potion effect to player",
            "properties": {
                "every_ticks": {"$ref": "#/$defs/ticks"},
                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                "amplifier": {"$ref": "#/$defs/potion_amplifier"},
                "duration": {"$ref": "#/$defs/ticks"},
                "ambient": {"type": "boolean"}
            }
        },
        "remove_potion_effect": {
            "$id": "remove_potion_effect",
            "markdownDescription": "Remove potion effect",
            "required": ["type"],
            "properties": {
                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "explosion": {
            "$id": "explosion",
            "markdownDescription": "Spawn explosion",
            "required": ["power"],
            "properties": {
                "power": {"type": "integer", "default": 1},
                "fire": {"type": "boolean", "default": false},
                "break_blocks": {"type": "boolean", "default": false},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "damage_near_entities": {
            "$id": "damage_near_entities",
            "type": "object",
            "markdownDescription": "Damage near entities",
            "required": ["damage", "radius"],
            "properties": {
                "damage": {"type": "number", "default": 1},
                "radius": {"type": "integer", "default": 3},
                "entity_groups": {
                    "type": "string",
                    "enum": ["HOSTILE", "PLAYERS", "PASSIVE"]
                },
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "damage_entity_in_sight": {
            "$id": "damage_entity_in_sight",
            "type": "object",
            "markdownDescription": "Damage entity you're looking at",
            "required": ["damage", "distance"],
            "properties": {
                "damage": {"type": "number", "default": 1},
                "distance": {"type": "integer", "default": 3},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "damage_entity": {
            "$id": "damage_entity",
            "markdownDescription": "Damage the entity of this event. For example on interact or attack or on event item_hit_entity",
            "required": ["damage"],
            "properties": {
                "damage": {"type": "number", "default": 1},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "target_potion_effect": {
            "$id": "target_potion_effect",
            "markdownDescription": "Apply potion effect to target entity",
            "required": ["type"],
            "properties": {
                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                "amplifier": {"$ref": "#/$defs/potion_amplifier"},
                "duration": {"$ref": "#/$defs/ticks"},
                "ambient": {"type": "boolean"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "target_remove_potion_effect": {
            "$id": "target_remove_potion_effect",
            "type": "object",
            "markdownDescription": "Remove potion effect from target entity",
            "required": ["type"],
            "properties": {
                "type": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "increment_player_stat": {
            "$id": "increment_player_stat",
            "markdownDescription": "Increment player stat (ItemsAdder stats, used by HUDs)",
            "required": ["name", "amount"],
            "properties": {
                "name": {"type": "string"},
                "amount": {"type": "number"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "decrement_player_stat": {
            "$id": "decrement_player_stat",
            "type": "object",
            "markdownDescription": "Decrement player stat (ItemsAdder stats, used by HUDs)",
            "required": ["name", "amount"],
            "properties": {
                "name": {"type": "string"},
                "amount": {"type": "number"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "play_totem_animation": {
            "$id": "play_totem_animation",
            "type": "string",
            "markdownDescription": "Play the totem animation with a particular item texture."
        },
        "set_block": {
            "$id": "set_block",
            "markdownDescription": "Sets a block. Useful on interact events to place a custom/vanilla block.",
            "required": ["block"],
            "properties": {
                "block": {"$ref": "#/$defs/vanilla_and_custom_blocks"},
                "target": {"type": "string", "enum": ["RELATIVE", "CLICKED"]},
                "decrement_amount": {"type": "boolean"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "place_furniture": {
            "$id": "place_furniture",
            "markdownDescription": "Places a furniture. Useful on interact events to place a custom furniture.",
            "required": ["furniture"],
            "properties": {
                "furniture": {"type": "string"},
                "decrement_amount": {"type": "boolean"},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "drop_item": {
            "$id": "drop_item",
            "markdownDescription": "Drops a vanilla/custom item.",
            "required": ["item"],
            "properties": {
                "item": {"$ref": "#/$defs/bukkit_materials_and_customitems"},
                "min_amount": {"type": "integer", "default": 1},
                "max_amount": {"type": "integer", "default": 1},
                "chance": {"type": "number", "default": 99.9},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "font_image": {
            "$id": "font_image",
            "type": "object",
            "markdownDescription": "A font image, it can be used to create custom emojis, GUIs, HUDs and more.",
            "required": ["path"],
            "properties": {
                "permission": {
                    "type": "string",
                    "markdownDescription": "Usage permission for this emoji. States if a player can use the shorthand to write the emoji on signs, books, chat..."
                },
                "show_in_gui": {
                    "type": "boolean",
                    "markdownDescription": "Decide if you want to show this font image inside the **emojis** GUI (the one you open with **/e** command)"
                },
                "suggest_in_command": {
                    "type": "boolean",
                    "markdownDescription": "Decide if you want to show this font image in the list of suggestions when you press TAB using the **/e** command"
                },
                "symbol": {
                    "type": "string",
                    "markdownDescription": "This allows you to specify a character to be retextured using an image https://emojipedia.org/ 🥤‼️😅🤨🥶This supports emojis (some emojis are not supported if they're make of multiple characters).You can also specify a unicode value directly, example: \\u1F47D",
                    "defaultSnippets": [{"body": "\\u$0"}, {"body": "🥶"}]
                },
                "path": {
                    "type": "string",
                    "markdownDescription": "png file partial path. \n\nExample: **font/my_emojis/smile**. This will be translated to **plugins\\ItemsAdder\\data\\resource_pack\\assets\\NAMESPACE\\textures\\font\\my_emojis\\smile.png**",
                    "defaultSnippets": [{"body": "font/$0"}]
                },
                "scale_ratio": {
                    "type": "integer",
                    "default": 9,
                    "markdownDescription": "Height of the image in pixels. ItemsAdder will auto-scale the width accordingly\nIf you're making an **emoji** a value of **9** is enough"
                },
                "y_position": {
                    "type": "integer",
                    "default": 8,
                    "markdownDescription": "Y position of this image on screen. This can't be changed at runtime and must be decided now.\nYou can shift this image up or down using this value.\nIf you're making an **emoji** a value of **8** is enough"
                }
            }
        },
        "generic_over_time": {
            "$id": "generic_over_time",
            "markdownDescription": "Decrement/increment HUD value over time",
            "properties": {
                "every_ticks": {
                    "$ref": "#/$defs/ticks",
                    "markdownDescription": "Decrement interval (ticks)"
                },
                "amount": {"type": "integer", "markdownDescription": "Decrement amount"},
                "min_sky_light": {
                    "type": "integer",
                    "markdownDescription": "Min light that triggers this action. 15 is outside",
                    "minimum": -1,
                    "maximum": 16
                },
                "max_sky_light": {
                    "type": "integer",
                    "markdownDescription": "Max light that triggers this action. 15 is outside",
                    "minimum": -1,
                    "maximum": 16
                }
            }
        },
        "biome_over_time": {
            "$id": "biome_over_time",
            "markdownDescription": "Decrement/increment HUD value over time",
            "properties": {
                "biome": {"$ref": "#/$defs/bukkit_biome"},
                "every_ticks": {
                    "$ref": "#/$defs/ticks",
                    "markdownDescription": "Decrement interval (ticks)"
                },
                "amount": {"type": "integer", "markdownDescription": "Decrement amount"},
                "min_sky_light": {
                    "type": "integer",
                    "markdownDescription": "Min light that triggers this action. 15 is outside",
                    "minimum": -1,
                    "maximum": 16
                },
                "max_sky_light": {
                    "type": "integer",
                    "markdownDescription": "Max light that triggers this action. 15 is outside",
                    "minimum": -1,
                    "maximum": 16
                }
            }
        },
        "food_level_change": {
            "$id": "food_level_change",
            "markdownDescription": "When food level decreases (player starves or eats food)",
            "properties": {
                "amount": {
                    "markdownDescription": "Decrement this hud value by amount",
                    "type": "number"
                }
            }
        },
        "player_respawn": {
            "$id": "player_respawn",
            "markdownDescription": "When the player respawns",
            "properties": {
                "amount": {"markdownDescription": "Increment amount", "type": "number"}
            }
        },
        "damage_player": {
            "$id": "damage_player",
            "markdownDescription": "Deal damage to player",
            "properties": {
                "every_ticks": {
                    "$ref": "#/$defs/ticks",
                    "markdownDescription": "Deal damage to player (interval in ticks)"
                },
                "damage": {"markdownDescription": "Deal damage to player", "type": "number"}
            }
        },
        "hud": {
            "$id": "hud",
            "type": "object",
            "required": ["value", "x_position_pixels", "type", "images"],
            "properties": {
                "enabled": {"type": "boolean"},
                "worlds": {
                    "type": "array",
                    "markdownDescription": "Not mandatory! You can avoid setting this if you want to enable hud in all the worlds.\nWorlds list in which you want to enable huds.\n\n Please read here for advanced rules: \nhttps://itemsadder.devs.beer/plugin-usage/adding-content/advanced/huds",
                    "items": {
                        "anyOf": [
                            {"type": "string"},
                            {
                                "type": "string",
                                "enum": [
                                    "world",
                                    "world_nether",
                                    "world_the_end",
                                    "!world",
                                    "!world_nether",
                                    "!world_the_end",
                                    "world_*",
                                    "world_*"
                                ],
                                "default": "*"
                            }
                        ]
                    }
                },
                "show": {
                    "type": "object",
                    "properties": {
                        "auto": {
                            "type": "boolean",
                            "markdownDescription": "Is this HUD automatically shown for each player?"
                        },
                        "creative": {
                            "type": "boolean",
                            "markdownDescription": "Show the HUD on creative"
                        },
                        "underwater": {
                            "type": "boolean",
                            "markdownDescription": "Show the HUD when player is underwater"
                        },
                        "riding": {
                            "type": "boolean",
                            "markdownDescription": "Show the HUD when player is riding an entity"
                        }
                    }
                },
                "type": {
                    "type": "string",
                    "oneOf": [
                        {
                            "const": "STATUS",
                            "type": "string",
                            "markdownDescription": "This HUD type has multiple icons with 3 states (full, half and empty). Can be used for thirst, life..."
                        },
                        {
                            "const": "FRAMES",
                            "type": "string",
                            "markdownDescription": "This HUD type has multiple images, one for each value the HUD will have."
                        },
                        {
                            "const": "CUSTOM",
                            "type": "string",
                            "markdownDescription": "This HUD type is handled manually by an Addon. You have to be a Java/Skript developer to use this one."
                        }
                    ]
                },
                "x_position_pixels": {
                    "type": "integer",
                    "markdownDescription": "Shift this HUD on screen X (starting from the exact center of the screen).",
                    "minimum": -2048,
                    "maximum": 2048
                },
                "value": {
                    "type": "object",
                    "required": ["player_stat_name", "start", "max", "min"],
                    "properties": {
                        "player_stat_name": {
                            "type": "string",
                            "markdownDescription": "Stat name you can use to identify this HUD.\nYou can use this value in items actions to increment/decrement this HUD value based on item action."
                        },
                        "start": {
                            "type": "integer",
                            "markdownDescription": "Starting value for this HUD"
                        },
                        "max": {"type": "integer", "markdownDescription": "Max value for this HUD"},
                        "min": {"type": "integer", "markdownDescription": "Min value for this HUD"},
                        "triggers": {
                            "type": "object",
                            "markdownDescription": "Dynamicize your HUD",
                            "properties": {
                                "decrement": {
                                    "type": "object",
                                    "markdownDescription": "Decrement HUD value. Remember you can add as many copies of the action you want.\nFor example if you want to have more than one **'generic_over_time'** you just have to create a new one named **generic_over_time_2**.\nThe important thing is that it starts with **generic_over_time**",
                                    "patternProperties": {
                                        "^generic_over_time(.*)$": {
                                            "$ref": "#/$defs/generic_over_time"
                                        },
                                        "^biome_over_time(.*)$": {
                                            "$ref": "#/$defs/generic_over_time"
                                        },
                                        "^food_level_change(.*)$": {
                                            "$ref": "#/$defs/food_level_change"
                                        }
                                    },
                                    "properties": {
                                        "generic_over_time": {"$ref": "#/$defs/generic_over_time"},
                                        "generic_over_time_1": {"$ref": "#/$defs/generic_over_time"},
                                        "generic_over_time_XXX": {
                                            "$ref": "#/$defs/generic_over_time"
                                        },
                                        "biome_over_time": {"$ref": "#/$defs/vanilla_enchants"},
                                        "biome_over_time_1": {"$ref": "#/$defs/vanilla_enchants"},
                                        "biome_over_time_XXX": {"$ref": "#/$defs/vanilla_enchants"},
                                        "food_level_change": {"$ref": "#/$defs/food_level_change"},
                                        "food_level_change_1": {"$ref": "#/$defs/food_level_change"},
                                        "food_level_change_XXX": {
                                            "$ref": "#/$defs/food_level_change"
                                        }
                                    }
                                },
                                "increment": {
                                    "type": "object",
                                    "markdownDescription": "Increment HUD value. Remember you can add as many copies of the action you want.\nFor example if you want to have more than one **'generic_over_time'** you just have to create a new one named **generic_over_time_2**.\nThe important thing is that it starts with **generic_over_time**",
                                    "patternProperties": {
                                        "^food_level_change(.*)$": {
                                            "$ref": "#/$defs/food_level_change"
                                        },
                                        "^player_respawn(.*)$": {"$ref": "#/$defs/player_respawn"}
                                    },
                                    "properties": {
                                        "food_level_change": {"$ref": "#/$defs/food_level_change"},
                                        "food_level_change_1": {"$ref": "#/$defs/food_level_change"},
                                        "food_level_change_XXX": {
                                            "$ref": "#/$defs/food_level_change"
                                        },
                                        "player_respawn": {"$ref": "#/$defs/player_respawn"},
                                        "player_respawn_1": {"$ref": "#/$defs/player_respawn"},
                                        "player_respawn_XXX": {"$ref": "#/$defs/player_respawn"}
                                    }
                                },
                                "on_min_value": {
                                    "type": "object",
                                    "markdownDescription": "Do these actions when HUD reaches its min value. Remember you can add as many copies of the action you want.\nFor example if you want to have more than one **'generic_over_time'** you just have to create a new one named **generic_over_time_2**.\nThe important thing is that it starts with **generic_over_time**",
                                    "patternProperties": {
                                        "^damage_player(.*)$": {"$ref": "#/$defs/damage_player"},
                                        "^potion_effect(.*)$": {"$ref": "#/$defs/potion_effect"}
                                    },
                                    "properties": {
                                        "damage_player": {"$ref": "#/$defs/damage_player"},
                                        "damage_player_1": {"$ref": "#/$defs/damage_player"},
                                        "damage_player_XXX": {"$ref": "#/$defs/damage_player"},
                                        "potion_effect": {"$ref": "#/$defs/potion_effect"},
                                        "potion_effect_1": {"$ref": "#/$defs/potion_effect"},
                                        "potion_effect_XXX": {"$ref": "#/$defs/potion_effect"}
                                    }
                                }
                            }
                        }
                    }
                },
                "images": {
                    "type": "object",
                    "markdownDescription": "font_images used to draw this HUD",
                    "properties": {
                        "positive": {
                            "type": "string",
                            "markdownDescription": "**USE ONLY IF TYPE IS 'STATUS'**. \nName of the font_image (not its file path)"
                        },
                        "half": {
                            "type": "string",
                            "markdownDescription": "**USE ONLY IF TYPE IS 'STATUS'**. \nName of the font_image (not its file path)"
                        },
                        "negative": {
                            "type": "string",
                            "markdownDescription": "**USE ONLY IF TYPE IS 'STATUS'**. \nName of the font_image (not its file path)"
                        },
                        "frames": {
                            "type": "array",
                            "markdownDescription": "**USE ONLY IF TYPE IS 'FRAMES'**",
                            "items": {
                                "type": "string",
                                "markdownDescription": "Name of the font_image (not its file path)"
                            }
                        }
                    }
                }
            }
        },
        "nbt": {
            "$id": "nbt",
            "type": "object",
            "markdownDescription": "Special property to specify which NBT data must match",
            "additionalProperties": {"type": "object", "$ref": "#/$defs/nbt_matcher"},
            "properties": {
                "change_me": {"type": "object", "$ref": "#/$defs/nbt_matcher"},
                "change_me_2": {"type": "object", "$ref": "#/$defs/nbt_matcher"},
                "change_me_xxx": {"type": "object", "$ref": "#/$defs/nbt_matcher"}
            }
        },
        "nbt_matcher": {
            "$id": "nbt_matcher",
            "type": "object",
            "required": ["path", "value", "type"],
            "properties": {
                "path": {"type": "string", "default": "VillagerData.profession"},
                "value": {"type": "string", "default": "minecraft:farmer"},
                "type": {
                    "type": "string",
                    "enum": ["string", "int", "float", "double", "byte", "short"]
                }
            }
        },
        "armors_rendering_entry": {
            "$id": "armors_rendering_entry",
            "type": "object",
            "kind": 2,
            "detail": "(object)",
            "required": ["layer_1", "layer_2"],
            "properties": {
                "layer_1": {
                    "type": "string",
                    "markdownDescription": "The path to the texture for the first layer of this armor"
                },
                "layer_2": {
                    "type": "string",
                    "markdownDescription": "The path to the texture for the second layer of this armor"
                },
                "emissive_1": {
                    "type": "string",
                    "markdownDescription": "The path to the emissive texture for the first layer of this armor"
                },
                "emissive_2": {
                    "type": "string",
                    "markdownDescription": "The path to the emissive texture for the second layer of this armor"
                },
                "use_color": {
                    "type": "boolean",
                    "markdownDescription": "Check if the texture must be recolored based on the value of 'color' attribute or not (false by default)"
                },
                "color": {
                    "kind": 19,
                    "markdownDescription": "The color to be used by the shader to identify the texture. This is used as an ID.",
                    "default": "ff0000",
                    "anyOf": [
                        {
                            "type": "string",
                            "enum": [
                                "ff7e7e",
                                "75bebe",
                                "16d4ff",
                                "530766",
                                "00ff72",
                                "010002",
                                "570e11",
                                "d36823",
                                "ff0000"
                            ]
                        },
                        {"type": "integer"},
                        {
                            "patternProperties": {
                                "^(#|)[0-9a-f]{3,6}$": {"type": "string"}
                            }
                        }
                    ]
                },
                "emissive_type": {
                    "type": "integer",
                    "markdownDescription": "Decide how this texture emission will be shown on screen. 0 = no emission, 1 = full emissivity (default, if emissive textures are provided), 2+ = partial emissivity"
                },
                "animation": {
                    "properties": {
                        "speed": {
                            "type": "integer",
                            "markdownDescription": "The speed of the armor animation. Default speed is 24, but you can customize it until you find the right speed value"
                        },
                        "interpolation": {
                            "type": "boolean",
                            "markdownDescription": "This option makes the texture frames smoothly change or not. Default value is false"
                        }
                    }
                }
            }
        },
        "equipments_entry": {
            "$id": "equipments_entry",
            "markdownDescription": "Custom equipment rendering",
            "type": "object",
            "kind": 2,
            "detail": "(object)",
            "required": ["layer_1", "layer_2"],
            "properties": {
                "type": {
                    "type": "string",
                    "markdownDescription": "Available types: `armor`. More will be implemented in the future.",
                    "enum": ["armor"]
                },
                "layer_1": {
                    "type": "string",
                    "markdownDescription": "The path to the texture for the first layer of this equipment"
                },
                "layer_2": {
                    "type": "string",
                    "markdownDescription": "The path to the texture for the second layer of this equipment"
                },
            }
        },
        "entity": {
            "$id": "entity",
            "type": "object",
            "required": ["model_folder"],
            "properties": {
                "display_name": {
                    "type": "string",
                    "markdownDescription": "Display name of the custom entity"
                },
                "model_folder": {
                    "type": "string",
                    "markdownDescription": "Folder of this custom entity where all its bones models are stored",
                    "defaultSnippets": [{"body": "entity/$0"}]
                },
                "type": {
                    "markdownDescription": "The base Vanilla entity type",
                    "$ref": "#/$defs/bukkit_entity_type"
                },
                "silent": {
                    "type": "boolean",
                    "markdownDescription": "Make the base Vanilla entity silent"
                },
                "can_sun_burn": {
                    "type": "boolean"
                },
                "can_drop_loot": {
                    "type": "boolean",
                    "markdownDescription": "Allow dropping the Vanilla entity loot on death or not."
                },
                "mount_on_interact": {
                    "type": "boolean",
                    "markdownDescription": "Allow mounting (only if mount bones exists) on right click event. Set this to `false` if you want to handle it yourself via IA API or MythicMobs."
                },
                "shadow": {
                    "type": "boolean"
                },
                "max_health": {"type": "number"},
                "speed": {
                    "properties": {
                        "movement": {"type": "number"},
                        "flying": {"type": "number"}
                    }
                },
                "invulnerable": {
                    "type": "boolean",
                    "markdownDescription": "Default: `false`"
                },
                "gravity": {
                    "type": "boolean",
                    "markdownDescription": "Default: `true`"
                },
                "ai": {
                    "type": "boolean",
                    "markdownDescription": "Default: `true`"
                },
            }
        },
        "custom_block_variant": {
            "$id": "custom_block_variant",
            "type": "object",
            "required": ["model"],
            "properties": {
                "display_name": {
                    "type": "string",
                    "markdownDescription": "Display name of the custom entity"
                },
                "model": {
                    "type": "string",
                    "markdownDescription": "Specifies the path to the model file of the block, in form of a resource location.\nExamples: \nblock/my_block\nminecraft:block/stone",
                    "defaultSnippets": [{"body": "block/$0"}, {"body": "minecraft:block/$0"}]
                },
                "weight": {
                    "type": "integer",
                    "markdownDescription": "Sets the probability of the model for being used in the game, defaults to 1 (=100%). If more than one model is used for the same variant, the probability is calculated by dividing the individual model's weight by the sum of the weights of all models. (For example, if three models are used with weights 1, 1, and 2, then their combined weight would be 4 (1+1+2). The probability of each model being used would then be determined by dividing each weight by 4: 1/4, 1/4 and 2/4, or 25%, 25% and 50%, respectively.)"
                },
                "x": {
                    "type": "integer",
                    "markdownDescription": "Rotation of the model on the x-axis in increments of 90 degrees."
                },
                "y": {
                    "type": "integer",
                    "markdownDescription": "Rotation of the model on the y-axis in increments of 90 degrees."
                },
                "uvlock": {
                    "type": "boolean",
                    "markdownDescription": "Can be true or false (default). Locks the rotation of the texture of a block, if set to true. This way the texture does not rotate with the block when using the x and y-tags above."
                }
            }
        },
        "emote": {
            "$id": "emote",
            "markdownDescription": "Custom emote properties",
            "type": "object",
            "required": ["id"],
            "additionalProperties": false,
            "properties": {
                "id": {
                    "type": "string",
                    "kind": 5,
                    "markdownDescription": "Emote identifier. Example: `death`"
                },
                "enabled": {
                    "markdownDescription": "With this setting you can disable an emote completely without deleting it in the emotes file using Blockbench.",
                    "type": "boolean",
                    "kind": 0
                },
                "hide_equipment": {
                    "type": "object",
                    "markdownDescription": "Hide some equipment pieces during animation.",
                    "properties": {
                        "helmet": {
                            "type": "boolean",
                            "markdownDescription": "Helmet item will be hidden during animation if set to `true`.",
                        },
                        "mainhand": {
                            "type": "boolean",
                            "markdownDescription": "Main hand item will be hidden during animation if set to `true`.",
                        },
                        "offhand": {
                            "type": "boolean",
                            "markdownDescription": "Off hand item will be hidden during animation if set to `true`.",
                        }
                    }
                },
                "can_player_move": {
                    "type": "boolean",
                    "markdownDescription": "If player can move around and jump during animation."
                },
                "cancel_conditions": {
                    "type": "object",
                    "properties": {
                        "sneak": {
                            "type": "boolean",
                            "markdownDescription": "Cancel the animation when player toggles sneak."
                        },
                        "take_damage": {
                            "type": "boolean",
                            "markdownDescription": "Cancel the animation when player takes damage."
                        },
                        "deal_damage": {
                            "type": "boolean",
                            "markdownDescription": "Cancel the animation when player deals damage to another entity."
                        },
                        "in_air": {
                            "type": "boolean",
                            "markdownDescription": "Do not start animation when the player is falling, this avoids players from exploiting animations to remove fall damage (if the `can_player_move` is `true`)."
                        }
                    }
                },
                "on_stop": {
                    "type": "object",
                    "markdownDescription": "Actions to be executed when the emote stops.",
                    "properties": {
                        "stop_sounds": {
                            "type": "boolean",
                            "markdownDescription": "Stop all sounds. Default `false`."
                        },
                        "skip_emote_end": {
                            "type": "boolean",
                            "markdownDescription": "Interrupts the emote. Default `false`."
                        }
                    }
                }
            }
        },
        "ticks": {
            "$id": "ticks",
            "type": "integer",
            "defaultSnippets": [
                {"body": "20", "label": "20 (1 second)"},
                {"body": "40", "label": "40 (2 seconds)"},
                {"body": "60", "label": "60 (3 seconds)"},
                {"body": "100", "label": "100 (5 seconds)"},
                {"body": "200", "label": "200 (10 seconds)"},
                {"body": "400", "label": "400 (20 seconds)"},
                {"body": "1200", "label": "1200 (1 minute)"},
                {"body": "6000", "label": "6000 (5 minutes)"},
                {"body": "12000", "label": "12000 (10 minutes)"},
                {"body": "24000", "label": "24000 (20 minutes)"},
                {"body": "36000", "label": "36000 (30 minutes)"},
                {"body": "72000", "label": "72000 (1 hour)"},
                {"body": "2147483647", "label": "2147483647 (forever)"}
            ]
        },
        "potion_amplifier": {
            "$id": "potion_amplifier",
            "type": "integer",
                "markdownDescription": "Amplifier level",
                "defaultSnippets": [
                    {"body": "0", "label": "0 (I)"},
                    {"body": "1", "label": "1 (II)"},
                    {"body": "2", "label": "2 (III)"},
                    {"body": "3", "label": "3 (IV)"},
                    {"body": "4", "label": "4 (V)"},
                ]
        },
        "consumable_effect_apply_status_effects": {
            "$id": "consumable_effect_apply_status_effects",
            "type": "object",
            "required": ["effects"],
            "markdownDescription": "Adds status effects",
            "additionalProperties": false,
            "properties": {
                "effects": {
                    "markdownDescription": "List of status effects to be applied",
                    "additionalProperties": {
                        "type": "object",
                        "$ref": "#/$defs/consumable_status_effect"
                    },
                    "properties": { 
                        "effect_1": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_2": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_3": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_4": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_5": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_6": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_7": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_8": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_9": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_10": { "$ref": "#/$defs/consumable_status_effect" },
                        "effect_xx": { "$ref": "#/$defs/consumable_status_effect" }
                    }
                },
                "probability": {
                    "type": "number",
                    "markdownDescription": "Probability of this effects list to be applied. Default `1`.",
                    "default": 1.0
                }
            }
        },
        "consumable_status_effect": {
            "$id": "consumable_status_effect",
            "type": "object",
            "required": ["potion", "duration", "amplifier"],
            "markdownDescription": "Adds a status effect",
            "additionalProperties": false,
            "properties": {
                "potion": {"$ref": "#/$defs/bukkit_potion_effect_type"},
                "duration": {"$ref": "#/$defs/ticks"},
                "amplifier": {"$ref": "#/$defs/potion_amplifier"},
                "ambient": {
                    "type": "boolean",
                    "markdownDescription": "Ambient effect"
                },
                "particles": {
                    "type": "boolean",
                    "markdownDescription": "If particles should be shown"
                },
                "icon": {
                    "type": "boolean",
                    "markdownDescription": "If icon should be shown in the inventory"
                }
            }
        },
        "consumable_effect_remove_status_effects": {
            "$id": "consumable_effect_remove_status_effects",
            "type": "object",
            "markdownDescription": "Removes some status effects",
            "required": ["effects"],
            "additionalProperties": false,
            "properties": {
                "effects": {
                    "type": "array",
                    "items": {
                        "$ref": "#/$defs/bukkit_potion_effect_type"
                    }
                }
            }
        },
        "consumable_effect_play_sound": {
            "$id": "consumable_effect_play_sound",
            "type": "object",
            "required": ["sound"],
            "markdownDescription": "Play a sound when the item is consumed completely",
            "additionalProperties": false,
            "properties": {
                "sound": { "$ref": "#/$defs/vanilla_and_custom_sound" },
            }
        },
        "consumable_effect_teleport_randomly": {
            "$id": "consumable_effect_teleport_randomly",
            "type": "object",
            "required": ["diameter"],
            "markdownDescription": "Teleport player randomly",
            "additionalProperties": false,
            "properties": {
                "diameter": {
                    "type": "number",
                    "default": 5,
                    "markdownDescription": "Diameter of the teleportation area"
                }
            }
        }
    }
};