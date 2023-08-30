import { expect, test } from 'vitest';
import { ZoneDate } from '../zoneDate';

test('different timezones equal', () => {
  const western = ZoneDate.from('America/Los_Angeles', 2000, 2, 4, 12, 0);
  const eastern = ZoneDate.from('America/New_York', 2000, 2, 4, 15, 0);
  expect(western.date.getTime()).toBe(eastern.date.getTime());
});

test('same timezones different', () => {
  const before = ZoneDate.from('America/New_York', 2000, 2, 4, 12, 0);
  const after = ZoneDate.from('America/New_York', 2000, 2, 4, 13, 15);
  expect(after.date.getTime()).toBe(
    before.date.getTime() + (60 + 15) * 60 * 1000,
  );
});
