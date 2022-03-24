import { getThisWeek, AttendenceOrder, EventTime, Schedule } from "@mpaulweeks/cat-shared"
import { ScheduleTable } from "./ScheduleTable";
import './App.css';

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
      uid: '1',
      name: 'Bob',
      events: events.map((et, ei) => ({
        event: et.eid,
        status: AttendenceOrder[ei % AttendenceOrder.length],
      })),
      created: new Date(),
      updated: new Date(),
    },{
      uid: '2',
      name: 'Alice',
      events: events.map((et, ei) => ({
        event: et.eid,
        status: AttendenceOrder[(ei + 1) % AttendenceOrder.length],
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
