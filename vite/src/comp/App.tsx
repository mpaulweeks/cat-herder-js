import './App.css';
import { EventDate } from "../shared";
import { ScheduleView } from "./ScheduleView";

export function App() {
  // todo derive from url
  const group = 'edh';
  const dateStr = EventDate.now().getPreviousMonday().dateStr;

  return (
    <ScheduleView
      group={group}
      dateStr={dateStr}
    />
  );
}
