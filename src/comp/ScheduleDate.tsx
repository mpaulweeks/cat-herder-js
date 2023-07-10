import { createGcal, EventScheduleData, EventDate, EventOptionData, getDateStrings } from "../lib";
import styles from './Schedule.module.css';

function ScheduleDateSummary(props: {
  eventDate: EventDate;
}) {
  const {dayOfWeek, dd, mm, time} = getDateStrings(props.eventDate);
  return (
    <div>
      <div>
        {dayOfWeek}
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
  showHighlightToggle: boolean;
  onToggle(): void;
}) {
  const eventDate = EventDate.fromIso(props.option.isoStart);
  const gcal = createGcal(props.schedule, props.option);
  return (
    <div className={styles.ScheduleDate} style={{
      backgroundColor: props.option.highlight ? '#eee' : 'initial',
    }}>
      {props.showHighlightToggle && (
        <div>
          <button onClick={props.onToggle}>
            toggle
          </button>
        </div>
      )}
      {props.option.highlight ? (
        <a href={gcal}>
          <ScheduleDateSummary eventDate={eventDate} />
        </a>
      ) : (
        <ScheduleDateSummary eventDate={eventDate} />
      )}
    </div>
  );
}
