import { useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";
import { EventLookup, generateUrl } from "../lib";
import { SmartLink } from "./SmartLink";
import { useTitle } from "./hooks/useTitle";
import styles from './App.module.css';
import { CategoryEventLink } from "./CategoryEventLink";

export function CategoryView(props: {
  category: string;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const { category, setEventLookup } = props;
  const [events, setEvents] = useState<string[] | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useTitle(category);
  useEffect(() => {
    FirebaseApi.instance.listCategoryEvents(category)
      .then(setEvents)
      .catch(err => setError(err));
  }, [category, setEvents]);

  return (
    <div className={styles.BasicView}>
      <h1>{category}</h1>
      {!error && !events && 'loading...'}
      {events && (
        events.map(eventID => (
          <div key={eventID}>
            <CategoryEventLink {...props} eventLookup={{ category, eventID }} />
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
