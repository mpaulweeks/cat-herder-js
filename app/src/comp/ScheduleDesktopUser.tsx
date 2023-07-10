import { EventOptionData, UserData, deepCopy, getAttendence, updateAttendence } from "../lib";
import { AttendenceIcon } from "./AttendenceIcon";
import { useEffect, useState } from "react";
import { useErrorReporter } from "../hooks/useError";
import styles from './Schedule.module.css';

export function ScheduleDesktopUser(props: {
  options: EventOptionData[];
  user: UserData;
  isEditing: boolean;
  isTemp: boolean;
  onEdit(): void;
  onDelete(): void;
  onSave(user: UserData): void;
  onCancel(): void;
}) {
  const [draft, setDraft] = useState<UserData>(deepCopy(props.user));
  const { reportError } = useErrorReporter();

  // reset draft whenever editing is toggled
  useEffect(() => {
    setDraft(deepCopy(props.user));
  }, [props.user, props.isEditing]);

  const trySave = () => {
    if (!draft.label) {
      return reportError(`Cannot save with empty name!`);
    }
    // else
    props.onSave(draft);
  };

  return (
    <tr>
      <td>
        <div>
          {props.isEditing ? (
            <input
              placeholder="your name here"
              value={draft.label}
              onChange={evt => setDraft({
                ...draft,
                label: evt.target.value,
              })}
            />
          ) : (
            <span>
              {draft.label}
            </span>
          )}
        </div>
      </td>
      {props.options.map(option => (
        <td key={option.isoStart} className={
          (option.highlight ? [styles.ScheduleHighlight] : [])
            .join(' ')
        }>
          <div>
            <AttendenceIcon
              attendence={getAttendence(option, draft)}
              isEditing={props.isEditing}
              onUpdate={attendence => setDraft(updateAttendence(option, draft, attendence))}
            />
          </div>
        </td>
      ))}
      {props.isEditing ? (
        <td>
          <div style={{ flexDirection: 'row', }}>
            <button onClick={trySave}>SAVE</button>
            <button onClick={props.onCancel}>{props.isTemp ? 'RESET' : 'BACK'}</button>
            {!props.isTemp && <button onClick={props.onDelete}>DEL</button>}
          </div>
        </td>
      ) : (
        <td>
          <div>
            <button onClick={props.onEdit}>EDIT</button>
          </div>
        </td>
      )}
    </tr>
  )
}
