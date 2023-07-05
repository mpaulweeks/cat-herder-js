import { getDateStrings } from "./dates";
import { EventDate } from "./time";
import { EventLookup, EventOptionData, EventScheduleData, UserData } from "./types";
import { range } from './util';

export function emptyUser(): UserData {
  return {
    // will be overridden
    created: 0,
    uid: '0',

    // empty
    label: 'todo',
    attending: [],
    maybe: [],
  }
}

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
        highlight: false,
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
