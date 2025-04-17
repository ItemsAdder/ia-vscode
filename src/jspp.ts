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
  // Functions
  {
    label: 'delay',
    kind: vscode.CompletionItemKind.Function,
    detail: 'delay(ticks, callback)',
    documentation: 'Executes a function after a certain number of ticks.',
    hover: "Executes a function after a certain number of ticks.\n\n**Example:** `delay(20, () => {...})`"
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
    label: 'isCustomBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'isCustomBlock(block)',
    documentation: 'Checks if the given block is a custom block.',
    hover: "Checks if the given block is a custom block.\n\n**Example:** `isCustomBlock(block)`"
  },
  {
    label: 'customBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'customBlock(block)',
    documentation: 'Gets the CustomBlock instance for the given block.',
    hover: "Gets the CustomBlock instance for the given block.\n\n**Example:** `customBlock(block)`"
  },
  {
    label: 'block',
    kind: vscode.CompletionItemKind.Function,
    detail: 'block(worldName, x, y, z)',
    documentation: 'Gets the block at the specified coordinates in the given world.',
    hover: "Gets the block at the specified coordinates in the given world.\n\n**Example:** `block(\"world\", 100, 64, 200)`"
  },
  {
    label: 'removeBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'removeBlock(block)',
    documentation: 'Removes the specified block.',
    hover: "Removes the specified block.\n\n**Example:** `removeBlock(block)`"
  },
  {
    label: 'placeBlock',
    kind: vscode.CompletionItemKind.Function,
    detail: 'placeBlock(block, materialOrIdentifier)',
    documentation: 'Places a block with the specified material or custom identifier.',
    hover: "Places a block with the specified material or custom identifier.\n\n**Example:** `placeBlock(block, \"DIAMOND_BLOCK\")`"
  },
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