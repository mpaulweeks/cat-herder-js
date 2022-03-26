import { ScheduleTable } from "./ScheduleTable";
import './App.css';
import { createSchedule } from "../lib/schedule";

export function App(props: {}) {
  // todo get from api
  const data = createSchedule();
  return (
    <ScheduleTable
      data={data}
      onEdit={() => { }}
      onSave={() => { }}
      onCancel={() => { }}
    />
  )
}
