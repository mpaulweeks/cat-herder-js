import { EventApi, EventScheduleData } from "../lib";
import { ScheduleDate } from "./ScheduleDate";
import styles from './Schedule.module.css';
import { useState } from "react";
import { ScheduleMobileEdit } from "./ScheduleMobileEdit";

export function ScheduleMobileTable(props: {
  schedule: EventScheduleData;
  api: EventApi;
  emails?: string[];
}) {
  const [showEdit, setShowEdit] = useState(false);
  const options = props.schedule.options;
  const users = Object.values(props.schedule.user).sort((a, b) => a.created < b.created ? -1 : 1);

  return (
    <div className={styles.ScheduleMobile}>
      <div>
        <button onClick={() => setShowEdit(true)}>
          RSVP
        </button>
      </div>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Attending</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.isoStart} className={
              [styles.ScheduleMobileRow]
                .concat(option.highlight ? [styles.ScheduleHighlight] : [])
                .join(' ')
            }>
              <td>
                <ScheduleDate
                  schedule={props.schedule}
                  emails={props.emails}
                  option={option}
                  shorten={true}
                />
              </td>
              <td>
                <ol>
                  {users.filter(u => u.attending.includes(option.isoStart)).map(u => (
                    <li key={[option.isoStart, u.uid, 'attending'].join('-')}>
                      {u.label}
                    </li>
                  ))}
                </ol>
                <ul>
                  {users.filter(u => u.maybe.includes(option.isoStart)).map(u => (
                    <li key={[option.isoStart, u.uid, 'maybe'].join('-')}>
                      <i>{u.label}</i>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEdit && (
        <ScheduleMobileEdit {...props} onExit={() => setShowEdit(false)} />
      )}
    </div>
  )
}
