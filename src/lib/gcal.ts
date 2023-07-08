import { google } from 'calendar-link';
import { EventOptionData, EventScheduleData } from '.';

export function createGcal(schedule: EventScheduleData, et: EventOptionData) {
  return google({
    title: schedule.name,
    description: schedule.description,
    start: et.isoStart,
    duration: [et.durationHours, "hour"],
  });
}
