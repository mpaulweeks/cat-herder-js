import { EventDate, Schedule, User } from "@mpaulweeks/cat-shared";
import { useCallback, useEffect, useState } from "react";
import { API } from "../lib/api";
import { createSchedule } from "../lib/schedule";
import { ScheduleTable } from "./ScheduleTable";
import { CssClass } from './display';

export function ScheduleView(props: {
  group: string;
  dateStr: string;
}) {
  const [schedule, setSchedule] = useState<Schedule | undefined>();
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const existing = await API.get(props);
      if (existing) {
        return existing;
      }
      // else
      const draft = createSchedule(props);
      const eventDate = EventDate.fromIso(draft.events[0].startIso);
      return await API.create({
        group: props.group,
        dateStr: eventDate.dateStr,
        draft,
      });
    })()
      .then(schedule => setSchedule(schedule))
      .catch(err => {
        console.log(err);
        setError(err.toString())
      });
  }, [props]);

  const onSave = useCallback((user: User) => {
    (async () => {
      if (!schedule) { return; }
      return await API.update({
        group: schedule.group,
        dateStr: schedule.scheduleDate,
        user,
      });
    })()
      .then(schedule => setSchedule(schedule))
      .catch(err => {
        console.log(err);
        setError(err.toString())
      });
  }, [schedule, setSchedule]);

  return (
    <div className={CssClass.Schedule}>
      {error && <h2>{error}</h2>}
      {!error && !schedule && <h1>loading...</h1>}
      {!error && schedule && (
        <>
          <h1>{schedule.name}</h1>
          <h3>{schedule.description}</h3>
          <ScheduleTable
            schedule={schedule}
            onSave={user => onSave(user)}
          />
        </>
      )}
    </div>
  );
}
