import { Attendence, Schedule } from "../lib/types"
import { ScheduleTable } from "./ScheduleTable";

export function App(props: {}) {
  // todo get from api
  const data: Schedule = {
    events: [{
      eid: 'a',
      start: new Date(),
      durationHours: 1,
    }, {
      eid: 'b',
      start: new Date(new Date().getTime() + 10000),
      durationHours: 1,
    }],
    users: [{
      uid: '123',
      name: 'Bob',
      events: [{
        event: 'a',
        status: Attendence.Maybe,
      }, {
        event: 'b',
        status: Attendence.Yes,
      }],
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
