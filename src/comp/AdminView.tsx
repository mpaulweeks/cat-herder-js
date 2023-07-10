import { EventLookup, generateUrl } from '../lib';
import { FirebaseConfig } from '../lib/config';
import styles from './App.module.css';
import { SmartLink } from './SmartLink';
import { useTitle } from '../hooks/useTitle';

export function AdminView(props: {
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  useTitle('Admin');

  return (
    <div className={styles.BasicView}>
      <h1>Admin</h1>
      <div>
        <a href={`https://${FirebaseConfig.projectId}-default-rtdb.firebaseio.com/db.json`}>
          Events JSON
        </a>
      </div>
      <div>
        <a href={`https://${FirebaseConfig.projectId}-default-rtdb.firebaseio.com/email.json`}>
          Email JSON
        </a>
      </div>
      <div>
        <SmartLink
          href={generateUrl({})}
          onClick={() => props.setEventLookup({})}
        >
          Go Back
        </SmartLink>
      </div>
    </div>
  )
}
