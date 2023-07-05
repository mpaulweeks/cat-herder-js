import { ScheduleUser } from "./ScheduleUser";
import { CssClass } from "./display";
import { useState } from "react";
import { EventApi, EventScheduleData, UserData } from "../lib";
import { ScheduleDate } from "./ScheduleDate";

function emptyUser(): UserData {
  return {
    // will be overridden
    created: 0,
    uid: '0',

    // empty
    label: 'todo',
    attending: [],
    maybe: [],
  }
}

export function ScheduleTable(props: {
  schedule: EventScheduleData;
  api: EventApi;
}) {
  const options = props.schedule.options; // todo sort by event.date.getTime()

  const [toEdit, setToEdit] = useState<UserData | undefined>();
  const [temp, setTemp] = useState<UserData>(emptyUser());

  const scheduleUsers = Object.values(props.schedule.user).sort((a, b) => a.uid < b.uid ? -1 : 1);
  const users = [
    ...scheduleUsers.filter(u => u.uid !== toEdit?.uid),
    ...(toEdit ? [toEdit] : []),
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>
            Name
          </th>
          {options.map(option => (
            <th key={option.isoStart} className={CssClass.EventTime}>
              <ScheduleDate schedule={props.schedule} option={option} />
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
            events={options}
            user={u}
            isEditing={u.uid === toEdit?.uid}
            isTemp={false}
            onEdit={() => setToEdit(u)}
            onSave={user => {
              setToEdit(undefined);
              props.api.update(user);
            }}
            onCancel={() => setToEdit(undefined)}
          />
        ))}
        <ScheduleUser
          events={options}
          user={temp}
          isEditing={true}
          isTemp={true}
          onEdit={() => {}}
          onSave={user => {
            setTemp(emptyUser());
            props.api.create(user);
          }}
          onCancel={() => setTemp(emptyUser())}
        />
      </tbody>
    </table>
  )
}
