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
        onSave={u => {
          api.createUser(u);
          onExit();
        }}
        onDelete={() => undefined}
        onExit={onExit}
      />
    );
  } else if (user !== null) {
    return (
      <ScheduleMobileUser
        schedule={schedule}
        user={user}
        isNew={false}
        onSave={u => {
          api.updateUser(u);
          onExit();
        }}
        onDelete={() => {
          api.removeUser(user);
          onExit();
        }}
        onExit={onExit}
      />
    );
  }

  const users = Object.values(schedule.user).sort((a,b) => a.created < b.created ? -1 : 1);
  return (
    <div className={styles.ScheduleMobileOverlay} onClick={onExit}>
      <div className={styles.ScheduleMobileModal} onClick={evt => evt.stopPropagation()}>
        <h2>RSVP</h2>
        <div className={styles.ScheduleMobileButtonRow}>
          <button onClick={() => setUser('new')}>
            Sign Up
          </button>
          <button onClick={onExit}>
            Cancel
          </button>
        </div>
        <h2>Edit Existing</h2>
        {users.map(u => (
          <div key={u.created}>
            <button onClick={() => setUser(u)}>
              {u.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
