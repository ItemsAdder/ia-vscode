import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import {
	JavaScriptSupportConfigurator,
	itemsAdderJavaBuildGradleKts,
	itemsAdderJavaGradleProperties,
	itemsAdderJavaSettingsGradleKts,
	upsertItemsAdderGradleDependencies
} from '../../itemsadder/javaScriptSupportConfigurator';

suite('Java script support configurator', () => {
	test('discovers ItemsAdder Java script source paths without server jars', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-java-support-'));
		const namespacePath = path.join(root, 'server', 'plugins', 'ItemsAdder', 'contents', 'iaentities');
		const scriptsPath = path.join(root, 'server', 'plugins', 'ItemsAdder', 'contents', 'iaentities', 'scripts');
		fs.mkdirSync(scriptsPath, { recursive: true });
		fs.writeFileSync(path.join(scriptsPath, 'globe_spin.java'), 'class GlobeSpin {}');

		const configurator = new JavaScriptSupportConfigurator();
		const layout = configurator.discover([path.join(root, 'server', 'plugins', 'ItemsAdder', 'contents')]);

		assert.deepStrictEqual(layout.sourcePaths, [namespacePath]);
	});

	test('uses namespace folder as source path for packaged scripts', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-java-support-'));
		const namespacePath = path.join(root, 'contents', 'test');
		const scriptPath = path.join(namespacePath, 'iascript', 'globe_spin.java');
		fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
		fs.writeFileSync(scriptPath, 'package iascript; class GlobeSpin {}');

		const configurator = new JavaScriptSupportConfigurator();
		const layout = configurator.discover([root]);

		assert.deepStrictEqual(layout.sourcePaths, [namespacePath]);
	});

	test('ignores script folders without java files', () => {
		const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ia-java-support-'));
		const scriptsPath = path.join(root, 'contents', 'test', 'scripts');
		fs.mkdirSync(scriptsPath, { recursive: true });
		fs.writeFileSync(path.join(scriptsPath, 'only_jspp.jspp'), 'msg($player, "ok");');

		const configurator = new JavaScriptSupportConfigurator();
		const layout = configurator.discover([root]);

		assert.deepStrictEqual(layout.sourcePaths, []);
	});

	test('generates Gradle build with Maven API dependencies', () => {
		const buildFile = itemsAdderJavaBuildGradleKts();

		assert.ok(buildFile.includes('compileOnly("beer.devs:itemsadder-api:4.0.18-beta-9")'));
		assert.ok(buildFile.includes('compileOnly("io.papermc.paper:paper-api:1.21.4-R0.1-SNAPSHOT")'));
		assert.ok(buildFile.includes('// <itemsadder-vscode-dependencies>'));
		assert.ok(buildFile.includes('// </itemsadder-vscode-dependencies>'));
		assert.ok(!buildFile.includes('org.spigotmc:spigot-api'));
		assert.ok(!buildFile.includes('org.bukkit:bukkit'));
		assert.ok(!buildFile.includes('repositories {'));
	});

	test('preserves custom Gradle dependencies when adding ItemsAdder dependencies', () => {
		const updated = upsertItemsAdderGradleDependencies(`plugins {
    java
}

dependencies {
    implementation("com.example:custom-lib:1.0.0")
}
`);

		assert.ok(updated.includes('implementation("com.example:custom-lib:1.0.0")'));
		assert.ok(updated.includes('compileOnly("beer.devs:itemsadder-api:4.0.18-beta-9")'));
		assert.ok(updated.includes('compileOnly("io.papermc.paper:paper-api:1.21.4-R0.1-SNAPSHOT")'));
	});

	test('updates only existing ItemsAdder dependency marker block', () => {
		const updated = upsertItemsAdderGradleDependencies(`dependencies {
    implementation("com.example:custom-lib:1.0.0")
    // <itemsadder-vscode-dependencies>
    compileOnly("old:itemsadder-api:1.0")
    // </itemsadder-vscode-dependencies>
}
`);

		assert.ok(updated.includes('implementation("com.example:custom-lib:1.0.0")'));
		assert.ok(!updated.includes('old:itemsadder-api:1.0'));
		assert.strictEqual((updated.match(/<itemsadder-vscode-dependencies>/g) ?? []).length, 1);
	});

	test('generates Gradle settings and properties for stable VS Code import', () => {
		const settingsFile = itemsAdderJavaSettingsGradleKts('/workspace/contents/test');
		const propertiesFile = itemsAdderJavaGradleProperties();

		assert.ok(settingsFile.includes('repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)'));
		assert.ok(settingsFile.includes('maven("https://repo.papermc.io/repository/maven-public/")'));
		assert.ok(settingsFile.includes('rootProject.name = "itemsadder-test"'));
		assert.ok(propertiesFile.includes('org.gradle.caching=false'));
		assert.ok(propertiesFile.includes('org.gradle.configuration-cache=false'));
	});
});
