import { expect, test } from 'vitest';
import { EventLookup } from '../types';
import { generateUrl, parseQueryParams } from '../url';

test('parseQueryParams', () => {
  expect(parseQueryParams('?foo=bar'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseQueryParams('?group=example'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
    });
  expect(parseQueryParams('?event=20230101'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseQueryParams('?group=example&event=20230101'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
      eventID: '20230101',
    });
});

test('generateUrl', () => {
  expect(generateUrl({}))
    .toBe('./?');
  expect(generateUrl({
    group: 'example',
  })).toBe('./?group=example');
  expect(generateUrl({
    eventID: '20230101',
  })).toBe('./?event=20230101');
  expect(generateUrl({
    group: 'example',
    eventID: '20230101',
  })).toBe('./?group=example&event=20230101');
});
