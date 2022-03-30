import { EventDate } from "@mpaulweeks/cat-shared";

export function getDateStrings(ed: EventDate) {
  const { date } = ed;
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  const day = (date.getDate()).toString()
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = (date.getDate()).toString().padStart(2, '0');
  return { dayOfWeek, month, day, dd, mm, yyyy, };
}

export const CssClass = {
  Attendence: 'Attendence',
  Clickable: 'Clickable',
}
