import { AttendenceIcon } from "./AttendenceIcon";
import { getAttendence, EventTime, User, deepCopy } from "@mpaulweeks/cat-shared";
import { useEffect, useState } from "react";

export function ScheduleUser(props: {
  events: EventTime[];
  user: User;
  isEditing: boolean;
  isTemp: boolean;
  onEdit(): void;
  onSave(user: User): void;
  onCancel(): void;
}) {
  const [draft, setDraft] = useState<User>(deepCopy(props.user));

  useEffect(() => {
    setDraft(deepCopy(props.user));
  }, [props.user, props.isEditing]);

  return (
    <tr>
      <td>
        <div>
          {props.isEditing ? (
            <input value={draft.name} onChange={evt => setDraft({
              ...draft,
              name: evt.target.value,
            })} />
            ) : (
            <span>
              {draft.name}
            </span>
          )}
        </div>
      </td>
      {props.events.map(et => (
        <td key={et.eid}>
          <div>
            <AttendenceIcon
              attendence={getAttendence(et, draft)}
              isEditing={props.isEditing}
              onUpdate={attendence => {
                const newUser = { ...draft, };
                newUser.events = newUser.events.map(ea => ({
                  ...ea,
                  status: ea.event === et.eid ? attendence : ea.status,
                }));
                setDraft(newUser);
              }}
            />
          </div>
        </td>
      ))}
      {props.isEditing ? (
        <td>
          <div style={{ flexDirection: 'row', }}>
            <button onClick={() => props.onSave(draft)}>SAVE</button>
            <button onClick={props.onCancel}>{props.isTemp ? 'RESET' : 'CANCEL'}</button>
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
