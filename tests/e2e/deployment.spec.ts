import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import cloudflareConfig from '../../cloudflare.config';

const packagedWorker = '.cloudflare/output/v0/workers/default';

const filesIn = (directory: string) =>
  readdirSync(directory, { recursive: true, encoding: 'utf8' })
    .filter(file => statSync(join(directory, file)).isFile())
    .sort();

test('the deployment package preserves the Worker settings', () => {
  const config: unknown = JSON.parse(
    readFileSync(join(packagedWorker, 'worker.config.json'), 'utf8')
  );
  expect(config).toEqual(cloudflareConfig.worker);
});

test('the deployment package contains exactly the browser-tested assets', () => {
  const assets = join(packagedWorker, 'assets');
  const files = filesIn('dist');
  expect(filesIn(assets)).toEqual(files);
  for (const file of files) {
    expect(
      Buffer.compare(
        readFileSync(join('dist', file)),
        readFileSync(join(assets, file))
      ),
      file
    ).toBe(0);
  }
});
