import { getEventID, getNextMonday, getPrettyDate } from "../date";

describe('date', () => {
  test('getEventID', () => {
    expect(getEventID(new Date('2023-07-13T20:57:53.743Z')))
      .toBe('20230713');
  });

  test('getPrettyDate', () => {
    expect(getPrettyDate(new Date('2023-07-13T20:57:53.743Z')))
      .toBe('July 13, 2023');
  });

  test('getNextMonday', () => {
    expect(getNextMonday(new Date('2023-07-13T20:57:53.743Z')))
      .toStrictEqual(new Date('2023-07-17T20:57:53.743Z'));
  });
});
