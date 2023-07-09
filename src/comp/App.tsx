import { ScheduleView } from "./ScheduleView";
import { EventApi, parseQueryParams } from '../lib';
import { useState } from "react";

export function App() {
  const [eventLookup, setEventLookup] = useState(parseQueryParams(window.location.search));

  if (eventLookup.category && eventLookup.eventID) {
    const api = new EventApi({ category: eventLookup.category, eventID: eventLookup.eventID, });
    return (
      <ScheduleView api={api} />
    );
  }
  // if (eventLookup.category) {
  //   return <CategoryView category={category} />;
  // }
  // // else
  // return <BrowserView />;
  return 'todo';
}
