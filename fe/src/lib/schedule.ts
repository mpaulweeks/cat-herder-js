import { DraftSchedule, EventDate, range } from "@mpaulweeks/cat-shared";

export function createSchedule(args: {
  group: string;
  dateStr?: string;
}) {
  const ed = args?.dateStr ? EventDate.fromStr(args.dateStr) : EventDate.now();
  return scheduleByGroup(args.group, ed);
}

export function scheduleByGroup(group: string, ed: EventDate): DraftSchedule {
  if (group === 'edh') {
    const monday = ed.getPreviousMonday();
    const events = range(7).map(i => {
      const newDate = new Date(monday.date);
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
      name: 'EDH',
      description: 'test group',
      events,
    }
  }
  // else
  throw new Error('unsupported group');
}
