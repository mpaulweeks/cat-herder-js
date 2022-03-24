import { getThisWeek } from "../lib/time";
import { AttendenceOrder, EventTime, Schedule } from "../lib/types"
import { ScheduleTable } from "./ScheduleTable";

export function App(props: {}) {
  // todo get from api
  const week = getThisWeek(new Date(), {
    hours: 18,
    minutes: 0,
    seconds: 0,
  });
  const events: EventTime[] = week.map(d => ({
    eid: d.getTime().toString(),
    start: d,
    durationHours: 4,
  }));
  const data: Schedule = {
    events,
    users: [{
      uid: '123',
      name: 'Bob',
      events: events.map((et, ei) => ({
        event: et.eid,
        status: AttendenceOrder[ei % AttendenceOrder.length],
      })),
      created: new Date(),
      updated: new Date(),
    }],
  };
  return (
    <ScheduleTable
      data={data}
      onEdit={() => { }}
      onSave={() => { }}
      onCancel={() => { }}
    />
  )
}
