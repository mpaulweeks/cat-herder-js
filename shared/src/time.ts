interface TimeArgs {
  hours: number;
  minutes: number;
}

export class EventDate {
  private constructor(
    private readonly _date: Date,
    private readonly _dateStr: string,
  ) {}

  get date(): Date { return this._date; }
  get dateStr(): string { return this._dateStr; }

  isMonday() {
    return 'Monday' === this.date.toLocaleDateString('en-US', { weekday: 'long' });
  }
  getPreviousMonday() {
    const newDate = new Date(this.date);
    newDate.setDate(this.date.getDate() - (this.date.getDay() + 6) % 7);
    return newDate;
  }
  getDateAtHour(args: TimeArgs) {
    const newDate = new Date(this.date);
    args.hours !== undefined && newDate.setHours(args.hours);
    args.minutes !== undefined && newDate.setMinutes(args.minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }

  static now() {
    return this.fromDate(new Date());
  }
  static fromDate(date: Date) {
    const dateStr = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('');;
    return new EventDate(date, dateStr);
  }
  static fromStr(dateStr: string) {
    const yyyy = Number(dateStr.slice(0, 4));
    const mm = Number(dateStr.slice(4, 6));
    const dd = Number(dateStr.slice(6, 8));
    const date = new Date();
    date.setFullYear(yyyy, mm - 1, dd);
    return new EventDate(date, dateStr);
  }
}
