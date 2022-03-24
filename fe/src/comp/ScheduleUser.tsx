import { AttendenceIcon } from "./AttendenceIcon";
import { EventTime, User } from "../lib/types";
import { getAttendence } from "../lib/util";

export function ScheduleUser(props: {
  events: EventTime[];
  user: User;
  onEdit(): void;
  onSave(): void;
  onCancel(): void;
}) {
  return (
    <tr>
      <td>
        <div>
          {props.user.name}
        </div>
      </td>
      {props.events.map(e => (
        <td key={e.eid}>
          <AttendenceIcon attendence={getAttendence(e, props.user)} />
        </td>
      ))}
      <td>
        <button onClick={props.onEdit}>EDIT</button>
      </td>
    </tr>
  )
}
