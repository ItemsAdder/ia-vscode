/* eslint-disable @typescript-eslint/naming-convention */
export const schemas = {
    "$id": "ia-schema",
    "$schema": "file://ia-schema/schema.json",
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
                "custom_item": {
                    "$ref": "#/$defs/item"
                },
                "custom_item_2": {
                    "$ref": "#/$defs/item"
                },
                "custom_item_xxx": {
                    "$ref": "#/$defs/item"
                }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.craft"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.craft"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.craft"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.cooking"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.cooking"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.cooking"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.anvil_repair"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.anvil_repair"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.anvil_repair"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.smithing"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.smithing"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/recipe.smithing"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/loot.block"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/loot.block"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/loot.block"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/loot.mobs"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/loot.mobs"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/loot.mobs"
                        }
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
                        "change_me": {
                            "type": "object",
                            "$ref": "#/$defs/loot.fishing"
                        },
                        "change_me_2": {
                            "type": "object",
                            "$ref": "#/$defs/loot.fishing"
                        },
                        "change_me_xxx": {
                            "type": "object",
                            "$ref": "#/$defs/loot.fishing"
                        }
                    }
                }
            }
        },
        "worlds_populators": {
            "type": "object",
            "markdownDescription": "Create rules to spawn custom ores around your worlds.\n**They will be spawned only on new chunks.**\n**Pregenerated worlds or already generated chunks won't be affected to avoid risky overwrite**",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/worlds_populator"
            },
            "properties": {
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/worlds_populator"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/worlds_populator"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/worlds_populator"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/trees_populators"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/trees_populators"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/trees_populators"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/surface_decorators"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/surface_decorators"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/surface_decorators"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/cave_decorators"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/cave_decorators"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/cave_decorators"
                }
            }
        },
        "font_images": {
            "type": "object",
            "markdownDescription": "Create your own font characters. You can use them as emoji, GUI texture, HUD...\nIt's basically an image shown in texts.",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/font_image"
            },
            "properties": {
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/font_image"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/font_image"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/font_image"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/hud"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/hud"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/hud"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/ia_categories"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/ia_categories"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/ia_categories"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/liquid"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/liquid"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/liquid"
                }
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/minecraft_lang_overwrite"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/minecraft_lang_overwrite"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/minecraft_lang_overwrite"
                }
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
                "display-category-EXAMPLE": {
                    "type": "string",
                    "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
                },
                "display-category-EXAMPLE_2": {
                    "type": "string",
                    "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
                },
                "display-name-EXAMPLE_ITEM": {
                    "type": "string",
                    "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
                },
                "display-lore-EXAMPLE_ITEM": {
                    "type": "string",
                    "markdownDescription": "You can then use this property name as any item name or /ia category, it will be replaced with this value."
                },
                "EXAMPLE": {
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
                "change_me": {
                    "type": "object",
                    "$ref": "#/$defs/entity"
                },
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/entity"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/entity"
                }
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
                "emote": {
                    "$ref": "#/$defs/emote"
                },
                "emote_2": {
                    "$ref": "#/$defs/emote"
                },
                "emote_3": {
                    "$ref": "#/$defs/emote"
                }
            }
        },
        "armors_rendering": {
            "$id": "armors_rendering",
            "type": "object",
            "kind": 5,
            "detail": "(collection)",
            "additionalProperties": {
                "type": "object",
                "$ref": "#/$defs/armors_rendering_entry"
            },
            "properties": {
                "change_me": {"type": "object", "$ref": "#/$defs/armors_rendering_entry"},
                "change_me_2": {
                    "type": "object",
                    "$ref": "#/$defs/armors_rendering_entry"
                },
                "change_me_xxx": {
                    "type": "object",
                    "$ref": "#/$defs/armors_rendering_entry"
                }
            }
        }
    },
    "$defs": {
        "attribute_modifiers": {
            "$id": "attribute_modifiers",
            "type": "object",
            "markdownDescription": "These are the vanilla attribute modifiers, you can get more info here https://minecraft.gamepedia.com/Attribute#Attributes_available_on_all_living_entities",
            "properties": {
                "attackDamage": {"$ref": "#/$defs/attribute_modifier"},
                "attackSpeed": {"$ref": "#/$defs/attribute_modifier"},
                "maxHealth": {"$ref": "#/$defs/attribute_modifier"},
                "movementSpeed": {"$ref": "#/$defs/attribute_modifier"},
                "armor": {"$ref": "#/$defs/attribute_modifier"},
                "armorToughness": {"$ref": "#/$defs/attribute_modifier"},
                "attackKnockback": {"$ref": "#/$defs/attribute_modifier"},
                "luck": {"$ref": "#/$defs/attribute_modifier"}
            }
        },
        "attribute_modifier": {
            "$id": "attribute_modifier",
            "markdownDescription": "You can directly set a value or press ENTER and specify value and operation.",
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
                    "markdownDescription": "You can directly set a value or press ENTER and specify value and operation.",
                    "type": "number"
                }
            ]
        },
        "vanilla_enchants": {
            "$id": "vanilla_enchants",
            "title": "Vanilla enchants",
            "type": "string",
            "enum": [
                "PROTECTION_ENVIRONMENTAL",
                "PROTECTION_FIRE",
                "PROTECTION_FALL",
                "PROTECTION_EXPLOSIONS",
                "PROTECTION_PROJECTILE",
                "OXYGEN",
                "WATER_WORKER",
                "THORNS",
                "DEPTH_STRIDER",
                "FROST_WALKER",
                "BINDING_CURSE",
                "DAMAGE_ALL",
                "DAMAGE_UNDEAD",
                "DAMAGE_ARTHROPODS",
                "KNOCKBACK",
                "FIRE_ASPECT",
                "LOOT_BONUS_MOBS",
                "SWEEPING_EDGE",
                "DIG_SPEED",
                "SILK_TOUCH",
                "DURABILITY",
                "LOOT_BONUS_BLOCKS",
                "ARROW_DAMAGE",
                "ARROW_KNOCKBACK",
                "ARROW_FIRE",
                "ARROW_INFINITE",
                "LUCK",
                "LURE",
                "LOYALTY",
                "IMPALING",
                "RIPTIDE",
                "CHANNELING",
                "MULTISHOT",
                "QUICK_CHARGE",
                "PIERCING",
                "MENDING",
                "VANISHING_CURSE",
                "SOUL_SPEED"
            ]
        },
        "vanilla_materials_and_customitems": {
            "$id": "vanilla_materials_and_customitems",
            "title": "Vanilla / ItemsAdder custom item",
            "markdownDescription": "Examples: **STONE**, **itemsadder:ruby**, **ruby**",
            "type": "string",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        "AIR",
                        "STONE",
                        "GRANITE",
                        "POLISHED_GRANITE",
                        "DIORITE",
                        "POLISHED_DIORITE",
                        "ANDESITE",
                        "POLISHED_ANDESITE",
                        "GRASS_BLOCK",
                        "DIRT",
                        "COARSE_DIRT",
                        "PODZOL",
                        "CRIMSON_NYLIUM",
                        "WARPED_NYLIUM",
                        "COBBLESTONE",
                        "OAK_PLANKS",
                        "SPRUCE_PLANKS",
                        "BIRCH_PLANKS",
                        "JUNGLE_PLANKS",
                        "ACACIA_PLANKS",
                        "DARK_OAK_PLANKS",
                        "CRIMSON_PLANKS",
                        "WARPED_PLANKS",
                        "OAK_SAPLING",
                        "SPRUCE_SAPLING",
                        "BIRCH_SAPLING",
                        "JUNGLE_SAPLING",
                        "ACACIA_SAPLING",
                        "DARK_OAK_SAPLING",
                        "BEDROCK",
                        "SAND",
                        "RED_SAND",
                        "GRAVEL",
                        "GOLD_ORE",
                        "IRON_ORE",
                        "COAL_ORE",
                        "NETHER_GOLD_ORE",
                        "OAK_LOG",
                        "SPRUCE_LOG",
                        "BIRCH_LOG",
                        "JUNGLE_LOG",
                        "ACACIA_LOG",
                        "DARK_OAK_LOG",
                        "CRIMSON_STEM",
                        "WARPED_STEM",
                        "STRIPPED_OAK_LOG",
                        "STRIPPED_SPRUCE_LOG",
                        "STRIPPED_BIRCH_LOG",
                        "STRIPPED_JUNGLE_LOG",
                        "STRIPPED_ACACIA_LOG",
                        "STRIPPED_DARK_OAK_LOG",
                        "STRIPPED_CRIMSON_STEM",
                        "STRIPPED_WARPED_STEM",
                        "STRIPPED_OAK_WOOD",
                        "STRIPPED_SPRUCE_WOOD",
                        "STRIPPED_BIRCH_WOOD",
                        "STRIPPED_JUNGLE_WOOD",
                        "STRIPPED_ACACIA_WOOD",
                        "STRIPPED_DARK_OAK_WOOD",
                        "STRIPPED_CRIMSON_HYPHAE",
                        "STRIPPED_WARPED_HYPHAE",
                        "OAK_WOOD",
                        "SPRUCE_WOOD",
                        "BIRCH_WOOD",
                        "JUNGLE_WOOD",
                        "ACACIA_WOOD",
                        "DARK_OAK_WOOD",
                        "CRIMSON_HYPHAE",
                        "WARPED_HYPHAE",
                        "OAK_LEAVES",
                        "SPRUCE_LEAVES",
                        "BIRCH_LEAVES",
                        "JUNGLE_LEAVES",
                        "ACACIA_LEAVES",
                        "DARK_OAK_LEAVES",
                        "SPONGE",
                        "WET_SPONGE",
                        "GLASS",
                        "LAPIS_ORE",
                        "LAPIS_BLOCK",
                        "DISPENSER",
                        "SANDSTONE",
                        "CHISELED_SANDSTONE",
                        "CUT_SANDSTONE",
                        "NOTE_BLOCK",
                        "POWERED_RAIL",
                        "DETECTOR_RAIL",
                        "STICKY_PISTON",
                        "COBWEB",
                        "GRASS",
                        "FERN",
                        "DEAD_BUSH",
                        "SEAGRASS",
                        "SEA_PICKLE",
                        "PISTON",
                        "WHITE_WOOL",
                        "ORANGE_WOOL",
                        "MAGENTA_WOOL",
                        "LIGHT_BLUE_WOOL",
                        "YELLOW_WOOL",
                        "LIME_WOOL",
                        "PINK_WOOL",
                        "GRAY_WOOL",
                        "LIGHT_GRAY_WOOL",
                        "CYAN_WOOL",
                        "PURPLE_WOOL",
                        "BLUE_WOOL",
                        "BROWN_WOOL",
                        "GREEN_WOOL",
                        "RED_WOOL",
                        "BLACK_WOOL",
                        "DANDELION",
                        "POPPY",
                        "BLUE_ORCHID",
                        "ALLIUM",
                        "AZURE_BLUET",
                        "RED_TULIP",
                        "ORANGE_TULIP",
                        "WHITE_TULIP",
                        "PINK_TULIP",
                        "OXEYE_DAISY",
                        "CORNFLOWER",
                        "LILY_OF_THE_VALLEY",
                        "WITHER_ROSE",
                        "BROWN_MUSHROOM",
                        "RED_MUSHROOM",
                        "CRIMSON_FUNGUS",
                        "WARPED_FUNGUS",
                        "CRIMSON_ROOTS",
                        "WARPED_ROOTS",
                        "NETHER_SPROUTS",
                        "WEEPING_VINES",
                        "TWISTING_VINES",
                        "SUGAR_CANE",
                        "KELP",
                        "BAMBOO",
                        "GOLD_BLOCK",
                        "IRON_BLOCK",
                        "OAK_SLAB",
                        "SPRUCE_SLAB",
                        "BIRCH_SLAB",
                        "JUNGLE_SLAB",
                        "ACACIA_SLAB",
                        "DARK_OAK_SLAB",
                        "CRIMSON_SLAB",
                        "WARPED_SLAB",
                        "STONE_SLAB",
                        "SMOOTH_STONE_SLAB",
                        "SANDSTONE_SLAB",
                        "CUT_SANDSTONE_SLAB",
                        "PETRIFIED_OAK_SLAB",
                        "COBBLESTONE_SLAB",
                        "BRICK_SLAB",
                        "STONE_BRICK_SLAB",
                        "NETHER_BRICK_SLAB",
                        "QUARTZ_SLAB",
                        "RED_SANDSTONE_SLAB",
                        "CUT_RED_SANDSTONE_SLAB",
                        "PURPUR_SLAB",
                        "PRISMARINE_SLAB",
                        "PRISMARINE_BRICK_SLAB",
                        "DARK_PRISMARINE_SLAB",
                        "SMOOTH_QUARTZ",
                        "SMOOTH_RED_SANDSTONE",
                        "SMOOTH_SANDSTONE",
                        "SMOOTH_STONE",
                        "BRICKS",
                        "TNT",
                        "BOOKSHELF",
                        "MOSSY_COBBLESTONE",
                        "OBSIDIAN",
                        "TORCH",
                        "END_ROD",
                        "CHORUS_PLANT",
                        "CHORUS_FLOWER",
                        "PURPUR_BLOCK",
                        "PURPUR_PILLAR",
                        "PURPUR_STAIRS",
                        "SPAWNER",
                        "OAK_STAIRS",
                        "CHEST",
                        "DIAMOND_ORE",
                        "DIAMOND_BLOCK",
                        "CRAFTING_TABLE",
                        "FARMLAND",
                        "FURNACE",
                        "LADDER",
                        "RAIL",
                        "COBBLESTONE_STAIRS",
                        "LEVER",
                        "STONE_PRESSURE_PLATE",
                        "OAK_PRESSURE_PLATE",
                        "SPRUCE_PRESSURE_PLATE",
                        "BIRCH_PRESSURE_PLATE",
                        "JUNGLE_PRESSURE_PLATE",
                        "ACACIA_PRESSURE_PLATE",
                        "DARK_OAK_PRESSURE_PLATE",
                        "CRIMSON_PRESSURE_PLATE",
                        "WARPED_PRESSURE_PLATE",
                        "POLISHED_BLACKSTONE_PRESSURE_PLATE",
                        "REDSTONE_ORE",
                        "REDSTONE_TORCH",
                        "SNOW",
                        "ICE",
                        "SNOW_BLOCK",
                        "CACTUS",
                        "CLAY",
                        "JUKEBOX",
                        "OAK_FENCE",
                        "SPRUCE_FENCE",
                        "BIRCH_FENCE",
                        "JUNGLE_FENCE",
                        "ACACIA_FENCE",
                        "DARK_OAK_FENCE",
                        "CRIMSON_FENCE",
                        "WARPED_FENCE",
                        "PUMPKIN",
                        "CARVED_PUMPKIN",
                        "NETHERRACK",
                        "SOUL_SAND",
                        "SOUL_SOIL",
                        "BASALT",
                        "POLISHED_BASALT",
                        "SOUL_TORCH",
                        "GLOWSTONE",
                        "JACK_O_LANTERN",
                        "OAK_TRAPDOOR",
                        "SPRUCE_TRAPDOOR",
                        "BIRCH_TRAPDOOR",
                        "JUNGLE_TRAPDOOR",
                        "ACACIA_TRAPDOOR",
                        "DARK_OAK_TRAPDOOR",
                        "CRIMSON_TRAPDOOR",
                        "WARPED_TRAPDOOR",
                        "INFESTED_STONE",
                        "INFESTED_COBBLESTONE",
                        "INFESTED_STONE_BRICKS",
                        "INFESTED_MOSSY_STONE_BRICKS",
                        "INFESTED_CRACKED_STONE_BRICKS",
                        "INFESTED_CHISELED_STONE_BRICKS",
                        "STONE_BRICKS",
                        "MOSSY_STONE_BRICKS",
                        "CRACKED_STONE_BRICKS",
                        "CHISELED_STONE_BRICKS",
                        "BROWN_MUSHROOM_BLOCK",
                        "RED_MUSHROOM_BLOCK",
                        "MUSHROOM_STEM",
                        "IRON_BARS",
                        "CHAIN",
                        "GLASS_PANE",
                        "MELON",
                        "VINE",
                        "OAK_FENCE_GATE",
                        "SPRUCE_FENCE_GATE",
                        "BIRCH_FENCE_GATE",
                        "JUNGLE_FENCE_GATE",
                        "ACACIA_FENCE_GATE",
                        "DARK_OAK_FENCE_GATE",
                        "CRIMSON_FENCE_GATE",
                        "WARPED_FENCE_GATE",
                        "BRICK_STAIRS",
                        "STONE_BRICK_STAIRS",
                        "MYCELIUM",
                        "LILY_PAD",
                        "NETHER_BRICKS",
                        "CRACKED_NETHER_BRICKS",
                        "CHISELED_NETHER_BRICKS",
                        "NETHER_BRICK_FENCE",
                        "NETHER_BRICK_STAIRS",
                        "ENCHANTING_TABLE",
                        "END_PORTAL_FRAME",
                        "END_STONE",
                        "END_STONE_BRICKS",
                        "DRAGON_EGG",
                        "REDSTONE_LAMP",
                        "SANDSTONE_STAIRS",
                        "EMERALD_ORE",
                        "ENDER_CHEST",
                        "TRIPWIRE_HOOK",
                        "EMERALD_BLOCK",
                        "SPRUCE_STAIRS",
                        "BIRCH_STAIRS",
                        "JUNGLE_STAIRS",
                        "CRIMSON_STAIRS",
                        "WARPED_STAIRS",
                        "COMMAND_BLOCK",
                        "BEACON",
                        "COBBLESTONE_WALL",
                        "MOSSY_COBBLESTONE_WALL",
                        "BRICK_WALL",
                        "PRISMARINE_WALL",
                        "RED_SANDSTONE_WALL",
                        "MOSSY_STONE_BRICK_WALL",
                        "GRANITE_WALL",
                        "STONE_BRICK_WALL",
                        "NETHER_BRICK_WALL",
                        "ANDESITE_WALL",
                        "RED_NETHER_BRICK_WALL",
                        "SANDSTONE_WALL",
                        "END_STONE_BRICK_WALL",
                        "DIORITE_WALL",
                        "BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_BRICK_WALL",
                        "STONE_BUTTON",
                        "OAK_BUTTON",
                        "SPRUCE_BUTTON",
                        "BIRCH_BUTTON",
                        "JUNGLE_BUTTON",
                        "ACACIA_BUTTON",
                        "DARK_OAK_BUTTON",
                        "CRIMSON_BUTTON",
                        "WARPED_BUTTON",
                        "POLISHED_BLACKSTONE_BUTTON",
                        "ANVIL",
                        "CHIPPED_ANVIL",
                        "DAMAGED_ANVIL",
                        "TRAPPED_CHEST",
                        "LIGHT_WEIGHTED_PRESSURE_PLATE",
                        "HEAVY_WEIGHTED_PRESSURE_PLATE",
                        "DAYLIGHT_DETECTOR",
                        "REDSTONE_BLOCK",
                        "NETHER_QUARTZ_ORE",
                        "HOPPER",
                        "CHISELED_QUARTZ_BLOCK",
                        "QUARTZ_BLOCK",
                        "QUARTZ_BRICKS",
                        "QUARTZ_PILLAR",
                        "QUARTZ_STAIRS",
                        "ACTIVATOR_RAIL",
                        "DROPPER",
                        "WHITE_TERRACOTTA",
                        "ORANGE_TERRACOTTA",
                        "MAGENTA_TERRACOTTA",
                        "LIGHT_BLUE_TERRACOTTA",
                        "YELLOW_TERRACOTTA",
                        "LIME_TERRACOTTA",
                        "PINK_TERRACOTTA",
                        "GRAY_TERRACOTTA",
                        "LIGHT_GRAY_TERRACOTTA",
                        "CYAN_TERRACOTTA",
                        "PURPLE_TERRACOTTA",
                        "BLUE_TERRACOTTA",
                        "BROWN_TERRACOTTA",
                        "GREEN_TERRACOTTA",
                        "RED_TERRACOTTA",
                        "BLACK_TERRACOTTA",
                        "BARRIER",
                        "IRON_TRAPDOOR",
                        "HAY_BLOCK",
                        "WHITE_CARPET",
                        "ORANGE_CARPET",
                        "MAGENTA_CARPET",
                        "LIGHT_BLUE_CARPET",
                        "YELLOW_CARPET",
                        "LIME_CARPET",
                        "PINK_CARPET",
                        "GRAY_CARPET",
                        "LIGHT_GRAY_CARPET",
                        "CYAN_CARPET",
                        "PURPLE_CARPET",
                        "BLUE_CARPET",
                        "BROWN_CARPET",
                        "GREEN_CARPET",
                        "RED_CARPET",
                        "BLACK_CARPET",
                        "TERRACOTTA",
                        "COAL_BLOCK",
                        "PACKED_ICE",
                        "ACACIA_STAIRS",
                        "DARK_OAK_STAIRS",
                        "SLIME_BLOCK",
                        "GRASS_PATH",
                        "SUNFLOWER",
                        "LILAC",
                        "ROSE_BUSH",
                        "PEONY",
                        "TALL_GRASS",
                        "LARGE_FERN",
                        "WHITE_STAINED_GLASS",
                        "ORANGE_STAINED_GLASS",
                        "MAGENTA_STAINED_GLASS",
                        "LIGHT_BLUE_STAINED_GLASS",
                        "YELLOW_STAINED_GLASS",
                        "LIME_STAINED_GLASS",
                        "PINK_STAINED_GLASS",
                        "GRAY_STAINED_GLASS",
                        "LIGHT_GRAY_STAINED_GLASS",
                        "CYAN_STAINED_GLASS",
                        "PURPLE_STAINED_GLASS",
                        "BLUE_STAINED_GLASS",
                        "BROWN_STAINED_GLASS",
                        "GREEN_STAINED_GLASS",
                        "RED_STAINED_GLASS",
                        "BLACK_STAINED_GLASS",
                        "WHITE_STAINED_GLASS_PANE",
                        "ORANGE_STAINED_GLASS_PANE",
                        "MAGENTA_STAINED_GLASS_PANE",
                        "LIGHT_BLUE_STAINED_GLASS_PANE",
                        "YELLOW_STAINED_GLASS_PANE",
                        "LIME_STAINED_GLASS_PANE",
                        "PINK_STAINED_GLASS_PANE",
                        "GRAY_STAINED_GLASS_PANE",
                        "LIGHT_GRAY_STAINED_GLASS_PANE",
                        "CYAN_STAINED_GLASS_PANE",
                        "PURPLE_STAINED_GLASS_PANE",
                        "BLUE_STAINED_GLASS_PANE",
                        "BROWN_STAINED_GLASS_PANE",
                        "GREEN_STAINED_GLASS_PANE",
                        "RED_STAINED_GLASS_PANE",
                        "BLACK_STAINED_GLASS_PANE",
                        "PRISMARINE",
                        "PRISMARINE_BRICKS",
                        "DARK_PRISMARINE",
                        "PRISMARINE_STAIRS",
                        "PRISMARINE_BRICK_STAIRS",
                        "DARK_PRISMARINE_STAIRS",
                        "SEA_LANTERN",
                        "RED_SANDSTONE",
                        "CHISELED_RED_SANDSTONE",
                        "CUT_RED_SANDSTONE",
                        "RED_SANDSTONE_STAIRS",
                        "REPEATING_COMMAND_BLOCK",
                        "CHAIN_COMMAND_BLOCK",
                        "MAGMA_BLOCK",
                        "NETHER_WART_BLOCK",
                        "WARPED_WART_BLOCK",
                        "RED_NETHER_BRICKS",
                        "BONE_BLOCK",
                        "STRUCTURE_VOID",
                        "OBSERVER",
                        "SHULKER_BOX",
                        "WHITE_SHULKER_BOX",
                        "ORANGE_SHULKER_BOX",
                        "MAGENTA_SHULKER_BOX",
                        "LIGHT_BLUE_SHULKER_BOX",
                        "YELLOW_SHULKER_BOX",
                        "LIME_SHULKER_BOX",
                        "PINK_SHULKER_BOX",
                        "GRAY_SHULKER_BOX",
                        "LIGHT_GRAY_SHULKER_BOX",
                        "CYAN_SHULKER_BOX",
                        "PURPLE_SHULKER_BOX",
                        "BLUE_SHULKER_BOX",
                        "BROWN_SHULKER_BOX",
                        "GREEN_SHULKER_BOX",
                        "RED_SHULKER_BOX",
                        "BLACK_SHULKER_BOX",
                        "WHITE_GLAZED_TERRACOTTA",
                        "ORANGE_GLAZED_TERRACOTTA",
                        "MAGENTA_GLAZED_TERRACOTTA",
                        "LIGHT_BLUE_GLAZED_TERRACOTTA",
                        "YELLOW_GLAZED_TERRACOTTA",
                        "LIME_GLAZED_TERRACOTTA",
                        "PINK_GLAZED_TERRACOTTA",
                        "GRAY_GLAZED_TERRACOTTA",
                        "LIGHT_GRAY_GLAZED_TERRACOTTA",
                        "CYAN_GLAZED_TERRACOTTA",
                        "PURPLE_GLAZED_TERRACOTTA",
                        "BLUE_GLAZED_TERRACOTTA",
                        "BROWN_GLAZED_TERRACOTTA",
                        "GREEN_GLAZED_TERRACOTTA",
                        "RED_GLAZED_TERRACOTTA",
                        "BLACK_GLAZED_TERRACOTTA",
                        "WHITE_CONCRETE",
                        "ORANGE_CONCRETE",
                        "MAGENTA_CONCRETE",
                        "LIGHT_BLUE_CONCRETE",
                        "YELLOW_CONCRETE",
                        "LIME_CONCRETE",
                        "PINK_CONCRETE",
                        "GRAY_CONCRETE",
                        "LIGHT_GRAY_CONCRETE",
                        "CYAN_CONCRETE",
                        "PURPLE_CONCRETE",
                        "BLUE_CONCRETE",
                        "BROWN_CONCRETE",
                        "GREEN_CONCRETE",
                        "RED_CONCRETE",
                        "BLACK_CONCRETE",
                        "WHITE_CONCRETE_POWDER",
                        "ORANGE_CONCRETE_POWDER",
                        "MAGENTA_CONCRETE_POWDER",
                        "LIGHT_BLUE_CONCRETE_POWDER",
                        "YELLOW_CONCRETE_POWDER",
                        "LIME_CONCRETE_POWDER",
                        "PINK_CONCRETE_POWDER",
                        "GRAY_CONCRETE_POWDER",
                        "LIGHT_GRAY_CONCRETE_POWDER",
                        "CYAN_CONCRETE_POWDER",
                        "PURPLE_CONCRETE_POWDER",
                        "BLUE_CONCRETE_POWDER",
                        "BROWN_CONCRETE_POWDER",
                        "GREEN_CONCRETE_POWDER",
                        "RED_CONCRETE_POWDER",
                        "BLACK_CONCRETE_POWDER",
                        "TURTLE_EGG",
                        "DEAD_TUBE_CORAL_BLOCK",
                        "DEAD_BRAIN_CORAL_BLOCK",
                        "DEAD_BUBBLE_CORAL_BLOCK",
                        "DEAD_FIRE_CORAL_BLOCK",
                        "DEAD_HORN_CORAL_BLOCK",
                        "TUBE_CORAL_BLOCK",
                        "BRAIN_CORAL_BLOCK",
                        "BUBBLE_CORAL_BLOCK",
                        "FIRE_CORAL_BLOCK",
                        "HORN_CORAL_BLOCK",
                        "TUBE_CORAL",
                        "BRAIN_CORAL",
                        "BUBBLE_CORAL",
                        "FIRE_CORAL",
                        "HORN_CORAL",
                        "DEAD_BRAIN_CORAL",
                        "DEAD_BUBBLE_CORAL",
                        "DEAD_FIRE_CORAL",
                        "DEAD_HORN_CORAL",
                        "DEAD_TUBE_CORAL",
                        "TUBE_CORAL_FAN",
                        "BRAIN_CORAL_FAN",
                        "BUBBLE_CORAL_FAN",
                        "FIRE_CORAL_FAN",
                        "HORN_CORAL_FAN",
                        "DEAD_TUBE_CORAL_FAN",
                        "DEAD_BRAIN_CORAL_FAN",
                        "DEAD_BUBBLE_CORAL_FAN",
                        "DEAD_FIRE_CORAL_FAN",
                        "DEAD_HORN_CORAL_FAN",
                        "BLUE_ICE",
                        "CONDUIT",
                        "POLISHED_GRANITE_STAIRS",
                        "SMOOTH_RED_SANDSTONE_STAIRS",
                        "MOSSY_STONE_BRICK_STAIRS",
                        "POLISHED_DIORITE_STAIRS",
                        "MOSSY_COBBLESTONE_STAIRS",
                        "END_STONE_BRICK_STAIRS",
                        "STONE_STAIRS",
                        "SMOOTH_SANDSTONE_STAIRS",
                        "SMOOTH_QUARTZ_STAIRS",
                        "GRANITE_STAIRS",
                        "ANDESITE_STAIRS",
                        "RED_NETHER_BRICK_STAIRS",
                        "POLISHED_ANDESITE_STAIRS",
                        "DIORITE_STAIRS",
                        "POLISHED_GRANITE_SLAB",
                        "SMOOTH_RED_SANDSTONE_SLAB",
                        "MOSSY_STONE_BRICK_SLAB",
                        "POLISHED_DIORITE_SLAB",
                        "MOSSY_COBBLESTONE_SLAB",
                        "END_STONE_BRICK_SLAB",
                        "SMOOTH_SANDSTONE_SLAB",
                        "SMOOTH_QUARTZ_SLAB",
                        "GRANITE_SLAB",
                        "ANDESITE_SLAB",
                        "RED_NETHER_BRICK_SLAB",
                        "POLISHED_ANDESITE_SLAB",
                        "DIORITE_SLAB",
                        "SCAFFOLDING",
                        "IRON_DOOR",
                        "OAK_DOOR",
                        "SPRUCE_DOOR",
                        "BIRCH_DOOR",
                        "JUNGLE_DOOR",
                        "ACACIA_DOOR",
                        "DARK_OAK_DOOR",
                        "CRIMSON_DOOR",
                        "WARPED_DOOR",
                        "REPEATER",
                        "COMPARATOR",
                        "STRUCTURE_BLOCK",
                        "JIGSAW",
                        "TURTLE_HELMET",
                        "SCUTE",
                        "FLINT_AND_STEEL",
                        "APPLE",
                        "BOW",
                        "ARROW",
                        "COAL",
                        "CHARCOAL",
                        "DIAMOND",
                        "IRON_INGOT",
                        "GOLD_INGOT",
                        "NETHERITE_INGOT",
                        "NETHERITE_SCRAP",
                        "WOODEN_SWORD",
                        "WOODEN_SHOVEL",
                        "WOODEN_PICKAXE",
                        "WOODEN_AXE",
                        "WOODEN_HOE",
                        "STONE_SWORD",
                        "STONE_SHOVEL",
                        "STONE_PICKAXE",
                        "STONE_AXE",
                        "STONE_HOE",
                        "GOLDEN_SWORD",
                        "GOLDEN_SHOVEL",
                        "GOLDEN_PICKAXE",
                        "GOLDEN_AXE",
                        "GOLDEN_HOE",
                        "IRON_SWORD",
                        "IRON_SHOVEL",
                        "IRON_PICKAXE",
                        "IRON_AXE",
                        "IRON_HOE",
                        "DIAMOND_SWORD",
                        "DIAMOND_SHOVEL",
                        "DIAMOND_PICKAXE",
                        "DIAMOND_AXE",
                        "DIAMOND_HOE",
                        "NETHERITE_SWORD",
                        "NETHERITE_SHOVEL",
                        "NETHERITE_PICKAXE",
                        "NETHERITE_AXE",
                        "NETHERITE_HOE",
                        "STICK",
                        "BOWL",
                        "MUSHROOM_STEW",
                        "STRING",
                        "FEATHER",
                        "GUNPOWDER",
                        "WHEAT_SEEDS",
                        "WHEAT",
                        "BREAD",
                        "LEATHER_HELMET",
                        "LEATHER_CHESTPLATE",
                        "LEATHER_LEGGINGS",
                        "LEATHER_BOOTS",
                        "CHAINMAIL_HELMET",
                        "CHAINMAIL_CHESTPLATE",
                        "CHAINMAIL_LEGGINGS",
                        "CHAINMAIL_BOOTS",
                        "IRON_HELMET",
                        "IRON_CHESTPLATE",
                        "IRON_LEGGINGS",
                        "IRON_BOOTS",
                        "DIAMOND_HELMET",
                        "DIAMOND_CHESTPLATE",
                        "DIAMOND_LEGGINGS",
                        "DIAMOND_BOOTS",
                        "GOLDEN_HELMET",
                        "GOLDEN_CHESTPLATE",
                        "GOLDEN_LEGGINGS",
                        "GOLDEN_BOOTS",
                        "NETHERITE_HELMET",
                        "NETHERITE_CHESTPLATE",
                        "NETHERITE_LEGGINGS",
                        "NETHERITE_BOOTS",
                        "FLINT",
                        "PORKCHOP",
                        "COOKED_PORKCHOP",
                        "PAINTING",
                        "GOLDEN_APPLE",
                        "ENCHANTED_GOLDEN_APPLE",
                        "OAK_SIGN",
                        "SPRUCE_SIGN",
                        "BIRCH_SIGN",
                        "JUNGLE_SIGN",
                        "ACACIA_SIGN",
                        "DARK_OAK_SIGN",
                        "CRIMSON_SIGN",
                        "WARPED_SIGN",
                        "BUCKET",
                        "WATER_BUCKET",
                        "LAVA_BUCKET",
                        "MINECART",
                        "SADDLE",
                        "REDSTONE",
                        "SNOWBALL",
                        "OAK_BOAT",
                        "LEATHER",
                        "MILK_BUCKET",
                        "PUFFERFISH_BUCKET",
                        "SALMON_BUCKET",
                        "COD_BUCKET",
                        "TROPICAL_FISH_BUCKET",
                        "BRICK",
                        "CLAY_BALL",
                        "DRIED_KELP_BLOCK",
                        "PAPER",
                        "BOOK",
                        "SLIME_BALL",
                        "CHEST_MINECART",
                        "FURNACE_MINECART",
                        "EGG",
                        "COMPASS",
                        "FISHING_ROD",
                        "CLOCK",
                        "GLOWSTONE_DUST",
                        "COD",
                        "SALMON",
                        "TROPICAL_FISH",
                        "PUFFERFISH",
                        "COOKED_COD",
                        "COOKED_SALMON",
                        "INK_SAC",
                        "COCOA_BEANS",
                        "LAPIS_LAZULI",
                        "WHITE_DYE",
                        "ORANGE_DYE",
                        "MAGENTA_DYE",
                        "LIGHT_BLUE_DYE",
                        "YELLOW_DYE",
                        "LIME_DYE",
                        "PINK_DYE",
                        "GRAY_DYE",
                        "LIGHT_GRAY_DYE",
                        "CYAN_DYE",
                        "PURPLE_DYE",
                        "BLUE_DYE",
                        "BROWN_DYE",
                        "GREEN_DYE",
                        "RED_DYE",
                        "BLACK_DYE",
                        "BONE_MEAL",
                        "BONE",
                        "SUGAR",
                        "CAKE",
                        "WHITE_BED",
                        "ORANGE_BED",
                        "MAGENTA_BED",
                        "LIGHT_BLUE_BED",
                        "YELLOW_BED",
                        "LIME_BED",
                        "PINK_BED",
                        "GRAY_BED",
                        "LIGHT_GRAY_BED",
                        "CYAN_BED",
                        "PURPLE_BED",
                        "BLUE_BED",
                        "BROWN_BED",
                        "GREEN_BED",
                        "RED_BED",
                        "BLACK_BED",
                        "COOKIE",
                        "FILLED_MAP",
                        "SHEARS",
                        "MELON_SLICE",
                        "DRIED_KELP",
                        "PUMPKIN_SEEDS",
                        "MELON_SEEDS",
                        "BEEF",
                        "COOKED_BEEF",
                        "CHICKEN",
                        "COOKED_CHICKEN",
                        "ROTTEN_FLESH",
                        "ENDER_PEARL",
                        "BLAZE_ROD",
                        "GHAST_TEAR",
                        "GOLD_NUGGET",
                        "NETHER_WART",
                        "POTION",
                        "GLASS_BOTTLE",
                        "SPIDER_EYE",
                        "FERMENTED_SPIDER_EYE",
                        "BLAZE_POWDER",
                        "MAGMA_CREAM",
                        "BREWING_STAND",
                        "CAULDRON",
                        "ENDER_EYE",
                        "GLISTERING_MELON_SLICE",
                        "BAT_SPAWN_EGG",
                        "BEE_SPAWN_EGG",
                        "BLAZE_SPAWN_EGG",
                        "CAT_SPAWN_EGG",
                        "CAVE_SPIDER_SPAWN_EGG",
                        "CHICKEN_SPAWN_EGG",
                        "COD_SPAWN_EGG",
                        "COW_SPAWN_EGG",
                        "CREEPER_SPAWN_EGG",
                        "DOLPHIN_SPAWN_EGG",
                        "DONKEY_SPAWN_EGG",
                        "DROWNED_SPAWN_EGG",
                        "ELDER_GUARDIAN_SPAWN_EGG",
                        "ENDERMAN_SPAWN_EGG",
                        "ENDERMITE_SPAWN_EGG",
                        "EVOKER_SPAWN_EGG",
                        "FOX_SPAWN_EGG",
                        "GHAST_SPAWN_EGG",
                        "GUARDIAN_SPAWN_EGG",
                        "HOGLIN_SPAWN_EGG",
                        "HORSE_SPAWN_EGG",
                        "HUSK_SPAWN_EGG",
                        "LLAMA_SPAWN_EGG",
                        "MAGMA_CUBE_SPAWN_EGG",
                        "MOOSHROOM_SPAWN_EGG",
                        "MULE_SPAWN_EGG",
                        "OCELOT_SPAWN_EGG",
                        "PANDA_SPAWN_EGG",
                        "PARROT_SPAWN_EGG",
                        "PHANTOM_SPAWN_EGG",
                        "PIG_SPAWN_EGG",
                        "PIGLIN_SPAWN_EGG",
                        "PIGLIN_BRUTE_SPAWN_EGG",
                        "PILLAGER_SPAWN_EGG",
                        "POLAR_BEAR_SPAWN_EGG",
                        "PUFFERFISH_SPAWN_EGG",
                        "RABBIT_SPAWN_EGG",
                        "RAVAGER_SPAWN_EGG",
                        "SALMON_SPAWN_EGG",
                        "SHEEP_SPAWN_EGG",
                        "SHULKER_SPAWN_EGG",
                        "SILVERFISH_SPAWN_EGG",
                        "SKELETON_SPAWN_EGG",
                        "SKELETON_HORSE_SPAWN_EGG",
                        "SLIME_SPAWN_EGG",
                        "SPIDER_SPAWN_EGG",
                        "SQUID_SPAWN_EGG",
                        "STRAY_SPAWN_EGG",
                        "STRIDER_SPAWN_EGG",
                        "TRADER_LLAMA_SPAWN_EGG",
                        "TROPICAL_FISH_SPAWN_EGG",
                        "TURTLE_SPAWN_EGG",
                        "VEX_SPAWN_EGG",
                        "VILLAGER_SPAWN_EGG",
                        "VINDICATOR_SPAWN_EGG",
                        "WANDERING_TRADER_SPAWN_EGG",
                        "WITCH_SPAWN_EGG",
                        "WITHER_SKELETON_SPAWN_EGG",
                        "WOLF_SPAWN_EGG",
                        "ZOGLIN_SPAWN_EGG",
                        "ZOMBIE_SPAWN_EGG",
                        "ZOMBIE_HORSE_SPAWN_EGG",
                        "ZOMBIE_VILLAGER_SPAWN_EGG",
                        "ZOMBIFIED_PIGLIN_SPAWN_EGG",
                        "EXPERIENCE_BOTTLE",
                        "FIRE_CHARGE",
                        "WRITABLE_BOOK",
                        "WRITTEN_BOOK",
                        "EMERALD",
                        "ITEM_FRAME",
                        "FLOWER_POT",
                        "CARROT",
                        "POTATO",
                        "BAKED_POTATO",
                        "POISONOUS_POTATO",
                        "MAP",
                        "GOLDEN_CARROT",
                        "SKELETON_SKULL",
                        "WITHER_SKELETON_SKULL",
                        "PLAYER_HEAD",
                        "ZOMBIE_HEAD",
                        "CREEPER_HEAD",
                        "DRAGON_HEAD",
                        "CARROT_ON_A_STICK",
                        "WARPED_FUNGUS_ON_A_STICK",
                        "NETHER_STAR",
                        "PUMPKIN_PIE",
                        "FIREWORK_ROCKET",
                        "FIREWORK_STAR",
                        "ENCHANTED_BOOK",
                        "NETHER_BRICK",
                        "QUARTZ",
                        "TNT_MINECART",
                        "HOPPER_MINECART",
                        "PRISMARINE_SHARD",
                        "PRISMARINE_CRYSTALS",
                        "RABBIT",
                        "COOKED_RABBIT",
                        "RABBIT_STEW",
                        "RABBIT_FOOT",
                        "RABBIT_HIDE",
                        "ARMOR_STAND",
                        "IRON_HORSE_ARMOR",
                        "GOLDEN_HORSE_ARMOR",
                        "DIAMOND_HORSE_ARMOR",
                        "LEATHER_HORSE_ARMOR",
                        "LEAD",
                        "NAME_TAG",
                        "COMMAND_BLOCK_MINECART",
                        "MUTTON",
                        "COOKED_MUTTON",
                        "WHITE_BANNER",
                        "ORANGE_BANNER",
                        "MAGENTA_BANNER",
                        "LIGHT_BLUE_BANNER",
                        "YELLOW_BANNER",
                        "LIME_BANNER",
                        "PINK_BANNER",
                        "GRAY_BANNER",
                        "LIGHT_GRAY_BANNER",
                        "CYAN_BANNER",
                        "PURPLE_BANNER",
                        "BLUE_BANNER",
                        "BROWN_BANNER",
                        "GREEN_BANNER",
                        "RED_BANNER",
                        "BLACK_BANNER",
                        "END_CRYSTAL",
                        "CHORUS_FRUIT",
                        "POPPED_CHORUS_FRUIT",
                        "BEETROOT",
                        "BEETROOT_SEEDS",
                        "BEETROOT_SOUP",
                        "DRAGON_BREATH",
                        "SPLASH_POTION",
                        "SPECTRAL_ARROW",
                        "TIPPED_ARROW",
                        "LINGERING_POTION",
                        "SHIELD",
                        "ELYTRA",
                        "SPRUCE_BOAT",
                        "BIRCH_BOAT",
                        "JUNGLE_BOAT",
                        "ACACIA_BOAT",
                        "DARK_OAK_BOAT",
                        "TOTEM_OF_UNDYING",
                        "SHULKER_SHELL",
                        "IRON_NUGGET",
                        "KNOWLEDGE_BOOK",
                        "DEBUG_STICK",
                        "MUSIC_DISC_13",
                        "MUSIC_DISC_CAT",
                        "MUSIC_DISC_BLOCKS",
                        "MUSIC_DISC_CHIRP",
                        "MUSIC_DISC_FAR",
                        "MUSIC_DISC_MALL",
                        "MUSIC_DISC_MELLOHI",
                        "MUSIC_DISC_STAL",
                        "MUSIC_DISC_STRAD",
                        "MUSIC_DISC_WARD",
                        "MUSIC_DISC_11",
                        "MUSIC_DISC_WAIT",
                        "MUSIC_DISC_PIGSTEP",
                        "TRIDENT",
                        "PHANTOM_MEMBRANE",
                        "NAUTILUS_SHELL",
                        "HEART_OF_THE_SEA",
                        "CROSSBOW",
                        "SUSPICIOUS_STEW",
                        "LOOM",
                        "FLOWER_BANNER_PATTERN",
                        "CREEPER_BANNER_PATTERN",
                        "SKULL_BANNER_PATTERN",
                        "MOJANG_BANNER_PATTERN",
                        "GLOBE_BANNER_PATTERN",
                        "PIGLIN_BANNER_PATTERN",
                        "COMPOSTER",
                        "BARREL",
                        "SMOKER",
                        "BLAST_FURNACE",
                        "CARTOGRAPHY_TABLE",
                        "FLETCHING_TABLE",
                        "GRINDSTONE",
                        "LECTERN",
                        "SMITHING_TABLE",
                        "STONECUTTER",
                        "BELL",
                        "LANTERN",
                        "SOUL_LANTERN",
                        "SWEET_BERRIES",
                        "CAMPFIRE",
                        "SOUL_CAMPFIRE",
                        "SHROOMLIGHT",
                        "HONEYCOMB",
                        "BEE_NEST",
                        "BEEHIVE",
                        "HONEY_BOTTLE",
                        "HONEY_BLOCK",
                        "HONEYCOMB_BLOCK",
                        "LODESTONE",
                        "NETHERITE_BLOCK",
                        "ANCIENT_DEBRIS",
                        "TARGET",
                        "CRYING_OBSIDIAN",
                        "BLACKSTONE",
                        "BLACKSTONE_SLAB",
                        "BLACKSTONE_STAIRS",
                        "GILDED_BLACKSTONE",
                        "POLISHED_BLACKSTONE",
                        "POLISHED_BLACKSTONE_SLAB",
                        "POLISHED_BLACKSTONE_STAIRS",
                        "CHISELED_POLISHED_BLACKSTONE",
                        "POLISHED_BLACKSTONE_BRICKS",
                        "POLISHED_BLACKSTONE_BRICK_SLAB",
                        "POLISHED_BLACKSTONE_BRICK_STAIRS",
                        "CRACKED_POLISHED_BLACKSTONE_BRICKS",
                        "RESPAWN_ANCHOR",
                        "WATER",
                        "LAVA",
                        "TALL_SEAGRASS",
                        "PISTON_HEAD",
                        "MOVING_PISTON",
                        "WALL_TORCH",
                        "FIRE",
                        "SOUL_FIRE",
                        "REDSTONE_WIRE",
                        "OAK_WALL_SIGN",
                        "SPRUCE_WALL_SIGN",
                        "BIRCH_WALL_SIGN",
                        "ACACIA_WALL_SIGN",
                        "JUNGLE_WALL_SIGN",
                        "DARK_OAK_WALL_SIGN",
                        "REDSTONE_WALL_TORCH",
                        "SOUL_WALL_TORCH",
                        "NETHER_PORTAL",
                        "ATTACHED_PUMPKIN_STEM",
                        "ATTACHED_MELON_STEM",
                        "PUMPKIN_STEM",
                        "MELON_STEM",
                        "END_PORTAL",
                        "COCOA",
                        "TRIPWIRE",
                        "POTTED_OAK_SAPLING",
                        "POTTED_SPRUCE_SAPLING",
                        "POTTED_BIRCH_SAPLING",
                        "POTTED_JUNGLE_SAPLING",
                        "POTTED_ACACIA_SAPLING",
                        "POTTED_DARK_OAK_SAPLING",
                        "POTTED_FERN",
                        "POTTED_DANDELION",
                        "POTTED_POPPY",
                        "POTTED_BLUE_ORCHID",
                        "POTTED_ALLIUM",
                        "POTTED_AZURE_BLUET",
                        "POTTED_RED_TULIP",
                        "POTTED_ORANGE_TULIP",
                        "POTTED_WHITE_TULIP",
                        "POTTED_PINK_TULIP",
                        "POTTED_OXEYE_DAISY",
                        "POTTED_CORNFLOWER",
                        "POTTED_LILY_OF_THE_VALLEY",
                        "POTTED_WITHER_ROSE",
                        "POTTED_RED_MUSHROOM",
                        "POTTED_BROWN_MUSHROOM",
                        "POTTED_DEAD_BUSH",
                        "POTTED_CACTUS",
                        "CARROTS",
                        "POTATOES",
                        "SKELETON_WALL_SKULL",
                        "WITHER_SKELETON_WALL_SKULL",
                        "ZOMBIE_WALL_HEAD",
                        "PLAYER_WALL_HEAD",
                        "CREEPER_WALL_HEAD",
                        "DRAGON_WALL_HEAD",
                        "WHITE_WALL_BANNER",
                        "ORANGE_WALL_BANNER",
                        "MAGENTA_WALL_BANNER",
                        "LIGHT_BLUE_WALL_BANNER",
                        "YELLOW_WALL_BANNER",
                        "LIME_WALL_BANNER",
                        "PINK_WALL_BANNER",
                        "GRAY_WALL_BANNER",
                        "LIGHT_GRAY_WALL_BANNER",
                        "CYAN_WALL_BANNER",
                        "PURPLE_WALL_BANNER",
                        "BLUE_WALL_BANNER",
                        "BROWN_WALL_BANNER",
                        "GREEN_WALL_BANNER",
                        "RED_WALL_BANNER",
                        "BLACK_WALL_BANNER",
                        "BEETROOTS",
                        "END_GATEWAY",
                        "FROSTED_ICE",
                        "KELP_PLANT",
                        "DEAD_TUBE_CORAL_WALL_FAN",
                        "DEAD_BRAIN_CORAL_WALL_FAN",
                        "DEAD_BUBBLE_CORAL_WALL_FAN",
                        "DEAD_FIRE_CORAL_WALL_FAN",
                        "DEAD_HORN_CORAL_WALL_FAN",
                        "TUBE_CORAL_WALL_FAN",
                        "BRAIN_CORAL_WALL_FAN",
                        "BUBBLE_CORAL_WALL_FAN",
                        "FIRE_CORAL_WALL_FAN",
                        "HORN_CORAL_WALL_FAN",
                        "BAMBOO_SAPLING",
                        "POTTED_BAMBOO",
                        "VOID_AIR",
                        "CAVE_AIR",
                        "BUBBLE_COLUMN",
                        "SWEET_BERRY_BUSH",
                        "WEEPING_VINES_PLANT",
                        "TWISTING_VINES_PLANT",
                        "CRIMSON_WALL_SIGN",
                        "WARPED_WALL_SIGN",
                        "POTTED_CRIMSON_FUNGUS",
                        "POTTED_WARPED_FUNGUS",
                        "POTTED_CRIMSON_ROOTS",
                        "POTTED_WARPED_ROOTS"
                    ]
                },
                {"additionalProperties": {"type": "string"}}
            ]
        },
        "vanilla_and_custom_blocks": {
            "$id": "vanilla_and_custom_blocks",
            "title": "Vanilla / ItemsAdder custom blocks",
            "markdownDescription": "Examples: **STONE**, **itemsadder:ruby_block**, **crying_obsidian**",
            "type": "string",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        "AIR",
                        "STONE",
                        "GRANITE",
                        "POLISHED_GRANITE",
                        "DIORITE",
                        "POLISHED_DIORITE",
                        "ANDESITE",
                        "POLISHED_ANDESITE",
                        "GRASS_BLOCK",
                        "DIRT",
                        "COARSE_DIRT",
                        "PODZOL",
                        "CRIMSON_NYLIUM",
                        "WARPED_NYLIUM",
                        "COBBLESTONE",
                        "OAK_PLANKS",
                        "SPRUCE_PLANKS",
                        "BIRCH_PLANKS",
                        "JUNGLE_PLANKS",
                        "ACACIA_PLANKS",
                        "DARK_OAK_PLANKS",
                        "CRIMSON_PLANKS",
                        "WARPED_PLANKS",
                        "OAK_SAPLING",
                        "SPRUCE_SAPLING",
                        "BIRCH_SAPLING",
                        "JUNGLE_SAPLING",
                        "ACACIA_SAPLING",
                        "DARK_OAK_SAPLING",
                        "BEDROCK",
                        "SAND",
                        "RED_SAND",
                        "GRAVEL",
                        "GOLD_ORE",
                        "IRON_ORE",
                        "COAL_ORE",
                        "NETHER_GOLD_ORE",
                        "OAK_LOG",
                        "SPRUCE_LOG",
                        "BIRCH_LOG",
                        "JUNGLE_LOG",
                        "ACACIA_LOG",
                        "DARK_OAK_LOG",
                        "CRIMSON_STEM",
                        "WARPED_STEM",
                        "STRIPPED_OAK_LOG",
                        "STRIPPED_SPRUCE_LOG",
                        "STRIPPED_BIRCH_LOG",
                        "STRIPPED_JUNGLE_LOG",
                        "STRIPPED_ACACIA_LOG",
                        "STRIPPED_DARK_OAK_LOG",
                        "STRIPPED_CRIMSON_STEM",
                        "STRIPPED_WARPED_STEM",
                        "STRIPPED_OAK_WOOD",
                        "STRIPPED_SPRUCE_WOOD",
                        "STRIPPED_BIRCH_WOOD",
                        "STRIPPED_JUNGLE_WOOD",
                        "STRIPPED_ACACIA_WOOD",
                        "STRIPPED_DARK_OAK_WOOD",
                        "STRIPPED_CRIMSON_HYPHAE",
                        "STRIPPED_WARPED_HYPHAE",
                        "OAK_WOOD",
                        "SPRUCE_WOOD",
                        "BIRCH_WOOD",
                        "JUNGLE_WOOD",
                        "ACACIA_WOOD",
                        "DARK_OAK_WOOD",
                        "CRIMSON_HYPHAE",
                        "WARPED_HYPHAE",
                        "OAK_LEAVES",
                        "SPRUCE_LEAVES",
                        "BIRCH_LEAVES",
                        "JUNGLE_LEAVES",
                        "ACACIA_LEAVES",
                        "DARK_OAK_LEAVES",
                        "SPONGE",
                        "WET_SPONGE",
                        "GLASS",
                        "LAPIS_ORE",
                        "LAPIS_BLOCK",
                        "DISPENSER",
                        "SANDSTONE",
                        "CHISELED_SANDSTONE",
                        "CUT_SANDSTONE",
                        "NOTE_BLOCK",
                        "POWERED_RAIL",
                        "DETECTOR_RAIL",
                        "STICKY_PISTON",
                        "COBWEB",
                        "GRASS",
                        "FERN",
                        "DEAD_BUSH",
                        "SEAGRASS",
                        "SEA_PICKLE",
                        "PISTON",
                        "WHITE_WOOL",
                        "ORANGE_WOOL",
                        "MAGENTA_WOOL",
                        "LIGHT_BLUE_WOOL",
                        "YELLOW_WOOL",
                        "LIME_WOOL",
                        "PINK_WOOL",
                        "GRAY_WOOL",
                        "LIGHT_GRAY_WOOL",
                        "CYAN_WOOL",
                        "PURPLE_WOOL",
                        "BLUE_WOOL",
                        "BROWN_WOOL",
                        "GREEN_WOOL",
                        "RED_WOOL",
                        "BLACK_WOOL",
                        "DANDELION",
                        "POPPY",
                        "BLUE_ORCHID",
                        "ALLIUM",
                        "AZURE_BLUET",
                        "RED_TULIP",
                        "ORANGE_TULIP",
                        "WHITE_TULIP",
                        "PINK_TULIP",
                        "OXEYE_DAISY",
                        "CORNFLOWER",
                        "LILY_OF_THE_VALLEY",
                        "WITHER_ROSE",
                        "BROWN_MUSHROOM",
                        "RED_MUSHROOM",
                        "CRIMSON_FUNGUS",
                        "WARPED_FUNGUS",
                        "CRIMSON_ROOTS",
                        "WARPED_ROOTS",
                        "NETHER_SPROUTS",
                        "WEEPING_VINES",
                        "TWISTING_VINES",
                        "SUGAR_CANE",
                        "KELP",
                        "BAMBOO",
                        "GOLD_BLOCK",
                        "IRON_BLOCK",
                        "OAK_SLAB",
                        "SPRUCE_SLAB",
                        "BIRCH_SLAB",
                        "JUNGLE_SLAB",
                        "ACACIA_SLAB",
                        "DARK_OAK_SLAB",
                        "CRIMSON_SLAB",
                        "WARPED_SLAB",
                        "STONE_SLAB",
                        "SMOOTH_STONE_SLAB",
                        "SANDSTONE_SLAB",
                        "CUT_SANDSTONE_SLAB",
                        "PETRIFIED_OAK_SLAB",
                        "COBBLESTONE_SLAB",
                        "BRICK_SLAB",
                        "STONE_BRICK_SLAB",
                        "NETHER_BRICK_SLAB",
                        "QUARTZ_SLAB",
                        "RED_SANDSTONE_SLAB",
                        "CUT_RED_SANDSTONE_SLAB",
                        "PURPUR_SLAB",
                        "PRISMARINE_SLAB",
                        "PRISMARINE_BRICK_SLAB",
                        "DARK_PRISMARINE_SLAB",
                        "SMOOTH_QUARTZ",
                        "SMOOTH_RED_SANDSTONE",
                        "SMOOTH_SANDSTONE",
                        "SMOOTH_STONE",
                        "BRICKS",
                        "TNT",
                        "BOOKSHELF",
                        "MOSSY_COBBLESTONE",
                        "OBSIDIAN",
                        "TORCH",
                        "END_ROD",
                        "CHORUS_PLANT",
                        "CHORUS_FLOWER",
                        "PURPUR_BLOCK",
                        "PURPUR_PILLAR",
                        "PURPUR_STAIRS",
                        "SPAWNER",
                        "OAK_STAIRS",
                        "CHEST",
                        "DIAMOND_ORE",
                        "DIAMOND_BLOCK",
                        "CRAFTING_TABLE",
                        "FARMLAND",
                        "FURNACE",
                        "LADDER",
                        "RAIL",
                        "COBBLESTONE_STAIRS",
                        "LEVER",
                        "STONE_PRESSURE_PLATE",
                        "OAK_PRESSURE_PLATE",
                        "SPRUCE_PRESSURE_PLATE",
                        "BIRCH_PRESSURE_PLATE",
                        "JUNGLE_PRESSURE_PLATE",
                        "ACACIA_PRESSURE_PLATE",
                        "DARK_OAK_PRESSURE_PLATE",
                        "CRIMSON_PRESSURE_PLATE",
                        "WARPED_PRESSURE_PLATE",
                        "POLISHED_BLACKSTONE_PRESSURE_PLATE",
                        "REDSTONE_ORE",
                        "REDSTONE_TORCH",
                        "SNOW",
                        "ICE",
                        "SNOW_BLOCK",
                        "CACTUS",
                        "CLAY",
                        "JUKEBOX",
                        "OAK_FENCE",
                        "SPRUCE_FENCE",
                        "BIRCH_FENCE",
                        "JUNGLE_FENCE",
                        "ACACIA_FENCE",
                        "DARK_OAK_FENCE",
                        "CRIMSON_FENCE",
                        "WARPED_FENCE",
                        "PUMPKIN",
                        "CARVED_PUMPKIN",
                        "NETHERRACK",
                        "SOUL_SAND",
                        "SOUL_SOIL",
                        "BASALT",
                        "POLISHED_BASALT",
                        "SOUL_TORCH",
                        "GLOWSTONE",
                        "JACK_O_LANTERN",
                        "OAK_TRAPDOOR",
                        "SPRUCE_TRAPDOOR",
                        "BIRCH_TRAPDOOR",
                        "JUNGLE_TRAPDOOR",
                        "ACACIA_TRAPDOOR",
                        "DARK_OAK_TRAPDOOR",
                        "CRIMSON_TRAPDOOR",
                        "WARPED_TRAPDOOR",
                        "INFESTED_STONE",
                        "INFESTED_COBBLESTONE",
                        "INFESTED_STONE_BRICKS",
                        "INFESTED_MOSSY_STONE_BRICKS",
                        "INFESTED_CRACKED_STONE_BRICKS",
                        "INFESTED_CHISELED_STONE_BRICKS",
                        "STONE_BRICKS",
                        "MOSSY_STONE_BRICKS",
                        "CRACKED_STONE_BRICKS",
                        "CHISELED_STONE_BRICKS",
                        "BROWN_MUSHROOM_BLOCK",
                        "RED_MUSHROOM_BLOCK",
                        "MUSHROOM_STEM",
                        "IRON_BARS",
                        "CHAIN",
                        "GLASS_PANE",
                        "MELON",
                        "VINE",
                        "OAK_FENCE_GATE",
                        "SPRUCE_FENCE_GATE",
                        "BIRCH_FENCE_GATE",
                        "JUNGLE_FENCE_GATE",
                        "ACACIA_FENCE_GATE",
                        "DARK_OAK_FENCE_GATE",
                        "CRIMSON_FENCE_GATE",
                        "WARPED_FENCE_GATE",
                        "BRICK_STAIRS",
                        "STONE_BRICK_STAIRS",
                        "MYCELIUM",
                        "LILY_PAD",
                        "NETHER_BRICKS",
                        "CRACKED_NETHER_BRICKS",
                        "CHISELED_NETHER_BRICKS",
                        "NETHER_BRICK_FENCE",
                        "NETHER_BRICK_STAIRS",
                        "ENCHANTING_TABLE",
                        "END_PORTAL_FRAME",
                        "END_STONE",
                        "END_STONE_BRICKS",
                        "DRAGON_EGG",
                        "REDSTONE_LAMP",
                        "SANDSTONE_STAIRS",
                        "EMERALD_ORE",
                        "ENDER_CHEST",
                        "TRIPWIRE_HOOK",
                        "EMERALD_BLOCK",
                        "SPRUCE_STAIRS",
                        "BIRCH_STAIRS",
                        "JUNGLE_STAIRS",
                        "CRIMSON_STAIRS",
                        "WARPED_STAIRS",
                        "COMMAND_BLOCK",
                        "BEACON",
                        "COBBLESTONE_WALL",
                        "MOSSY_COBBLESTONE_WALL",
                        "BRICK_WALL",
                        "PRISMARINE_WALL",
                        "RED_SANDSTONE_WALL",
                        "MOSSY_STONE_BRICK_WALL",
                        "GRANITE_WALL",
                        "STONE_BRICK_WALL",
                        "NETHER_BRICK_WALL",
                        "ANDESITE_WALL",
                        "RED_NETHER_BRICK_WALL",
                        "SANDSTONE_WALL",
                        "END_STONE_BRICK_WALL",
                        "DIORITE_WALL",
                        "BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_BRICK_WALL",
                        "STONE_BUTTON",
                        "OAK_BUTTON",
                        "SPRUCE_BUTTON",
                        "BIRCH_BUTTON",
                        "JUNGLE_BUTTON",
                        "ACACIA_BUTTON",
                        "DARK_OAK_BUTTON",
                        "CRIMSON_BUTTON",
                        "WARPED_BUTTON",
                        "POLISHED_BLACKSTONE_BUTTON",
                        "ANVIL",
                        "CHIPPED_ANVIL",
                        "DAMAGED_ANVIL",
                        "TRAPPED_CHEST",
                        "LIGHT_WEIGHTED_PRESSURE_PLATE",
                        "HEAVY_WEIGHTED_PRESSURE_PLATE",
                        "DAYLIGHT_DETECTOR",
                        "REDSTONE_BLOCK",
                        "NETHER_QUARTZ_ORE",
                        "HOPPER",
                        "CHISELED_QUARTZ_BLOCK",
                        "QUARTZ_BLOCK",
                        "QUARTZ_BRICKS",
                        "QUARTZ_PILLAR",
                        "QUARTZ_STAIRS",
                        "ACTIVATOR_RAIL",
                        "DROPPER",
                        "WHITE_TERRACOTTA",
                        "ORANGE_TERRACOTTA",
                        "MAGENTA_TERRACOTTA",
                        "LIGHT_BLUE_TERRACOTTA",
                        "YELLOW_TERRACOTTA",
                        "LIME_TERRACOTTA",
                        "PINK_TERRACOTTA",
                        "GRAY_TERRACOTTA",
                        "LIGHT_GRAY_TERRACOTTA",
                        "CYAN_TERRACOTTA",
                        "PURPLE_TERRACOTTA",
                        "BLUE_TERRACOTTA",
                        "BROWN_TERRACOTTA",
                        "GREEN_TERRACOTTA",
                        "RED_TERRACOTTA",
                        "BLACK_TERRACOTTA",
                        "BARRIER",
                        "IRON_TRAPDOOR",
                        "HAY_BLOCK",
                        "WHITE_CARPET",
                        "ORANGE_CARPET",
                        "MAGENTA_CARPET",
                        "LIGHT_BLUE_CARPET",
                        "YELLOW_CARPET",
                        "LIME_CARPET",
                        "PINK_CARPET",
                        "GRAY_CARPET",
                        "LIGHT_GRAY_CARPET",
                        "CYAN_CARPET",
                        "PURPLE_CARPET",
                        "BLUE_CARPET",
                        "BROWN_CARPET",
                        "GREEN_CARPET",
                        "RED_CARPET",
                        "BLACK_CARPET",
                        "TERRACOTTA",
                        "COAL_BLOCK",
                        "PACKED_ICE",
                        "ACACIA_STAIRS",
                        "DARK_OAK_STAIRS",
                        "SLIME_BLOCK",
                        "GRASS_PATH",
                        "SUNFLOWER",
                        "LILAC",
                        "ROSE_BUSH",
                        "PEONY",
                        "TALL_GRASS",
                        "LARGE_FERN",
                        "WHITE_STAINED_GLASS",
                        "ORANGE_STAINED_GLASS",
                        "MAGENTA_STAINED_GLASS",
                        "LIGHT_BLUE_STAINED_GLASS",
                        "YELLOW_STAINED_GLASS",
                        "LIME_STAINED_GLASS",
                        "PINK_STAINED_GLASS",
                        "GRAY_STAINED_GLASS",
                        "LIGHT_GRAY_STAINED_GLASS",
                        "CYAN_STAINED_GLASS",
                        "PURPLE_STAINED_GLASS",
                        "BLUE_STAINED_GLASS",
                        "BROWN_STAINED_GLASS",
                        "GREEN_STAINED_GLASS",
                        "RED_STAINED_GLASS",
                        "BLACK_STAINED_GLASS",
                        "WHITE_STAINED_GLASS_PANE",
                        "ORANGE_STAINED_GLASS_PANE",
                        "MAGENTA_STAINED_GLASS_PANE",
                        "LIGHT_BLUE_STAINED_GLASS_PANE",
                        "YELLOW_STAINED_GLASS_PANE",
                        "LIME_STAINED_GLASS_PANE",
                        "PINK_STAINED_GLASS_PANE",
                        "GRAY_STAINED_GLASS_PANE",
                        "LIGHT_GRAY_STAINED_GLASS_PANE",
                        "CYAN_STAINED_GLASS_PANE",
                        "PURPLE_STAINED_GLASS_PANE",
                        "BLUE_STAINED_GLASS_PANE",
                        "BROWN_STAINED_GLASS_PANE",
                        "GREEN_STAINED_GLASS_PANE",
                        "RED_STAINED_GLASS_PANE",
                        "BLACK_STAINED_GLASS_PANE",
                        "PRISMARINE",
                        "PRISMARINE_BRICKS",
                        "DARK_PRISMARINE",
                        "PRISMARINE_STAIRS",
                        "PRISMARINE_BRICK_STAIRS",
                        "DARK_PRISMARINE_STAIRS",
                        "SEA_LANTERN",
                        "RED_SANDSTONE",
                        "CHISELED_RED_SANDSTONE",
                        "CUT_RED_SANDSTONE",
                        "RED_SANDSTONE_STAIRS",
                        "REPEATING_COMMAND_BLOCK",
                        "CHAIN_COMMAND_BLOCK",
                        "MAGMA_BLOCK",
                        "NETHER_WART_BLOCK",
                        "WARPED_WART_BLOCK",
                        "RED_NETHER_BRICKS",
                        "BONE_BLOCK",
                        "STRUCTURE_VOID",
                        "OBSERVER",
                        "SHULKER_BOX",
                        "WHITE_SHULKER_BOX",
                        "ORANGE_SHULKER_BOX",
                        "MAGENTA_SHULKER_BOX",
                        "LIGHT_BLUE_SHULKER_BOX",
                        "YELLOW_SHULKER_BOX",
                        "LIME_SHULKER_BOX",
                        "PINK_SHULKER_BOX",
                        "GRAY_SHULKER_BOX",
                        "LIGHT_GRAY_SHULKER_BOX",
                        "CYAN_SHULKER_BOX",
                        "PURPLE_SHULKER_BOX",
                        "BLUE_SHULKER_BOX",
                        "BROWN_SHULKER_BOX",
                        "GREEN_SHULKER_BOX",
                        "RED_SHULKER_BOX",
                        "BLACK_SHULKER_BOX",
                        "WHITE_GLAZED_TERRACOTTA",
                        "ORANGE_GLAZED_TERRACOTTA",
                        "MAGENTA_GLAZED_TERRACOTTA",
                        "LIGHT_BLUE_GLAZED_TERRACOTTA",
                        "YELLOW_GLAZED_TERRACOTTA",
                        "LIME_GLAZED_TERRACOTTA",
                        "PINK_GLAZED_TERRACOTTA",
                        "GRAY_GLAZED_TERRACOTTA",
                        "LIGHT_GRAY_GLAZED_TERRACOTTA",
                        "CYAN_GLAZED_TERRACOTTA",
                        "PURPLE_GLAZED_TERRACOTTA",
                        "BLUE_GLAZED_TERRACOTTA",
                        "BROWN_GLAZED_TERRACOTTA",
                        "GREEN_GLAZED_TERRACOTTA",
                        "RED_GLAZED_TERRACOTTA",
                        "BLACK_GLAZED_TERRACOTTA",
                        "WHITE_CONCRETE",
                        "ORANGE_CONCRETE",
                        "MAGENTA_CONCRETE",
                        "LIGHT_BLUE_CONCRETE",
                        "YELLOW_CONCRETE",
                        "LIME_CONCRETE",
                        "PINK_CONCRETE",
                        "GRAY_CONCRETE",
                        "LIGHT_GRAY_CONCRETE",
                        "CYAN_CONCRETE",
                        "PURPLE_CONCRETE",
                        "BLUE_CONCRETE",
                        "BROWN_CONCRETE",
                        "GREEN_CONCRETE",
                        "RED_CONCRETE",
                        "BLACK_CONCRETE",
                        "WHITE_CONCRETE_POWDER",
                        "ORANGE_CONCRETE_POWDER",
                        "MAGENTA_CONCRETE_POWDER",
                        "LIGHT_BLUE_CONCRETE_POWDER",
                        "YELLOW_CONCRETE_POWDER",
                        "LIME_CONCRETE_POWDER",
                        "PINK_CONCRETE_POWDER",
                        "GRAY_CONCRETE_POWDER",
                        "LIGHT_GRAY_CONCRETE_POWDER",
                        "CYAN_CONCRETE_POWDER",
                        "PURPLE_CONCRETE_POWDER",
                        "BLUE_CONCRETE_POWDER",
                        "BROWN_CONCRETE_POWDER",
                        "GREEN_CONCRETE_POWDER",
                        "RED_CONCRETE_POWDER",
                        "BLACK_CONCRETE_POWDER",
                        "TURTLE_EGG",
                        "DEAD_TUBE_CORAL_BLOCK",
                        "DEAD_BRAIN_CORAL_BLOCK",
                        "DEAD_BUBBLE_CORAL_BLOCK",
                        "DEAD_FIRE_CORAL_BLOCK",
                        "DEAD_HORN_CORAL_BLOCK",
                        "TUBE_CORAL_BLOCK",
                        "BRAIN_CORAL_BLOCK",
                        "BUBBLE_CORAL_BLOCK",
                        "FIRE_CORAL_BLOCK",
                        "HORN_CORAL_BLOCK",
                        "TUBE_CORAL",
                        "BRAIN_CORAL",
                        "BUBBLE_CORAL",
                        "FIRE_CORAL",
                        "HORN_CORAL",
                        "DEAD_BRAIN_CORAL",
                        "DEAD_BUBBLE_CORAL",
                        "DEAD_FIRE_CORAL",
                        "DEAD_HORN_CORAL",
                        "DEAD_TUBE_CORAL",
                        "TUBE_CORAL_FAN",
                        "BRAIN_CORAL_FAN",
                        "BUBBLE_CORAL_FAN",
                        "FIRE_CORAL_FAN",
                        "HORN_CORAL_FAN",
                        "DEAD_TUBE_CORAL_FAN",
                        "DEAD_BRAIN_CORAL_FAN",
                        "DEAD_BUBBLE_CORAL_FAN",
                        "DEAD_FIRE_CORAL_FAN",
                        "DEAD_HORN_CORAL_FAN",
                        "BLUE_ICE",
                        "CONDUIT",
                        "POLISHED_GRANITE_STAIRS",
                        "SMOOTH_RED_SANDSTONE_STAIRS",
                        "MOSSY_STONE_BRICK_STAIRS",
                        "POLISHED_DIORITE_STAIRS",
                        "MOSSY_COBBLESTONE_STAIRS",
                        "END_STONE_BRICK_STAIRS",
                        "STONE_STAIRS",
                        "SMOOTH_SANDSTONE_STAIRS",
                        "SMOOTH_QUARTZ_STAIRS",
                        "GRANITE_STAIRS",
                        "ANDESITE_STAIRS",
                        "RED_NETHER_BRICK_STAIRS",
                        "POLISHED_ANDESITE_STAIRS",
                        "DIORITE_STAIRS",
                        "POLISHED_GRANITE_SLAB",
                        "SMOOTH_RED_SANDSTONE_SLAB",
                        "MOSSY_STONE_BRICK_SLAB",
                        "POLISHED_DIORITE_SLAB",
                        "MOSSY_COBBLESTONE_SLAB",
                        "END_STONE_BRICK_SLAB",
                        "SMOOTH_SANDSTONE_SLAB",
                        "SMOOTH_QUARTZ_SLAB",
                        "GRANITE_SLAB",
                        "ANDESITE_SLAB",
                        "RED_NETHER_BRICK_SLAB",
                        "POLISHED_ANDESITE_SLAB",
                        "DIORITE_SLAB",
                        "SCAFFOLDING",
                        "IRON_DOOR",
                        "OAK_DOOR",
                        "SPRUCE_DOOR",
                        "BIRCH_DOOR",
                        "JUNGLE_DOOR",
                        "ACACIA_DOOR",
                        "DARK_OAK_DOOR",
                        "CRIMSON_DOOR",
                        "WARPED_DOOR",
                        "REPEATER",
                        "COMPARATOR",
                        "STRUCTURE_BLOCK",
                        "JIGSAW"
                    ]
                },
                {"additionalProperties": {"type": "string"}}
            ]
        },
        "vanilla_materials": {
            "$id": "vanilla_materials",
            "title": "Vanilla Materials",
            "markdownDescription": "Examples: **STONE**, **DIAMOND**",
            "type": "string",
            "enum": [
                "AIR",
                "STONE",
                "GRANITE",
                "POLISHED_GRANITE",
                "DIORITE",
                "POLISHED_DIORITE",
                "ANDESITE",
                "POLISHED_ANDESITE",
                "GRASS_BLOCK",
                "DIRT",
                "COARSE_DIRT",
                "PODZOL",
                "CRIMSON_NYLIUM",
                "WARPED_NYLIUM",
                "COBBLESTONE",
                "OAK_PLANKS",
                "SPRUCE_PLANKS",
                "BIRCH_PLANKS",
                "JUNGLE_PLANKS",
                "ACACIA_PLANKS",
                "DARK_OAK_PLANKS",
                "CRIMSON_PLANKS",
                "WARPED_PLANKS",
                "OAK_SAPLING",
                "SPRUCE_SAPLING",
                "BIRCH_SAPLING",
                "JUNGLE_SAPLING",
                "ACACIA_SAPLING",
                "DARK_OAK_SAPLING",
                "BEDROCK",
                "SAND",
                "RED_SAND",
                "GRAVEL",
                "GOLD_ORE",
                "IRON_ORE",
                "COAL_ORE",
                "NETHER_GOLD_ORE",
                "OAK_LOG",
                "SPRUCE_LOG",
                "BIRCH_LOG",
                "JUNGLE_LOG",
                "ACACIA_LOG",
                "DARK_OAK_LOG",
                "CRIMSON_STEM",
                "WARPED_STEM",
                "STRIPPED_OAK_LOG",
                "STRIPPED_SPRUCE_LOG",
                "STRIPPED_BIRCH_LOG",
                "STRIPPED_JUNGLE_LOG",
                "STRIPPED_ACACIA_LOG",
                "STRIPPED_DARK_OAK_LOG",
                "STRIPPED_CRIMSON_STEM",
                "STRIPPED_WARPED_STEM",
                "STRIPPED_OAK_WOOD",
                "STRIPPED_SPRUCE_WOOD",
                "STRIPPED_BIRCH_WOOD",
                "STRIPPED_JUNGLE_WOOD",
                "STRIPPED_ACACIA_WOOD",
                "STRIPPED_DARK_OAK_WOOD",
                "STRIPPED_CRIMSON_HYPHAE",
                "STRIPPED_WARPED_HYPHAE",
                "OAK_WOOD",
                "SPRUCE_WOOD",
                "BIRCH_WOOD",
                "JUNGLE_WOOD",
                "ACACIA_WOOD",
                "DARK_OAK_WOOD",
                "CRIMSON_HYPHAE",
                "WARPED_HYPHAE",
                "OAK_LEAVES",
                "SPRUCE_LEAVES",
                "BIRCH_LEAVES",
                "JUNGLE_LEAVES",
                "ACACIA_LEAVES",
                "DARK_OAK_LEAVES",
                "SPONGE",
                "WET_SPONGE",
                "GLASS",
                "LAPIS_ORE",
                "LAPIS_BLOCK",
                "DISPENSER",
                "SANDSTONE",
                "CHISELED_SANDSTONE",
                "CUT_SANDSTONE",
                "NOTE_BLOCK",
                "POWERED_RAIL",
                "DETECTOR_RAIL",
                "STICKY_PISTON",
                "COBWEB",
                "GRASS",
                "FERN",
                "DEAD_BUSH",
                "SEAGRASS",
                "SEA_PICKLE",
                "PISTON",
                "WHITE_WOOL",
                "ORANGE_WOOL",
                "MAGENTA_WOOL",
                "LIGHT_BLUE_WOOL",
                "YELLOW_WOOL",
                "LIME_WOOL",
                "PINK_WOOL",
                "GRAY_WOOL",
                "LIGHT_GRAY_WOOL",
                "CYAN_WOOL",
                "PURPLE_WOOL",
                "BLUE_WOOL",
                "BROWN_WOOL",
                "GREEN_WOOL",
                "RED_WOOL",
                "BLACK_WOOL",
                "DANDELION",
                "POPPY",
                "BLUE_ORCHID",
                "ALLIUM",
                "AZURE_BLUET",
                "RED_TULIP",
                "ORANGE_TULIP",
                "WHITE_TULIP",
                "PINK_TULIP",
                "OXEYE_DAISY",
                "CORNFLOWER",
                "LILY_OF_THE_VALLEY",
                "WITHER_ROSE",
                "BROWN_MUSHROOM",
                "RED_MUSHROOM",
                "CRIMSON_FUNGUS",
                "WARPED_FUNGUS",
                "CRIMSON_ROOTS",
                "WARPED_ROOTS",
                "NETHER_SPROUTS",
                "WEEPING_VINES",
                "TWISTING_VINES",
                "SUGAR_CANE",
                "KELP",
                "BAMBOO",
                "GOLD_BLOCK",
                "IRON_BLOCK",
                "OAK_SLAB",
                "SPRUCE_SLAB",
                "BIRCH_SLAB",
                "JUNGLE_SLAB",
                "ACACIA_SLAB",
                "DARK_OAK_SLAB",
                "CRIMSON_SLAB",
                "WARPED_SLAB",
                "STONE_SLAB",
                "SMOOTH_STONE_SLAB",
                "SANDSTONE_SLAB",
                "CUT_SANDSTONE_SLAB",
                "PETRIFIED_OAK_SLAB",
                "COBBLESTONE_SLAB",
                "BRICK_SLAB",
                "STONE_BRICK_SLAB",
                "NETHER_BRICK_SLAB",
                "QUARTZ_SLAB",
                "RED_SANDSTONE_SLAB",
                "CUT_RED_SANDSTONE_SLAB",
                "PURPUR_SLAB",
                "PRISMARINE_SLAB",
                "PRISMARINE_BRICK_SLAB",
                "DARK_PRISMARINE_SLAB",
                "SMOOTH_QUARTZ",
                "SMOOTH_RED_SANDSTONE",
                "SMOOTH_SANDSTONE",
                "SMOOTH_STONE",
                "BRICKS",
                "TNT",
                "BOOKSHELF",
                "MOSSY_COBBLESTONE",
                "OBSIDIAN",
                "TORCH",
                "END_ROD",
                "CHORUS_PLANT",
                "CHORUS_FLOWER",
                "PURPUR_BLOCK",
                "PURPUR_PILLAR",
                "PURPUR_STAIRS",
                "SPAWNER",
                "OAK_STAIRS",
                "CHEST",
                "DIAMOND_ORE",
                "DIAMOND_BLOCK",
                "CRAFTING_TABLE",
                "FARMLAND",
                "FURNACE",
                "LADDER",
                "RAIL",
                "COBBLESTONE_STAIRS",
                "LEVER",
                "STONE_PRESSURE_PLATE",
                "OAK_PRESSURE_PLATE",
                "SPRUCE_PRESSURE_PLATE",
                "BIRCH_PRESSURE_PLATE",
                "JUNGLE_PRESSURE_PLATE",
                "ACACIA_PRESSURE_PLATE",
                "DARK_OAK_PRESSURE_PLATE",
                "CRIMSON_PRESSURE_PLATE",
                "WARPED_PRESSURE_PLATE",
                "POLISHED_BLACKSTONE_PRESSURE_PLATE",
                "REDSTONE_ORE",
                "REDSTONE_TORCH",
                "SNOW",
                "ICE",
                "SNOW_BLOCK",
                "CACTUS",
                "CLAY",
                "JUKEBOX",
                "OAK_FENCE",
                "SPRUCE_FENCE",
                "BIRCH_FENCE",
                "JUNGLE_FENCE",
                "ACACIA_FENCE",
                "DARK_OAK_FENCE",
                "CRIMSON_FENCE",
                "WARPED_FENCE",
                "PUMPKIN",
                "CARVED_PUMPKIN",
                "NETHERRACK",
                "SOUL_SAND",
                "SOUL_SOIL",
                "BASALT",
                "POLISHED_BASALT",
                "SOUL_TORCH",
                "GLOWSTONE",
                "JACK_O_LANTERN",
                "OAK_TRAPDOOR",
                "SPRUCE_TRAPDOOR",
                "BIRCH_TRAPDOOR",
                "JUNGLE_TRAPDOOR",
                "ACACIA_TRAPDOOR",
                "DARK_OAK_TRAPDOOR",
                "CRIMSON_TRAPDOOR",
                "WARPED_TRAPDOOR",
                "INFESTED_STONE",
                "INFESTED_COBBLESTONE",
                "INFESTED_STONE_BRICKS",
                "INFESTED_MOSSY_STONE_BRICKS",
                "INFESTED_CRACKED_STONE_BRICKS",
                "INFESTED_CHISELED_STONE_BRICKS",
                "STONE_BRICKS",
                "MOSSY_STONE_BRICKS",
                "CRACKED_STONE_BRICKS",
                "CHISELED_STONE_BRICKS",
                "BROWN_MUSHROOM_BLOCK",
                "RED_MUSHROOM_BLOCK",
                "MUSHROOM_STEM",
                "IRON_BARS",
                "CHAIN",
                "GLASS_PANE",
                "MELON",
                "VINE",
                "OAK_FENCE_GATE",
                "SPRUCE_FENCE_GATE",
                "BIRCH_FENCE_GATE",
                "JUNGLE_FENCE_GATE",
                "ACACIA_FENCE_GATE",
                "DARK_OAK_FENCE_GATE",
                "CRIMSON_FENCE_GATE",
                "WARPED_FENCE_GATE",
                "BRICK_STAIRS",
                "STONE_BRICK_STAIRS",
                "MYCELIUM",
                "LILY_PAD",
                "NETHER_BRICKS",
                "CRACKED_NETHER_BRICKS",
                "CHISELED_NETHER_BRICKS",
                "NETHER_BRICK_FENCE",
                "NETHER_BRICK_STAIRS",
                "ENCHANTING_TABLE",
                "END_PORTAL_FRAME",
                "END_STONE",
                "END_STONE_BRICKS",
                "DRAGON_EGG",
                "REDSTONE_LAMP",
                "SANDSTONE_STAIRS",
                "EMERALD_ORE",
                "ENDER_CHEST",
                "TRIPWIRE_HOOK",
                "EMERALD_BLOCK",
                "SPRUCE_STAIRS",
                "BIRCH_STAIRS",
                "JUNGLE_STAIRS",
                "CRIMSON_STAIRS",
                "WARPED_STAIRS",
                "COMMAND_BLOCK",
                "BEACON",
                "COBBLESTONE_WALL",
                "MOSSY_COBBLESTONE_WALL",
                "BRICK_WALL",
                "PRISMARINE_WALL",
                "RED_SANDSTONE_WALL",
                "MOSSY_STONE_BRICK_WALL",
                "GRANITE_WALL",
                "STONE_BRICK_WALL",
                "NETHER_BRICK_WALL",
                "ANDESITE_WALL",
                "RED_NETHER_BRICK_WALL",
                "SANDSTONE_WALL",
                "END_STONE_BRICK_WALL",
                "DIORITE_WALL",
                "BLACKSTONE_WALL",
                "POLISHED_BLACKSTONE_WALL",
                "POLISHED_BLACKSTONE_BRICK_WALL",
                "STONE_BUTTON",
                "OAK_BUTTON",
                "SPRUCE_BUTTON",
                "BIRCH_BUTTON",
                "JUNGLE_BUTTON",
                "ACACIA_BUTTON",
                "DARK_OAK_BUTTON",
                "CRIMSON_BUTTON",
                "WARPED_BUTTON",
                "POLISHED_BLACKSTONE_BUTTON",
                "ANVIL",
                "CHIPPED_ANVIL",
                "DAMAGED_ANVIL",
                "TRAPPED_CHEST",
                "LIGHT_WEIGHTED_PRESSURE_PLATE",
                "HEAVY_WEIGHTED_PRESSURE_PLATE",
                "DAYLIGHT_DETECTOR",
                "REDSTONE_BLOCK",
                "NETHER_QUARTZ_ORE",
                "HOPPER",
                "CHISELED_QUARTZ_BLOCK",
                "QUARTZ_BLOCK",
                "QUARTZ_BRICKS",
                "QUARTZ_PILLAR",
                "QUARTZ_STAIRS",
                "ACTIVATOR_RAIL",
                "DROPPER",
                "WHITE_TERRACOTTA",
                "ORANGE_TERRACOTTA",
                "MAGENTA_TERRACOTTA",
                "LIGHT_BLUE_TERRACOTTA",
                "YELLOW_TERRACOTTA",
                "LIME_TERRACOTTA",
                "PINK_TERRACOTTA",
                "GRAY_TERRACOTTA",
                "LIGHT_GRAY_TERRACOTTA",
                "CYAN_TERRACOTTA",
                "PURPLE_TERRACOTTA",
                "BLUE_TERRACOTTA",
                "BROWN_TERRACOTTA",
                "GREEN_TERRACOTTA",
                "RED_TERRACOTTA",
                "BLACK_TERRACOTTA",
                "BARRIER",
                "IRON_TRAPDOOR",
                "HAY_BLOCK",
                "WHITE_CARPET",
                "ORANGE_CARPET",
                "MAGENTA_CARPET",
                "LIGHT_BLUE_CARPET",
                "YELLOW_CARPET",
                "LIME_CARPET",
                "PINK_CARPET",
                "GRAY_CARPET",
                "LIGHT_GRAY_CARPET",
                "CYAN_CARPET",
                "PURPLE_CARPET",
                "BLUE_CARPET",
                "BROWN_CARPET",
                "GREEN_CARPET",
                "RED_CARPET",
                "BLACK_CARPET",
                "TERRACOTTA",
                "COAL_BLOCK",
                "PACKED_ICE",
                "ACACIA_STAIRS",
                "DARK_OAK_STAIRS",
                "SLIME_BLOCK",
                "GRASS_PATH",
                "SUNFLOWER",
                "LILAC",
                "ROSE_BUSH",
                "PEONY",
                "TALL_GRASS",
                "LARGE_FERN",
                "WHITE_STAINED_GLASS",
                "ORANGE_STAINED_GLASS",
                "MAGENTA_STAINED_GLASS",
                "LIGHT_BLUE_STAINED_GLASS",
                "YELLOW_STAINED_GLASS",
                "LIME_STAINED_GLASS",
                "PINK_STAINED_GLASS",
                "GRAY_STAINED_GLASS",
                "LIGHT_GRAY_STAINED_GLASS",
                "CYAN_STAINED_GLASS",
                "PURPLE_STAINED_GLASS",
                "BLUE_STAINED_GLASS",
                "BROWN_STAINED_GLASS",
                "GREEN_STAINED_GLASS",
                "RED_STAINED_GLASS",
                "BLACK_STAINED_GLASS",
                "WHITE_STAINED_GLASS_PANE",
                "ORANGE_STAINED_GLASS_PANE",
                "MAGENTA_STAINED_GLASS_PANE",
                "LIGHT_BLUE_STAINED_GLASS_PANE",
                "YELLOW_STAINED_GLASS_PANE",
                "LIME_STAINED_GLASS_PANE",
                "PINK_STAINED_GLASS_PANE",
                "GRAY_STAINED_GLASS_PANE",
                "LIGHT_GRAY_STAINED_GLASS_PANE",
                "CYAN_STAINED_GLASS_PANE",
                "PURPLE_STAINED_GLASS_PANE",
                "BLUE_STAINED_GLASS_PANE",
                "BROWN_STAINED_GLASS_PANE",
                "GREEN_STAINED_GLASS_PANE",
                "RED_STAINED_GLASS_PANE",
                "BLACK_STAINED_GLASS_PANE",
                "PRISMARINE",
                "PRISMARINE_BRICKS",
                "DARK_PRISMARINE",
                "PRISMARINE_STAIRS",
                "PRISMARINE_BRICK_STAIRS",
                "DARK_PRISMARINE_STAIRS",
                "SEA_LANTERN",
                "RED_SANDSTONE",
                "CHISELED_RED_SANDSTONE",
                "CUT_RED_SANDSTONE",
                "RED_SANDSTONE_STAIRS",
                "REPEATING_COMMAND_BLOCK",
                "CHAIN_COMMAND_BLOCK",
                "MAGMA_BLOCK",
                "NETHER_WART_BLOCK",
                "WARPED_WART_BLOCK",
                "RED_NETHER_BRICKS",
                "BONE_BLOCK",
                "STRUCTURE_VOID",
                "OBSERVER",
                "SHULKER_BOX",
                "WHITE_SHULKER_BOX",
                "ORANGE_SHULKER_BOX",
                "MAGENTA_SHULKER_BOX",
                "LIGHT_BLUE_SHULKER_BOX",
                "YELLOW_SHULKER_BOX",
                "LIME_SHULKER_BOX",
                "PINK_SHULKER_BOX",
                "GRAY_SHULKER_BOX",
                "LIGHT_GRAY_SHULKER_BOX",
                "CYAN_SHULKER_BOX",
                "PURPLE_SHULKER_BOX",
                "BLUE_SHULKER_BOX",
                "BROWN_SHULKER_BOX",
                "GREEN_SHULKER_BOX",
                "RED_SHULKER_BOX",
                "BLACK_SHULKER_BOX",
                "WHITE_GLAZED_TERRACOTTA",
                "ORANGE_GLAZED_TERRACOTTA",
                "MAGENTA_GLAZED_TERRACOTTA",
                "LIGHT_BLUE_GLAZED_TERRACOTTA",
                "YELLOW_GLAZED_TERRACOTTA",
                "LIME_GLAZED_TERRACOTTA",
                "PINK_GLAZED_TERRACOTTA",
                "GRAY_GLAZED_TERRACOTTA",
                "LIGHT_GRAY_GLAZED_TERRACOTTA",
                "CYAN_GLAZED_TERRACOTTA",
                "PURPLE_GLAZED_TERRACOTTA",
                "BLUE_GLAZED_TERRACOTTA",
                "BROWN_GLAZED_TERRACOTTA",
                "GREEN_GLAZED_TERRACOTTA",
                "RED_GLAZED_TERRACOTTA",
                "BLACK_GLAZED_TERRACOTTA",
                "WHITE_CONCRETE",
                "ORANGE_CONCRETE",
                "MAGENTA_CONCRETE",
                "LIGHT_BLUE_CONCRETE",
                "YELLOW_CONCRETE",
                "LIME_CONCRETE",
                "PINK_CONCRETE",
                "GRAY_CONCRETE",
                "LIGHT_GRAY_CONCRETE",
                "CYAN_CONCRETE",
                "PURPLE_CONCRETE",
                "BLUE_CONCRETE",
                "BROWN_CONCRETE",
                "GREEN_CONCRETE",
                "RED_CONCRETE",
                "BLACK_CONCRETE",
                "WHITE_CONCRETE_POWDER",
                "ORANGE_CONCRETE_POWDER",
                "MAGENTA_CONCRETE_POWDER",
                "LIGHT_BLUE_CONCRETE_POWDER",
                "YELLOW_CONCRETE_POWDER",
                "LIME_CONCRETE_POWDER",
                "PINK_CONCRETE_POWDER",
                "GRAY_CONCRETE_POWDER",
                "LIGHT_GRAY_CONCRETE_POWDER",
                "CYAN_CONCRETE_POWDER",
                "PURPLE_CONCRETE_POWDER",
                "BLUE_CONCRETE_POWDER",
                "BROWN_CONCRETE_POWDER",
                "GREEN_CONCRETE_POWDER",
                "RED_CONCRETE_POWDER",
                "BLACK_CONCRETE_POWDER",
                "TURTLE_EGG",
                "DEAD_TUBE_CORAL_BLOCK",
                "DEAD_BRAIN_CORAL_BLOCK",
                "DEAD_BUBBLE_CORAL_BLOCK",
                "DEAD_FIRE_CORAL_BLOCK",
                "DEAD_HORN_CORAL_BLOCK",
                "TUBE_CORAL_BLOCK",
                "BRAIN_CORAL_BLOCK",
                "BUBBLE_CORAL_BLOCK",
                "FIRE_CORAL_BLOCK",
                "HORN_CORAL_BLOCK",
                "TUBE_CORAL",
                "BRAIN_CORAL",
                "BUBBLE_CORAL",
                "FIRE_CORAL",
                "HORN_CORAL",
                "DEAD_BRAIN_CORAL",
                "DEAD_BUBBLE_CORAL",
                "DEAD_FIRE_CORAL",
                "DEAD_HORN_CORAL",
                "DEAD_TUBE_CORAL",
                "TUBE_CORAL_FAN",
                "BRAIN_CORAL_FAN",
                "BUBBLE_CORAL_FAN",
                "FIRE_CORAL_FAN",
                "HORN_CORAL_FAN",
                "DEAD_TUBE_CORAL_FAN",
                "DEAD_BRAIN_CORAL_FAN",
                "DEAD_BUBBLE_CORAL_FAN",
                "DEAD_FIRE_CORAL_FAN",
                "DEAD_HORN_CORAL_FAN",
                "BLUE_ICE",
                "CONDUIT",
                "POLISHED_GRANITE_STAIRS",
                "SMOOTH_RED_SANDSTONE_STAIRS",
                "MOSSY_STONE_BRICK_STAIRS",
                "POLISHED_DIORITE_STAIRS",
                "MOSSY_COBBLESTONE_STAIRS",
                "END_STONE_BRICK_STAIRS",
                "STONE_STAIRS",
                "SMOOTH_SANDSTONE_STAIRS",
                "SMOOTH_QUARTZ_STAIRS",
                "GRANITE_STAIRS",
                "ANDESITE_STAIRS",
                "RED_NETHER_BRICK_STAIRS",
                "POLISHED_ANDESITE_STAIRS",
                "DIORITE_STAIRS",
                "POLISHED_GRANITE_SLAB",
                "SMOOTH_RED_SANDSTONE_SLAB",
                "MOSSY_STONE_BRICK_SLAB",
                "POLISHED_DIORITE_SLAB",
                "MOSSY_COBBLESTONE_SLAB",
                "END_STONE_BRICK_SLAB",
                "SMOOTH_SANDSTONE_SLAB",
                "SMOOTH_QUARTZ_SLAB",
                "GRANITE_SLAB",
                "ANDESITE_SLAB",
                "RED_NETHER_BRICK_SLAB",
                "POLISHED_ANDESITE_SLAB",
                "DIORITE_SLAB",
                "SCAFFOLDING",
                "IRON_DOOR",
                "OAK_DOOR",
                "SPRUCE_DOOR",
                "BIRCH_DOOR",
                "JUNGLE_DOOR",
                "ACACIA_DOOR",
                "DARK_OAK_DOOR",
                "CRIMSON_DOOR",
                "WARPED_DOOR",
                "REPEATER",
                "COMPARATOR",
                "STRUCTURE_BLOCK",
                "JIGSAW",
                "TURTLE_HELMET",
                "SCUTE",
                "FLINT_AND_STEEL",
                "APPLE",
                "BOW",
                "ARROW",
                "COAL",
                "CHARCOAL",
                "DIAMOND",
                "IRON_INGOT",
                "GOLD_INGOT",
                "NETHERITE_INGOT",
                "NETHERITE_SCRAP",
                "WOODEN_SWORD",
                "WOODEN_SHOVEL",
                "WOODEN_PICKAXE",
                "WOODEN_AXE",
                "WOODEN_HOE",
                "STONE_SWORD",
                "STONE_SHOVEL",
                "STONE_PICKAXE",
                "STONE_AXE",
                "STONE_HOE",
                "GOLDEN_SWORD",
                "GOLDEN_SHOVEL",
                "GOLDEN_PICKAXE",
                "GOLDEN_AXE",
                "GOLDEN_HOE",
                "IRON_SWORD",
                "IRON_SHOVEL",
                "IRON_PICKAXE",
                "IRON_AXE",
                "IRON_HOE",
                "DIAMOND_SWORD",
                "DIAMOND_SHOVEL",
                "DIAMOND_PICKAXE",
                "DIAMOND_AXE",
                "DIAMOND_HOE",
                "NETHERITE_SWORD",
                "NETHERITE_SHOVEL",
                "NETHERITE_PICKAXE",
                "NETHERITE_AXE",
                "NETHERITE_HOE",
                "STICK",
                "BOWL",
                "MUSHROOM_STEW",
                "STRING",
                "FEATHER",
                "GUNPOWDER",
                "WHEAT_SEEDS",
                "WHEAT",
                "BREAD",
                "LEATHER_HELMET",
                "LEATHER_CHESTPLATE",
                "LEATHER_LEGGINGS",
                "LEATHER_BOOTS",
                "CHAINMAIL_HELMET",
                "CHAINMAIL_CHESTPLATE",
                "CHAINMAIL_LEGGINGS",
                "CHAINMAIL_BOOTS",
                "IRON_HELMET",
                "IRON_CHESTPLATE",
                "IRON_LEGGINGS",
                "IRON_BOOTS",
                "DIAMOND_HELMET",
                "DIAMOND_CHESTPLATE",
                "DIAMOND_LEGGINGS",
                "DIAMOND_BOOTS",
                "GOLDEN_HELMET",
                "GOLDEN_CHESTPLATE",
                "GOLDEN_LEGGINGS",
                "GOLDEN_BOOTS",
                "NETHERITE_HELMET",
                "NETHERITE_CHESTPLATE",
                "NETHERITE_LEGGINGS",
                "NETHERITE_BOOTS",
                "FLINT",
                "PORKCHOP",
                "COOKED_PORKCHOP",
                "PAINTING",
                "GOLDEN_APPLE",
                "ENCHANTED_GOLDEN_APPLE",
                "OAK_SIGN",
                "SPRUCE_SIGN",
                "BIRCH_SIGN",
                "JUNGLE_SIGN",
                "ACACIA_SIGN",
                "DARK_OAK_SIGN",
                "CRIMSON_SIGN",
                "WARPED_SIGN",
                "BUCKET",
                "WATER_BUCKET",
                "LAVA_BUCKET",
                "MINECART",
                "SADDLE",
                "REDSTONE",
                "SNOWBALL",
                "OAK_BOAT",
                "LEATHER",
                "MILK_BUCKET",
                "PUFFERFISH_BUCKET",
                "SALMON_BUCKET",
                "COD_BUCKET",
                "TROPICAL_FISH_BUCKET",
                "BRICK",
                "CLAY_BALL",
                "DRIED_KELP_BLOCK",
                "PAPER",
                "BOOK",
                "SLIME_BALL",
                "CHEST_MINECART",
                "FURNACE_MINECART",
                "EGG",
                "COMPASS",
                "FISHING_ROD",
                "CLOCK",
                "GLOWSTONE_DUST",
                "COD",
                "SALMON",
                "TROPICAL_FISH",
                "PUFFERFISH",
                "COOKED_COD",
                "COOKED_SALMON",
                "INK_SAC",
                "COCOA_BEANS",
                "LAPIS_LAZULI",
                "WHITE_DYE",
                "ORANGE_DYE",
                "MAGENTA_DYE",
                "LIGHT_BLUE_DYE",
                "YELLOW_DYE",
                "LIME_DYE",
                "PINK_DYE",
                "GRAY_DYE",
                "LIGHT_GRAY_DYE",
                "CYAN_DYE",
                "PURPLE_DYE",
                "BLUE_DYE",
                "BROWN_DYE",
                "GREEN_DYE",
                "RED_DYE",
                "BLACK_DYE",
                "BONE_MEAL",
                "BONE",
                "SUGAR",
                "CAKE",
                "WHITE_BED",
                "ORANGE_BED",
                "MAGENTA_BED",
                "LIGHT_BLUE_BED",
                "YELLOW_BED",
                "LIME_BED",
                "PINK_BED",
                "GRAY_BED",
                "LIGHT_GRAY_BED",
                "CYAN_BED",
                "PURPLE_BED",
                "BLUE_BED",
                "BROWN_BED",
                "GREEN_BED",
                "RED_BED",
                "BLACK_BED",
                "COOKIE",
                "FILLED_MAP",
                "SHEARS",
                "MELON_SLICE",
                "DRIED_KELP",
                "PUMPKIN_SEEDS",
                "MELON_SEEDS",
                "BEEF",
                "COOKED_BEEF",
                "CHICKEN",
                "COOKED_CHICKEN",
                "ROTTEN_FLESH",
                "ENDER_PEARL",
                "BLAZE_ROD",
                "GHAST_TEAR",
                "GOLD_NUGGET",
                "NETHER_WART",
                "POTION",
                "GLASS_BOTTLE",
                "SPIDER_EYE",
                "FERMENTED_SPIDER_EYE",
                "BLAZE_POWDER",
                "MAGMA_CREAM",
                "BREWING_STAND",
                "CAULDRON",
                "ENDER_EYE",
                "GLISTERING_MELON_SLICE",
                "BAT_SPAWN_EGG",
                "BEE_SPAWN_EGG",
                "BLAZE_SPAWN_EGG",
                "CAT_SPAWN_EGG",
                "CAVE_SPIDER_SPAWN_EGG",
                "CHICKEN_SPAWN_EGG",
                "COD_SPAWN_EGG",
                "COW_SPAWN_EGG",
                "CREEPER_SPAWN_EGG",
                "DOLPHIN_SPAWN_EGG",
                "DONKEY_SPAWN_EGG",
                "DROWNED_SPAWN_EGG",
                "ELDER_GUARDIAN_SPAWN_EGG",
                "ENDERMAN_SPAWN_EGG",
                "ENDERMITE_SPAWN_EGG",
                "EVOKER_SPAWN_EGG",
                "FOX_SPAWN_EGG",
                "GHAST_SPAWN_EGG",
                "GUARDIAN_SPAWN_EGG",
                "HOGLIN_SPAWN_EGG",
                "HORSE_SPAWN_EGG",
                "HUSK_SPAWN_EGG",
                "LLAMA_SPAWN_EGG",
                "MAGMA_CUBE_SPAWN_EGG",
                "MOOSHROOM_SPAWN_EGG",
                "MULE_SPAWN_EGG",
                "OCELOT_SPAWN_EGG",
                "PANDA_SPAWN_EGG",
                "PARROT_SPAWN_EGG",
                "PHANTOM_SPAWN_EGG",
                "PIG_SPAWN_EGG",
                "PIGLIN_SPAWN_EGG",
                "PIGLIN_BRUTE_SPAWN_EGG",
                "PILLAGER_SPAWN_EGG",
                "POLAR_BEAR_SPAWN_EGG",
                "PUFFERFISH_SPAWN_EGG",
                "RABBIT_SPAWN_EGG",
                "RAVAGER_SPAWN_EGG",
                "SALMON_SPAWN_EGG",
                "SHEEP_SPAWN_EGG",
                "SHULKER_SPAWN_EGG",
                "SILVERFISH_SPAWN_EGG",
                "SKELETON_SPAWN_EGG",
                "SKELETON_HORSE_SPAWN_EGG",
                "SLIME_SPAWN_EGG",
                "SPIDER_SPAWN_EGG",
                "SQUID_SPAWN_EGG",
                "STRAY_SPAWN_EGG",
                "STRIDER_SPAWN_EGG",
                "TRADER_LLAMA_SPAWN_EGG",
                "TROPICAL_FISH_SPAWN_EGG",
                "TURTLE_SPAWN_EGG",
                "VEX_SPAWN_EGG",
                "VILLAGER_SPAWN_EGG",
                "VINDICATOR_SPAWN_EGG",
                "WANDERING_TRADER_SPAWN_EGG",
                "WITCH_SPAWN_EGG",
                "WITHER_SKELETON_SPAWN_EGG",
                "WOLF_SPAWN_EGG",
                "ZOGLIN_SPAWN_EGG",
                "ZOMBIE_SPAWN_EGG",
                "ZOMBIE_HORSE_SPAWN_EGG",
                "ZOMBIE_VILLAGER_SPAWN_EGG",
                "ZOMBIFIED_PIGLIN_SPAWN_EGG",
                "EXPERIENCE_BOTTLE",
                "FIRE_CHARGE",
                "WRITABLE_BOOK",
                "WRITTEN_BOOK",
                "EMERALD",
                "ITEM_FRAME",
                "FLOWER_POT",
                "CARROT",
                "POTATO",
                "BAKED_POTATO",
                "POISONOUS_POTATO",
                "MAP",
                "GOLDEN_CARROT",
                "SKELETON_SKULL",
                "WITHER_SKELETON_SKULL",
                "PLAYER_HEAD",
                "ZOMBIE_HEAD",
                "CREEPER_HEAD",
                "DRAGON_HEAD",
                "CARROT_ON_A_STICK",
                "WARPED_FUNGUS_ON_A_STICK",
                "NETHER_STAR",
                "PUMPKIN_PIE",
                "FIREWORK_ROCKET",
                "FIREWORK_STAR",
                "ENCHANTED_BOOK",
                "NETHER_BRICK",
                "QUARTZ",
                "TNT_MINECART",
                "HOPPER_MINECART",
                "PRISMARINE_SHARD",
                "PRISMARINE_CRYSTALS",
                "RABBIT",
                "COOKED_RABBIT",
                "RABBIT_STEW",
                "RABBIT_FOOT",
                "RABBIT_HIDE",
                "ARMOR_STAND",
                "IRON_HORSE_ARMOR",
                "GOLDEN_HORSE_ARMOR",
                "DIAMOND_HORSE_ARMOR",
                "LEATHER_HORSE_ARMOR",
                "LEAD",
                "NAME_TAG",
                "COMMAND_BLOCK_MINECART",
                "MUTTON",
                "COOKED_MUTTON",
                "WHITE_BANNER",
                "ORANGE_BANNER",
                "MAGENTA_BANNER",
                "LIGHT_BLUE_BANNER",
                "YELLOW_BANNER",
                "LIME_BANNER",
                "PINK_BANNER",
                "GRAY_BANNER",
                "LIGHT_GRAY_BANNER",
                "CYAN_BANNER",
                "PURPLE_BANNER",
                "BLUE_BANNER",
                "BROWN_BANNER",
                "GREEN_BANNER",
                "RED_BANNER",
                "BLACK_BANNER",
                "END_CRYSTAL",
                "CHORUS_FRUIT",
                "POPPED_CHORUS_FRUIT",
                "BEETROOT",
                "BEETROOT_SEEDS",
                "BEETROOT_SOUP",
                "DRAGON_BREATH",
                "SPLASH_POTION",
                "SPECTRAL_ARROW",
                "TIPPED_ARROW",
                "LINGERING_POTION",
                "SHIELD",
                "ELYTRA",
                "SPRUCE_BOAT",
                "BIRCH_BOAT",
                "JUNGLE_BOAT",
                "ACACIA_BOAT",
                "DARK_OAK_BOAT",
                "TOTEM_OF_UNDYING",
                "SHULKER_SHELL",
                "IRON_NUGGET",
                "KNOWLEDGE_BOOK",
                "DEBUG_STICK",
                "MUSIC_DISC_13",
                "MUSIC_DISC_CAT",
                "MUSIC_DISC_BLOCKS",
                "MUSIC_DISC_CHIRP",
                "MUSIC_DISC_FAR",
                "MUSIC_DISC_MALL",
                "MUSIC_DISC_MELLOHI",
                "MUSIC_DISC_STAL",
                "MUSIC_DISC_STRAD",
                "MUSIC_DISC_WARD",
                "MUSIC_DISC_11",
                "MUSIC_DISC_WAIT",
                "MUSIC_DISC_PIGSTEP",
                "TRIDENT",
                "PHANTOM_MEMBRANE",
                "NAUTILUS_SHELL",
                "HEART_OF_THE_SEA",
                "CROSSBOW",
                "SUSPICIOUS_STEW",
                "LOOM",
                "FLOWER_BANNER_PATTERN",
                "CREEPER_BANNER_PATTERN",
                "SKULL_BANNER_PATTERN",
                "MOJANG_BANNER_PATTERN",
                "GLOBE_BANNER_PATTERN",
                "PIGLIN_BANNER_PATTERN",
                "COMPOSTER",
                "BARREL",
                "SMOKER",
                "BLAST_FURNACE",
                "CARTOGRAPHY_TABLE",
                "FLETCHING_TABLE",
                "GRINDSTONE",
                "LECTERN",
                "SMITHING_TABLE",
                "STONECUTTER",
                "BELL",
                "LANTERN",
                "SOUL_LANTERN",
                "SWEET_BERRIES",
                "CAMPFIRE",
                "SOUL_CAMPFIRE",
                "SHROOMLIGHT",
                "HONEYCOMB",
                "BEE_NEST",
                "BEEHIVE",
                "HONEY_BOTTLE",
                "HONEY_BLOCK",
                "HONEYCOMB_BLOCK",
                "LODESTONE",
                "NETHERITE_BLOCK",
                "ANCIENT_DEBRIS",
                "TARGET",
                "CRYING_OBSIDIAN",
                "BLACKSTONE",
                "BLACKSTONE_SLAB",
                "BLACKSTONE_STAIRS",
                "GILDED_BLACKSTONE",
                "POLISHED_BLACKSTONE",
                "POLISHED_BLACKSTONE_SLAB",
                "POLISHED_BLACKSTONE_STAIRS",
                "CHISELED_POLISHED_BLACKSTONE",
                "POLISHED_BLACKSTONE_BRICKS",
                "POLISHED_BLACKSTONE_BRICK_SLAB",
                "POLISHED_BLACKSTONE_BRICK_STAIRS",
                "CRACKED_POLISHED_BLACKSTONE_BRICKS",
                "RESPAWN_ANCHOR",
                "WATER",
                "LAVA",
                "TALL_SEAGRASS",
                "PISTON_HEAD",
                "MOVING_PISTON",
                "WALL_TORCH",
                "FIRE",
                "SOUL_FIRE",
                "REDSTONE_WIRE",
                "OAK_WALL_SIGN",
                "SPRUCE_WALL_SIGN",
                "BIRCH_WALL_SIGN",
                "ACACIA_WALL_SIGN",
                "JUNGLE_WALL_SIGN",
                "DARK_OAK_WALL_SIGN",
                "REDSTONE_WALL_TORCH",
                "SOUL_WALL_TORCH",
                "NETHER_PORTAL",
                "ATTACHED_PUMPKIN_STEM",
                "ATTACHED_MELON_STEM",
                "PUMPKIN_STEM",
                "MELON_STEM",
                "END_PORTAL",
                "COCOA",
                "TRIPWIRE",
                "POTTED_OAK_SAPLING",
                "POTTED_SPRUCE_SAPLING",
                "POTTED_BIRCH_SAPLING",
                "POTTED_JUNGLE_SAPLING",
                "POTTED_ACACIA_SAPLING",
                "POTTED_DARK_OAK_SAPLING",
                "POTTED_FERN",
                "POTTED_DANDELION",
                "POTTED_POPPY",
                "POTTED_BLUE_ORCHID",
                "POTTED_ALLIUM",
                "POTTED_AZURE_BLUET",
                "POTTED_RED_TULIP",
                "POTTED_ORANGE_TULIP",
                "POTTED_WHITE_TULIP",
                "POTTED_PINK_TULIP",
                "POTTED_OXEYE_DAISY",
                "POTTED_CORNFLOWER",
                "POTTED_LILY_OF_THE_VALLEY",
                "POTTED_WITHER_ROSE",
                "POTTED_RED_MUSHROOM",
                "POTTED_BROWN_MUSHROOM",
                "POTTED_DEAD_BUSH",
                "POTTED_CACTUS",
                "CARROTS",
                "POTATOES",
                "SKELETON_WALL_SKULL",
                "WITHER_SKELETON_WALL_SKULL",
                "ZOMBIE_WALL_HEAD",
                "PLAYER_WALL_HEAD",
                "CREEPER_WALL_HEAD",
                "DRAGON_WALL_HEAD",
                "WHITE_WALL_BANNER",
                "ORANGE_WALL_BANNER",
                "MAGENTA_WALL_BANNER",
                "LIGHT_BLUE_WALL_BANNER",
                "YELLOW_WALL_BANNER",
                "LIME_WALL_BANNER",
                "PINK_WALL_BANNER",
                "GRAY_WALL_BANNER",
                "LIGHT_GRAY_WALL_BANNER",
                "CYAN_WALL_BANNER",
                "PURPLE_WALL_BANNER",
                "BLUE_WALL_BANNER",
                "BROWN_WALL_BANNER",
                "GREEN_WALL_BANNER",
                "RED_WALL_BANNER",
                "BLACK_WALL_BANNER",
                "BEETROOTS",
                "END_GATEWAY",
                "FROSTED_ICE",
                "KELP_PLANT",
                "DEAD_TUBE_CORAL_WALL_FAN",
                "DEAD_BRAIN_CORAL_WALL_FAN",
                "DEAD_BUBBLE_CORAL_WALL_FAN",
                "DEAD_FIRE_CORAL_WALL_FAN",
                "DEAD_HORN_CORAL_WALL_FAN",
                "TUBE_CORAL_WALL_FAN",
                "BRAIN_CORAL_WALL_FAN",
                "BUBBLE_CORAL_WALL_FAN",
                "FIRE_CORAL_WALL_FAN",
                "HORN_CORAL_WALL_FAN",
                "BAMBOO_SAPLING",
                "POTTED_BAMBOO",
                "VOID_AIR",
                "CAVE_AIR",
                "BUBBLE_COLUMN",
                "SWEET_BERRY_BUSH",
                "WEEPING_VINES_PLANT",
                "TWISTING_VINES_PLANT",
                "CRIMSON_WALL_SIGN",
                "WARPED_WALL_SIGN",
                "POTTED_CRIMSON_FUNGUS",
                "POTTED_WARPED_FUNGUS",
                "POTTED_CRIMSON_ROOTS",
                "POTTED_WARPED_ROOTS"
            ]
        },
        "vanilla_blocks": {
            "$id": "vanilla_blocks",
            "title": "Vanilla blocks",
            "markdownDescription": "Examples: **STONE**, **DIAMOND_BLOCK**",
            "type": "string",
            "anyOf": [
                {
                    "type": "string",
                    "enum": [
                        "AIR",
                        "STONE",
                        "GRANITE",
                        "POLISHED_GRANITE",
                        "DIORITE",
                        "POLISHED_DIORITE",
                        "ANDESITE",
                        "POLISHED_ANDESITE",
                        "GRASS_BLOCK",
                        "DIRT",
                        "COARSE_DIRT",
                        "PODZOL",
                        "CRIMSON_NYLIUM",
                        "WARPED_NYLIUM",
                        "COBBLESTONE",
                        "OAK_PLANKS",
                        "SPRUCE_PLANKS",
                        "BIRCH_PLANKS",
                        "JUNGLE_PLANKS",
                        "ACACIA_PLANKS",
                        "DARK_OAK_PLANKS",
                        "CRIMSON_PLANKS",
                        "WARPED_PLANKS",
                        "OAK_SAPLING",
                        "SPRUCE_SAPLING",
                        "BIRCH_SAPLING",
                        "JUNGLE_SAPLING",
                        "ACACIA_SAPLING",
                        "DARK_OAK_SAPLING",
                        "BEDROCK",
                        "SAND",
                        "RED_SAND",
                        "GRAVEL",
                        "GOLD_ORE",
                        "IRON_ORE",
                        "COAL_ORE",
                        "NETHER_GOLD_ORE",
                        "OAK_LOG",
                        "SPRUCE_LOG",
                        "BIRCH_LOG",
                        "JUNGLE_LOG",
                        "ACACIA_LOG",
                        "DARK_OAK_LOG",
                        "CRIMSON_STEM",
                        "WARPED_STEM",
                        "STRIPPED_OAK_LOG",
                        "STRIPPED_SPRUCE_LOG",
                        "STRIPPED_BIRCH_LOG",
                        "STRIPPED_JUNGLE_LOG",
                        "STRIPPED_ACACIA_LOG",
                        "STRIPPED_DARK_OAK_LOG",
                        "STRIPPED_CRIMSON_STEM",
                        "STRIPPED_WARPED_STEM",
                        "STRIPPED_OAK_WOOD",
                        "STRIPPED_SPRUCE_WOOD",
                        "STRIPPED_BIRCH_WOOD",
                        "STRIPPED_JUNGLE_WOOD",
                        "STRIPPED_ACACIA_WOOD",
                        "STRIPPED_DARK_OAK_WOOD",
                        "STRIPPED_CRIMSON_HYPHAE",
                        "STRIPPED_WARPED_HYPHAE",
                        "OAK_WOOD",
                        "SPRUCE_WOOD",
                        "BIRCH_WOOD",
                        "JUNGLE_WOOD",
                        "ACACIA_WOOD",
                        "DARK_OAK_WOOD",
                        "CRIMSON_HYPHAE",
                        "WARPED_HYPHAE",
                        "OAK_LEAVES",
                        "SPRUCE_LEAVES",
                        "BIRCH_LEAVES",
                        "JUNGLE_LEAVES",
                        "ACACIA_LEAVES",
                        "DARK_OAK_LEAVES",
                        "SPONGE",
                        "WET_SPONGE",
                        "GLASS",
                        "LAPIS_ORE",
                        "LAPIS_BLOCK",
                        "DISPENSER",
                        "SANDSTONE",
                        "CHISELED_SANDSTONE",
                        "CUT_SANDSTONE",
                        "NOTE_BLOCK",
                        "POWERED_RAIL",
                        "DETECTOR_RAIL",
                        "STICKY_PISTON",
                        "COBWEB",
                        "GRASS",
                        "FERN",
                        "DEAD_BUSH",
                        "SEAGRASS",
                        "SEA_PICKLE",
                        "PISTON",
                        "WHITE_WOOL",
                        "ORANGE_WOOL",
                        "MAGENTA_WOOL",
                        "LIGHT_BLUE_WOOL",
                        "YELLOW_WOOL",
                        "LIME_WOOL",
                        "PINK_WOOL",
                        "GRAY_WOOL",
                        "LIGHT_GRAY_WOOL",
                        "CYAN_WOOL",
                        "PURPLE_WOOL",
                        "BLUE_WOOL",
                        "BROWN_WOOL",
                        "GREEN_WOOL",
                        "RED_WOOL",
                        "BLACK_WOOL",
                        "DANDELION",
                        "POPPY",
                        "BLUE_ORCHID",
                        "ALLIUM",
                        "AZURE_BLUET",
                        "RED_TULIP",
                        "ORANGE_TULIP",
                        "WHITE_TULIP",
                        "PINK_TULIP",
                        "OXEYE_DAISY",
                        "CORNFLOWER",
                        "LILY_OF_THE_VALLEY",
                        "WITHER_ROSE",
                        "BROWN_MUSHROOM",
                        "RED_MUSHROOM",
                        "CRIMSON_FUNGUS",
                        "WARPED_FUNGUS",
                        "CRIMSON_ROOTS",
                        "WARPED_ROOTS",
                        "NETHER_SPROUTS",
                        "WEEPING_VINES",
                        "TWISTING_VINES",
                        "SUGAR_CANE",
                        "KELP",
                        "BAMBOO",
                        "GOLD_BLOCK",
                        "IRON_BLOCK",
                        "OAK_SLAB",
                        "SPRUCE_SLAB",
                        "BIRCH_SLAB",
                        "JUNGLE_SLAB",
                        "ACACIA_SLAB",
                        "DARK_OAK_SLAB",
                        "CRIMSON_SLAB",
                        "WARPED_SLAB",
                        "STONE_SLAB",
                        "SMOOTH_STONE_SLAB",
                        "SANDSTONE_SLAB",
                        "CUT_SANDSTONE_SLAB",
                        "PETRIFIED_OAK_SLAB",
                        "COBBLESTONE_SLAB",
                        "BRICK_SLAB",
                        "STONE_BRICK_SLAB",
                        "NETHER_BRICK_SLAB",
                        "QUARTZ_SLAB",
                        "RED_SANDSTONE_SLAB",
                        "CUT_RED_SANDSTONE_SLAB",
                        "PURPUR_SLAB",
                        "PRISMARINE_SLAB",
                        "PRISMARINE_BRICK_SLAB",
                        "DARK_PRISMARINE_SLAB",
                        "SMOOTH_QUARTZ",
                        "SMOOTH_RED_SANDSTONE",
                        "SMOOTH_SANDSTONE",
                        "SMOOTH_STONE",
                        "BRICKS",
                        "TNT",
                        "BOOKSHELF",
                        "MOSSY_COBBLESTONE",
                        "OBSIDIAN",
                        "TORCH",
                        "END_ROD",
                        "CHORUS_PLANT",
                        "CHORUS_FLOWER",
                        "PURPUR_BLOCK",
                        "PURPUR_PILLAR",
                        "PURPUR_STAIRS",
                        "SPAWNER",
                        "OAK_STAIRS",
                        "CHEST",
                        "DIAMOND_ORE",
                        "DIAMOND_BLOCK",
                        "CRAFTING_TABLE",
                        "FARMLAND",
                        "FURNACE",
                        "LADDER",
                        "RAIL",
                        "COBBLESTONE_STAIRS",
                        "LEVER",
                        "STONE_PRESSURE_PLATE",
                        "OAK_PRESSURE_PLATE",
                        "SPRUCE_PRESSURE_PLATE",
                        "BIRCH_PRESSURE_PLATE",
                        "JUNGLE_PRESSURE_PLATE",
                        "ACACIA_PRESSURE_PLATE",
                        "DARK_OAK_PRESSURE_PLATE",
                        "CRIMSON_PRESSURE_PLATE",
                        "WARPED_PRESSURE_PLATE",
                        "POLISHED_BLACKSTONE_PRESSURE_PLATE",
                        "REDSTONE_ORE",
                        "REDSTONE_TORCH",
                        "SNOW",
                        "ICE",
                        "SNOW_BLOCK",
                        "CACTUS",
                        "CLAY",
                        "JUKEBOX",
                        "OAK_FENCE",
                        "SPRUCE_FENCE",
                        "BIRCH_FENCE",
                        "JUNGLE_FENCE",
                        "ACACIA_FENCE",
                        "DARK_OAK_FENCE",
                        "CRIMSON_FENCE",
                        "WARPED_FENCE",
                        "PUMPKIN",
                        "CARVED_PUMPKIN",
                        "NETHERRACK",
                        "SOUL_SAND",
                        "SOUL_SOIL",
                        "BASALT",
                        "POLISHED_BASALT",
                        "SOUL_TORCH",
                        "GLOWSTONE",
                        "JACK_O_LANTERN",
                        "OAK_TRAPDOOR",
                        "SPRUCE_TRAPDOOR",
                        "BIRCH_TRAPDOOR",
                        "JUNGLE_TRAPDOOR",
                        "ACACIA_TRAPDOOR",
                        "DARK_OAK_TRAPDOOR",
                        "CRIMSON_TRAPDOOR",
                        "WARPED_TRAPDOOR",
                        "INFESTED_STONE",
                        "INFESTED_COBBLESTONE",
                        "INFESTED_STONE_BRICKS",
                        "INFESTED_MOSSY_STONE_BRICKS",
                        "INFESTED_CRACKED_STONE_BRICKS",
                        "INFESTED_CHISELED_STONE_BRICKS",
                        "STONE_BRICKS",
                        "MOSSY_STONE_BRICKS",
                        "CRACKED_STONE_BRICKS",
                        "CHISELED_STONE_BRICKS",
                        "BROWN_MUSHROOM_BLOCK",
                        "RED_MUSHROOM_BLOCK",
                        "MUSHROOM_STEM",
                        "IRON_BARS",
                        "CHAIN",
                        "GLASS_PANE",
                        "MELON",
                        "VINE",
                        "OAK_FENCE_GATE",
                        "SPRUCE_FENCE_GATE",
                        "BIRCH_FENCE_GATE",
                        "JUNGLE_FENCE_GATE",
                        "ACACIA_FENCE_GATE",
                        "DARK_OAK_FENCE_GATE",
                        "CRIMSON_FENCE_GATE",
                        "WARPED_FENCE_GATE",
                        "BRICK_STAIRS",
                        "STONE_BRICK_STAIRS",
                        "MYCELIUM",
                        "LILY_PAD",
                        "NETHER_BRICKS",
                        "CRACKED_NETHER_BRICKS",
                        "CHISELED_NETHER_BRICKS",
                        "NETHER_BRICK_FENCE",
                        "NETHER_BRICK_STAIRS",
                        "ENCHANTING_TABLE",
                        "END_PORTAL_FRAME",
                        "END_STONE",
                        "END_STONE_BRICKS",
                        "DRAGON_EGG",
                        "REDSTONE_LAMP",
                        "SANDSTONE_STAIRS",
                        "EMERALD_ORE",
                        "ENDER_CHEST",
                        "TRIPWIRE_HOOK",
                        "EMERALD_BLOCK",
                        "SPRUCE_STAIRS",
                        "BIRCH_STAIRS",
                        "JUNGLE_STAIRS",
                        "CRIMSON_STAIRS",
                        "WARPED_STAIRS",
                        "COMMAND_BLOCK",
                        "BEACON",
                        "COBBLESTONE_WALL",
                        "MOSSY_COBBLESTONE_WALL",
                        "BRICK_WALL",
                        "PRISMARINE_WALL",
                        "RED_SANDSTONE_WALL",
                        "MOSSY_STONE_BRICK_WALL",
                        "GRANITE_WALL",
                        "STONE_BRICK_WALL",
                        "NETHER_BRICK_WALL",
                        "ANDESITE_WALL",
                        "RED_NETHER_BRICK_WALL",
                        "SANDSTONE_WALL",
                        "END_STONE_BRICK_WALL",
                        "DIORITE_WALL",
                        "BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_WALL",
                        "POLISHED_BLACKSTONE_BRICK_WALL",
                        "STONE_BUTTON",
                        "OAK_BUTTON",
                        "SPRUCE_BUTTON",
                        "BIRCH_BUTTON",
                        "JUNGLE_BUTTON",
                        "ACACIA_BUTTON",
                        "DARK_OAK_BUTTON",
                        "CRIMSON_BUTTON",
                        "WARPED_BUTTON",
                        "POLISHED_BLACKSTONE_BUTTON",
                        "ANVIL",
                        "CHIPPED_ANVIL",
                        "DAMAGED_ANVIL",
                        "TRAPPED_CHEST",
                        "LIGHT_WEIGHTED_PRESSURE_PLATE",
                        "HEAVY_WEIGHTED_PRESSURE_PLATE",
                        "DAYLIGHT_DETECTOR",
                        "REDSTONE_BLOCK",
                        "NETHER_QUARTZ_ORE",
                        "HOPPER",
                        "CHISELED_QUARTZ_BLOCK",
                        "QUARTZ_BLOCK",
                        "QUARTZ_BRICKS",
                        "QUARTZ_PILLAR",
                        "QUARTZ_STAIRS",
                        "ACTIVATOR_RAIL",
                        "DROPPER",
                        "WHITE_TERRACOTTA",
                        "ORANGE_TERRACOTTA",
                        "MAGENTA_TERRACOTTA",
                        "LIGHT_BLUE_TERRACOTTA",
                        "YELLOW_TERRACOTTA",
                        "LIME_TERRACOTTA",
                        "PINK_TERRACOTTA",
                        "GRAY_TERRACOTTA",
                        "LIGHT_GRAY_TERRACOTTA",
                        "CYAN_TERRACOTTA",
                        "PURPLE_TERRACOTTA",
                        "BLUE_TERRACOTTA",
                        "BROWN_TERRACOTTA",
                        "GREEN_TERRACOTTA",
                        "RED_TERRACOTTA",
                        "BLACK_TERRACOTTA",
                        "BARRIER",
                        "IRON_TRAPDOOR",
                        "HAY_BLOCK",
                        "WHITE_CARPET",
                        "ORANGE_CARPET",
                        "MAGENTA_CARPET",
                        "LIGHT_BLUE_CARPET",
                        "YELLOW_CARPET",
                        "LIME_CARPET",
                        "PINK_CARPET",
                        "GRAY_CARPET",
                        "LIGHT_GRAY_CARPET",
                        "CYAN_CARPET",
                        "PURPLE_CARPET",
                        "BLUE_CARPET",
                        "BROWN_CARPET",
                        "GREEN_CARPET",
                        "RED_CARPET",
                        "BLACK_CARPET",
                        "TERRACOTTA",
                        "COAL_BLOCK",
                        "PACKED_ICE",
                        "ACACIA_STAIRS",
                        "DARK_OAK_STAIRS",
                        "SLIME_BLOCK",
                        "GRASS_PATH",
                        "SUNFLOWER",
                        "LILAC",
                        "ROSE_BUSH",
                        "PEONY",
                        "TALL_GRASS",
                        "LARGE_FERN",
                        "WHITE_STAINED_GLASS",
                        "ORANGE_STAINED_GLASS",
                        "MAGENTA_STAINED_GLASS",
                        "LIGHT_BLUE_STAINED_GLASS",
                        "YELLOW_STAINED_GLASS",
                        "LIME_STAINED_GLASS",
                        "PINK_STAINED_GLASS",
                        "GRAY_STAINED_GLASS",
                        "LIGHT_GRAY_STAINED_GLASS",
                        "CYAN_STAINED_GLASS",
                        "PURPLE_STAINED_GLASS",
                        "BLUE_STAINED_GLASS",
                        "BROWN_STAINED_GLASS",
                        "GREEN_STAINED_GLASS",
                        "RED_STAINED_GLASS",
                        "BLACK_STAINED_GLASS",
                        "WHITE_STAINED_GLASS_PANE",
                        "ORANGE_STAINED_GLASS_PANE",
                        "MAGENTA_STAINED_GLASS_PANE",
                        "LIGHT_BLUE_STAINED_GLASS_PANE",
                        "YELLOW_STAINED_GLASS_PANE",
                        "LIME_STAINED_GLASS_PANE",
                        "PINK_STAINED_GLASS_PANE",
                        "GRAY_STAINED_GLASS_PANE",
                        "LIGHT_GRAY_STAINED_GLASS_PANE",
                        "CYAN_STAINED_GLASS_PANE",
                        "PURPLE_STAINED_GLASS_PANE",
                        "BLUE_STAINED_GLASS_PANE",
                        "BROWN_STAINED_GLASS_PANE",
                        "GREEN_STAINED_GLASS_PANE",
                        "RED_STAINED_GLASS_PANE",
                        "BLACK_STAINED_GLASS_PANE",
                        "PRISMARINE",
                        "PRISMARINE_BRICKS",
                        "DARK_PRISMARINE",
                        "PRISMARINE_STAIRS",
                        "PRISMARINE_BRICK_STAIRS",
                        "DARK_PRISMARINE_STAIRS",
                        "SEA_LANTERN",
                        "RED_SANDSTONE",
                        "CHISELED_RED_SANDSTONE",
                        "CUT_RED_SANDSTONE",
                        "RED_SANDSTONE_STAIRS",
                        "REPEATING_COMMAND_BLOCK",
                        "CHAIN_COMMAND_BLOCK",
                        "MAGMA_BLOCK",
                        "NETHER_WART_BLOCK",
                        "WARPED_WART_BLOCK",
                        "RED_NETHER_BRICKS",
                        "BONE_BLOCK",
                        "STRUCTURE_VOID",
                        "OBSERVER",
                        "SHULKER_BOX",
                        "WHITE_SHULKER_BOX",
                        "ORANGE_SHULKER_BOX",
                        "MAGENTA_SHULKER_BOX",
                        "LIGHT_BLUE_SHULKER_BOX",
                        "YELLOW_SHULKER_BOX",
                        "LIME_SHULKER_BOX",
                        "PINK_SHULKER_BOX",
                        "GRAY_SHULKER_BOX",
                        "LIGHT_GRAY_SHULKER_BOX",
                        "CYAN_SHULKER_BOX",
                        "PURPLE_SHULKER_BOX",
                        "BLUE_SHULKER_BOX",
                        "BROWN_SHULKER_BOX",
                        "GREEN_SHULKER_BOX",
                        "RED_SHULKER_BOX",
                        "BLACK_SHULKER_BOX",
                        "WHITE_GLAZED_TERRACOTTA",
                        "ORANGE_GLAZED_TERRACOTTA",
                        "MAGENTA_GLAZED_TERRACOTTA",
                        "LIGHT_BLUE_GLAZED_TERRACOTTA",
                        "YELLOW_GLAZED_TERRACOTTA",
                        "LIME_GLAZED_TERRACOTTA",
                        "PINK_GLAZED_TERRACOTTA",
                        "GRAY_GLAZED_TERRACOTTA",
                        "LIGHT_GRAY_GLAZED_TERRACOTTA",
                        "CYAN_GLAZED_TERRACOTTA",
                        "PURPLE_GLAZED_TERRACOTTA",
                        "BLUE_GLAZED_TERRACOTTA",
                        "BROWN_GLAZED_TERRACOTTA",
                        "GREEN_GLAZED_TERRACOTTA",
                        "RED_GLAZED_TERRACOTTA",
                        "BLACK_GLAZED_TERRACOTTA",
                        "WHITE_CONCRETE",
                        "ORANGE_CONCRETE",
                        "MAGENTA_CONCRETE",
                        "LIGHT_BLUE_CONCRETE",
                        "YELLOW_CONCRETE",
                        "LIME_CONCRETE",
                        "PINK_CONCRETE",
                        "GRAY_CONCRETE",
                        "LIGHT_GRAY_CONCRETE",
                        "CYAN_CONCRETE",
                        "PURPLE_CONCRETE",
                        "BLUE_CONCRETE",
                        "BROWN_CONCRETE",
                        "GREEN_CONCRETE",
                        "RED_CONCRETE",
                        "BLACK_CONCRETE",
                        "WHITE_CONCRETE_POWDER",
                        "ORANGE_CONCRETE_POWDER",
                        "MAGENTA_CONCRETE_POWDER",
                        "LIGHT_BLUE_CONCRETE_POWDER",
                        "YELLOW_CONCRETE_POWDER",
                        "LIME_CONCRETE_POWDER",
                        "PINK_CONCRETE_POWDER",
                        "GRAY_CONCRETE_POWDER",
                        "LIGHT_GRAY_CONCRETE_POWDER",
                        "CYAN_CONCRETE_POWDER",
                        "PURPLE_CONCRETE_POWDER",
                        "BLUE_CONCRETE_POWDER",
                        "BROWN_CONCRETE_POWDER",
                        "GREEN_CONCRETE_POWDER",
                        "RED_CONCRETE_POWDER",
                        "BLACK_CONCRETE_POWDER",
                        "TURTLE_EGG",
                        "DEAD_TUBE_CORAL_BLOCK",
                        "DEAD_BRAIN_CORAL_BLOCK",
                        "DEAD_BUBBLE_CORAL_BLOCK",
                        "DEAD_FIRE_CORAL_BLOCK",
                        "DEAD_HORN_CORAL_BLOCK",
                        "TUBE_CORAL_BLOCK",
                        "BRAIN_CORAL_BLOCK",
                        "BUBBLE_CORAL_BLOCK",
                        "FIRE_CORAL_BLOCK",
                        "HORN_CORAL_BLOCK",
                        "TUBE_CORAL",
                        "BRAIN_CORAL",
                        "BUBBLE_CORAL",
                        "FIRE_CORAL",
                        "HORN_CORAL",
                        "DEAD_BRAIN_CORAL",
                        "DEAD_BUBBLE_CORAL",
                        "DEAD_FIRE_CORAL",
                        "DEAD_HORN_CORAL",
                        "DEAD_TUBE_CORAL",
                        "TUBE_CORAL_FAN",
                        "BRAIN_CORAL_FAN",
                        "BUBBLE_CORAL_FAN",
                        "FIRE_CORAL_FAN",
                        "HORN_CORAL_FAN",
                        "DEAD_TUBE_CORAL_FAN",
                        "DEAD_BRAIN_CORAL_FAN",
                        "DEAD_BUBBLE_CORAL_FAN",
                        "DEAD_FIRE_CORAL_FAN",
                        "DEAD_HORN_CORAL_FAN",
                        "BLUE_ICE",
                        "CONDUIT",
                        "POLISHED_GRANITE_STAIRS",
                        "SMOOTH_RED_SANDSTONE_STAIRS",
                        "MOSSY_STONE_BRICK_STAIRS",
                        "POLISHED_DIORITE_STAIRS",
                        "MOSSY_COBBLESTONE_STAIRS",
                        "END_STONE_BRICK_STAIRS",
                        "STONE_STAIRS",
                        "SMOOTH_SANDSTONE_STAIRS",
                        "SMOOTH_QUARTZ_STAIRS",
                        "GRANITE_STAIRS",
                        "ANDESITE_STAIRS",
                        "RED_NETHER_BRICK_STAIRS",
                        "POLISHED_ANDESITE_STAIRS",
                        "DIORITE_STAIRS",
                        "POLISHED_GRANITE_SLAB",
                        "SMOOTH_RED_SANDSTONE_SLAB",
                        "MOSSY_STONE_BRICK_SLAB",
                        "POLISHED_DIORITE_SLAB",
                        "MOSSY_COBBLESTONE_SLAB",
                        "END_STONE_BRICK_SLAB",
                        "SMOOTH_SANDSTONE_SLAB",
                        "SMOOTH_QUARTZ_SLAB",
                        "GRANITE_SLAB",
                        "ANDESITE_SLAB",
                        "RED_NETHER_BRICK_SLAB",
                        "POLISHED_ANDESITE_SLAB",
                        "DIORITE_SLAB",
                        "SCAFFOLDING",
                        "IRON_DOOR",
                        "OAK_DOOR",
                        "SPRUCE_DOOR",
                        "BIRCH_DOOR",
                        "JUNGLE_DOOR",
                        "ACACIA_DOOR",
                        "DARK_OAK_DOOR",
                        "CRIMSON_DOOR",
                        "WARPED_DOOR",
                        "REPEATER",
                        "COMPARATOR",
                        "STRUCTURE_BLOCK",
                        "JIGSAW"
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
                "type": { "$ref": "#/$defs/vanilla_potion_effects" },
                "amplifier": { "type": "integer" },
                "duration": { "type": "integer" },
                "ambient": { "type": "boolean" }
            }
        },
        "potion_types": {
            "$id": "potion_types",
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
            ]
        },
        "vanilla_potion_types": {
            "$id": "vanilla_potion_types",
            "type": "string",
            "markdownDescription": "Vanilla potion types",
            "enum": [
                "UNCRAFTABLE",
                "WATER",
                "MUNDANE",
                "THICK",
                "AWKWARD",
                "NIGHT_VISION",
                "INVISIBILITY",
                "JUMP",
                "FIRE_RESISTANCE",
                "SPEED",
                "SLOWNESS",
                "WATER_BREATHING",
                "INSTANT_HEAL",
                "INSTANT_DAMAGE",
                "POISON",
                "REGEN",
                "STRENGTH",
                "WEAKNESS",
                "LUCK",
                "TURTLE_MASTER",
                "SLOW_FALLING"
            ]
        },
        "vanilla_sounds": {
            "$id": "vanilla_sounds",
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
                "block.bamboo.break",
                "block.bamboo.fall",
                "block.bamboo.hit",
                "block.bamboo.place",
                "block.bamboo.step",
                "block.bamboo_sapling.break",
                "block.bamboo_sapling.hit",
                "block.bamboo_sapling.place",
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
                "block.campfire.crackle",
                "block.chain.break",
                "block.chain.fall",
                "block.chain.hit",
                "block.chain.place",
                "block.chain.step",
                "block.chest.close",
                "block.chest.locked",
                "block.chest.open",
                "block.chorus_flower.death",
                "block.chorus_flower.grow",
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
                "block.coral_block.break",
                "block.coral_block.fall",
                "block.coral_block.hit",
                "block.coral_block.place",
                "block.coral_block.step",
                "block.crop.break",
                "block.dispenser.dispense",
                "block.dispenser.fail",
                "block.dispenser.launch",
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
                "block.metal.break",
                "block.metal.fall",
                "block.metal.hit",
                "block.metal.place",
                "block.metal.step",
                "block.metal_pressure_plate.click_off",
                "block.metal_pressure_plate.click_on",
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
                "block.note_block.iron_xylophone",
                "block.note_block.pling",
                "block.note_block.snare",
                "block.note_block.xylophone",
                "block.nylium.break",
                "block.nylium.fall",
                "block.nylium.hit",
                "block.nylium.place",
                "block.nylium.step",
                "block.piston.contract",
                "block.piston.extend",
                "block.portal.ambient",
                "block.portal.travel",
                "block.portal.trigger",
                "block.pumpkin.carve",
                "block.redstone_torch.burnout",
                "block.respawn_anchor.ambient",
                "block.respawn_anchor.charge",
                "block.respawn_anchor.deplete",
                "block.respawn_anchor.set_spawn",
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
                "block.shroomlight.break",
                "block.shroomlight.fall",
                "block.shroomlight.hit",
                "block.shroomlight.place",
                "block.shroomlight.step",
                "block.shulker_box.close",
                "block.shulker_box.open",
                "block.slime_block.break",
                "block.slime_block.fall",
                "block.slime_block.hit",
                "block.slime_block.place",
                "block.slime_block.step",
                "block.smithing_table.use",
                "block.smoker.smoke",
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
                "block.sweet_berry_bush.break",
                "block.sweet_berry_bush.place",
                "block.tripwire.attach",
                "block.tripwire.click_off",
                "block.tripwire.click_on",
                "block.tripwire.detach",
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
                "entity.armor_stand.break",
                "entity.armor_stand.fall",
                "entity.armor_stand.hit",
                "entity.armor_stand.place",
                "entity.arrow.hit",
                "entity.arrow.hit_player",
                "entity.arrow.shoot",
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
                "entity.player.hurt_on_fire",
                "entity.player.hurt_sweet_berry_bush",
                "entity.player.levelup",
                "entity.player.small_fall",
                "entity.player.splash",
                "entity.player.splash.high_speed",
                "entity.player.swim",
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
                "item.axe.strip",
                "item.book.page_turn",
                "item.book.put",
                "item.bottle.empty",
                "item.bottle.fill",
                "item.bottle.fill_dragonbreath",
                "item.bucket.empty",
                "item.bucket.empty_fish",
                "item.bucket.empty_lava",
                "item.bucket.fill",
                "item.bucket.fill_fish",
                "item.bucket.fill_lava",
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
                "item.elytra.flying",
                "item.firecharge.use",
                "item.flintandsteel.use",
                "item.hoe.till",
                "item.honey_bottle.drink",
                "item.lodestone_compass.lock",
                "item.nether_wart.plant",
                "item.shield.block",
                "item.shield.break",
                "item.shovel.flatten",
                "item.sweet_berries.pick_from_bush",
                "item.totem.use",
                "item.trident.hit",
                "item.trident.hit_ground",
                "item.trident.return",
                "item.trident.riptide_1",
                "item.trident.riptide_2",
                "item.trident.riptide_3",
                "item.trident.throw",
                "item.trident.thunder",
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
                "music.under_water",
                "music_disc.11",
                "music_disc.13",
                "music_disc.blocks",
                "music_disc.cat",
                "music_disc.chirp",
                "music_disc.far",
                "music_disc.mall",
                "music_disc.mellohi",
                "music_disc.pigstep",
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
                "weather.rain.above"
            ]
        },
        "vanilla_sounds_and_custom": {
            "$id": "vanilla_sounds_and_custom",
            "type": "string",
            "markdownDescription": "Vanilla sounds",
            "anyOf": [{"$ref": "#/$defs/vanilla_sounds"}, {"type": "string"}]
        },
        "vanilla_sound_category": {
            "$id": "vanilla_sound_category",
            "markdownDescription": "Category of the sound.", 
            "type": "string",
            "enum": ["MASTER", "MUSIC", "RECORDS", "WEATHER", "BLOCKS", "HOSTILE", "NEUTRAL", "PLAYERS", "AMBIENT", "VOICE"]
        },
        
        "vanilla_entity_types": {
            "$id": "vanilla_entity_types",
            "type": "string",
            "markdownDescription": "Vanilla entities",
            "enum": [
                "DROPPED_ITEM",
                "EXPERIENCE_ORB",
                "AREA_EFFECT_CLOUD",
                "ELDER_GUARDIAN",
                "WITHER_SKELETON",
                "STRAY",
                "EGG",
                "LEASH_HITCH",
                "PAINTING",
                "ARROW",
                "SNOWBALL",
                "FIREBALL",
                "SMALL_FIREBALL",
                "ENDER_PEARL",
                "ENDER_SIGNAL",
                "SPLASH_POTION",
                "THROWN_EXP_BOTTLE",
                "ITEM_FRAME",
                "WITHER_SKULL",
                "PRIMED_TNT",
                "FALLING_BLOCK",
                "FIREWORK",
                "HUSK",
                "SPECTRAL_ARROW",
                "SHULKER_BULLET",
                "DRAGON_FIREBALL",
                "ZOMBIE_VILLAGER",
                "SKELETON_HORSE",
                "ZOMBIE_HORSE",
                "ARMOR_STAND",
                "DONKEY",
                "MULE",
                "EVOKER_FANGS",
                "EVOKER",
                "VEX",
                "VINDICATOR",
                "ILLUSIONER",
                "MINECART_COMMAND",
                "BOAT",
                "MINECART",
                "MINECART_CHEST",
                "MINECART_FURNACE",
                "MINECART_TNT",
                "MINECART_HOPPER",
                "MINECART_MOB_SPAWNER",
                "CREEPER",
                "SKELETON",
                "SPIDER",
                "GIANT",
                "ZOMBIE",
                "SLIME",
                "GHAST",
                "ZOMBIFIED_PIGLIN",
                "ENDERMAN",
                "CAVE_SPIDER",
                "SILVERFISH",
                "BLAZE",
                "MAGMA_CUBE",
                "ENDER_DRAGON",
                "WITHER",
                "BAT",
                "WITCH",
                "ENDERMITE",
                "GUARDIAN",
                "SHULKER",
                "PIG",
                "SHEEP",
                "COW",
                "CHICKEN",
                "SQUID",
                "WOLF",
                "MUSHROOM_COW",
                "SNOWMAN",
                "OCELOT",
                "IRON_GOLEM",
                "HORSE",
                "RABBIT",
                "POLAR_BEAR",
                "LLAMA",
                "LLAMA_SPIT",
                "PARROT",
                "VILLAGER",
                "ENDER_CRYSTAL",
                "TURTLE",
                "PHANTOM",
                "TRIDENT",
                "COD",
                "SALMON",
                "PUFFERFISH",
                "TROPICAL_FISH",
                "DROWNED",
                "DOLPHIN",
                "CAT",
                "PANDA",
                "PILLAGER",
                "RAVAGER",
                "TRADER_LLAMA",
                "WANDERING_TRADER",
                "FOX",
                "BEE",
                "HOGLIN",
                "PIGLIN",
                "STRIDER",
                "ZOGLIN",
                "PIGLIN_BRUTE",
                "FISHING_HOOK",
                "LIGHTNING",
                "WARDEN",
                "PLAYER",
                "UNKNOWN"
            ]
        },
        "vanilla_particles": {
            "$id": "vanilla_particles",
            "type": "string",
            "markdownDescription": "Vanilla particles",
            "enum": [
                "EXPLOSION_NORMAL",
                "EXPLOSION_LARGE",
                "EXPLOSION_HUGE",
                "FIREWORKS_SPARK",
                "WATER_BUBBLE",
                "WATER_SPLASH",
                "WATER_WAKE",
                "SUSPENDED",
                "SUSPENDED_DEPTH",
                "CRIT",
                "CRIT_MAGIC",
                "SMOKE_NORMAL",
                "SMOKE_LARGE",
                "SPELL",
                "SPELL_INSTANT",
                "SPELL_MOB",
                "SPELL_MOB_AMBIENT",
                "SPELL_WITCH",
                "DRIP_WATER",
                "DRIP_LAVA",
                "VILLAGER_ANGRY",
                "VILLAGER_HAPPY",
                "TOWN_AURA",
                "NOTE",
                "PORTAL",
                "ENCHANTMENT_TABLE",
                "FLAME",
                "LAVA",
                "CLOUD",
                "REDSTONE",
                "SNOWBALL",
                "SNOW_SHOVEL",
                "SLIME",
                "HEART",
                "BARRIER",
                "ITEM_CRACK",
                "BLOCK_CRACK",
                "BLOCK_DUST",
                "WATER_DROP",
                "MOB_APPEARANCE",
                "DRAGON_BREATH",
                "END_ROD",
                "DAMAGE_INDICATOR",
                "SWEEP_ATTACK",
                "FALLING_DUST",
                "TOTEM",
                "SPIT",
                "SQUID_INK",
                "BUBBLE_POP",
                "CURRENT_DOWN",
                "BUBBLE_COLUMN_UP",
                "NAUTILUS",
                "DOLPHIN",
                "SNEEZE",
                "CAMPFIRE_COSY_SMOKE",
                "CAMPFIRE_SIGNAL_SMOKE",
                "COMPOSTER",
                "FLASH",
                "FALLING_LAVA",
                "LANDING_LAVA",
                "FALLING_WATER",
                "DRIPPING_HONEY",
                "FALLING_HONEY",
                "LANDING_HONEY",
                "FALLING_NECTAR"
            ]
        },
        "vanilla_effects": {
            "$id": "vanilla_effects",
            "type": "string",
            "markdownDescription": "Vanilla effects",
            "enum": [
                "CLICK2",
                "CLICK1",
                "BOW_FIRE",
                "DOOR_TOGGLE",
                "IRON_DOOR_TOGGLE",
                "TRAPDOOR_TOGGLE",
                "IRON_TRAPDOOR_TOGGLE",
                "FENCE_GATE_TOGGLE",
                "DOOR_CLOSE",
                "IRON_DOOR_CLOSE",
                "TRAPDOOR_CLOSE",
                "IRON_TRAPDOOR_CLOSE",
                "FENCE_GATE_CLOSE",
                "EXTINGUISH",
                "RECORD_PLAY",
                "GHAST_SHRIEK",
                "GHAST_SHOOT",
                "BLAZE_SHOOT",
                "ZOMBIE_CHEW_WOODEN_DOOR",
                "ZOMBIE_CHEW_IRON_DOOR",
                "ZOMBIE_DESTROY_DOOR",
                "SMOKE",
                "STEP_SOUND",
                "POTION_BREAK",
                "ENDER_SIGNAL",
                "MOBSPAWNER_FLAMES",
                "BREWING_STAND_BREW",
                "CHORUS_FLOWER_GROW",
                "CHORUS_FLOWER_DEATH",
                "PORTAL_TRAVEL",
                "ENDEREYE_LAUNCH",
                "FIREWORK_SHOOT",
                "VILLAGER_PLANT_GROW",
                "DRAGON_BREATH",
                "ANVIL_BREAK",
                "ANVIL_USE",
                "ANVIL_LAND",
                "ENDERDRAGON_SHOOT",
                "WITHER_BREAK_BLOCK",
                "WITHER_SHOOT",
                "ZOMBIE_INFECT",
                "ZOMBIE_CONVERTED_VILLAGER",
                "BAT_TAKEOFF",
                "END_GATEWAY_SPAWN",
                "ENDERDRAGON_GROWL"
            ]
        },
        "vanilla_potion_effects": {
            "$id": "vanilla_potion_effects",
            "type": "string",
            "markdownDescription": "Vanilla potion effects",
            "enum": [
                "SPEED",
                "SLOW",
                "FAST_DIGGING",
                "SLOW_DIGGING",
                "INCREASE_DAMAGE",
                "HEAL",
                "HARM",
                "JUMP",
                "CONFUSION",
                "REGENERATION",
                "DAMAGE_RESISTANCE",
                "FIRE_RESISTANCE",
                "WATER_BREATHING",
                "INVISIBILITY",
                "BLINDNESS",
                "NIGHT_VISION",
                "HUNGER",
                "WEAKNESS",
                "POISON",
                "WITHER",
                "HEALTH_BOOST",
                "ABSORPTION",
                "SATURATION",
                "GLOWING",
                "LEVITATION",
                "LUCK",
                "UNLUCK",
                "SLOW_FALLING",
                "CONDUIT_POWER",
                "DOLPHINS_GRACE",
                "BAD_OMEN",
                "HERO_OF_THE_VILLAGE"
            ]
        },
        "vanilla_biomes": {
            "$id": "vanilla_biomes",
            "type": "string",
            "markdownDescription": "Vanilla biomes",
            "enum": [
                "OCEAN",
                "PLAINS",
                "DESERT",
                "MOUNTAINS",
                "FOREST",
                "TAIGA",
                "SWAMP",
                "RIVER",
                "NETHER_WASTES",
                "THE_END",
                "FROZEN_OCEAN",
                "FROZEN_RIVER",
                "SNOWY_TUNDRA",
                "SNOWY_MOUNTAINS",
                "MUSHROOM_FIELDS",
                "MUSHROOM_FIELD_SHORE",
                "BEACH",
                "DESERT_HILLS",
                "WOODED_HILLS",
                "TAIGA_HILLS",
                "MOUNTAIN_EDGE",
                "JUNGLE",
                "JUNGLE_HILLS",
                "JUNGLE_EDGE",
                "DEEP_OCEAN",
                "STONE_SHORE",
                "SNOWY_BEACH",
                "BIRCH_FOREST",
                "BIRCH_FOREST_HILLS",
                "DARK_FOREST",
                "SNOWY_TAIGA",
                "SNOWY_TAIGA_HILLS",
                "GIANT_TREE_TAIGA",
                "GIANT_TREE_TAIGA_HILLS",
                "WOODED_MOUNTAINS",
                "SAVANNA",
                "SAVANNA_PLATEAU",
                "BADLANDS",
                "WOODED_BADLANDS_PLATEAU",
                "BADLANDS_PLATEAU",
                "SMALL_END_ISLANDS",
                "END_MIDLANDS",
                "END_HIGHLANDS",
                "END_BARRENS",
                "WARM_OCEAN",
                "LUKEWARM_OCEAN",
                "COLD_OCEAN",
                "DEEP_WARM_OCEAN",
                "DEEP_LUKEWARM_OCEAN",
                "DEEP_COLD_OCEAN",
                "DEEP_FROZEN_OCEAN",
                "THE_VOID",
                "SUNFLOWER_PLAINS",
                "DESERT_LAKES",
                "GRAVELLY_MOUNTAINS",
                "FLOWER_FOREST",
                "TAIGA_MOUNTAINS",
                "SWAMP_HILLS",
                "ICE_SPIKES",
                "MODIFIED_JUNGLE",
                "MODIFIED_JUNGLE_EDGE",
                "TALL_BIRCH_FOREST",
                "TALL_BIRCH_HILLS",
                "DARK_FOREST_HILLS",
                "SNOWY_TAIGA_MOUNTAINS",
                "GIANT_SPRUCE_TAIGA",
                "GIANT_SPRUCE_TAIGA_HILLS",
                "MODIFIED_GRAVELLY_MOUNTAINS",
                "SHATTERED_SAVANNA",
                "SHATTERED_SAVANNA_PLATEAU",
                "ERODED_BADLANDS",
                "MODIFIED_WOODED_BADLANDS_PLATEAU",
                "MODIFIED_BADLANDS_PLATEAU",
                "BAMBOO_JUNGLE",
                "BAMBOO_JUNGLE_HILLS",
                "SOUL_SAND_VALLEY",
                "CRIMSON_FOREST",
                "WARPED_FOREST",
                "BASALT_DELTAS"
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
                                        "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                },
                                "place": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"}
                                    }
                                }
                            }
                        },
                        "cancel_drop": {
                            "type": "boolean",
                            "default": false,
                            "markdownDescription": "Default is `false`. If `true` the custom block won't be dropped when a player mines it"
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
                                    {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                                    {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                                    {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                                    {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                    "properties": {
                        "custom_armor": {
                            "type": "string",
                            "markdownDescription": "Minecraft 1.17+ only!\n\nThis property makes the plugin use the specified 'armors_rendering' textures for this armor piece.\nNote: you must create an 'armors_rendering' setting in order to reference it here. Read more: https://itemsadder.devs.beer/plugin-usage/adding-content/advanced/custom-armors/\n\nIf you decide to specify 'custom_armor' you can avoid setting the 'color' property here."
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
                        "type": {"$ref": "#/$defs/vanilla_potion_types"},
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
                    "properties": {"color": {"$ref": "#/$defs/colors"}}
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
            "required": ["resource", "display_name"],
            "additionalProperties": true,
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
                    "markdownDescription": "Display name of the item.\nYou can set a **text** or an identifier from a **dictionary** file.\n\nGet more info about dictionaries here: https://itemsadder.devs.beer/plugin-usage/adding-content/translation",
                    "type": "string",
                    "default": "display-name-",
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
                        "material": {"$ref": "#/$defs/vanilla_materials"},
                        "generate": {
                            "type": "boolean",
                            "markdownDescription": "`true` to automatically generate the JSON model from your textures.\n\n`false` to create the model by yourself.\n\nSet to `true` if you want to use `textures`.\nSet `false` if you want to use `model_path`."
                        },
                        "model_id": {
                            "type": "integer",
                            "markdownDescription": "If you want to force the usage of a defined custom_model_data (CustomModelData) you can set this value.\nhttps://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/resource#manually-specify-custom_model_data"
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
                                "markdownDescription": "Specifies the textures layers to be used to generate the model. You usually will need only 1 texture.\nIf you are creating a block you can set 1 texture for each face of the block in this order:\n- block/block_down.png\n- block/block_east.png\n- block/block_north.png\n- block/block_south.png\n- block/block_up.png\n- block/block_west.png",
                                "defaultSnippets": [
                                    {"body": "item/$0.png"},
                                    {"body": "block/$0.png"}
                                ],
                                "default": [""]
                            },
                            "parent": {
                                "type": "string",
                                "markdownDescription": "The `parent` value to be set in the automatically generated JSON model." ,
                                "defaultSnippets": [
                                    {"body": "builtin/generated"},
                                ],
                                "default": [""]
                            }
                        },
                        "required": ["textures"]
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
                            "markdownDescription": "Max durability of the item. If not specified ItemsAdder will use default material max durability",
                            "default": 1562
                        },
                        "custom_durability": {
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
                        "usages": {
                            "type": "integer",
                            "markdownDescription": "Usages of the item before it disappears (you must handle usages using an event and action (decrement_usages) https://itemsadder.devs.beer/plugin-usage/adding-content/item-properties/events/actions"
                        },
                        "show_custom_durability_lore": {
                            "type": "boolean",
                            "markdownDescription" : "Show the custom durability lore line or not. Default value is taken from config.yml `hide-custom-durability-lore` and will be used if this property is not specified."
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
                    "markdownDescription": "Custom NBT properties for this custom item. Read here for more information: https://itemsadder.devs.beer/plugin-usage/adding-content/advanced/custom-nbt",
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
                            "properties": {
                                "enabled": {"type": "boolean"},
                                "color": {
                                    "type": "string",
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
                    "markdownDescription": "**OLD NAME** OF THE property `events_settings.cooldown.ticks`.\n\nUse it instead."
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
                                    "markdownDescription": "Cooldown in ticks before user can activate events of this item"
                                },
                                "indicator": {
                                    "type": "string",
                                    "markdownDescription": "Type of cooldown indicator, for now there is only HIDDEN and TITLE",
                                    "enum": [
                                        "HIDDEN",
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
                    "markdownDescription": "**OLD NAME** OF THE property `permission_suffix`.\n\nUse `permission_suffix` instead."
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
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
                },
                "font_image": {
                    "type": "object",
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
                    "items": {"$ref": "#/$defs/vanilla_materials_and_customitems"}
                },
                "hide_items": {
                    "type": "array",
                    "markdownDescription": "List of items to be hidden from this category (useful if you're using show_all_items property)",
                    "items": {"$ref": "#/$defs/vanilla_materials_and_customitems"}
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
                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                        "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
                        "amount": {"type": "integer", "default": 1}
                    }
                },
                "return_items": {
                    "properties": {
                        "decrement_durability": {
                            "type": "object",
                            "additionalProperties": {
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "$ref": "#/$defs/vanilla_materials_and_customitems"
                                    },
                                    "amount": {"type": "integer", "default": 1}
                                }
                            }
                        },
                        "increment_durability": {
                            "type": "object",
                            "additionalProperties": {
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "$ref": "#/$defs/vanilla_materials_and_customitems"
                                    },
                                    "amount": {"type": "integer", "default": 1}
                                }
                            }
                        },
                        "replace": {
                            "type": "object",
                            "additionalProperties": {
                                "type": "string",
                                "$ref": "#/$defs/vanilla_materials_and_customitems"
                            }
                        },
                        "play_sound": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"},
                                "category": {"$ref": "#/$defs/vanilla_sound_category"}
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
            "$ref": "#/$defs/vanilla_materials_and_customitems",
            "markdownDescription": "You can specify a vanilla material, custom item or potion.\n\n**Examples:**\n\n A: STONE\n\nB:\n\n  type: POTION\n\n  potion_type: fire_resistance",
            "properties": {
                "item": {
                    "markdownDescription": "You can specify a vanilla material, custom item or potion.\n\n**Examples:**\n\n A: STONE\n\nB:\n\n  type: POTION\n\n  potion_type: fire_resistance",
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
                },
            },
            "if": {
                "properties": {"item": {"const" : "POTION"}}
            },
            "then": {
                "required": ["potion_type"],
                "properties": {
                    "potion_type": {
                        "$ref": "#/$defs/potion_types"
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
                            "$ref": "#/$defs/potion_types"
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
                            "$ref": "#/$defs/vanilla_materials_and_customitems"
                        }
                    }
                },
                "exp": {"type": "integer"},
                "cook_time": {"type": "integer"},
                "result": {
                    "required": ["item"],
                    "properties": {
                        "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
                        "amount": {"type": "integer", "default": 1},
                        "return_items": {
                            "properties": {
                                "decrement_durability": {
                                    "type": "object",
                                    "additionalProperties": {
                                        "type": "object",
                                        "properties": {
                                            "item": {
                                                "$ref": "#/$defs/vanilla_materials_and_customitems"
                                            },
                                            "amount": {"type": "integer", "default": 1}
                                        }
                                    }
                                },
                                "increment_durability": {
                                    "type": "object",
                                    "additionalProperties": {
                                        "type": "object",
                                        "properties": {
                                            "item": {
                                                "$ref": "#/$defs/vanilla_materials_and_customitems"
                                            },
                                            "amount": {"type": "integer", "default": 1}
                                        }
                                    }
                                },
                                "replace": {
                                    "type": "object",
                                    "additionalProperties": {
                                        "type": "string",
                                        "$ref": "#/$defs/vanilla_materials_and_customitems"
                                    }
                                },
                                "play_sound": {
                                    "properties": {
                                        "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                        "volume": {"type": "number"},
                                        "pitch": {"type": "number"},
                                        "category": {"$ref": "#/$defs/vanilla_sound_category"}
                                    }
                                }
                            }
                        }
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
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
                },
                "item": {
                    "type": "string",
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
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
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
                },
                "addition": {
                    "type": "string",
                    "markdownDescription" : "The mineral item (can be a custom item or vanilla material) on the second slot.",
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
                },
                "result": {
                    "type": "object",
                    "markdownDescription" : "The resulting item (can be a custom item or vanilla material) which will be merged into the first slot item.",
                    "required": ["item"],
                    "properties": {
                        "item": {
                            "markdownDescription" : "The resulting item (can be a custom item or vanilla material) which will be merged into the first slot item.",
                            "$ref": "#/$defs/vanilla_materials_and_customitems"
                        },
                        "amount": {"type": "integer", "default": 1},
                        "move_attributes": {
                            "type": "object",
                            "markdownDescription" : "The attributes to be moved from the first item to the result item.",
                            "properties": {
                                "enchants": {"type": "boolean", "default": true},
                                "durability": {"type": "boolean"},
                                "custom_model_data": {"type": "boolean"},
                                "material": {"type": "boolean"},
                                "other_nbt": {
                                    "markdownDescription" : "Move EVERY NBT data from the first item to the last item. Use this property only if you know what you are doing.",
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
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "$ref": "#/$defs/vanilla_entity_types"
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
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
        "worlds_populator": {
            "$id": "worlds_populator",
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
                    "items": {"$ref": "#/$defs/vanilla_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "items": {"$ref": "#/$defs/vanilla_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "items": {"$ref": "#/$defs/vanilla_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "items": {"$ref": "#/$defs/vanilla_blocks"}
                },
                "biomes": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/vanilla_biomes"}
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
                    "required": ["song"],
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
                    "$ref": "#/$defs/vanilla_materials_and_customitems"
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
                    "markdownDescription": "Type of entity to use to create this furniture.\n\nnWarning: \nLimitations of item_frame furnitures:\n- solid item_frame furnitures are possible only on Server version >= 1.16 (client doesn't matter).\n- invisible item_frame furnitures are possible only on Server and Client version >= 1.16. If a user connects with viaversion using an old mc version they will see the item_frame.",
                    "enum": ["armor_stand", "item_frame", "glow_item_frame"]
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
                                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        },
                        "place": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
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
                    "markdownDescription": "This option allows you to avoid furniture from being dropped when broken by players."
                }
            }
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
                                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
                                "amount": {"type": "integer", "minimum": 1, "maximum": 64}
                            }
                        },
                        "slot2": {
                            "type": "object",
                            "required": ["item"],
                            "properties": {
                                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                        "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                                "volume": {"type": "number"},
                                "pitch": {"type": "number"}
                            }
                        },
                        "place": {
                            "properties": {
                                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
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
            "markdownDescription": "Tells ItemsAdder that this item is a custom mob.\nYou will be able to spawn it using eggs (create them), spawn in the world and drop items on death (loots).",
            "required": ["ai"],
            "properties": {
                "enabled": {"type": "boolean"},
                "ai": {
                    "markdownDescription": "AI of the mob.\n**Accepts only vanilla mobs**",
                    "$ref": "#/$defs/vanilla_entity_types"
                },
                "visual": {
                    "markdownDescription": "Appearence of the mob.\nDEFAULT is ZOMBIE because it can holt items on head.\n**Accepts only vanilla mobs**\n\n",
                    "$ref": "#/$defs/vanilla_entity_types"
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
                                "every_ticks": {"type": "integer"},
                                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
                                "amplifier": {"type": "integer"},
                                "duration": {"type": "integer"},
                                "ambient": {"type": "boolean"}
                            }
                        }
                    },
                    "properties": {
                        "potion_effect": {
                            "type": "object",
                            "markdownDescription": "Apply potion effect to the mob on spawn",
                            "properties": {
                                "every_ticks": {"type": "integer"},
                                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
                                "amplifier": {"type": "integer"},
                                "duration": {"type": "integer"},
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
                    "$ref": "#/$defs/vanilla_entity_types"
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
                    "markdownDescription": "Command to be executed (**without** the **/**)\n\n\nYou can use these placeholders:\n\n`{player}` is the player who used this item\n\n`{target-player}` is the player interacted/attacked\n\n`{target-x}` is the x location of player/block interacted/attacked\n\n`{target-y}` is the x location of player/block interacted/attacked\n\n`{target-z}` is the x location of player/block interacted/attacked\n\n`{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).\n\n\nExample: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`"
                },
                "as_console": {"type": "boolean", "examples": [false]},
                "delay": {
                    "type": "integer",
                    "markdownDescription": "Delay in ticks before starting this action"
                },
                "flow": { "$ref": "#/$defs/flow.prop" }
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
                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
                "volume": {"type": "number", "minimum": 0},
                "pitch": {"type": "number", "minimum": 0, "maximum": 2},
                "delay": {"$ref": "#/$defs/action_delay.prop"},
                "flow": {"$ref": "#/$defs/flow.prop"},
                "category": {"$ref": "#/$defs/vanilla_sound_category"},
                "permission": {"$ref": "#/$defs/action_permission.prop"}
            }
        },
        "stop_sound": {
            "$id": "stop_sound",
            "markdownDescription": "Stop a Vanilla sound or Custom sound",
            "required": ["name"],
            "properties": {
                "name": {"$ref": "#/$defs/vanilla_sounds_and_custom"},
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
                "change_me_xxx": {"$ref": "#/$defs/command"}
            }
        },
        "play_particle": {
            "$id": "play_particle",
            "markdownDescription": "Play this particle",
            "required": ["name"],
            "properties": {
                "name": {"$ref": "#/$defs/vanilla_particles"},
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
                "name": {"$ref": "#/$defs/vanilla_particles"},
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
                "name": {"$ref": "#/$defs/vanilla_effects"},
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
                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                "material": {"$ref": "#/$defs/vanilla_blocks"},
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
                "every_ticks": {"type": "integer"},
                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
                "amplifier": {"type": "integer"},
                "duration": {"type": "integer"},
                "ambient": {"type": "boolean"}
            }
        },
        "remove_potion_effect": {
            "$id": "remove_potion_effect",
            "markdownDescription": "Remove potion effect",
            "required": ["type"],
            "properties": {
                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
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
                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
                "amplifier": {"type": "integer"},
                "duration": {"type": "integer"},
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
                "type": {"$ref": "#/$defs/vanilla_potion_effects"},
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
                "item": {"$ref": "#/$defs/vanilla_materials_and_customitems"},
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
                    "type": "integer",
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
                "biome": {"$ref": "#/$defs/vanilla_biomes"},
                "every_ticks": {
                    "type": "integer",
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
                    "markdownDescription": "Deal damage to player (interval in ticks)",
                    "type": "integer"
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
                    "$ref": "#/$defs/vanilla_entity_types"
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
                }
            }
        },
    }
};