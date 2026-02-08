import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type TabGroup = { syncKey: string; labels: string[] };

function extractTabGroups(source: string): TabGroup[] {
  const groups: TabGroup[] = [];
  const tabsRegex = /<Tabs\s+syncKey=["']([^"']+)["']>([\s\S]*?)<\/Tabs>/g;
  const labelRegex = /<TabItem\s+[^>]*label=["']([^"']+)["']/g;

  let tabsMatch: RegExpExecArray | null;
  while ((tabsMatch = tabsRegex.exec(source)) !== null) {
    const [, syncKey, body] = tabsMatch;
    const labels: string[] = [];
    let labelMatch: RegExpExecArray | null;
    while ((labelMatch = labelRegex.exec(body)) !== null) {
      labels.push(labelMatch[1]);
    }
    groups.push({ syncKey, labels });
  }
  return groups;
}

describe('MDX Tab syncKey contract', () => {
  const docs = [
    'src/content/docs/how-to-setup-freecodecamp-locally.mdx',
    'src/content/docs/how-to-add-playwright-tests.mdx'
  ];

  for (const relPath of docs) {
    describe(relPath, () => {
      const absPath = resolve(process.cwd(), relPath);
      const source = readFileSync(absPath, 'utf8');
      const groups = extractTabGroups(source);

      it('all <Tabs> blocks sharing a syncKey use identical label sets', () => {
        const bySyncKey = new Map<string, string[][]>();
        for (const { syncKey, labels } of groups) {
          const list = bySyncKey.get(syncKey) ?? [];
          list.push(labels);
          bySyncKey.set(syncKey, list);
        }

        for (const [syncKey, labelSets] of bySyncKey) {
          if (labelSets.length < 2) continue;
          const sorted = labelSets.map(l => [...l].sort());
          const first = sorted[0];
          for (const other of sorted.slice(1)) {
            expect(other, `syncKey="${syncKey}" label mismatch`).toEqual(first);
          }
        }
      });

      it('no TabItem header has a trailing empty "Option N:" label', () => {
        expect(source).not.toMatch(/^####\s+Option\s+\d+:\s*$/m);
      });

      it('every syncKey="environment" Tabs block lists Local Machine first', () => {
        const envGroups = groups.filter(g => g.syncKey === 'environment');
        for (const { labels } of envGroups) {
          expect(labels[0]).toBe('Local Machine (Recommended)');
        }
      });
    });
  }
});
