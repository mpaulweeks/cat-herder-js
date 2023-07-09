import { MouseEvent, useEffect, useState } from "react";
import { FirebaseApi } from "../lib/apiFirebase";
import { EventLookup, generateUrl } from "../lib";

function isModifiedEvent(evt: MouseEvent) {
  return !!(evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey);
}

export function CategoryView(props: {
  category: string;
  setLookup(newLookup: EventLookup): void;
}) {
  const { category, setLookup } = props;
  const [events, setEvents] = useState<string[] | undefined>();

  useEffect(() => {
    FirebaseApi.instance.listCategoryEvents(category).then(setEvents);
  }, [category, setEvents]);

  // todo refactor out
  // todo update url
  const handleClick = (eventID: string, evt: MouseEvent<HTMLAnchorElement>) => {
    // https://stackoverflow.com/a/57040157
    if (
      !evt.defaultPrevented && // onClick prevented default
      evt.button === 0 && // ignore everything but left clicks
      // (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(evt) // ignore clicks with modifier keys
    ) {
      evt.preventDefault();
      setLookup({ category, eventID });
    }
  }

  return (
    <div>
      <h1>{category}</h1>
      {events ? (
        events.map(eventID => (
          <div key={eventID}>
            <a
              href={generateUrl({ category, eventID })}
              onClick={evt => handleClick(eventID, evt)}
            >
              {eventID}
            </a>
          </div>
        ))
      ) : 'loading...'}
    </div>
  );
}
