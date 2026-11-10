import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { ESLint } from 'eslint';

const require = createRequire(import.meta.url);
const oxlint = join(
  dirname(require.resolve('oxlint/package.json')),
  'bin/oxlint'
);

const lintTypeScript = (source: string) => {
  const directory = mkdtempSync(resolve('tests/.lint-'));
  const file = join(directory, 'fixture.ts');
  try {
    writeFileSync(file, source);
    const result = spawnSync(
      process.execPath,
      [oxlint, '--deny-warnings', file],
      {
        encoding: 'utf8'
      }
    );
    if (result.error) throw result.error;
    return { status: result.status, output: result.stdout + result.stderr };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
};

test('Oxlint rejects unhandled promises and unsafe assignments', () => {
  const result = lintTypeScript(
    'export const value = JSON.parse("{}");\nPromise.resolve(1);\n'
  );
  expect(result.status).toBe(1);
  expect(result.output).toContain('no-floating-promises');
  expect(result.output).toContain('no-unsafe-assignment');
});

test('Oxlint retains unused argument, rest sibling and type-only value checks', () => {
  const result = lintTypeScript(`
export function greet(name: string, unused: string) { return name; }
const source = { omitted: 1, kept: 2 };
const { omitted, ...rest } = source;
export { rest };
const typeOnly = 1;
export type Value = typeof typeOnly;
`);
  expect(result.status).toBe(1);
  expect(result.output).toContain('unused');
  expect(result.output).toContain('omitted');
  expect(result.output).toContain('only used as a type');
});

test('ESLint checks Astro templates with TypeScript but not standalone TypeScript', async () => {
  const eslint = new ESLint();
  expect(await eslint.calculateConfigForFile('src/lib/cn.ts')).toBeUndefined();
  const valid = await eslint.lintText(
    '---\nconst title: string = "Hello";\n---\n<h1>{title}</h1>\n',
    { filePath: 'src/components/LintFixture.astro' }
  );
  expect(valid[0].messages).toEqual([]);
  const invalid = await eslint.lintText(
    '<div set:html={"hello"}>child</div>\n',
    { filePath: 'src/components/LintFixture.astro' }
  );
  expect(invalid[0].messages.map(message => message.ruleId)).toContain(
    'astro/no-conflict-set-directives'
  );
});
