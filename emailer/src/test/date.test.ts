import { getEventID } from "../date";

describe('date', () => {
  test('getEventID', () => {
    expect(getEventID(new Date('2023-07-13T20:57:53.743Z'))).toBe('20230713');
  });
});
