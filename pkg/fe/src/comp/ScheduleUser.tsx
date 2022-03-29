import { AttendenceIcon } from "./AttendenceIcon";
import { getAttendence, EventTime, User } from "@mpaulweeks/cat-shared";
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
  const [draft, setDraft] = useState<User>({ ...props.user });

  useEffect(() => {
    setDraft({ ...props.user, });
  }, [props.user]);

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
        </td>
      ))}
      {props.isEditing ? (
        <td>
          <button onClick={() => props.onSave(draft)}>SAVE</button>
          <button onClick={props.onCancel}>{props.isTemp ? 'RESET' : 'CANCEL'}</button>
        </td>
      ) : (
        <td>
          <button onClick={props.onEdit}>EDIT</button>
        </td>
      )}
    </tr>
  )
}
