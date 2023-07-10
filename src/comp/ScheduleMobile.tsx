import { EventApi, EventScheduleData } from "../lib";
import { ScheduleDate } from "./ScheduleDate";
import styles from './Schedule.module.css';

export function ScheduleMobile(props: {
  schedule: EventScheduleData;
  api: EventApi;
}) {
  const options = props.schedule.options;
  const users = Object.values(props.schedule.user).sort((a, b) => a.created < b.created ? -1 : 1);

  return (
    <div className={styles.ScheduleMobile}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Attending</th>
          </tr>
        </thead>
        <tbody>
          {options.map(option => (
            <tr key={option.isoStart} className={styles.ScheduleMobileRow}>
              <td>
                <ScheduleDate
                  schedule={props.schedule}
                  option={option}
                  showHighlightToggle={false}
                  onToggle={() => undefined}
                />
              </td>
              <td>
                <div>
                  {users.filter(u => u.attending.includes(option.isoStart)).map(u => (
                    <div key={[option.isoStart, u.uid, 'attending'].join('-')}>
                    <b>{u.label}</b>
                  </div>
                  ))}
                  {users.filter(u => u.maybe.includes(option.isoStart)).map(u => (
                    <div key={[option.isoStart, u.uid, 'maybe'].join('-')}>
                      <i>{u.label}</i>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
