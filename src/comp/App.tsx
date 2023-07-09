import { ScheduleView } from "./ScheduleView";
import { EventApi, parseQueryParams } from '../lib';
import { useState } from "react";
import { GroupView } from "./GroupView";
import { WelcomeView } from "./WelcomeView";
import { AdminView } from "./AdminView";
import { ErrorsProvider } from "./ErrorsContext";
import { ErrorsOverlay } from "./ErrorsOverlay";

function AppSwitcher() {
  const [eventLookup, setEventLookup] = useState(parseQueryParams(window.location.search));
  const { group, eventID } = eventLookup;

  if (group === 'admin') {
    return <AdminView setEventLookup={setEventLookup} />
  }

  if (group && eventID) {
    const api = new EventApi({ group, eventID, });
    return <ScheduleView api={api} setEventLookup={setEventLookup} />;
  }

  if (group) {
    return <GroupView group={group} setEventLookup={setEventLookup} />;
  }

  // // else
  return <WelcomeView setEventLookup={setEventLookup} />
}

export function App() {
  return (
    <ErrorsProvider>
      <AppSwitcher />
      <ErrorsOverlay />
    </ErrorsProvider>
  );
}
