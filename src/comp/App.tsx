import { ScheduleView } from "./ScheduleView";
import { EventApi, EventLookup, parseQueryParams } from '../lib';
import React, { useMemo, useState } from "react";
import { GroupView } from "./GroupView";
import { WelcomeView } from "./WelcomeView";
import { AdminView } from "./AdminView";
import { ErrorsOverlay } from "./ErrorsOverlay";
import { ErrorsProvider } from "./ErrorsContext";

const AppSwitcher = React.memo((props: {
  initialEventLookup: Partial<EventLookup>;
}) => {
  const [eventLookup, setEventLookup] = useState(props.initialEventLookup);
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
});

export function App() {
  const initialEventLookup = useMemo(() => parseQueryParams(window.location.search), []);

  return (
    <ErrorsProvider>
      <AppSwitcher initialEventLookup={initialEventLookup} />
      <ErrorsOverlay />
    </ErrorsProvider>
  );
}
