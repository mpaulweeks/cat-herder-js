import { useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";
import { EventLookup, generateUrl } from "../lib";
import { SmartLink } from "./SmartLink";
import { useTitle } from "./hooks/useTitle";
import styles from './App.module.css';
import { GroupEventLink } from "./GroupEventLink";

export function GroupView(props: {
  group: string;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const { group, setEventLookup } = props;
  const [events, setEvents] = useState<string[] | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useTitle(group);
  useEffect(() => {
    FirebaseApi.instance.listGroupEvents(group)
      .then(rawEvents => setEvents(rawEvents.concat().sort()))
      .catch(err => setError(err));
  }, [group, setEvents]);

  return (
    <div className={styles.BasicView}>
      <h1>{group}</h1>
      {!error && !events && 'loading...'}
      {events && (
        events.concat().reverse().map(eventID => (
          <div key={eventID}>
            <GroupEventLink {...props} eventLookup={{ group, eventID }} />
          </div>
        ))
      )}
      {error && (
        <div>
          This category was not found.
          {' '}
          <SmartLink
            href={generateUrl({})}
            onClick={() => setEventLookup({})}
          >
            Please try again.
          </SmartLink>
        </div>
      )}
    </div>
  );
}
