// Example: `ts-node .\generate-properties-docs.ts ..\src\schemas.ts Actions actions`

import * as fs from 'fs';
import * as path from 'path';

interface Schema {
  $defs: Record<string, any>;
}

const args = process.argv.slice(2);
if (args.length < 3 || args.length > 4) {
  console.error('Usage: ts-node .\generate-properties-docs.ts <path-to-schemas.ts> <title> <basePath>');
  process.exit(1);
}

const schemaModulePath = path.resolve(args[0]);
const title = args[1] || 'Actions';
const basePath = args[2] || "actions";
const printProperties = args.length < 4 ? true : (args[3] === 'true' || args[3] === '1');

async function run() {
  const schemaModule = await import(schemaModulePath);
  const schemas: Schema = schemaModule.schemas;

  if (!schemas?.$defs?.[basePath]?.properties) {
    console.error(`❌ Invalid schema structure. Expecting \$defs.${basePath}.properties`);
    process.exit(1);
  }

  const markdown = generateMarkdownFromBasePath(schemas);
  fs.writeFileSync(`output/${basePath}.md`, markdown);
  console.log(`✅ Markdown generated at: output/${basePath}.md`);
}

function printPropertiesRecursive(
  properties: Record<string, any>,
  schemas: Schema,
  defs: Record<string, any>,
  indent: number = 0
): string {
  let md = '';
  const pad = '  '.repeat(indent);
  for (const [propName, propSchema] of Object.entries(properties)) {
    const prop = propSchema as any;
    if (prop.deprecated || prop.doNotSuggest) continue;
    const type = getType(prop, schemas);
    const desc = getInfo(prop, schemas);

    md += `${pad}- \`${propName}\` (${type})${desc ? `: ${desc}` : ''}\n`;

    // Recursive for inline objects
    if (prop.type === 'object' && prop.properties) {
      md += printPropertiesRecursive(prop.properties, schemas, defs, indent + 1);
    }
    // Recursive for $ref
    else if (prop.$ref) {
      const refKey = prop.$ref.replace("#/$defs/", "");
      const refSchema = defs[refKey];
      if (refSchema?.properties) {
        md += printPropertiesRecursive(refSchema.properties, schemas, defs, indent + 1);
      }
    }
    // Recursive for arrays of objects
    else if (prop.type === 'array' && prop.items) {
      let enumInfo = '';
      if (prop.items.enum && Array.isArray(prop.items.enum)) {
        enumInfo = ` Possible values: ${prop.items.enum.map((v: string) => `\`${v}\``).join(', ')}`;
      }
      md += `${pad}- \`${propName}\` (${type}): ${desc}${enumInfo}\n`;

      if (prop.items.$ref) {
        const refKey = prop.items.$ref.replace("#/$defs/", "");
        const refSchema = defs[refKey];
        if (refSchema?.properties) {
          md += `${pad}  - (array item):\n`;
          md += printPropertiesRecursive(refSchema.properties, schemas, defs, indent + 2);
        }
      } else if (prop.items.type === 'object' && prop.items.properties) {
        md += `${pad}  - (array item):\n`;
        md += printPropertiesRecursive(prop.items.properties, schemas, defs, indent + 2);
      }
      continue;
    }
  }
  return md;
}

function generateMarkdownFromBasePath(schemas: Schema): string {
  const baseProps = schemas.$defs[basePath].properties;
  const defs = schemas.$defs;

  let md = `# ${title}\n\n`;

  // Sort root properties alphabetically
  const sortedEntries = Object.entries(baseProps).sort(([a], [b]) => a.localeCompare(b));

  for (const [actionName, actionInfo] of sortedEntries) {
    if (typeof actionInfo !== 'object' || actionInfo === null || !('$ref' in actionInfo)) continue;
    const ref = (actionInfo as { $ref: string })["$ref"];
    if (!ref || !ref.startsWith("#/$defs/")) continue;

    const defKey = ref.replace("#/$defs/", "");
    const def = defs[defKey];
    if (!def) continue;

    // Prefer description/markdownDescription from the property itself, then fallback to the referenced def
    const description =
      (actionInfo as any).markdownDescription ||
      (actionInfo as any).description ||
      def.markdownDescription ||
      def.description ||
      '*No description provided.*';

    md += `## \`${actionName}\`\n\n`;
    md += `${description}\n\n`;

    if (printProperties) {
      const resolved = resolveRef(def, defs);
      if (resolved?.properties) {
        md += `### Properties:\n\n`;
        md += printPropertiesRecursive(resolved.properties, schemas, defs, 0);
        md += `\n`;
      }
    }
  }

  return md.trim();
}

// Recursively resolves all nested allOf and $ref
function resolveRef(schema: any, defs: Record<string, any>): any {
  if (schema.$ref) {
    const refKey = schema.$ref.replace("#/$defs/", "");
    return resolveRef(defs[refKey], defs);
  }

  if (schema.allOf) {
    return schema.allOf.reduce((acc: any, subSchema: any) => {
      const resolved = resolveRef(subSchema, defs);
      return {
        ...acc,
        ...resolved,
        properties: {
          ...acc.properties,
          ...resolved.properties,
        }
      };
    }, {});
  }

  return schema;
}


function getType(prop: any, schemas: Schema): string {
  if (prop.$ref) {
    const refKey = prop.$ref.replace("#/$defs/", "");
    const refSchema = (schemas as any).$defs?.[refKey];
    if (refSchema?.type) return refSchema.type;
    return 'unknown';
  }
  if (prop.type) return prop.type;
  return 'unknown';
}

function getInfo(prop: any, schemas: Schema): string {
  let desc: string | undefined;

  if (prop.$ref) {
    const refKey = prop.$ref.replace("#/$defs/", "");
    const refSchema = (schemas as any).$defs?.[refKey];
    desc = refSchema?.title || refSchema?.markdownDescription;
  } else {
    desc = prop.title || prop.markdownDescription;
  }

  if (!desc) return '';
  // Remove newlines and trim
  return desc.replace(/\r?\n|\r/g, ' ').trim();
}

run();
