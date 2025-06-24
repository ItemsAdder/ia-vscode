import * as vscode from 'vscode';
import { validate } from './jsppValidator';
import { JavaDocResolver } from './javaDocResolver';

// Unified list for documentation and completion items
const JS_FEATURES = [
  // Keywords
  {
    label: 'import',
    kind: vscode.CompletionItemKind.Function,
    detail: 'import "your.package.here";',
    documentation: 'Imports a class from another file.',
    hover: "Imports a class.\n\n**Example:** `import \"your.package.here\"`"
  },
  // Variables
  {
    label: "$player",
    kind: vscode.CompletionItemKind.Variable,
    detail: "$player",
    documentation: "(Built-in variable) The player that triggered the event.",
    hover: "The player that triggered the event.\n\n**Example:** `player`",
    // type: "org.bukkit.entity.Player"
    type: "Player"
  },
  {
    label: "$event",
    kind: vscode.CompletionItemKind.Variable,
    detail: "$event",
    documentation: "(Built-in variable) The event that was triggered.",
    hover: "The event that was triggered.\n\n**Example:** `event`",
    // type: "org.bukkit.event.Event"
    type: "Event"
  },
  {
    label: "$itemStack",
    kind: vscode.CompletionItemKind.Variable,
    detail: "$itemStack",
    documentation: "(Built-in variable) Represents an ItemStack object from Bukkit.",
    hover: "Represents the Bukkit ItemStack of the custom stack object of this event.\n\n**Example:** `itemStack`",
    // type: "org.bukkit.inventory.ItemStack"
    type: "ItemStack"
  },
  {
    label: "$customStack",
    kind: vscode.CompletionItemKind.Variable,
    detail: "$customStack",
    documentation: "(Built-in variable) Represents a custom stack object.",
    hover: "Represents the custom stack object of this event.\n\n**Example:** `customStack`",
    // type: "dev.lone.itemsadder.api.CustomStack"
    type: "CustomStack"
  },
  {
    label: "$customEntity",
    kind: vscode.CompletionItemKind.Variable,
    detail: "$customEntity",
    documentation: "(Built-in variable) Represents a custom entity object.",
    hover: "Represents the custom entity object of this event.\n\n**Example:** `customEntity`",
    // type: "dev.lone.itemsadder.api.CustomEntity"
    type: "CustomEntity"
  },
  // Functions
  {
    label: 'delay',
    kind: vscode.CompletionItemKind.Function,
    detail: 'delay(ticks, callback)',
    documentation: 'Executes a function after a certain number of ticks.',
    hover: `Executes a function after a certain number of ticks.

## Examples
\`\`\`js
delay(20, () -> {...});

delay(20, () -> {
  msg($player, "This message is delayed by 20 ticks.");
});
\`\`\``
  },
  {
    label: 'msg',
    kind: vscode.CompletionItemKind.Function,
    detail: 'msg(player, text, minimessage = false)',
    documentation: 'Sends a message to the player.',
    hover: "Sends a message to the player.\n\n**Example:** `msg(player, \"Hello!\")`"
  },
  {
    label: 'log',
    kind: vscode.CompletionItemKind.Function,
    detail: 'log(text)',
    documentation: 'Prints a message to the console.',
    hover: "Prints a message to the console.\n\n**Example:** `log(\"Hello World!\")`"
  },
  {
    label: "cancelEvent",
    kind: vscode.CompletionItemKind.Function,
    detail: "cancelEvent()",
    documentation: "Cancels the current event.",
    hover: "Cancels the current event.\n\n**Example:** `cancelEvent()`"
  },
  // Items
  {
    label: 'isCustom',
    kind: vscode.CompletionItemKind.Function,
    detail: 'isCustom(itemStack)',
    documentation: 'Checks if the given ItemStack is a custom item.',
    hover: "Checks if the given ItemStack is a custom item.\n\n**Example:** `isCustom(itemStack)`"
  },
  {
    label: 'customStack',
    kind: vscode.CompletionItemKind.Function,
    detail: 'customStack(namespacedId, amount = 1)',
    documentation: 'Creates a new CustomStack with the specified namespaced ID and amount.',
    hover: "Creates a new CustomStack with the specified namespaced ID and amount.\n\n**Example:** `customStack(\"custom:item\", 5)`"
  },
  {
    label: 'newStack',
    kind: vscode.CompletionItemKind.Function,
    detail: 'newStack(material, amount = 1)',
    documentation: 'Creates a new ItemStack with the specified material and amount.',
    hover: "Creates a new ItemStack with the specified material and amount.\n\n**Example:** `newStack(Material.DIAMOND, 10)`"
  },

  {
    label: 'removeItem',
    kind: vscode.CompletionItemKind.Function,
    detail: 'removeItem(player, namespacedId)',
    documentation: 'Removes the specified item (custom or vanilla) from the player\'s inventory.\n\nReturns `true` if at least one item was removed, `false` otherwise.',
    hover: `Removes the specified item (custom or vanilla) from the player's inventory.

  **Parameters:**
  - \`player\`: The player to remove the item from.
  - \`namespacedId\`: The namespaced ID of the item (custom or vanilla).

  **Returns:** \`true\` if at least one item was removed, \`false\` otherwise.

  **Example:**
  \`\`\`js
  removeItem(player, "minecraft:diamond");
  removeItem(player, "custom:sword");
  \`\`\`
  `
  },
  {
    label: 'breakBlockNaturally',
    kind: vscode.CompletionItemKind.Function,
    detail: 'breakBlockNaturally(player, x, y, z)\nbreakBlockNaturally(player, block)',
    documentation: 'Breaks a block naturally as if a player broke it, optionally at coordinates or with a Block object.',
    hover: `Breaks a block naturally as if a player broke it.

  **Overloads:**
  - breakBlockNaturally(player, x, y, z)
  - breakBlockNaturally(player, block)
  - breakBlockNaturally(block)

  **Example:**
  \`\`\`js
  breakBlockNaturally(player, 100, 64, 200);
  breakBlockNaturally(player, block);
  breakBlockNaturally(block);
  \`\`\`
  `
  },
  // PlayerUtils
  {
    label: 'isHeld',
    kind: vscode.CompletionItemKind.Function,
    detail: 'isHeld(player, identifierOrMaterial)',
    documentation: 'Checks if the player is holding the specified item, custom stack, or material.',
    hover: "Checks if the player is holding the specified item, custom stack, or material.\n\n**Example:** `isHeld(player, \"custom:item\")`"
  },
  {
    label: 'setHeld',
    kind: vscode.CompletionItemKind.Function,
    detail: 'setHeld(player, namespacedId)',
    documentation: 'Sets the item held by the player to the specified custom item.',
    hover: "Sets the item held by the player to the specified custom item.\n\n**Example:** `setHeld(player, \"custom:item\")`"
  },
  {
    label: 'giveItem',
    kind: vscode.CompletionItemKind.Function,
    detail: 'giveItem(player, namespacedId)',
    documentation: 'Gives the specified item (custom or vanilla) to the player.\n\nReturns `true` if the item was given, `false` otherwise.',
    hover: `Gives the specified item (custom or vanilla) to the player.

  **Parameters:**
  - \`player\`: The player to give the item to.
  - \`namespacedId\`: The namespaced ID of the item (custom or vanilla).

  **Returns:** \`true\` if the item was given, \`false\` otherwise.

  **Example:**
  \`\`\`js
  giveItem(player, "minecraft:diamond");
  giveItem(player, "custom:sword");
  \`\`\`
  `
  },
  {
    label: 'blockInFront',
    kind: vscode.CompletionItemKind.Function,
    detail: 'blockInFront(player)\nblockInFront(player, maxDistance)',
    documentation: 'Returns the block in front of the player within a certain distance.\n\n- `blockInFront(player)`: Returns the block in front of the player up to 8 blocks away.\n- `blockInFront(player, maxDistance)`: Returns the block in front of the player up to the specified distance.',
    hover: `Returns the block in front of the player within a certain distance.

  **Overloads:**
  - blockInFront(player)
  - blockInFront(player, maxDistance)

  **Example:**
  \`\`\`js
  let block = blockInFront(player);
  let blockFar = blockInFront(player, 16);
  \`\`\`
  `
  },
  {
    label: 'entityInFront',
    kind: vscode.CompletionItemKind.Function,
    detail: 'entityInFront(player)\nentityInFront(player, maxDistance)',
    documentation: 'Returns the entity in front of the player within a certain distance.\n\n- `entityInFront(player)`: Returns the entity in front of the player up to 8 blocks away.\n- `entityInFront(player, maxDistance)`: Returns the entity in front of the player up to the specified distance.',
    hover: `Returns the entity in front of the player within a certain distance.

  **Overloads:**
  - entityInFront(player)
  - entityInFront(player, maxDistance)

  **Example:**
  \`\`\`js
  let entity = entityInFront(player);
  let entityFar = entityInFront(player, 16);
  \`\`\`
  `
  },
  // WorldUtils
  {
    label: 'isCustomBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'isCustomBlock(block)',
    documentation: 'Returns true if the block is a custom block.',
    hover: "Checks if the given block is a custom block.\n\n**Example:** `isCustomBlock(block)`"
  },
  {
    label: 'customBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'customBlock(block)',
    documentation: 'Gets the CustomBlock for the block.',
    hover: "Gets the CustomBlock instance for the given block.\n\n**Example:** `customBlock(block)`"
  },
  {
    label: 'block',
    kind: vscode.CompletionItemKind.Function,
    detail: 'block(worldName, x, y, z)',
    documentation: 'Gets the block at the given coordinates.',
    hover: "Gets the block at the specified coordinates in the given world.\n\n**Example:** `block(\"world\", 100, 64, 200)`"
  },
  {
    label: 'removeBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'removeBlock(block)',
    documentation: 'Removes the block.',
    hover: "Removes the specified block.\n\n**Example:** `removeBlock(block)`"
  },
  {
    label: 'placeBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'placeBlock(block, materialOrIdentifier)',
    documentation: 'Places a block with the given material or identifier.',
    hover: "Places a block with the specified material or custom identifier.\n\n**Example:** `placeBlock(block, \"DIAMOND_BLOCK\")`"
  },
  {
    label: 'location',
    kind: vscode.CompletionItemKind.Function,
    detail: 'location(worldName, x, y, z)',
    documentation: 'Creates a location object.',
    hover: "Creates a new location object with the specified world and coordinates.\n\n**Example:** `location(\"world\", 100, 64, 200)`"
  },
  {
    label: 'playParticle',
    kind: vscode.CompletionItemKind.Function,
    detail: 'playParticle(location, particleName, count = 1, offsetX = 0, offsetY = 0, offsetZ = 0, extra = 0)',
    documentation: 'Spawns a particle effect at a location.',
    hover: `Spawns a particle effect at the given location.

  **Overloads:**
  - playParticle(location, particleName)
  - playParticle(location, particleName, count)
  - playParticle(location, particleName, count, offsetX, offsetY, offsetZ, extra)
  - playParticle(world, x, y, z, particleName, count, offsetX, offsetY, offsetZ, extra)

  **Example:**
  \`\`\`js
  playParticle(location, "minecraft:small_flame");
  playParticle(world, 100, 64, 200, "SMOKE", 10, 0.5, 0.5, 0.5, 0.1);
  \`\`\`
  `
  },
  {
    label: 'playSound',
    kind: vscode.CompletionItemKind.Function,
    detail: 'playSound(location, soundName)\nplaySound(location, soundName, volume, pitch)',
    documentation: 'Plays a sound at a location.',
    hover: `Plays a sound at the given location.

**Overloads:**
- playSound(location, soundName)
- playSound(location, soundName, volume, pitch)

**Example:**
\`\`\`js
playSound(location, "minecraft:entity.player.levelup");
playSound(location, "minecraft:block.note_block.bell", 2.0, 0.5);
\`\`\`
`
  },
  // Data Utilities
  {
    label: 'hasData',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'hasData(itemStack, namespace, key)',
      'hasData(customStack, namespace, key)',
      'hasData(block, namespace, key)',
      'hasData(entity, namespace, key)'
    ].join('\n'),
    documentation: [
      'Checks if the object (ItemStack, CustomStack, Block, or Entity) has persistent data with the given namespace and key.',
      '',
      '**Overloads:**',
      '- hasData(itemStack, namespace, key)',
      '- hasData(customStack, namespace, key)',
      '- hasData(block, namespace, key)',
      '- hasData(entity, namespace, key)',
      '',
      '**Example:**',
      '```js',
      'if (hasData(itemStack, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(customStack, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(block, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(entity, "myplugin", "mykey")) { /* ... */ }',
      '```'
    ].join('\n')
    ,
    hover: [
      'Checks if the object (ItemStack, CustomStack, Block, or Entity) has persistent data with the given namespace and key.',
      '',
      '**Overloads:**',
      '- hasData(itemStack, namespace, key)',
      '- hasData(customStack, namespace, key)',
      '- hasData(block, namespace, key)',
      '- hasData(entity, namespace, key)',
      '',
      '**Example:**',
      '```js',
      'if (hasData(itemStack, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(customStack, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(block, "myplugin", "mykey")) { /* ... */ }',
      'if (hasData(entity, "myplugin", "mykey")) { /* ... */ }',
      '```'
    ].join('\n')
  },
  {
    label: 'removeData',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'removeData(itemStack, namespace, key)',
      'removeData(customStack, namespace, key)',
      'removeData(block, namespace, key)',
      'removeData(entity, namespace, key)'
    ].join('\n'),
    documentation: [
      'Removes persistent data with the given namespace and key from the object (ItemStack, CustomStack, Block, or Entity).',
      '',
      '**Overloads:**',
      '- removeData(itemStack, namespace, key)',
      '- removeData(customStack, namespace, key)',
      '- removeData(block, namespace, key)',
      '- removeData(entity, namespace, key)',
      '',
      '**Example:**',
      '```js',
      'removeData(itemStack, "myplugin", "mykey");',
      'removeData(customStack, "myplugin", "mykey");',
      'removeData(block, "myplugin", "mykey");',
      'removeData(entity, "myplugin", "mykey");',
      '```'
    ].join('\n'),
    hover: [
      'Removes persistent data with the given namespace and key from the object (ItemStack, CustomStack, Block, or Entity).',
      '',
      '**Overloads:**',
      '- removeData(itemStack, namespace, key)',
      '- removeData(customStack, namespace, key)',
      '- removeData(block, namespace, key)',
      '- removeData(entity, namespace, key)',
      '',
      '**Example:**',
      '```js',
      'removeData(itemStack, "myplugin", "mykey");',
      'removeData(customStack, "myplugin", "mykey");',
      'removeData(block, "myplugin", "mykey");',
      'removeData(entity, "myplugin", "mykey");',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataByte',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataByte(itemStack, namespace, key, def)',
      'getDataByte(customStack, namespace, key, def)',
      'getDataByte(block, namespace, key, def)',
      'getDataByte(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a byte value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataByte(itemStack, namespace, key, def)',
      '- getDataByte(customStack, namespace, key, def)',
      '- getDataByte(block, namespace, key, def)',
      '- getDataByte(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataByte(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataByte(customStack, "myplugin", "mykey", 0);',
      'let value = getDataByte(block, "myplugin", "mykey", 0);',
      'let value = getDataByte(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a byte value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataByte(itemStack, namespace, key, def)',
      '- getDataByte(customStack, namespace, key, def)',
      '- getDataByte(block, namespace, key, def)',
      '- getDataByte(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataByte(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataByte(customStack, "myplugin", "mykey", 0);',
      'let value = getDataByte(block, "myplugin", "mykey", 0);',
      'let value = getDataByte(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n')
  },
  {
    label: 'setDataByte',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'setDataByte(itemStack, namespace, key, value)',
      'setDataByte(customStack, namespace, key, value)',
      'setDataByte(block, namespace, key, value)',
      'setDataByte(entity, namespace, key, value)'
    ].join('\n'),
    documentation: [
      'Sets a byte value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataByte(itemStack, namespace, key, value)',
      '- setDataByte(customStack, namespace, key, value)',
      '- setDataByte(block, namespace, key, value)',
      '- setDataByte(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataByte(itemStack, "myplugin", "mykey", 5);',
      'setDataByte(customStack, "myplugin", "mykey", 5);',
      'setDataByte(block, "myplugin", "mykey", 5);',
      'setDataByte(entity, "myplugin", "mykey", 5);',
      '```'
    ].join('\n'),
    hover: [
      'Sets a byte value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataByte(itemStack, namespace, key, value)',
      '- setDataByte(customStack, namespace, key, value)',
      '- setDataByte(block, namespace, key, value)',
      '- setDataByte(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataByte(itemStack, "myplugin", "mykey", 5);',
      'setDataByte(customStack, "myplugin", "mykey", 5);',
      'setDataByte(block, "myplugin", "mykey", 5);',
      'setDataByte(entity, "myplugin", "mykey", 5);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataShort',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataShort(itemStack, namespace, key, def)',
      'getDataShort(customStack, namespace, key, def)',
      'getDataShort(block, namespace, key, def)',
      'getDataShort(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a short value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataShort(itemStack, namespace, key, def)',
      '- getDataShort(customStack, namespace, key, def)',
      '- getDataShort(block, namespace, key, def)',
      '- getDataShort(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataShort(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataShort(customStack, "myplugin", "mykey", 0);',
      'let value = getDataShort(block, "myplugin", "mykey", 0);',
      'let value = getDataShort(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a short value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataShort(itemStack, namespace, key, def)',
      '- getDataShort(customStack, namespace, key, def)',
      '- getDataShort(block, namespace, key, def)',
      '- getDataShort(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataShort(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataShort(customStack, "myplugin", "mykey", 0);',
      'let value = getDataShort(block, "myplugin", "mykey", 0);',
      'let value = getDataShort(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n')
  },
  {
    label: 'setDataShort',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'setDataShort(itemStack, namespace, key, value)',
      'setDataShort(customStack, namespace, key, value)',
      'setDataShort(block, namespace, key, value)',
      'setDataShort(entity, namespace, key, value)'
    ].join('\n'),
    documentation: [
      'Sets a short value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataShort(itemStack, namespace, key, value)',
      '- setDataShort(customStack, namespace, key, value)',
      '- setDataShort(block, namespace, key, value)',
      '- setDataShort(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataShort(itemStack, "myplugin", "mykey", 5);',
      'setDataShort(customStack, "myplugin", "mykey", 5);',
      'setDataShort(block, "myplugin", "mykey", 5);',
      'setDataShort(entity, "myplugin", "mykey", 5);',
      '```'
    ].join('\n'),
    hover: [
      'Sets a short value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataShort(itemStack, namespace, key, value)',
      '- setDataShort(customStack, namespace, key, value)',
      '- setDataShort(block, namespace, key, value)',
      '- setDataShort(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataShort(itemStack, "myplugin", "mykey", 5);',
      'setDataShort(customStack, "myplugin", "mykey", 5);',
      'setDataShort(block, "myplugin", "mykey", 5);',
      'setDataShort(entity, "myplugin", "mykey", 5);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataInt',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataInt(itemStack, namespace, key, def)',
      'getDataInt(customStack, namespace, key, def)',
      'getDataInt(block, namespace, key, def)',
      'getDataInt(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets an int value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataInt(itemStack, namespace, key, def)',
      '- getDataInt(customStack, namespace, key, def)',
      '- getDataInt(block, namespace, key, def)',
      '- getDataInt(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataInt(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataInt(customStack, "myplugin", "mykey", 0);',
      'let value = getDataInt(block, "myplugin", "mykey", 0);',
      'let value = getDataInt(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets an int value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataInt(itemStack, namespace, key, def)',
      '- getDataInt(customStack, namespace, key, def)',
      '- getDataInt(block, namespace, key, def)',
      '- getDataInt(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataInt(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataInt(customStack, "myplugin", "mykey", 0);',
      'let value = getDataInt(block, "myplugin", "mykey", 0);',
      'let value = getDataInt(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n')
  },
  {
    label: 'setDataInt',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'setDataInt(itemStack, namespace, key, value)',
      'setDataInt(customStack, namespace, key, value)',
      'setDataInt(block, namespace, key, value)',
      'setDataInt(entity, namespace, key, value)'
    ].join('\n'),
    documentation: [
      'Sets an int value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataInt(itemStack, namespace, key, value)',
      '- setDataInt(customStack, namespace, key, value)',
      '- setDataInt(block, namespace, key, value)',
      '- setDataInt(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataInt(itemStack, "myplugin", "mykey", 42);',
      'setDataInt(customStack, "myplugin", "mykey", 42);',
      'setDataInt(block, "myplugin", "mykey", 42);',
      'setDataInt(entity, "myplugin", "mykey", 42);',
      '```'
    ].join('\n'),
    hover: [
      'Sets an int value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataInt(itemStack, namespace, key, value)',
      '- setDataInt(customStack, namespace, key, value)',
      '- setDataInt(block, namespace, key, value)',
      '- setDataInt(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataInt(itemStack, "myplugin", "mykey", 42);',
      'setDataInt(customStack, "myplugin", "mykey", 42);',
      'setDataInt(block, "myplugin", "mykey", 42);',
      'setDataInt(entity, "myplugin", "mykey", 42);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataLong',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataLong(itemStack, namespace, key, def)',
      'getDataLong(customStack, namespace, key, def)',
      'getDataLong(block, namespace, key, def)',
      'getDataLong(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a long value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataLong(itemStack, namespace, key, def)',
      '- getDataLong(customStack, namespace, key, def)',
      '- getDataLong(block, namespace, key, def)',
      '- getDataLong(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataLong(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataLong(customStack, "myplugin", "mykey", 0);',
      'let value = getDataLong(block, "myplugin", "mykey", 0);',
      'let value = getDataLong(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a long value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataLong(itemStack, namespace, key, def)',
      '- getDataLong(customStack, namespace, key, def)',
      '- getDataLong(block, namespace, key, def)',
      '- getDataLong(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataLong(itemStack, "myplugin", "mykey", 0);',
      'let value = getDataLong(customStack, "myplugin", "mykey", 0);',
      'let value = getDataLong(block, "myplugin", "mykey", 0);',
      'let value = getDataLong(entity, "myplugin", "mykey", 0);',
      '```'
    ].join('\n')
  },
  {
    label: 'setDataLong',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'setDataLong(itemStack, namespace, key, value)',
      'setDataLong(customStack, namespace, key, value)',
      'setDataLong(block, namespace, key, value)',
      'setDataLong(entity, namespace, key, value)'
    ].join('\n'),
    documentation: [
      'Sets a long value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataLong(itemStack, namespace, key, value)',
      '- setDataLong(customStack, namespace, key, value)',
      '- setDataLong(block, namespace, key, value)',
      '- setDataLong(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataLong(itemStack, "myplugin", "mykey", 123456789);',
      'setDataLong(customStack, "myplugin", "mykey", 123456789);',
      'setDataLong(block, "myplugin", "mykey", 123456789);',
      'setDataLong(entity, "myplugin", "mykey", 123456789);',
      '```'
    ].join('\n'),
    hover: [
      'Sets a long value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataLong(itemStack, namespace, key, value)',
      '- setDataLong(customStack, namespace, key, value)',
      '- setDataLong(block, namespace, key, value)',
      '- setDataLong(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataLong(itemStack, "myplugin", "mykey", 123456789);',
      'setDataLong(customStack, "myplugin", "mykey", 123456789);',
      'setDataLong(block, "myplugin", "mykey", 123456789);',
      'setDataLong(entity, "myplugin", "mykey", 123456789);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataFloat',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataFloat(itemStack, namespace, key, def)',
      'getDataFloat(customStack, namespace, key, def)',
      'getDataFloat(block, namespace, key, def)',
      'getDataFloat(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a float value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataFloat(itemStack, namespace, key, def)',
      '- getDataFloat(customStack, namespace, key, def)',
      '- getDataFloat(block, namespace, key, def)',
      '- getDataFloat(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataFloat(itemStack, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(customStack, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(block, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(entity, "myplugin", "mykey", 0.0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a float value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataFloat(itemStack, namespace, key, def)',
      '- getDataFloat(customStack, namespace, key, def)',
      '- getDataFloat(block, namespace, key, def)',
      '- getDataFloat(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataFloat(itemStack, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(customStack, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(block, "myplugin", "mykey", 0.0);',
      'let value = getDataFloat(entity, "myplugin", "mykey", 0.0);',
      '```'
    ].join('\n')
  },
  {
    label: 'setDataFloat',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'setDataFloat(itemStack, namespace, key, value)',
      'setDataFloat(customStack, namespace, key, value)',
      'setDataFloat(block, namespace, key, value)',
      'setDataFloat(entity, namespace, key, value)'
    ].join('\n'),
    documentation: [
      'Sets a float value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataFloat(itemStack, namespace, key, value)',
      '- setDataFloat(customStack, namespace, key, value)',
      '- setDataFloat(block, namespace, key, value)',
      '- setDataFloat(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataFloat(itemStack, "myplugin", "mykey", 3.14);',
      'setDataFloat(customStack, "myplugin", "mykey", 3.14);',
      'setDataFloat(block, "myplugin", "mykey", 3.14);',
      'setDataFloat(entity, "myplugin", "mykey", 3.14);',
      '```'
    ].join('\n'),
    hover: [
      'Sets a float value in the persistent data of ItemStack, CustomStack, Block, or Entity.',
      '',
      '**Overloads:**',
      '- setDataFloat(itemStack, namespace, key, value)',
      '- setDataFloat(customStack, namespace, key, value)',
      '- setDataFloat(block, namespace, key, value)',
      '- setDataFloat(entity, namespace, key, value)',
      '',
      '**Example:**',
      '```js',
      'setDataFloat(itemStack, "myplugin", "mykey", 3.14);',
      'setDataFloat(customStack, "myplugin", "mykey", 3.14);',
      'setDataFloat(block, "myplugin", "mykey", 3.14);',
      'setDataFloat(entity, "myplugin", "mykey", 3.14);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataDouble',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataDouble(itemStack, namespace, key, def)',
      'getDataDouble(customStack, namespace, key, def)',
      'getDataDouble(block, namespace, key, def)',
      'getDataDouble(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a double value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataDouble(itemStack, namespace, key, def)',
      '- getDataDouble(customStack, namespace, key, def)',
      '- getDataDouble(block, namespace, key, def)',
      '- getDataDouble(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataDouble(itemStack, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(customStack, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(block, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(entity, "myplugin", "mykey", 0.0);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a double value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataDouble(itemStack, namespace, key, def)',
      '- getDataDouble(customStack, namespace, key, def)',
      '- getDataDouble(block, namespace, key, def)',
      '- getDataDouble(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataDouble(itemStack, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(customStack, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(block, "myplugin", "mykey", 0.0);',
      'let value = getDataDouble(entity, "myplugin", "mykey", 0.0);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataBool',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataBool(itemStack, namespace, key, def)',
      'getDataBool(customStack, namespace, key, def)',
      'getDataBool(block, namespace, key, def)',
      'getDataBool(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a boolean value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataBool(itemStack, namespace, key, def)',
      '- getDataBool(customStack, namespace, key, def)',
      '- getDataBool(block, namespace, key, def)',
      '- getDataBool(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataBool(itemStack, "myplugin", "mykey", false);',
      'let value = getDataBool(customStack, "myplugin", "mykey", false);',
      'let value = getDataBool(block, "myplugin", "mykey", false);',
      'let value = getDataBool(entity, "myplugin", "mykey", false);',
      '```'
    ].join('\n'),
    hover: [
      'Gets a boolean value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataBool(itemStack, namespace, key, def)',
      '- getDataBool(customStack, namespace, key, def)',
      '- getDataBool(block, namespace, key, def)',
      '- getDataBool(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataBool(itemStack, "myplugin", "mykey", false);',
      'let value = getDataBool(customStack, "myplugin", "mykey", false);',
      'let value = getDataBool(block, "myplugin", "mykey", false);',
      'let value = getDataBool(entity, "myplugin", "mykey", false);',
      '```'
    ].join('\n')
  },
  {
    label: 'getDataString',
    kind: vscode.CompletionItemKind.Function,
    detail: [
      'getDataString(itemStack, namespace, key, def)',
      'getDataString(customStack, namespace, key, def)',
      'getDataString(block, namespace, key, def)',
      'getDataString(entity, namespace, key, def)'
    ].join('\n'),
    documentation: [
      'Gets a string value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataString(itemStack, namespace, key, def)',
      '- getDataString(customStack, namespace, key, def)',
      '- getDataString(block, namespace, key, def)',
      '- getDataString(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataString(itemStack, "myplugin", "mykey", "default");',
      'let value = getDataString(customStack, "myplugin", "mykey", "default");',
      'let value = getDataString(block, "myplugin", "mykey", "default");',
      'let value = getDataString(entity, "myplugin", "mykey", "default");',
      '```'
    ].join('\n'),
    hover: [
      'Gets a string value from the persistent data of ItemStack, CustomStack, Block, or Entity, or returns the default if not set.',
      '',
      '**Overloads:**',
      '- getDataString(itemStack, namespace, key, def)',
      '- getDataString(customStack, namespace, key, def)',
      '- getDataString(block, namespace, key, def)',
      '- getDataString(entity, namespace, key, def)',
      '',
      '**Example:**',
      '```js',
      'let value = getDataString(itemStack, "myplugin", "mykey", "default");',
      'let value = getDataString(customStack, "myplugin", "mykey", "default");',
      'let value = getDataString(block, "myplugin", "mykey", "default");',
      'let value = getDataString(entity, "myplugin", "mykey", "default");',
      '```'
    ].join('\n')
  }
];

