import { createGcal, EventScheduleData, EventDate, EventOptionData, getDateStrings } from "../lib";

export function ScheduleDate(props: {
  schedule: EventScheduleData;
  option: EventOptionData;
  showHighlightToggle: boolean;
  onToggle(): void;
}) {
  const eventDate = EventDate.fromIso(props.option.isoStart);
  const gcal = createGcal(props.schedule, props.option);
  const {dayOfWeek, dd, mm, time} = getDateStrings(eventDate);
  return (
    <div style={{
      padding: '2px 5px',
      border: props.option.highlight ? '2px solid lightgreen' : 'initial',
    }}>
      {props.showHighlightToggle && (
        <div>
          <button onClick={props.onToggle}>
            toggle
          </button>
        </div>
      )}
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
    </div>
  );
}
