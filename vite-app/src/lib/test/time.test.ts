import { expect, test } from 'vitest';
import { EventDate } from '../eventDate';
import { ZoneDate } from '../zoneDate';

test('dateIso', () => {
  const ed = EventDate.now(ZoneDate.Default);
  expect(ed.dateIso).toBe(ed.date.toISOString());
  expect(ed.equals(EventDate.fromIso(ed.dateIso, ZoneDate.Default))).toBe(true);
});

test('dateStr', () => {
  const ed = EventDate.fromIso('2022-03-29T17:45:51.007Z', ZoneDate.Default);
  expect(ed.dateStr).toBe('20220329');
});
