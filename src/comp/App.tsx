import { ScheduleView } from "./ScheduleView";
import { EventApi, EventLookup, parseQueryParams } from '../lib';
import React, { useCallback, useMemo, useState } from "react";
import { GroupView } from "./GroupView";
import { WelcomeView } from "./WelcomeView";
import { AdminView } from "./AdminView";
import { ErrorsOverlay } from "./ErrorsOverlay";
import { ErrorMessage, ErrorNotification, ErrorReportContext, ErrorReporter, ErrorsApi, ErrorsApiContext, useErrorsProvider } from "./ErrorsContext";

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
  const [errors, setErrors] = useState<ErrorNotification[]>([]);
  const reportError = useCallback((err: ErrorMessage) => {
    setErrors(old => old.concat({
      created: Date.now(),
      message: err,
    }));
  }, [setErrors]);
  const remove = useCallback((err: ErrorNotification) => {
    setErrors(old => old.filter(elm => elm.created != err.created));
  }, [setErrors]);

  const reporter: ErrorReporter = useMemo<ErrorReporter>(
    () => ({ reportError }),
    [reportError]
  );
  const api: ErrorsApi = { reportError, errors, remove };

  return (
    <>
      <ErrorReportContext.Provider value={reporter}>
        <ErrorsApiContext.Provider value={api}>
          <AppSwitcher initialEventLookup={initialEventLookup} />
          <ErrorsOverlay />
        </ErrorsApiContext.Provider>
      </ErrorReportContext.Provider>
    </>
  );

  // const {
  //   ErrorReporterProvider,
  //   ErrorsApiProvider,
  // } = useErrorsProvider();
  // return (
  //   <>
  //     <ErrorReporterProvider>
  //       <AppSwitcher />
  //     </ErrorReporterProvider>
  //     <ErrorsApiProvider>
  //       <ErrorsOverlay />
  //     </ErrorsApiProvider>
  //   </>
  // );
}
