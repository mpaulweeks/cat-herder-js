import { getThisWeek } from "../time";

describe('time.ts', () => {
  test('getWeek has 7 entries', () => {
    const week = getThisWeek(new Date(), {
      hours: 18,
      minutes: 0,
      seconds: 0,
    });
    expect(week.length).toBe(7);
  });
});
