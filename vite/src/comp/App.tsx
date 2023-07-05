import './App.css';
import { EventDate } from "../shared";
import { ScheduleView } from "./ScheduleView";
import { EventLookup } from '../lib/newTypes';

export function App() {
  // todo derive from url
  const eventLookup: EventLookup = {
    category: 'edh',
    event: EventDate.now().getPreviousMonday().dateStr,
  };

  return (
    <ScheduleView eventLookup={eventLookup} />
  );
}
