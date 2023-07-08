import { ScheduleUser } from "./ScheduleUser";
import { useState } from "react";
import { EventApi, EventOptionData, EventScheduleData, UserData, emptyUser } from "../lib";
import { ScheduleDate } from "./ScheduleDate";
import { useKeyboard } from "./hooks/useKeyboard";
import { STORAGE } from "./helper";
import styles from './Schedule.module.css';

export function ScheduleTable(props: {
  schedule: EventScheduleData;
  api: EventApi;
}) {
  const pressed = useKeyboard();
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
    <table className={styles.ScheduleTable}>
      <thead>
        <tr>
          <th>
            Name
          </th>
          {options.map(option => (
            <th key={option.isoStart} className={styles.EventTime}>
              <ScheduleDate
                schedule={props.schedule}
                option={option}
                showHighlightToggle={pressed.includes('Backquote')}
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
          <ScheduleUser
            key={u.uid}
            events={options}
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
        <ScheduleUser
          events={options}
          user={temp}
          isEditing={true}
          isTemp={true}
          onEdit={() => {}} // inaccessible
          onDelete={() => {}} // inaccessible
          onSave={user => {
            setTemp(emptyUser());
            props.api.createUser(user);
          }}
          onCancel={() => setTemp(emptyUser())}
        />
      </tbody>
    </table>
  )
}
