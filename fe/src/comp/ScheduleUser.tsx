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
    <div style={{ display: 'flex', }}>
      <div>
        {props.user.name}
      </div>
      {props.events.map(e => (
        <div key={e.eid}>
          <AttendenceIcon attendence={getAttendence(e, props.user)} />
        </div>
      ))}
    </div>
  )
}
