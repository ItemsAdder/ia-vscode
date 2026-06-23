import * as assert from 'assert';
import * as vscode from 'vscode';

import { DeprecatedSchemaHoverProvider } from '../../itemsadder/deprecatedSchemaHoverProvider';
import { schemas } from '../../schemas';

suite('Deprecated schema hover provider', () => {
	test('shows warning hover for deprecated schema property', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  ruby_sword:',
				'    attribute_modifiers:',
				'      mainhand:',
				'        armorToughness: 2'
			].join('\n')
		});

		const provider = new DeprecatedSchemaHoverProvider({ schemas });
		const hover = provider.provideHover(document, new vscode.Position(6, 10));

		assert.ok(hover);
		assert.strictEqual(String(hover.contents[0]), '$(warning) **Warning: deprecated property.**');
	});

	test('does not show deprecated hover away from property key', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  ruby_sword:',
				'    attribute_modifiers:',
				'      mainhand:',
				'        armorToughness: 2'
			].join('\n')
		});

		const provider = new DeprecatedSchemaHoverProvider({ schemas });
		const hover = provider.provideHover(document, new vscode.Position(6, 25));

		assert.strictEqual(hover, undefined);
	});
});
