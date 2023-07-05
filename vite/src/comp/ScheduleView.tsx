import { useEffect, useState } from "react";
import { ScheduleTable } from "./ScheduleTable";
import { CssClass } from './display';
import { EventApi, EventScheduleData } from "../lib";

export function ScheduleView(props: {
  api: EventApi;
}) {
  const [schedule, setSchedule] = useState<EventScheduleData | undefined>();

  useEffect(() => {
    const promise = props.api.connect(ed => setSchedule(ed));
    return () => { promise.then(unsub => unsub()) };
  }, [props]);

  return (
    <div className={CssClass.Schedule}>
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
