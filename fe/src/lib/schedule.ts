import { DraftSchedule, EventDate, EventTime, range } from "@mpaulweeks/cat-shared";

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
    const events = range(7).map<EventTime>(i => {
      const newDate = new Date(monday.date);
      newDate.setDate(newDate.getDate() + i);
      const newEd = EventDate.fromDate(newDate).getDateAtHour({
        hours: 18,
        minutes: 0,
      });
      return {
        eid: newEd.date.getTime().toString(),
        startIso: newEd.dateIso,
        durationHours: 4,
      };
    });
    return {
      name: 'EDH',
      description: 'test group',
      events,
    }
  }
  // else
  throw new Error('unsupported group');
}
