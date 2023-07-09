import { useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";
import { EventLookup, generateUrl } from "../lib";
import { SmartLink } from "./SmartLink";
import { useTitle } from "./hooks/useTitle";

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
    <div>
      <h1>{category}</h1>
      {!error && !events && 'loading...'}
      {events && (
        events.map(eventID => (
          <div key={eventID}>
            <SmartLink
              href={generateUrl({ category, eventID })}
              onClick={() => setEventLookup({ category, eventID })}
            >{eventID}</SmartLink>
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
