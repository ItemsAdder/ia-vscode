// NOTE: this generates the markdown for the whole schema, but it's not very useful as it has too much information.
import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: ts-node generate-docs.ts <path-to-schemas.ts>');
  process.exit(1);
}

const schemaModulePath = path.resolve(args[0]);

async function run() {
  const schemaModule = await import(schemaModulePath);
  const schemas = schemaModule.schemas;

  if (!schemas || typeof schemas !== 'object') {
    console.error(`❌ Invalid schema structure.`);
    process.exit(1);
  }

  const markdown = generateMarkdown(schemas, schemas.title || 'Schema', 1, schemas.$defs || {});
  fs.writeFileSync(`output/docs.md`, markdown);
  console.log(`✅ Markdown generated at: output/docs.md`);
}

function generateMarkdown(
  schema: any,
  title: string,
  level: number,
  defs: Record<string, any>,
  parentRequired: string[] = []
): string {
  let md = `${'#'.repeat(level)} ${title}\n\n`;

  if (schema.description) {
    md += schema.description + '\n\n';
  }

  // Handle allOf, oneOf, anyOf keywords
  if (schema.allOf || schema.oneOf || schema.anyOf) {
    const keyword = schema.allOf ? 'allOf' : schema.oneOf ? 'oneOf' : 'anyOf';
    md += `**${keyword}:**\n\n`;
    for (const [i, sub] of schema[keyword].entries()) {
      const resolved = resolveSchema(sub, defs);
      // If it's an object with properties, create a separate table
      if (resolved.type === 'object' && resolved.properties) {
        md += generateMarkdown(
          resolved,
          `${title} - ${keyword} #${i + 1}`,
          level + 1,
          defs,
          resolved.required || []
        );
      } else {
        // Else, show the description or type
        md += `- ${resolved.type || 'object'}: ${resolved.description || '*No description*'}\n\n`;
      }
    }
    return md;
  }

  if (schema.type === 'object' && schema.properties) {
    md += `| Property | Type | Required | Description |\n|---|---|:---:|---|\n`;
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const required = (schema.required || parentRequired || []).includes(propName) ? '✅' : '';
      const { type, desc } = getTypeAndDesc(propSchema, defs);
      md += `| \`${propName}\` | ${type} | ${required} | ${desc} |\n`;
    }
    md += '\n';

    // Recursively handle nested objects
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const resolved = resolveSchema(propSchema, defs);
      if (
        (resolved.type === 'object' && resolved.properties) ||
        resolved.allOf ||
        resolved.oneOf ||
        resolved.anyOf
      ) {
        md += generateMarkdown(
          resolved,
          propName,
          level + 1,
          defs,
          resolved.required || []
        );
      }
    }
  } else if (schema.type === 'array' && schema.items) {
    md += `Array of:\n\n`;
    md += generateMarkdown(resolveSchema(schema.items, defs), title + ' Item', level + 1, defs);
  }

  return md;
}

function resolveSchema(schema: any, defs: Record<string, any>): any {
  if (schema.$ref) {
    const refKey = schema.$ref.replace(/^#\/\$defs\//, '');
    if (!defs[refKey]) throw new Error(`Missing $ref: ${schema.$ref}`);
    return resolveSchema(defs[refKey], defs);
  }
  return schema;
}

function getTypeAndDesc(prop: any, defs: Record<string, any>): { type: string; desc: string } {
  if (prop.$ref) {
    const resolved = resolveSchema(prop, defs);
    return {
      type: resolved.type || 'object',
      desc: resolved.description || '*No description*',
    };
  }

  if (prop.type === 'array') {
    const items = resolveSchema(prop.items, defs);
    return {
      type: `array<${items.type || 'object'}>`,
      desc: cleanDescription(prop.markdownDescription || prop.description),
    };
  }
  return {
    type: prop.type || 'object',
    desc: cleanDescription(prop.markdownDescription || prop.description),
  };
}

function cleanDescription(desc?: string): string {
  if (!desc) return '*No description*';
  // Remove markdown titles (lines starting with #)
  desc = desc.replace(/^#+\s.*$/gm, '');
  // Replace multiple newlines with a single newline
  desc = desc.replace(/\n{2,}/g, '\n');
  // Trim leading/trailing whitespace and newlines
  return desc.trim() || '*No description*';
}

run();
