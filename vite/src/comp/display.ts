import { google } from 'calendar-link';
import { EventDate, EventTime, Schedule } from "../shared";

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

export const CssClass = {
  Schedule: 'Schedule',
  EventTime: 'EventTime',
  Update: 'Update',
  Attendence: 'Attendence',
  Clickable: 'Clickable',
}

export function createGcal(schedule: Schedule, et: EventTime) {
  return google({
    title: schedule.name,
    description: schedule.description,
    start: et.startIso,
    duration: [et.durationHours, "hour"],
  });
}
