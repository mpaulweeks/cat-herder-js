import { useState } from "react";
import { EventScheduleData, UserData, deepCopy, getAttendence, updateAttendence } from "../lib";
import { useErrorReporter } from "../hooks/useError";
import styles from './Schedule.module.css';
import { ScheduleDate } from "./ScheduleDate";
import { AttendenceIcon } from "./AttendenceIcon";

export function ScheduleMobileUser(props: {
  schedule: EventScheduleData;
  user: UserData;
  isNew: boolean;
  onSave(user: UserData): void;
  onDelete(): void;
  onExit(): void;
}) {
  const [draft, setDraft] = useState<UserData>(deepCopy(props.user));
  const { reportError } = useErrorReporter();

  const trySave = () => {
    if (!draft.label) {
      return reportError(`Cannot save with empty name!`);
    }
    // else
    props.onSave(draft);
  };

  return (
    <div className={styles.ScheduleMobileOverlay} onClick={props.onExit}>
      <div className={styles.ScheduleMobileModal} onClick={evt => evt.stopPropagation()}>
        <h2>{props.isNew ? 'New RSVP' : 'Edit RSVP'}</h2>
        <div>
          <input
            placeholder="your name here"
            value={draft.label}
            onChange={evt => setDraft({
              ...draft,
              label: evt.target.value,
            })}
          />
        </div>
        <div className={styles.ScheduleMobileButtonRow}>
          <button onClick={trySave}>
            Save
          </button>
          <button onClick={props.onExit}>
            Cancel
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Attending</th>
            </tr>
          </thead>
          <tbody>
            {props.schedule.options.map(option => (
              <tr key={option.isoStart} className={
                [styles.ScheduleMobileRow]
                  .concat(option.highlight ? [styles.ScheduleHighlight] : [])
                  .join(' ')
              }>
                <td>
                  <ScheduleDate
                    schedule={props.schedule}
                    option={option}
                    shorten={true}
                  />
                </td>
                <td>
                  <div>
                    {/* wrap in div to enable flexbox */}
                    <AttendenceIcon
                      attendence={getAttendence(option, draft)}
                      isEditing={true}
                      onUpdate={attendence => setDraft(updateAttendence(option, draft, attendence))}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!props.isNew && (
          <div>
            <button onClick={props.onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
