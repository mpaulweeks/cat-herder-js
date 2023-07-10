import { useEffect, useState } from "react";
import { ScheduleTable } from "./ScheduleTable";
import { EventApi, EventDate, EventLookup, EventScheduleData, generateUrl } from "../lib";
import styles from './Schedule.module.css';
import { SmartLink } from "./SmartLink";
import { useTitle } from "../hooks/useTitle";

export function ScheduleView(props: {
  api: EventApi;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const [schedule, setSchedule] = useState<EventScheduleData | undefined>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).schedule = schedule;

  useTitle(schedule?.name);
  useEffect(() => {
    const promise = props.api.connect(ed => setSchedule(ed));
    return () => { promise.then(unsub => unsub()) };
  }, [props]);

  const parentLookup: Partial<EventLookup> = {
    group: props.api.init.group,
  };

  return (
    <div className={styles.ScheduleView}>
      {schedule === undefined ? <h1>loading...</h1> : (
        <>
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
          <ScheduleTable
            schedule={schedule}
            api={props.api}
          />
        </>
      )}
    </div>
  );
}
