interface TableNode {
  properties?: { className?: unknown[] };
  children?: unknown[];
}

export const keyboardTableScroll = () => ({
  name: 'contribute:table-scroll',
  element: {
    filter: ['table'],
    visit({ properties, children }: TableNode) {
      if (properties?.className?.length) return;
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
            children: children ?? []
          }
        ]
      };
    }
  }
});
