import { expect, test } from 'vitest';
import { EventLookup } from '../types';
import { generateUrl, parseUrl } from '../url';

test('parseUrl', () => {
  expect(parseUrl('http://example.com/?foo=bar'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseUrl('http://example.com/?group=example'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
    });
  expect(parseUrl('http://example.com/?event=20230101'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseUrl('http://example.com/?group=example&event=20230101'))
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
