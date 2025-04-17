import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as unzipper from 'unzipper';

interface MemberInfo {
  name: string;
  doc: string;
  returnType: string;
  type?: string; // `enums`, `functions`, `variables`.
}

const repositories = [
  // "https://repo.maven.apache.org/maven2/",
  "https://hub.spigotmc.org/nexus/service/rest/repository/browse/snapshots/",
  // "https://repo.papermc.io/repository/maven-public/",
  // "https://repo.papermc.io/repository/maven-snapshots/",
  // "https://oss.sonatype.org/content/groups/public/"
];

export class JavaDocResolver {
  private static instance: JavaDocResolver;
  private availableClasses: Set<string> = new Set();
  private membersCache: Map<string, MemberInfo> = new Map();
  private classToMembers: Map<string, MemberInfo[]> = new Map();
  private downloading: Set<string> = new Set();
  private docBasePath = path.join(os.tmpdir(), 'jspp-sources-cache');
  private importMap: Map<string, string> = new Map();
  static defaultImports = [
    // AUTO_IMPORT_CLASSES
    "org.bukkit.Bukkit",
    "org.bukkit.event.Event",
    "org.bukkit.plugin.Plugin",
    "org.bukkit.entity.Player",
    "org.bukkit.inventory.ItemStack",
    "dev.lone.itemsadder.api.CustomStack",
    /// AUTO_IMPORT_CLASSES_IF_USED_EXPLICITLY
    "dev.lone.itemsadder.api.FontImages.FontImageWrapper",
    "dev.lone.itemsadder.api.FontImages.PlayerCustomHudWrapper",
    "dev.lone.itemsadder.api.FontImages.PlayerHudsHolderWrapper",
    "dev.lone.itemsadder.api.FontImages.PlayerHudWrapper",
    "dev.lone.itemsadder.api.FontImages.PlayerQuantityHudWrapper",
    "dev.lone.itemsadder.api.FontImages.TexturedInventoryWrapper",
    "dev.lone.itemsadder.api.CustomBlock",
    "dev.lone.itemsadder.api.CustomCrop",
    "dev.lone.itemsadder.api.CustomEntity",
    "dev.lone.itemsadder.api.CustomFire",
    "dev.lone.itemsadder.api.CustomFurniture",
    "dev.lone.itemsadder.api.CustomPlayer",
    "dev.lone.itemsadder.api.CustomStack",
    "dev.lone.itemsadder.api.ItemsAdder"
];

  private constructor() {
    if (!fs.existsSync(this.docBasePath)) {
      fs.mkdirSync(this.docBasePath, { recursive: true });
    }
  }

  public static getInstance(): JavaDocResolver {
    if (!JavaDocResolver.instance) {
      JavaDocResolver.instance = new JavaDocResolver();
    }
    return JavaDocResolver.instance;
  }

  public async processFile(document: vscode.TextDocument) {
    const text = document.getText();
    const importedClasses = this.extractImports(text);
    const javadocHints = this.extractJavadocHints(text);

    for (const coord of javadocHints) {
      const [groupId, artifactId, version] = coord.split(":");
      await this.ensureSources(groupId, artifactId, version);
    }

    importedClasses.push(...JavaDocResolver.defaultImports);

    for (const fullClassName of importedClasses) {
      const simpleName = fullClassName.split('.').pop()!;
      this.importMap.set(simpleName, fullClassName);

      if (fullClassName.startsWith('org.bukkit')) {
        await this.ensureSources('org.spigotmc', 'spigot-api', '1.21.5-R0.1-SNAPSHOT');
      }
    }
  }

  public getDocumentationFor(symbol: string): string | undefined {
    return this.membersCache.get(symbol)?.doc;
  }

  public getReturnTypeOf(className: string, methodName: string): string | undefined {
    const methods = this.classToMembers.get(className);
    if (!methods) {
      return undefined;
    }
    const method = methods.find(m => m.name === methodName);
    return method?.returnType;
  }

  public getMembersOf(className: string): MemberInfo[] {
    return this.classToMembers.get(className) ?? [];
  }

  public getFullImport(type: string): string | undefined {
    return this.importMap.get(type);
  }

  public provideCompletionItems(className: string | undefined = undefined): vscode.CompletionItem[] {

    if(!className) {
      const items: vscode.CompletionItem[] = [];
      for (const [key, value] of this.importMap.entries()) {
        const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Class);
        item.detail = value;
        items.push(item);
      }
      return items;
    }