export function registerJsppLanguageFeatures(context: vscode.ExtensionContext) {
  const diagnostics = vscode.languages.createDiagnosticCollection('jspp');
  context.subscriptions.push(diagnostics);

  const resolver = JavaDocResolver.getInstance();

  async function validateAndSetDiagnostics(doc: vscode.TextDocument) {
    if (doc.languageId !== 'jspp') {
      return;
    }

    const errors = validate(doc.getText());
    const diag = errors.map(err => new vscode.Diagnostic(
      new vscode.Range(err.line - 1, err.column, err.line - 1, err.column + 1),
      err.message,
      err.severity === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning
    ));

    diagnostics.set(doc.uri, diag);

    await resolver.processFile(doc);
  }

  vscode.workspace.onDidSaveTextDocument(doc => {
    validateAndSetDiagnostics(doc);
  });

  vscode.workspace.onDidChangeTextDocument(event => {
    validateAndSetDiagnostics(event.document);
  });

  vscode.workspace.textDocuments.forEach(doc => {
    validateAndSetDiagnostics(doc);
  });

  vscode.languages.registerHoverProvider('jspp', {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      const feature = JS_FEATURES.find(f => f.label === word);
      if (feature && feature.hover) {
        return new vscode.Hover(new vscode.MarkdownString(feature.hover));
      }

      return null;
    }
  });

  vscode.languages.registerCompletionItemProvider('jspp', {
    provideCompletionItems(document, position, token, context) {
      const line = document.lineAt(position.line).text.slice(0, position.character);

      // Ensure the completion is not triggered after a '.', it already handled by the chain completion
      if (line.trim().endsWith('.')) {
        return [];
      }

      const allCompletions = [];

      // Check if the line matches the pattern for `import "xxx"`
      const importMatch = /import\s+"([^"]*)$/.exec(line);
      if (importMatch) {
        const partialImport = importMatch[1];
        // Provide completion items for packages or classes
        allCompletions.push(...resolver.provideImportCompletions(partialImport));
      }

      // Collect known variables in the current file
      const text = document.getText(new vscode.Range(new vscode.Position(0, 0), position)); // Only get the text up to the current position
      const variableMatches = [
        ...text.matchAll(/^\s*(?:var|let|const|[A-Z][a-zA-Z0-9_]*)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/gm)
      ];
      const knownVariables = variableMatches.map(match => match[1]);

      const variableCompletionItems = knownVariables.map(variable => {
        const item = new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable);
        item.detail = "Variable";
        item.documentation = `Variable declared in the current file: ${variable}`;
        return item;
      });

      allCompletions.push(...variableCompletionItems);

      allCompletions.push(...JS_FEATURES.map(feature => {
        const item = new vscode.CompletionItem(feature.label, feature.kind);
        item.detail = feature.detail;
        item.documentation = new vscode.MarkdownString(feature.documentation);
        return item;
      }));

      return allCompletions;
    }
  });

  context.subscriptions.push(
    vscode.languages.registerHoverProvider('jspp', {
      provideHover(document, position) {
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
          return;
        }

        const word = document.getText(wordRange); // ex: getScheduler
        const lineText = document.lineAt(position.line).text;

        // Takes the part before the selected method
        const beforeWord = lineText.slice(0, wordRange.start.character);
        const classMatch = /([A-Z][a-zA-Z0-9_]*)\s*(?:\.\s*)?$/.exec(beforeWord);
        const className = classMatch?.[1] ?? null;

        const symbol = className ? `${className}#${word}` : word;

        console.log(`Looking for documentation for ${symbol}`);
        const doc = resolver.getDocumentationFor(symbol);
        if (doc) {
          return new vscode.Hover(new vscode.MarkdownString(doc));
        }

        console.log(`Looking for documentation for ${symbol}`);

      }
    })
  );

  vscode.languages.registerCompletionItemProvider('jspp', {
    provideCompletionItems(document, position) {
      const lineText = document.lineAt(position.line).text;
      const partial = lineText.slice(0, position.character);

      // If linetext empty I can provide the whole list of classes available.
      if (lineText.trim().length === 0) {
        return resolver.provideCompletionItems();
      }
  
      // Force matching of chains even if it ends with "."
      // Match the entire chain, regardless of the method
      const parts = [...partial.matchAll(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\(|\.|$)/g)].map(m => m[1]);
      if (!parts) {
        return;
      }
      if (parts.length === 0) {
        return;
      }
  
      let currentType: string | undefined = undefined;
  
      // Search for the type of the first declared variable
      // Check if the first part is a built-in variable
      const builtInVariable = JS_FEATURES.find(f => f.label === parts[0] && f.kind === vscode.CompletionItemKind.Variable);
      if (builtInVariable && builtInVariable.type) {
        currentType = builtInVariable.type;
      } else {
        // Otherwise, search for the type of the first declared variable in the document
        for (let i = position.line; i >= 0; i--) {
          const line = document.lineAt(i).text;
          const regex = new RegExp(`\\b(\\w+)\\s+${parts[0]}\\b`);
          const match = regex.exec(line);
          if (match) {
            currentType = match[1];
            break;
          }
        }
      }

      // If not found, assume static class
      if (!currentType) {
        currentType = parts[0];
      }
  
      // Resolve the chain
      for (let i = 1; i < parts.length; i++) {
        const method = parts[i];
        if (!currentType) {
          return;
        }
  
        const returnType = resolver.getReturnTypeOf(currentType, method);
        if (!returnType) {
          console.warn(`Return type not found for ${currentType}.${method}`);
          return;
        }
  
        currentType = resolver.getFullImport(returnType) ?? returnType;
      }
  
      if (!currentType) {
        return;
      }
      return resolver.provideCompletionItems(currentType);
    }
  }, '.');

}