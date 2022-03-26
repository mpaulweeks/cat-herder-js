import { EventDate } from "@mpaulweeks/cat-shared";

export function createSchedule(args?: {
  group: string;
  dateStr: string;
}) {
  const group = args?.group ?? 'edh';
  const dateStr = args?.dateStr ?? getPreviousMonday(new Date());
}

export function eventsByGroup(group: string, ed: EventDate) {
  if (group === 'edh') {

    return getThisWeek(date, {
      hours: 18,
      minutes: 0,
      seconds: 0,
    }).map(d => ({
      eid: d.getTime().toString(),
      start: d,
      durationHours: 4,
    }));
  }
  // else
  throw new Error('unsupported group');
}
