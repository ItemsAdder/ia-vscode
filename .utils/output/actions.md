# Actions

## `cancel`

Cancel the event that triggered this action

## `damage_entity`

Damage the entity of this event. For example on interact or attack or on event item_hit_entity

### Properties:

- `damage` (number)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `damage_entity_in_sight`

Damage entity you're looking at

### Properties:

- `damage` (number)
- `distance` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `damage_near_entities`

Damage near entities

### Properties:

- `damage` (number)
- `radius` (integer)
- `entity_groups` (array)
- `entity_groups` (array):  Possible values: `HOSTILE`, `PLAYERS`, `PASSIVE`
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `decrement_amount`

Decrement this item amount

### Properties:

- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `decrement_durability`

Decrement/increment this item durability

### Properties:

- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `decrement_player_stat`

Decrement player stat (ItemsAdder stats, used by HUDs)

### Properties:

- `name` (string)
- `amount` (number)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `decrement_usages`

Decrement this item usages

### Properties:

- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `drop_exp`

Drop exp

### Properties:

- `chance` (number)
- `min_amount` (integer)
- `max_amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `drop_item`

Drops a vanilla/custom item.

### Properties:

- `item` (string): Vanilla / ItemsAdder custom item
- `min_amount` (integer)
- `max_amount` (integer)
- `chance` (number)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `execute_commands`

Execute these commands

### Properties:

- `change_me_1` (object)
  - `command` (string): Command to be executed (**without** the **/**)   You can use these placeholders:  `{player}` is the player who used this item  `{target-player}` is the player interacted/attacked  `{target-x}` is the x location of player/block interacted/attacked  `{target-y}` is the x location of player/block interacted/attacked  `{target-z}` is the x location of player/block interacted/attacked  `{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).   Example: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`
  - `as_console` (boolean): Default: `false`. Execute the command as console or as the current player.
  - `flow_success_if_message_contains` (string): The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status.
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.
- `change_me_2` (object)
  - `command` (string): Command to be executed (**without** the **/**)   You can use these placeholders:  `{player}` is the player who used this item  `{target-player}` is the player interacted/attacked  `{target-x}` is the x location of player/block interacted/attacked  `{target-y}` is the x location of player/block interacted/attacked  `{target-z}` is the x location of player/block interacted/attacked  `{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).   Example: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`
  - `as_console` (boolean): Default: `false`. Execute the command as console or as the current player.
  - `flow_success_if_message_contains` (string): The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status.
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.
- `change_me_3` (object)
  - `command` (string): Command to be executed (**without** the **/**)   You can use these placeholders:  `{player}` is the player who used this item  `{target-player}` is the player interacted/attacked  `{target-x}` is the x location of player/block interacted/attacked  `{target-y}` is the x location of player/block interacted/attacked  `{target-z}` is the x location of player/block interacted/attacked  `{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).   Example: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`
  - `as_console` (boolean): Default: `false`. Execute the command as console or as the current player.
  - `flow_success_if_message_contains` (string): The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status.
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.
- `change_me_4` (object)
  - `command` (string): Command to be executed (**without** the **/**)   You can use these placeholders:  `{player}` is the player who used this item  `{target-player}` is the player interacted/attacked  `{target-x}` is the x location of player/block interacted/attacked  `{target-y}` is the x location of player/block interacted/attacked  `{target-z}` is the x location of player/block interacted/attacked  `{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).   Example: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`
  - `as_console` (boolean): Default: `false`. Execute the command as console or as the current player.
  - `flow_success_if_message_contains` (string): The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status.
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.
- `change_me_xx` (object)
  - `command` (string): Command to be executed (**without** the **/**)   You can use these placeholders:  `{player}` is the player who used this item  `{target-player}` is the player interacted/attacked  `{target-x}` is the x location of player/block interacted/attacked  `{target-y}` is the x location of player/block interacted/attacked  `{target-z}` is the x location of player/block interacted/attacked  `{debug-event-name}` is the current Bukkit event which triggered the action (useful only to devs).   Example: `tell {target-player} Hello {target-player}, your coords are {target-x} {target-y} {target-z}`
  - `as_console` (boolean): Default: `false`. Execute the command as console or as the current player.
  - `flow_success_if_message_contains` (string): The plugin can't automatically identify plugins commands success/fail status, so you have to specify a text that can help the plugin to identify the command status.
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `explosion`

Spawn explosion

### Properties:

- `power` (integer)
- `fire` (boolean)
- `break_blocks` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `feed`

Feed player

### Properties:

- `amount` (integer): Vanilla saturation and feed values: https://minecraft.gamepedia.com/Hunger#Food_level_and_saturation_level_restoration
- `saturation` (number): Vanilla saturation and feed values: https://minecraft.gamepedia.com/Hunger#Food_level_and_saturation_level_restoration
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `give_item`

Give this player an item

### Properties:

- `item` (string): Vanilla / ItemsAdder custom item
- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `glow_near_blocks`

Glow blocks near interact location (or near the player if this event is not an interact one)

### Properties:

- `material` (string): Vanilla blocks
- `radius` (object)
  - `x` (integer)
  - `y` (integer)
  - `z` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `increment_amount`

Increment this item amount

### Properties:

- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `increment_durability`

Decrement/increment this item durability

### Properties:

- `amount` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `increment_player_stat`

Increment player stat (ItemsAdder stats, used by HUDs)

### Properties:

- `name` (string)
- `amount` (number)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `multiple_break`

Break multiple blocks around the center of broken block

### Properties:

- `size` (integer)
- `depth` (integer)
- `keep_ores` (boolean)
- `drop_all_blocks` (object)
  - `enabled` (boolean)
  - `need_silk_touch` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `place_furniture`

Places a furniture. Useful on interact events to place a custom furniture.

### Properties:

- `furniture` (string)
- `decrement_amount` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `play_effect`

Play this effect

### Properties:

- `name` (string): Bukkit effect
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `play_particle`

Play this particle

### Properties:

- `name` (string): Vanilla particles
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `play_sound`

Play a Vanilla sound or Custom sound

### Properties:

- `name` (string): Vanilla and custom sounds
- `volume` (number)
- `pitch` (number)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `category` (string): Category of the sound.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.
- `stop_previous` (boolean)

## `play_totem_animation`

Play the totem animation with a particular item texture.

## `potion_effect`

Apply potion effect to player

### Properties:

- `every_ticks` (integer)
- `type` (string): Bukkit potion effect type
- `amplifier` (integer): Amplifier level
- `duration` (integer)
- `ambient` (boolean)
- `particles` (boolean)
- `icon` (boolean)

## `remove_potion_effect`

Remove potion effect

### Properties:

- `type` (string): Bukkit potion effect type
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `replace_block`

Replace vanilla/custom blocks in interact location (or on the player location if this event is not an interact one)

### Properties:

- `from` (unknown)
- `to` (unknown)
- `decrement_durability` (integer): Decrement durability amount
- `decrement_amount` (integer): Decrement item amount
- `no_physics` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `replace_near_blocks`

Replace vanilla/custom blocks near interact location (or near the player if this event is not an interact one)

### Properties:

- `from` (unknown)
- `from_multiple` (array): List of vanilla/custom blocks to replace
- `from_multiple` (array): List of vanilla/custom blocks to replace
- `to` (unknown)
- `radius` (object)
  - `x` (integer)
  - `y` (integer)
  - `z` (integer)
- `decrement_durability` (integer): Decrement durability amount
- `decrement_amount` (integer): Decrement item amount
- `no_physics` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `replace_properties`

Replace this item properties

### Properties:

- `custom_model_data` (object)
  - `copy_from_item` (string)
  - `restorable` (boolean): Can this change be reverted?
  - `delay` (integer): Delay in ticks before starting this action
  - `flow` (object): Advanced options to change the flow of actions for this event section.
    - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
    - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `script`

Script that run custom code on that specific events.

### Properties:

- `name` (string)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `set_block`

Sets a block. Useful on interact events to place a custom/vanilla block.

### Properties:

- `block` (unknown)
- `target` (string)
- `decrement_amount` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `shoot_particle`

Shoot this particle

### Properties:

- `name` (string): Vanilla particles
- `distance` (integer)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `stop_sound`

Stop a Vanilla sound or Custom sound

### Properties:

- `name` (string): Vanilla and custom sounds
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `target_potion_effect`

Apply potion effect to target entity

### Properties:

- `type` (string): Bukkit potion effect type
- `amplifier` (integer): Amplifier level
- `duration` (integer)
- `ambient` (boolean)
- `particles` (boolean)
- `icon` (boolean)
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.

## `target_remove_potion_effect`

Remove potion effect from target entity

### Properties:

- `type` (string): Bukkit potion effect type
- `delay` (integer): Delay in ticks before starting this action
- `flow` (object): Advanced options to change the flow of actions for this event section.
  - `stop_if_last_success` (boolean): Doesn't execute this and the next actions if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_last_fail` (boolean): Doesn't execute this and the next actions if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_success` (boolean): Doesn't execute this action if the previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_last_fail` (boolean): Doesn't execute this action if the previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_success` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_any_fail` (boolean): Doesn't execute this and the next actions if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_success` (boolean): Doesn't execute this action if **ANY** of the previous actions **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_any_fail` (boolean): Doesn't execute this action if **ANY** of the previous actions **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_success` (string): Doesn't execute this and the next actions if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `stop_if_fail` (string): Doesn't execute this and the next actions if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_success` (string): Doesn't execute this action if a specific previous action **succeeded**.  USE ONLY ONE OF `stop_` or `skip_`.
  - `skip_if_fail` (string): Doesn't execute this action if a specific previous action **failed**.  USE ONLY ONE OF `stop_` or `skip_`.
- `permission` (string): Permission needed to execute this action. You can negate it by putting a `!` at the beginning of the permission.  Example: `!example.permission` will not execute this action if the player has the `example.permission` permission.