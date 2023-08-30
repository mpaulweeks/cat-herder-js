import { EventDate, EventLookup, generateUrl } from "../lib";
import { ZoneDate } from "../lib/zoneDate";
import { SmartLink } from "./SmartLink";

export function GroupEventLink(props: {
  eventLookup: EventLookup;
  setEventLookup(newLookup: Partial<EventLookup>): void;
}) {
  const { eventLookup, setEventLookup } = props;
  const eventDate = EventDate.fromEventID(eventLookup.eventID, ZoneDate.Default);
  return (
    <SmartLink
      href={generateUrl(eventLookup)}
      onClick={() => setEventLookup(eventLookup)}
    >{eventDate.localPretty}</SmartLink>
  )
}
