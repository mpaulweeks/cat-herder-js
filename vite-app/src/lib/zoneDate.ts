export class ZoneDate {
  static readonly Default = 'America/New_York';
  static get Local() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  private constructor(readonly date: Date, readonly timeZone: string) {}

  // https://stackoverflow.com/a/57842203
  static from(
    timeZone: string,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
  ) {
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(
      date.toLocaleString('en-US', { timeZone: timeZone }),
    );
    const offset = utcDate.getTime() - tzDate.getTime();
    const shifted = new Date(date.getTime() + offset);
    return new ZoneDate(shifted, timeZone);
  }
}
