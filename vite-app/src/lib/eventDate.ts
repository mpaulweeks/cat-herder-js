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
    readonly date: Date,
    readonly dateStr: string,
    readonly timeZone: string,
  ) {}

  get dateIso(): string {
    return this.date.toISOString();
  }
  get localPretty(): string {
    return this.date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }
  get localData(): LocalData {
    return {
      year: Number(this.dateStr.slice(0, 4)),
      month: Number(this.dateStr.slice(4, 6)),
      day: Number(this.dateStr.slice(6, 8)),
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
    return EventDate.fromDate(newDate, this.timeZone);
  }
  getDateAtHour(args: TimeArgs): EventDate {
    const newDate = ZoneDate.from(
      this.timeZone,
      this.localData.year,
      this.localData.month,
      this.localData.day,
      args.hours,
      args.minutes,
    ).date;
    return EventDate.fromDate(newDate, this.timeZone);
  }

  equals(other: EventDate) {
    return (
      this.date.getTime() === other.date.getTime() &&
      this.dateIso === other.dateIso &&
      this.dateStr === other.dateStr
    );
  }

  static now(timeZone: string) {
    return this.fromDate(new Date(), timeZone);
  }
  static fromDate(date: Date, timeZone: string) {
    const dateStr = [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ].join('');
    return new EventDate(date, dateStr, timeZone);
  }
  static fromIso(dateIso: string, timeZone: string) {
    return this.fromDate(new Date(dateIso), timeZone);
  }
  static fromStr(dateStr: string, timeZone: string) {
    const yyyy = Number(dateStr.slice(0, 4));
    const mm = Number(dateStr.slice(4, 6));
    const dd = Number(dateStr.slice(6, 8));
    const date = ZoneDate.from(timeZone, yyyy, mm, dd, 12, 0).date;
    date.setFullYear(yyyy, mm - 1, dd);
    return new EventDate(date, dateStr, timeZone);
  }
  static fromEventID(dateStr: string, timeZone: string) {
    return this.fromStr(dateStr, timeZone);
  }
}
