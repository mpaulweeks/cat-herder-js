import { ScheduleUser } from "./ScheduleUser";
import { Schedule, User } from "../lib/types";

export function ScheduleTable(props: {
  data: Schedule,
  onEdit(user: User): void;
  onSave(user: User): void;
  onCancel(user: User): void;
}) {
  const events = props.data.events; // todo sort by event.date.getTime()
  const users = props.data.users; // todo sort by user.created
  console.log(events);

  return (
    <table>
      <thead>
        <tr>
          <th>
            &nbsp;
          </th>
          {events.map(event => (
            <th key={event.eid}>
              {event.start.toLocaleString()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <ScheduleUser
            key={u.uid}
            events={events}
            user={u}
            onEdit={() => props.onEdit(u)}
            onSave={() => props.onSave(u)}
            onCancel={() => props.onCancel(u)}
          />
        ))}
      </tbody>
    </table>
  )
}
