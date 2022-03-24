import { range } from "./util";

export interface TimeArgs {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export function getPreviousMonday(date: Date) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - (date.getDay() + 6) % 7);
  return newDate;
}

export function getDateAtHour(date: Date, args: TimeArgs) {
  const newDate = new Date(date);
  args.hours !== undefined && newDate.setHours(args.hours);
  args.minutes !== undefined && newDate.setMinutes(args.minutes);
  args.seconds !== undefined && newDate.setSeconds(args.seconds);
  newDate.setMilliseconds(0);
  return newDate;
}

export function getThisWeek(date: Date, args: TimeArgs) {
  const monday = getPreviousMonday(getDateAtHour(date, args));
  return range(7).map(i => {
    const newDate = new Date(monday);
    newDate.setDate(newDate.getDate() + i);
    return newDate;
  });
}
