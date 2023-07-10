import { ScheduleDesktopUser } from "./ScheduleDesktopUser";
import { useState } from "react";
import { EventApi, EventOptionData, EventScheduleData, UserData, emptyUser } from "../lib";
import { ScheduleDate } from "./ScheduleDate";
import { STORAGE } from "./browser";
import styles from './Schedule.module.css';

export function ScheduleDesktopTable(props: {
  schedule: EventScheduleData;
  api: EventApi;
  admin: boolean;
}) {
  const [editing, setEditing] = useState<string | undefined>();
  const [temp, setTemp] = useState<UserData>(emptyUser());

  const options = props.schedule.options;
  const users = Object.values(props.schedule.user).sort((a, b) => a.created < b.created ? -1 : 1);

  const onToggleOption = (option: EventOptionData) => {
    const newOptions = props.schedule.options.map(opt => ({
      ...opt,
      highlight: opt.isoStart === option.isoStart ? !opt.highlight : opt.highlight,
    }));
    props.api.updateOptions(newOptions);
  };

  return (
    <div className={styles.ScheduleDesktop}>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            {options.map(option => (
              <th key={option.isoStart} className={
                [styles.EventTime]
                  .concat(option.highlight ? [styles.ScheduleHighlight] : [])
                  .join(' ')
                }>
                <ScheduleDate
                  schedule={props.schedule}
                  option={option}
                  onToggle={() => onToggleOption(option)}
                />
              </th>
            ))}
            <th className={styles.Update}>
              <div>
                Update?
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <ScheduleDesktopUser
              key={u.uid}
              options={options}
              user={u}
              isEditing={u.uid === editing}
              isTemp={false}
              onEdit={() => setEditing(u.uid)}
              onDelete={() => props.api.removeUser(u)}
              onSave={newUser => {
                setEditing(undefined);
                if (u.label !== newUser.label) {
                  STORAGE.userLabel.set(newUser.label);
                }
                props.api.updateUser(newUser);
              }}
              onCancel={() => setEditing(undefined)}
            />
          ))}
          <ScheduleDesktopUser
            options={options}
            user={temp}
            isEditing={true}
            isTemp={true}
            onEdit={() => undefined} // inaccessible
            onDelete={() => undefined} // inaccessible
            onSave={user => {
              setTemp(emptyUser());
              props.api.createUser(user);
            }}
            onCancel={() => setTemp(emptyUser())}
          />
        </tbody>
      </table>
    </div>
  );
}
