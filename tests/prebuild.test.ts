import { execFileSync, spawnSync } from 'node:child_process';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const { scripts } = JSON.parse(readFileSync('package.json', 'utf8')) as {
  scripts: Record<string, string>;
};

const env = { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null' };

const git = (cwd: string, ...args: string[]) =>
  execFileSync('git', args, { cwd, env, encoding: 'utf8' }).trim();

const script = resolve('scripts/unshallow.mjs');

const prebuild = (cwd: string, extraEnv = {}) =>
  spawnSync(process.execPath, [script], {
    cwd,
    env: { ...env, ...extraEnv }
  }).status;

describe('prebuild', () => {
  let root: string;
  let source: string;

  beforeAll(() => {
    root = mkdtempSync(join(tmpdir(), 'prebuild-'));
    source = join(root, 'source');
    mkdirSync(source);
    git(source, 'init', '-q');
    for (const message of ['first', 'second']) {
      writeFileSync(join(source, 'page.md'), message);
      git(source, 'add', '.');
      git(
        source,
        '-c',
        'user.name=test',
        '-c',
        'user.email=test@example.com',
        'commit',
        '-qm',
        message
      );
    }
  });

  afterAll(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('fetches the full history in a shallow clone', () => {
    const clone = join(root, 'shallow');
    git(root, 'clone', '-q', '--depth', '1', `file://${source}`, clone);
    expect(git(clone, 'rev-parse', '--is-shallow-repository')).toBe('true');

    expect(prebuild(clone)).toBe(0);

    expect(git(clone, 'rev-parse', '--is-shallow-repository')).toBe('false');
    expect(git(clone, 'rev-list', '--count', 'HEAD')).toBe('2');
  });

  it('runs before every build', () => {
    expect(scripts.prebuild).toBe('node scripts/unshallow.mjs');
  });

  it('fails the build when the history cannot be fetched', () => {
    const clone = join(root, 'unreachable');
    git(root, 'clone', '-q', '--depth', '1', `file://${source}`, clone);
    git(clone, 'remote', 'set-url', 'origin', `file://${root}/missing`);

    expect(prebuild(clone)).not.toBe(0);
  });

  it('does not fetch in a full clone', () => {
    const clone = join(root, 'full');
    const trace = join(root, 'trace.log');
    git(root, 'clone', '-q', `file://${source}`, clone);

    expect(prebuild(clone, { GIT_TRACE: trace })).toBe(0);

    expect(readFileSync(trace, 'utf8')).not.toContain('fetch');
  });

  it('does nothing outside a git repository', () => {
    const folder = join(root, 'export');
    mkdirSync(folder);
    expect(prebuild(folder)).toBe(0);
  });
});
