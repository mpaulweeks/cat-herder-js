import { google } from 'calendar-link';
import { EventOptionData, EventScheduleData } from '.';

export function createGcal(args: {
  schedule: EventScheduleData;
  option: EventOptionData;
  guests: string[];
}) {
  return google({
    title: args.schedule.name,
    description: args.schedule.description,
    start: args.option.isoStart,
    duration: [args.option.durationHours, "hour"],
    guests: args.guests,
  });
}
