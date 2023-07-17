import { EventLookup, generateUrl } from '../lib';
import { FirebaseConfig } from '../lib/config';
import appStyles from './App.module.css';
import adminStyles from './AdminView.module.css';
import { SmartLink } from './SmartLink';
import { useTitle } from '../hooks/useTitle';
import { useCallback, useState } from 'react';
import { useErrorReporter } from '../hooks/useError';

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
  const { reportError } = useErrorReporter();

  const postPreview = useCallback((id: string) => {
    (async () => {
      const resp = await fetch(`https://cat-herder-api.mpaulweeks.com/preview/${id}`, {
        method: 'POST',
      });
      if (resp.ok) {
        const args: EmailArgs = await resp.json();
        setEmailArgs(args);
      } else {
        setEmailArgs(undefined);
        reportError(`preview fetch failed with ${resp.status}`);
      }
    })();
  }, [setEmailArgs]);

  return (
    <div className={appStyles.BasicView}>
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
        <section className={adminStyles.EmailPreview}>
          <div>
            <b>Subject:</b> {emailArgs.subject}
          </div>
          <div>
            <b>To:</b>
          </div>
          {([] as string[]).concat(emailArgs.to).map(email => (
            <div key={email}>{email}</div>
          ))}
          <iframe srcDoc={emailArgs.body} />
        </section>
      )}
    </div>
  )
}
