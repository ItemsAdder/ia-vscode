import * as path from 'path';
import * as fs from 'fs';

import { runTests } from '@vscode/test-electron';

function findLocalVSCodeExecutable(): string | undefined {
	const candidates = [
		process.env.VSCODE_TEST_PATH,
		'/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code',
		'/Applications/Visual Studio Code.app/Contents/MacOS/Code',
		'/Applications/Visual Studio Code.app/Contents/MacOS/Electron',
		'C:\\Program Files\\Microsoft VS Code\\Code.exe',
		'C:\\Program Files (x86)\\Microsoft VS Code\\Code.exe',
		'/usr/share/code/code',
		'/snap/bin/code'
	].filter((candidate): candidate is string => Boolean(candidate));

	return candidates.find(candidate => fs.existsSync(candidate));
}

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');

		// Download VS Code, unzip it and run the integration test
		const vscodeExecutablePath = findLocalVSCodeExecutable();

		await runTests({ extensionDevelopmentPath, extensionTestsPath, vscodeExecutablePath });
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
