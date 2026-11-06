import type { tableScroll } from '@cloudflare/nimbus-docs/markdown';

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
          ariaLabel: 'Table'
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
