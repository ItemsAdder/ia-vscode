/* eslint-disable @typescript-eslint/naming-convention */
export const items = [
  {
    "label": "Example Block Multi Texture",
    "detail": "Block",
    "object": {
      "block": {
        "name": "Block",
        "resource": {
          "material": "PAPER",
          "generate": true,
          "textures": [
            "block/my_custom_block/down",
            "block/my_custom_block/east",
            "block/my_custom_block/north",
            "block/my_custom_block/south",
            "block/my_custom_block/up",
            "block/my_custom_block/west"
          ]
        },
        "specific_properties": {
          "block": {
            "placed_model": {
              "type": "REAL_NOTE",
              "hardness": 1,
            }
          }
        }
      }
    }
  },
  {
    "label": "Example Block",
    "detail": "Block",
    "object": {
      "block": {
        "name": "Block",
        "resource": {
          "material": "PAPER",
          "generate": true,
          "texture": "block/my_custom_block"
        },
        "specific_properties": {
          "block": {
            "placed_model": {
              "type": "REAL_NOTE",
              "hardness": 1,
            }
          }
        }
      }
    }
  },
  {
    "label": "Example Sword",
    "detail": "Sword",
    "object": {
      "my_sword": {
        "name": "MySword",
        "resource": {
          "material": "DIAMOND_SWORD",
          "generate": true,
          "texture": "item/my_sword"
        },
        "attribute_modifiers": {
          "mainhand": {
            "attack_damage": 8,
            "attack_speed": 2
          }
        },
        "durability": {
          "max_durability": 512,
        }
      }
    }
  },
  {
    "label": "Dev - blank item",
    "devMode": true,
    "object": {
      "item": {
        "name": "item",
        "resource": {
          "material": "PAPER",
          "generate": false,
          "model_path": "minecraft:item/diamond"
        }
      }
    }
  },
  {
    "label": "Dev - blank block `REAL_NOTE`",
    "devMode": true,
    "object": {
      "item": {
        "name": "item",
        "resource": {
          "material": "PAPER",
          "generate": false,
          "model_path": "minecraft:item/diamond_block"
        },
        "specific_properties": {
          "block": {
            "placed_model": {
              "type": "REAL_NOTE",
            }
          }
        }
      }
    }
  },
  {
    "label": "Dev - blank block `REAL_WIRE`",
    "devMode": true,
    "object": {
      "item": {
        "name": "item",
        "resource": {
          "material": "PAPER",
          "generate": false,
          "model_path": "minecraft:item/emerald_block"
        },
        "specific_properties": {
          "block": {
            "placed_model": {
              "type": "REAL_WIRE",
            }
          }
        }
      }
    }
  }
];