import { expect, test } from 'vitest';
import { EventLookup } from '../types';
import { generatePathUrl, generateQueryUrl, parseUrl } from '../url';

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

  expect(parseUrl('http://example.com/'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseUrl('http://example.com/example/'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
    });
  expect(parseUrl('http://example.com/example/20230101'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
      eventID: '20230101',
    });

  expect(parseUrl('http://example.com/#'))
    .toEqual<Partial<EventLookup>>({});
  expect(parseUrl('http://example.com/#/example/'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
    });
  expect(parseUrl('http://example.com/#/example/20230101'))
    .toEqual<Partial<EventLookup>>({
      group: 'example',
      eventID: '20230101',
    });
});

test('generatePathUrl', () => {
  expect(generatePathUrl({}))
    .toBe('/');
  expect(generatePathUrl({
    group: 'example',
  })).toBe('/example');
  expect(generatePathUrl({
    eventID: '20230101',
  })).toBe('/');
  expect(generatePathUrl({
    group: 'example',
    eventID: '20230101',
  })).toBe('/example/20230101');
});

test('generateQueryUrl', () => {
  expect(generateQueryUrl({}))
    .toBe('./?');
  expect(generateQueryUrl({
    group: 'example',
  })).toBe('./?group=example');
  expect(generateQueryUrl({
    eventID: '20230101',
  })).toBe('./?');
  expect(generateQueryUrl({
    group: 'example',
    eventID: '20230101',
  })).toBe('./?group=example&event=20230101');
});
