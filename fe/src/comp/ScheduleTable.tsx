import { ScheduleUser } from "./ScheduleUser";
import { Schedule, User } from "../lib/types";
import { getDateStrings } from "../lib/time";

function RenderDate(props: {
  date: Date;
}) {
  const {dayOfWeek, dd, mm} = getDateStrings(props.date);
  return (
    <div>
      <div>
        {dayOfWeek}
      </div>
      <div>
        {dd}/{mm}
      </div>
    </div>
  );
}

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
              <RenderDate date={event.start} />
            </th>
          ))}
          <th>
            Update?
          </th>
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