    const items: vscode.CompletionItem[] = [];
    const members = this.getMembersOf(className);
    for (const member of members) {
      const item = new vscode.CompletionItem(member.name, typeToCompletionKind(member?.type));
      item.detail = member.returnType;
      item.documentation = member.doc;
      items.push(item);
    }
    return items;
  }

  public provideImportCompletions(partialPackage: string | undefined = undefined): vscode.CompletionItem[] {
    const items: vscode.CompletionItem[] = [];

    if (partialPackage) {
      for (const className of this.availableClasses) {
      if (className.includes(partialPackage)) {
        const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Module);
        items.push(item);
      }
      }
    } else {
      for (const className of this.availableClasses) {
      const item = new vscode.CompletionItem(className, vscode.CompletionItemKind.Module);
      items.push(item);
      }
    }

    return items;
  }

  private extractImports(code: string): string[] {
    const matches = [...code.matchAll(/^import\s+\"([^\"]+)\";/gm)];
    return matches.map(m => m[1]);
  }

  private extractJavadocHints(code: string): string[] {
    const matches = [...code.matchAll(/\/\/\s*javadocs\s+\"([^\"]+)\"/gm)];
    return matches.map(m => m[1]);
  }

  private async ensureSources(groupId: string, artifactId: string, version: string) {
    const artifactKey = `${groupId}:${artifactId}:${version}`;
    const artifactPath = path.join(this.docBasePath, artifactKey.replace(/:/g, '_'));

    // Check if the artifact is already downloaded
    const cacheFilePath = path.join(this.docBasePath, `${path.basename(artifactPath, '.zip')}_cache.json`);
    if (fs.existsSync(cacheFilePath)) {
      const cache = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));
      for (const className in cache.classes) {
        const methods = cache.classes[className];
        this.classToMembers.set(className, methods);
        for (const method of methods) {
          this.membersCache.set(`${className}#${method.name}`, method);
        }
      }

      this.availableClasses = new Set([...this.availableClasses, ...cache.imports]);

      return;
    }

    if (fs.existsSync(artifactPath)) {
      this.loadDocsFromSources(artifactPath);
      return;
    }

    if (this.downloading.has(artifactKey)) {
      return;
    }
    this.downloading.add(artifactKey);

    let downloaded = false;

    for (const repo of repositories) {
      const metadataUrl = `${repo}${groupId.replace(/\./g, '/')}/${artifactId}/${version}/`;
      try {
        const folderHtml = await new Promise<string>((resolve, reject) => {
          https.get(metadataUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JavaDocResolver/1.0)' } }, (res) => {
            if (res.statusCode !== 200) {
              return reject(new Error(`Failed to fetch metadata from ${metadataUrl}, status code: ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
          }).on('error', reject);
        });

        const subfolders = [...folderHtml.matchAll(/href="(\d[^\/]*)\//g)].map(m => m[1]);
        if (subfolders.length === 0) continue;

        const randomSnapshot = subfolders[Math.floor(Math.random() * subfolders.length)];
        const snapshotUrl = `${metadataUrl}${randomSnapshot}/`;

        const snapshotHtml = await new Promise<string>((resolve, reject) => {
          https.get(snapshotUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JavaDocResolver/1.0)' } }, (res) => {
            if (res.statusCode !== 200) return reject(new Error(`Failed to fetch snapshot data from ${snapshotUrl}`));
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
          }).on('error', reject);
        });

        const match = snapshotHtml.match(/href="([^\"]+-sources\.jar)"/);
        if (!match) continue;

        const jarUrl = match[1];
        const jarFileName = path.basename(jarUrl);
        const tmpJarPath = path.join(os.tmpdir(), jarFileName);

        await new Promise<void>((resolve, reject) => {
          const file = fs.createWriteStream(tmpJarPath);
          https.get(jarUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JavaDocResolver/1.0)' } }, (res) => {
            if (res.statusCode !== 200) {
              file.close();
              fs.unlinkSync(tmpJarPath);
              return reject(new Error(`Failed to download sources from ${jarUrl}`));
            }
            res.pipe(file);
            file.on('finish', () => file.close(err => err ? reject(err) : resolve()));
          }).on('error', err => {
            file.close();
            fs.unlinkSync(tmpJarPath);
            reject(err);
          });
        });

        fs.renameSync(tmpJarPath, `${artifactPath}.zip`);
        this.loadDocsFromSources(`${artifactPath}.zip`);
        downloaded = true;
        break;
      } catch (error) {
        console.warn(`Repo fail: ${metadataUrl}`);
      }
    }

    if (!downloaded) {
      console.error(`Failed to download sources for ${artifactKey}`);
    }

    this.downloading.delete(artifactKey);
  }

  private async loadDocsFromSources(artifactPath: string) {
    const cache: { 
      imports: string[],
      classes: {
        [className: string]: MemberInfo[]
      }
    } = {
      imports: [],
      classes: {}
    };

    try {
      const zip = fs.createReadStream(artifactPath).pipe(unzipper.Parse({ forceStream: true }));

      for await (const entry of zip) {
        const fileName = entry.path;
        if (!fileName.endsWith('.java')) {
          entry.autodrain();
          continue;
        }

        {
          const tmpImport = fileName.replace(/\.java$/, '').replace(/\//g, '.');
          this.availableClasses.add(tmpImport);
          cache.imports.push(tmpImport);
        }

        const content = await new Promise<string>((resolve, reject) => {
          let data = '';
          entry.on('data', (chunk: Buffer) => (data += chunk.toString()));
          entry.on('end', () => resolve(data));
          entry.on('error', reject);
        });

        const className = path.basename(fileName, '.java');
        const members: MemberInfo[] = [];
        let parentClass: string | null = null;
        const interfaces: string[] = [];

        // Debug, remove this after the test.
        // if(className !== "Bukkit") {
        //   continue;
        // }

        console.log(`Processing file: ${fileName}`);

        // Extract class inheritance and interfaces
        const classMatch = content.match(/class\s+(\w+)\s+extends\s+(\w+)/);
        if (classMatch) {
          parentClass = classMatch[2];
        }

        const interfaceMatch = content.match(/class\s+\w+\s+implements\s+([\w, ]+)/);
        if (interfaceMatch) {
          interfaces.push(...interfaceMatch[1].split(',').map((i) => i.trim()));
        }

        // Extract methods
        const matches = [
          ...content.matchAll(
            /\/\*\*([\s\S]*?)\*\/[\s\n\r]*(?:@\w+[\s\n\r]*)*(public|protected|private)?\s*(static\s+)?([\w<>\[\]]+)\s+(\w+)\s*\(/g
          ),
        ];
        for (const match of matches) {
          const docComment = match[1].replace(/\s*\*\s?/g, '').trim();
          let returnType = match[4].trim();
          const methodName = match[5].trim();

          // Shit to recognize constructors.
          const isConstructor = returnType === 'private' || returnType === 'public' || returnType === 'protected';
          if (isConstructor) {
            returnType = className;
          }

          const methodInfo: MemberInfo = { name: methodName, doc: docComment, returnType, type: 'function' };

          this.membersCache.set(`${className}#${methodName}`, methodInfo);
          members.push(methodInfo);

          console.log(`Found method: ${methodName} in class: ${className}`);
        }

        // Recursively load methods from parent class and interfaces
        if (parentClass) {
          const parentMethods = this.getMembersOf(parentClass);
          for (const method of parentMethods) {
            if (!members.some((m) => m.name === method.name)) {
              members.push(method);
            }
          }
        }

        for (const iface of interfaces) {
          const interfaceMethods = this.getMembersOf(iface);
          for (const method of interfaceMethods) {
            if (!members.some((m) => m.name === method.name)) {
              members.push(method);
            }
          }
        }

        // Extract enums from file
        const enumMatches = [
          ...content.matchAll(
            /enum\s+(\w+)\s*{([\s\S]*?)(?=}\s*;|}\s*$)}/g
          ),
        ];
        for (const enumMatch of enumMatches) {
          const enumName = enumMatch[1].trim();
          const enumBody = enumMatch[2].trim();
          const enumEntries = [...enumBody.matchAll(/\/\*\*([\s\S]*?)\*\/[\s\n\r]*(?:@\w+[\s\n\r]*)*(\w+)\s*\(/g)].map(entryMatch => {
            const docComment = entryMatch[1].replace(/\s*\*\s?/g, '').trim();
            const entryName = entryMatch[2].trim();
            return { name: entryName, doc: docComment, returnType: enumName, type: 'enum' };
          });

          members.push(...enumEntries);
          for (const entry of enumEntries) {
            this.membersCache.set(`${className}#${entry.name}`, entry);
          }

          console.log(`Loaded ${enumEntries.length} enum entries for enum ${enumName}`);
        }

        if (members.length > 0) {
          cache.classes[className] = members;
          this.classToMembers.set(className, members);
          console.log(`Loaded ${members.length} members (including inherited methods) for class ${className}`);
        }
      }

      // Save cache to a JSON file
      const cacheFilePath = path.join(this.docBasePath, `${path.basename(artifactPath, '.zip')}_cache.json`);
      fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
      console.log(`Cache saved to ${cacheFilePath}`);
    } catch (err) {
      console.error(`Failed to process sources zip file ${artifactPath}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }
}


function typeToCompletionKind(type: string | undefined): vscode.CompletionItemKind | undefined {
  if (!type) {
    return vscode.CompletionItemKind.Method;
  }

  switch (type.toLowerCase()) {
    case 'class':
      return vscode.CompletionItemKind.Class;
    case 'function':
      return vscode.CompletionItemKind.Method;
    case 'enum':
      return vscode.CompletionItemKind.Enum;
    case 'variable':
      return vscode.CompletionItemKind.Variable;
    default:
      return vscode.CompletionItemKind.Text;
  }
}

