import { useEffect, useState } from "react";
import { ScheduleDesktopTable } from "./ScheduleDesktopTable";
import { EventApi, EventDate, EventLookup, EventScheduleData, generateUrl } from "../lib";
import styles from './Schedule.module.css';
import { SmartLink } from "./SmartLink";
import { useTitle } from "../hooks/useTitle";
import { ScheduleMobileTable } from "./ScheduleMobileTable";
import { useKeyboardToggle } from "../hooks/useKeyboardToggle";
import { useEmails } from "../hooks/useEmails";

export function ScheduleView(props: {
  api: EventApi;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const { admin } = useKeyboardToggle('Backquote');
  const [schedule, setSchedule] = useState<EventScheduleData | undefined>();
  const emails = useEmails(props.api.init.group);

  useTitle(schedule?.name);
  useEffect(() => {
    const promise = props.api.connect(ed => setSchedule(ed));
    return () => { promise.then(unsub => unsub()) };
  }, [props]);

  const parentLookup: Partial<EventLookup> = {
    group: props.api.init.group,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).schedule = schedule;

  return (
    <div className={styles.ScheduleView}>
      {schedule === undefined ? <h1>loading...</h1> : (
        <>
          {admin && <h2 style={{ color: 'red', }}>ADMIN ENABLED</h2>}
          <h1>
            <SmartLink
              href={generateUrl(parentLookup)}
              onClick={() => props.setEventLookup(parentLookup)}
            >{schedule.name}</SmartLink>
          </h1>
          <h3>
            <div>{schedule.description}</div>
            <div style={{ color: '#444' }}>
              Today is {EventDate.now().datePretty}
            </div>
          </h3>
          <ScheduleDesktopTable
            schedule={schedule}
            api={props.api}
            admin={admin}
            emails={emails}
          />
          <ScheduleMobileTable
            schedule={schedule}
            api={props.api}
            emails={emails}
          />
        </>
      )}
    </div>
  );
}
