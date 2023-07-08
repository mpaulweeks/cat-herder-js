import { useEffect, useState } from "react";
import { ScheduleTable } from "./ScheduleTable";
import { EventApi, EventScheduleData } from "../lib";
import styles from './Schedule.module.css';

export function ScheduleView(props: {
  api: EventApi;
}) {
  const [schedule, setSchedule] = useState<EventScheduleData | undefined>();
  (window as any).schedule = schedule;

  useEffect(() => {
    const promise = props.api.connect(ed => setSchedule(ed));
    return () => { promise.then(unsub => unsub()) };
  }, [props]);

  return (
    <div className={styles.ScheduleView}>
      {schedule === undefined ? <h1>loading...</h1> : (
        <>
          <h1>{schedule.name}</h1>
          <h3>{schedule.description}</h3>
          <ScheduleTable
            schedule={schedule}
            api={props.api}
          />
        </>
      )}
    </div>
  );
}
