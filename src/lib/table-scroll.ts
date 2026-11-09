import type { tableScroll } from '@cloudflare/nimbus-docs/markdown';

type Node = {
  type: string;
  tagName?: string;
  value?: string;
  children?: Node[];
};

const textOf = (node: Node): string =>
  node.type === 'text'
    ? (node.value ?? '')
    : (node.children ?? []).map(textOf).join('');

const findAll = (node: Node, tagName: string): Node[] =>
  (node.children ?? []).flatMap(child =>
    child.tagName === tagName ? [child] : findAll(child, tagName)
  );

const tableLabel = (children: Node[]): string => {
  const headers = findAll({ type: 'root', children }, 'th')
    .map(cell => textOf(cell).trim())
    .filter(Boolean);
  return headers.length ? `Table: ${headers.join(', ')}` : 'Table';
};

export const keyboardTableScroll = (): ReturnType<typeof tableScroll> => ({
  name: 'contribute:table-scroll',
  element: {
    filter: ['table'],
    visit({ properties, children }) {
      if (properties.className) return;
      return {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['nb-table-scroll'],
          tabIndex: 0,
          role: 'region',
          ariaLabel: tableLabel(children)
        },
        children: [
          {
            type: 'element',
            tagName: 'table',
            properties: { ...properties },
            children
          }
        ]
      };
    }
  }
});
