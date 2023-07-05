import { createGcal } from "./display";
import { EventScheduleData, EventDate, EventOptionData, getDateStrings } from "../lib";

export function ScheduleDate(props: {
  schedule: EventScheduleData;
  option: EventOptionData;
}) {
  const eventDate = EventDate.fromIso(props.option.isoStart);
  const gcal = createGcal(props.schedule, props.option);
  const {dayOfWeek, dd, mm, time} = getDateStrings(eventDate);
  return (
    <a href={gcal}>
      <div>
        <div>
          {dayOfWeek}
        </div>
        <div>
          {mm}/{dd}
        </div>
        <div>
          {time}
        </div>
      </div>
    </a>
  );
}
