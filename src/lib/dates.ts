import { EventDate } from "./time";

export function getDateStrings(ed: EventDate) {
  const { date } = ed;
  return {
    time: date.toLocaleString('en-US', { hour: 'numeric', hour12: true }),
    dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: date.toLocaleString('default', { month: 'long' }),
    day: (date.getDate()).toString(),
    yyyy: date.getFullYear().toString(),
    mm: (date.getMonth() + 1).toString().padStart(2, '0'),
    dd: (date.getDate()).toString().padStart(2, '0'),
  };
}
