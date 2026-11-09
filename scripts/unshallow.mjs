import { execFileSync } from 'node:child_process';

const isShallow = () => {
  try {
    const output = execFileSync(
      'git',
      ['rev-parse', '--is-shallow-repository'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
    return output.trim() === 'true';
  } catch {
    return false;
  }
};

if (isShallow()) {
  execFileSync('git', ['fetch', '--unshallow'], { stdio: 'inherit' });
}
