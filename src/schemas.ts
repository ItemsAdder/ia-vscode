/* eslint-disable @typescript-eslint/no-var-requires */

type SchemaObject = Record<string, any>;

const baseSchema = require('../src/schemas.json');
const schemaEnums = require('../src/schemaEnums.json');

export const schemas = normalizeSchemaForLanguageServer({
	...baseSchema,
	$defs: Object.fromEntries(
		[...new Set([...Object.keys(baseSchema.$defs), ...Object.keys(schemaEnums.$defs)])].map(key => [
			key,
			{
				...(baseSchema.$defs[key] ?? {}),
				...(schemaEnums.$defs[key] ?? {})
			}
		])
	)
});

function normalizeSchemaForLanguageServer(schema: SchemaObject): SchemaObject {
	const normalized = deepClone(schema);
	inlineRefSiblings(normalized, normalized);
	addDeprecationMessages(normalized);
	return normalized;
}

function inlineRefSiblings(node: unknown, root: SchemaObject): unknown {
	if (Array.isArray(node)) {
		node.forEach(item => inlineRefSiblings(item, root));
		return node;
	}

	if (!isSchemaObject(node)) {
		return node;
	}

	if (typeof node.$ref === 'string' && Object.keys(node).some(key => key !== '$ref')) {
		const ref = resolveRef(node.$ref, root);
		if (ref) {
			const metadata = { ...node };
			delete metadata.$ref;

			for (const key of Object.keys(node)) {
				delete node[key];
			}

			Object.assign(node, deepClone(ref), metadata);
		}
	}

	for (const value of Object.values(node)) {
		inlineRefSiblings(value, root);
	}

	return node;
}

function addDeprecationMessages(node: unknown): void {
	if (Array.isArray(node)) {
		node.forEach(addDeprecationMessages);
		return;
	}

	if (!isSchemaObject(node)) {
		return;
	}

	if (node.deprecated === true && !node.deprecationMessage && !node.markdownDeprecationMessage) {
		const description = typeof node.markdownDescription === 'string'
			? node.markdownDescription
			: typeof node.description === 'string'
				? node.description
				: 'Deprecated property.';
		node.markdownDeprecationMessage = description;
	}

	for (const value of Object.values(node)) {
		addDeprecationMessages(value);
	}
}

function resolveRef(ref: string, root: SchemaObject): SchemaObject | undefined {
	const defKey = ref.startsWith('#/$defs/') ? ref.slice('#/$defs/'.length) : undefined;
	const value = defKey ? root.$defs?.[defKey] : undefined;
	return isSchemaObject(value) ? value : undefined;
}

function deepClone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value));
}

function isSchemaObject(value: unknown): value is SchemaObject {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
