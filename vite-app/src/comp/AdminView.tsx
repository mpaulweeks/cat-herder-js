import { EventLookup, generateUrl } from '../lib';
import { FirebaseConfig } from '../lib/config';
import styles from './App.module.css';
import { SmartLink } from './SmartLink';
import { useTitle } from '../hooks/useTitle';
import { useCallback, useState } from 'react';

type EmailArgs = {
  to: string | string[];
  subject: string;
  body: string;
}

export function AdminView(props: {
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const [group, setGroup] = useState('');
  const [emailArgs, setEmailArgs] = useState<EmailArgs | undefined>();
  useTitle('Admin');

  const postPreview = useCallback((id: string) => {
    (async () => {
      const resp = await fetch(`https://cat-herder-api.mpaulweeks.com/preview/${id}`, {
        method: 'POST',
      });
      const args: EmailArgs = await resp.json();
      setEmailArgs(args);
    })();
  }, [setEmailArgs]);

  return (
    <div className={styles.BasicView}>
      <h1>Admin</h1>
      <section>
        <div>
          <SmartLink
            href={generateUrl({})}
            onClick={() => props.setEventLookup({})}
          >
            Go Back
          </SmartLink>
        </div>
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
      </section>
      <section>
        <form onSubmit={evt => {
          evt.preventDefault();
          postPreview(group);
        }}>
          <input value={group} onChange={evt => setGroup(evt.target.value.toLocaleLowerCase())} />
          <button type="submit">preview</button>
        </form>
      </section>
      {emailArgs && (
        <section>
          <div>
            To: {emailArgs.to.toString()}
          </div>
          <div>
            Subject: {emailArgs.subject}
          </div>
          <div style={{ border: '1px solid black', padding: '1em', }} dangerouslySetInnerHTML={{ __html: emailArgs.body }} />
        </section>
      )}
    </div>
  )
}
