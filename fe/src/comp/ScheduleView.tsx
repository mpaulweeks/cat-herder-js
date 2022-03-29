import { EventDate, Schedule } from "@mpaulweeks/cat-shared";
import { useEffect, useState } from "react";
import { API } from "../lib/api";
import { createSchedule } from "../lib/schedule";
import { ScheduleTable } from "./ScheduleTable";

export function ScheduleView(props: {
  group: string;
  dateStr: string;
}) {
  const [schedule, setSchedule] = useState<Schedule | undefined>();

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
    })().then(schedule => setSchedule(schedule));
  }, [props]);

  if (!schedule) {
    return <h1>loading...</h1>;
  }

  return (
    <ScheduleTable
      schedule={schedule}
      onEdit={() => { }}
      onSave={() => { }}
      onCancel={() => { }}
    />
  )
}
