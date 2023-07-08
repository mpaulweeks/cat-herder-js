import { ScheduleView } from "./ScheduleView";
import { EventApi, EventDate, EventLookup } from '../lib';

export function App() {
  // todo derive from url
  const eventLookup: EventLookup = {
    category: 'edh',
    eventID: EventDate.now().getPreviousMonday().dateStr,
  };
  const api = new EventApi(eventLookup);

  return (
    <ScheduleView api={api} />
  );
}
