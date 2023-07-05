import { getDateStrings } from "../comp/display";
import { EventDate } from "./time";
import { EventLookup, EventOptionData, EventScheduleData } from "./types";
import { range } from './util';

export function createSchedule(init: EventLookup): EventScheduleData {
  const ed = EventDate.fromStr(init.eventID);
  if (init.category === 'edh') {
    const monday = ed.getPreviousMonday();
    const options: EventOptionData[] = range(7).map(i => {
      const newDate = new Date(monday.date);
      newDate.setDate(newDate.getDate() + i);
      const newEd = EventDate.fromDate(newDate).getDateAtHour({
        hours: 18,
        minutes: 0,
      });
      return {
        label: newEd.date.getTime().toString(),
        isoStart: newEd.dateIso,
        durationHours: 4,
      };
    });
    const { day, month, yyyy } = getDateStrings(monday);
    return {
      name: 'EDH',
      description: `Week of ${month} ${day}, ${yyyy}`,
      options,
      user: {},
    }
  }
  // else
  throw new Error('unsupported group');
}
