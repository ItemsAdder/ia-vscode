import * as ts from 'typescript';
import { JavaDocResolver } from './javaDocResolver';

interface ValidationError {
  message: string;
  line: number;
  column: number;
  severity?: 'error' | 'warning';
}

const DEFAULT_TYPES = [
  "void",
  "byte",
  "Byte",
  "int",
  "Integer",
  "float",
  "Float",
  "double",
  "Double",
  "long",
  "Long",
  "boolean",
  "Boolean",
  "char",
  "Object",
  "String"
];

export function validate(code: string): ValidationError[] {
  const errors: ValidationError[] = [];
  validateManually(code, errors);
  const cleanedCode = preprocessJavaLikeCode(code);
  validateWithTypeScript(cleanedCode, errors);
  return errors;
}

export function validateWithTypeScript(code: string, errors: ValidationError[]) {
  const fileName = 'fakefile.js';

  const compilerOptions: ts.CompilerOptions = {
    allowJs: true,
    noEmit: true,
    target: ts.ScriptTarget.Latest
  };

  const host = ts.createCompilerHost(compilerOptions);

  // Override getSourceFile to return our in-memory code
  host.getSourceFile = (fileNameParam, languageVersion) => {
    if (fileNameParam === fileName) {
      return ts.createSourceFile(fileName, code, languageVersion, true, ts.ScriptKind.JS);
    }
    return undefined;
  };

  // Stub fileExists and readFile to match our fake file
  host.fileExists = (f) => f === fileName;
  host.readFile = (f) => (f === fileName ? code : undefined);

  const program = ts.createProgram([fileName], compilerOptions, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);

  for (const diagnostic of diagnostics) {
    if (!diagnostic.file || diagnostic.start === undefined) {
      continue;
    }

    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);

    errors.push({
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
      line: line + 1,
      column: character,
      severity: diagnostic.category === ts.DiagnosticCategory.Error ? 'error' : 'warning'
    });
  }
}

function extractImportedTypes(code: string): string[] {
  const importedTypes: string[] = [];
  const importRegex = /^import\s+"(.+?)"(;|)/gm;

  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const path = match[1];
    const parts = path.split(".");
    const className = parts[parts.length - 1];
    if (/^[A-Z]/.test(className)) {
      importedTypes.push(className);
    }
  }

  return importedTypes;
}

function preprocessJavaLikeCode(code: string): string {
  const types = extractImportedTypes(code);
  const javaDocDefaultImports = JavaDocResolver.defaultImports?.map(importPath => importPath.split('.').pop() || '') || [];
  const typesPattern = types.length > 0
    ? types.map(t => escapeRegex(t)).join("|") + "|" + javaDocDefaultImports.map(t => escapeRegex(t)).join("|") + "|" + DEFAULT_TYPES.map(t => escapeRegex(t)).join("|")
    : javaDocDefaultImports.map(t => escapeRegex(t)).join("|") + "|" + DEFAULT_TYPES.map(t => escapeRegex(t)).join("|"); // fallback

  const declarationRegex = new RegExp(
    `\\b(${typesPattern})\\b\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*=`,
    "g"
  );

  const castRegex = new RegExp(
    `\\((${typesPattern})\\)\\s*`,
    "g"
  );

  const methodDeclarationRegex = new RegExp(
    `\\b(${typesPattern})\\b\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(`,
    "g"
  );

  const functionArgsRegex = new RegExp(
    `\\b(${typesPattern})\\b\\s+([a-zA-Z_][a-zA-Z0-9_]*)`,
    "g"
  );

  // Replace variable declarations
  code = code.replace(declarationRegex, "let $2 =");

  // Remove type casts
  code = code.replace(castRegex, "");

  // Replace method declarations with JavaScript-compatible syntax
  code = code.replace(methodDeclarationRegex, "function $2(");

  // Remove types from function arguments
  code = code.replace(functionArgsRegex, "$2");

  return code;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function validateManually(code: string, errors: ValidationError[] = []): void {
  // Custom validation rules
  const lines = code.split('\n');
  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Detect functions with untyped arguments
    const funcWithUntypedArgs = /^\s*[a-zA-Z_][a-zA-Z0-9_<>]*\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(([^)]*)\)/.exec(trimmed);
    if (funcWithUntypedArgs) {
      const args = funcWithUntypedArgs[1].split(',').map(arg => arg.trim()).filter(Boolean);
      console.log(`Function arguments: ${args}`); // Debugging output
      const untyped = args.filter(arg => !/^[a-zA-Z_][a-zA-Z0-9_<>]*\s+[a-zA-Z_][a-zA-Z0-9_]*$/.test(arg));
      if (untyped.length > 0) {
        errors.push({
          message: `Untyped parameter(s): ${untyped.join(', ')}`,
          line: i + 1,
          column: trimmed.indexOf('(') + 1,
          severity: 'warning'
        });
      }
    }

    // Ignore empty lines or blocks
    if (
      !trimmed ||
      trimmed.startsWith('//') ||
      trimmed.endsWith('{') ||
      trimmed.endsWith('}') ||
      trimmed.endsWith(';') ||
      trimmed.endsWith(',') ||
      trimmed.endsWith(')') // ex: delay(20, () => { ... })
    ) {
      return;
    }

    // This is a statement potentially requiring a `;` at the end
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*\(/.test(trimmed)) {
      errors.push({
        message: 'Missing semicolon at end of statement.',
        line: i + 1,
        column: trimmed.length,
        severity: 'warning'
      });
    }

    const garbageAfterBlockClose = /[\}\);\]]\s*[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(trimmed);
    if (garbageAfterBlockClose) {
      errors.push({
        message: 'Unexpected token after block or statement – did you forget a semicolon or line break?',
        line: i + 1,
        column: garbageAfterBlockClose.index + 1,
        severity: 'error'
      });
    }
  });
}

