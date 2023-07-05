import { ScheduleUser } from "./ScheduleUser";
import { CssClass } from "./display";
import { useState } from "react";
import { EventApi, EventScheduleData, UserData, emptyUser } from "../lib";
import { ScheduleDate } from "./ScheduleDate";

export function ScheduleTable(props: {
  schedule: EventScheduleData;
  api: EventApi;
}) {
  const options = props.schedule.options;

  const [editing, setEditing] = useState<string | undefined>();
  const [temp, setTemp] = useState<UserData>(emptyUser());

  const users = Object.values(props.schedule.user).sort((a, b) => a.created < b.created ? -1 : 1);

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
            isEditing={u.uid === editing}
            isTemp={false}
            onEdit={() => setEditing(u.uid)}
            onDelete={() => props.api.remove(u)}
            onSave={user => {
              setEditing(undefined);
              props.api.update(user);
            }}
            onCancel={() => setEditing(undefined)}
          />
        ))}
        <ScheduleUser
          events={options}
          user={temp}
          isEditing={true}
          isTemp={true}
          onEdit={() => {}} // inaccessible
          onDelete={() => {}} // inaccessible
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
