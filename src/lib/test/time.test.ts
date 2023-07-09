import { expect, test } from 'vitest';
import { EventDate } from "../eventDate";

test('dateIso', () => {
  const ed = EventDate.now();
  expect(ed.dateIso).toBe(ed.date.toISOString());
  expect(ed.equals(EventDate.fromIso(ed.dateIso))).toBe(true);
});

test('dateStr', () => {
  const ed = EventDate.fromIso('2022-03-29T17:45:51.007Z');
  expect(ed.dateStr).toBe('20220329');
});
