import { EventDate, range, Schedule } from "@mpaulweeks/cat-shared";

export function createSchedule(args?: {
  group: string;
  dateStr: string;
}): Schedule {
  const group = args?.group ?? 'edh';
  const ed = args?.dateStr ? EventDate.fromStr(args.dateStr) : EventDate.now();
  return scheduleByGroup(group, ed);
}

export function scheduleByGroup(group: string, ed: EventDate): Schedule {
  if (group === 'edh') {
    const events = range(7).map(i => {
      const newDate = new Date(ed.date);
      newDate.setDate(newDate.getDate() + i);
      const newEd = EventDate.fromDate(newDate);
      return newEd.getDateAtHour({
        hours: 18,
        minutes: 0,
      });
    }).map(date => ({
      eid: date.getTime().toString(),
      start: date,
      durationHours: 4,
    }));
    return {
      sid: ed.dateStr,
      name: 'EDH',
      description: '',
      events,
      users: [],
    }
  }
  // else
  throw new Error('unsupported group');
}
