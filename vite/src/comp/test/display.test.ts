import { EventDate } from "@mpaulweeks/cat-shared";
import { getDateStrings } from "../display";

describe('display.ts', () => {
  test('getDateStrings', () => {
    const times = getDateStrings(EventDate.now());
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
});
