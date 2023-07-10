import { ScheduleView } from "./ScheduleView";
import { EventApi, EventLookup, generateUrl, parseUrl } from '../lib';
import React, { useEffect, useMemo, useState } from "react";
import { GroupView } from "./GroupView";
import { WelcomeView } from "./WelcomeView";
import { AdminView } from "./AdminView";
import { ErrorsOverlay } from "./ErrorsOverlay";
import { ErrorsProvider } from "../hooks/ErrorsProvider";

// thanks to this guide for clarifying memo and rendering for me
// https://www.joshwcomeau.com/react/why-react-re-renders/#what-about-context-4
const AppSwitcher = React.memo((props: {
  initialEventLookup: Partial<EventLookup>;
}) => {
  const [eventLookup, setEventLookup] = useState(props.initialEventLookup);
  useEffect(() => {
    window.history.pushState(null, '', generateUrl(eventLookup));
  }, [eventLookup]);

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

  // else
  return <WelcomeView setEventLookup={setEventLookup} />
});

export function App() {
  const initialEventLookup = useMemo(() => parseUrl(window.location.href), []);

  return (
    <ErrorsProvider>
      <AppSwitcher initialEventLookup={initialEventLookup} />
      <ErrorsOverlay />
    </ErrorsProvider>
  );
}
