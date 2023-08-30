import { expect, test } from 'vitest';
import { EventDate, getDateStrings } from '..';
import { ZoneDate } from '../zoneDate';

test('getDateStrings', () => {
  const times = getDateStrings(EventDate.now(ZoneDate.Default));
  expect(times.dd.length).toBe(2);
  expect(times.mm.length).toBe(2);
  expect(times.yyyy.length).toBe(4);
  expect([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]).toContain(times.dayOfWeek);
});
