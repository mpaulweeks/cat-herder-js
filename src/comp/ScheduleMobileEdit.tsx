import { useState } from "react";
import { EventApi, EventScheduleData, UserData, emptyUser } from "../lib";
import { ScheduleMobileUser } from "./ScheduleMobileUser";
import styles from './Schedule.module.css';

export function ScheduleMobileEdit(props: {
  schedule: EventScheduleData;
  api: EventApi;
  onExit(): void;
}) {
  const { schedule, api, onExit } = props;
  const [user, setUser] = useState<UserData | 'new' | null>(null);

  if (user === 'new') {
    return (
      <ScheduleMobileUser
        schedule={schedule}
        user={emptyUser()}
        isNew={true}
        onSave={u => api.createUser(u)}
        onExit={onExit}
      />
    );
  } else if (user !== null) {
    return (
      <ScheduleMobileUser
        schedule={schedule}
        user={user}
        isNew={false}
        onSave={u => api.updateUser(u)}
        onExit={onExit}
      />
    );
  }

  const users = Object.values(schedule.user).sort((a,b) => a.created < b.created ? -1 : 1);
  return (
    <div className={styles.ScheduleMobileOverlay} onClick={onExit}>
      <div className={styles.ScheduleMobileModal} onClick={evt => evt.stopPropagation()}>
        <h1>RSVP</h1>
        <div>
          <button onClick={() => setUser('new')}>
            Sign Up
          </button>
        </div>
        <hr/>
        {users.map(u => (
          <div key={u.created}>
            <h3>{u.label}</h3>
            <button onClick={() => setUser(u)}>
              Edit
            </button>
          </div>
        ))}
        <hr/>
        <div>
          <button onClick={onExit}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
