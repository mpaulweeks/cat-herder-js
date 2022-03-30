import { ScheduleUser } from "./ScheduleUser";
import { EventDate, Schedule, User } from "@mpaulweeks/cat-shared";
import { CssClass, getDateStrings } from "./display";
import { useState } from "react";
import { defaultUser } from "../lib/schedule";

function RenderDate(props: {
  dateIso: string;
}) {
  const eventDate = EventDate.fromIso(props.dateIso);
  const {dayOfWeek, dd, mm} = getDateStrings(eventDate);
  return (
    <div>
      <div>
        {dayOfWeek}
      </div>
      <div>
        {mm}/{dd}
      </div>
    </div>
  );
}

export function ScheduleTable(props: {
  schedule: Schedule,
  onSave(user: User): void;
}) {
  const events = props.schedule.events; // todo sort by event.date.getTime()

  const [toEdit, setToEdit] = useState<User | undefined>();
  const [temp, setTemp] = useState<User>(defaultUser(events));

  const users = [ // todo sort by user.created
    ...props.schedule.users.filter(u => u.uid !== toEdit?.uid),
    ...(toEdit ? [toEdit] : []),
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          {events.map(event => (
            <th key={event.eid} className={CssClass.EventTime}>
              <RenderDate dateIso={event.startIso} />
            </th>
          ))}
          <th className={CssClass.Update}>
            <div>
              Update?
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map(u => (
          <ScheduleUser
            key={u.uid}
            events={events}
            user={u}
            isEditing={u.uid === toEdit?.uid}
            isTemp={false}
            onEdit={() => setToEdit(u)}
            onSave={user => {
              setToEdit(undefined);
              props.onSave(user);
            }}
            onCancel={() => setToEdit(undefined)}
          />
        ))}
        <ScheduleUser
          events={events}
          user={temp}
          isEditing={true}
          isTemp={true}
          onEdit={() => {}}
          onSave={user => {
            setTemp(defaultUser(events));
            props.onSave(user);
          }}
          onCancel={() => setTemp(defaultUser(events))}
        />
      </tbody>
    </table>
  )
}
