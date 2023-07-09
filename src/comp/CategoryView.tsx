import { useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";
import { EventLookup, generateUrl } from "../lib";
import { SmartLink } from "./SmartLink";

export function CategoryView(props: {
  category: string;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const { category, setEventLookup: setLookup } = props;
  const [events, setEvents] = useState<string[] | undefined>();

  useEffect(() => {
    FirebaseApi.instance.listCategoryEvents(category).then(setEvents);
  }, [category, setEvents]);

  return (
    <div>
      <h1>{category}</h1>
      {events ? (
        events.map(eventID => (
          <div key={eventID}>
            <SmartLink
              href={generateUrl({ category, eventID })}
              onClick={() => setLookup({ category, eventID })}
            >{eventID}</SmartLink>
          </div>
        ))
      ) : 'loading...'}
    </div>
  );
}
