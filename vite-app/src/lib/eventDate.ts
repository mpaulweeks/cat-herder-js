import { ZoneDate } from './zoneDate';

interface TimeArgs {
  hours: number;
  minutes: number;
}
type LocalData = Readonly<{
  year: number;
  month: number;
  day: number;
}>;

export class EventDate {
  private constructor(
    private readonly _date: Date,
    private readonly _dateStr: string,
    private readonly _timeZone: string,
  ) {}

  get date(): Date {
    return this._date;
  }
  get dateIso(): string {
    return this._date.toISOString();
  }
  get dateStr(): string {
    return this._dateStr;
  }
  get datePretty(): string {
    return this._date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  get local(): LocalData {
    return {
      year: parseFloat(this._dateStr.substring(0, 4)),
      month: parseFloat(this._dateStr.substring(4, 6)),
      day: parseFloat(this._dateStr.substring(6, 8)),
    };
  }

  isMonday() {
    return (
      'Monday' === this.date.toLocaleDateString('en-US', { weekday: 'long' })
    );
  }
  getPreviousMonday(): EventDate {
    const newDate = new Date(this.date);
    newDate.setDate(this.date.getDate() - ((this.date.getDay() + 6) % 7));
    return EventDate.fromDate(newDate);
  }
  getDateAtHour(args: TimeArgs): EventDate {
    const newDate = ZoneDate.from(
      this._timeZone,
      this.local.year,
      this.local.month,
      this.local.day,
      args.hours,
      args.minutes,
    ).date;
    return EventDate.fromDate(newDate);
  }

  equals(other: EventDate) {
    return (
      this.date.getTime() === other.date.getTime() &&
      this.dateIso === other.dateIso &&
      this.dateStr === other.dateStr
    );
  }

  static defaultZone = ZoneDate.Eastern;
  static now() {
    return this.fromDate(new Date());
  }
  static fromDate(date: Date, timeZone = this.defaultZone) {
    const dateStr = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('');
    return new EventDate(date, dateStr, timeZone);
  }
  static fromIso(dateIso: string) {
    return this.fromDate(new Date(dateIso));
  }
  static fromStr(dateStr: string, timeZone = this.defaultZone) {
    const yyyy = Number(dateStr.slice(0, 4));
    const mm = Number(dateStr.slice(4, 6));
    const dd = Number(dateStr.slice(6, 8));
    const date = ZoneDate.from(timeZone, yyyy, mm, dd, 12, 0).date;
    date.setFullYear(yyyy, mm - 1, dd);
    return new EventDate(date, dateStr, timeZone);
  }
  static fromEventID(dateStr: string) {
    return this.fromStr(dateStr);
  }
}
