import * as assert from 'assert';
import * as vscode from 'vscode';

import { SchemaHoverProvider } from '../../itemsadder/schemaHoverProvider';
import { schemas } from '../../schemas';

suite('Schema hover provider', () => {
	test('rewrites schema documentation URLs to VS Code command links', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  ruby_sword:',
				'    resource:',
				'      material: PAPER',
				'      custom_model_data: 1'
			].join('\n')
		});
		const provider = new SchemaHoverProvider({ schemas });

		const hover = provider.provideHover(document, new vscode.Position(6, 8));

		assert.ok(hover);
		assert.ok(String(hover.contents[0]).includes('command:ia-vscode.openUrlInVscode'));
	});

	test('shows deprecated warning once in schema hover', async () => {
		const document = await vscode.workspace.openTextDocument({
			language: 'yaml',
			content: [
				'info:',
				'  namespace: test',
				'items:',
				'  ruby_sword:',
				'    display_name: Old Name'
			].join('\n')
		});
		const provider = new SchemaHoverProvider({ schemas });

		const hover = provider.provideHover(document, new vscode.Position(4, 6));

		assert.ok(hover);
		const content = String(hover.contents[0]);
		assert.strictEqual(content.match(/Warning: deprecated property/g)?.length, 1);
	});
});
