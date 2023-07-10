import { useEffect } from "react";
import { createGcal, EventScheduleData, EventDate, EventOptionData, getDateStrings } from "../lib";

function ScheduleDateSummary(props: {
  eventDate: EventDate;
  shorten?: boolean;
}) {
  const {dayOfWeek, dayOfWeekAbbr, dd, mm, time} = getDateStrings(props.eventDate);
  return (
    <div>
      <div>
        {props.shorten ? dayOfWeekAbbr : dayOfWeek}
      </div>
      <div>
        {mm}/{dd}
      </div>
      <div style={{ marginTop: '0.5em' }}>
        {time}
      </div>
    </div>
  );
}
export function ScheduleDate(props: {
  schedule: EventScheduleData;
  option: EventOptionData;
  emails?: string[];
  onToggle?: () => void;
  shorten?: boolean;
}) {
  const eventDate = EventDate.fromIso(props.option.isoStart);
  const gcal = createGcal({ ...props, guests: props.emails ?? [], });

  return (
    <div>
      {props.onToggle && (
        <div>
          <button onClick={props.onToggle}>
            toggle
          </button>
        </div>
      )}
      {props.option.highlight ? (
        <a href={gcal}>
          <ScheduleDateSummary eventDate={eventDate} shorten={props.shorten} />
        </a>
      ) : (
        <ScheduleDateSummary eventDate={eventDate} shorten={props.shorten} />
      )}
    </div>
  );
}
