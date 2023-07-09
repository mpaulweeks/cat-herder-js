import { ScheduleView } from "./ScheduleView";
import { EventApi, parseQueryParams } from '../lib';
import { useState } from "react";
import { CategoryView } from "./CategoryView";

export function App() {
  const [eventLookup, setEventLookup] = useState(parseQueryParams(window.location.search));
  const { category, eventID } = eventLookup;

  if (category && eventID) {
    const api = new EventApi({ category, eventID, });
    return (
      <ScheduleView api={api} />
    );
  }
  if (category) {
    return <CategoryView category={category} setLookup={setEventLookup} />;
  }
  // // else
  // return <BrowserView />;
  return 'todo';
}
