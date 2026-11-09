import { keyboardTableScroll } from '../src/lib/table-scroll';

const text = (value: string) => ({ type: 'text', value });
const cell = (tagName: string, value: string) => ({
  type: 'element',
  tagName,
  properties: {},
  children: [text(value)]
});

const labelOf = (children: unknown[]) => {
  const { visit } = keyboardTableScroll().element as unknown as {
    visit: (node: unknown) => { properties: { ariaLabel: string } };
  };
  return visit({
    type: 'element',
    tagName: 'table',
    properties: {},
    children
  }).properties.ariaLabel;
};

it('names a table by its caption', () => {
  expect(
    labelOf([cell('caption', 'Supported versions'), cell('th', 'Version')])
  ).toBe('Supported versions');
});

it('names a table without a caption by its headers', () => {
  expect(labelOf([cell('th', 'Version'), cell('th', 'Status')])).toBe(
    'Table: Version, Status'
  );
});
