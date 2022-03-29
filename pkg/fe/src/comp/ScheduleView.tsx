import { EventDate, Schedule, User } from "@mpaulweeks/cat-shared";
import { useCallback, useEffect, useState } from "react";
import { API } from "../lib/api";
import { createSchedule } from "../lib/schedule";
import { ScheduleTable } from "./ScheduleTable";

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

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!schedule) {
    return <h1>loading...</h1>;
  }

  return (
    <ScheduleTable
      schedule={schedule}
      onSave={user => onSave(user)}
    />
  )
}
