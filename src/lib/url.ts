import { EventLookup } from ".";

export enum UrlQueryParams {
  ID = 'id',
  Group = 'group',
  EventID = 'event',
};

/* Examples
* ?id=edh-20201030
* ?group=edh
* ?group=edh&event=20201030
*/
export function parseQueryParams(urlSearch: string): Partial<EventLookup> {
  const query = new URLSearchParams(urlSearch);

  const id = query.get(UrlQueryParams.ID);
  if (id && id.split('-').length === 2) {
    const [group, eventID] = id.split('-');
    return { group: group, eventID };
  }

  const group = query.get(UrlQueryParams.Group);
  if (group) {
    const eventID = query.get(UrlQueryParams.EventID);
    if (eventID) {
      return { group: group, eventID };
    }
    // else
    return { group: group };
  }

  return {};
}

export function generateUrl(eventLookup: Partial<EventLookup>) {
  const query = new URLSearchParams();
  if (eventLookup.group) {
    query.append(UrlQueryParams.Group, eventLookup.group);
  }
  if (eventLookup.eventID) {
    query.append(UrlQueryParams.EventID, eventLookup.eventID);
  }
  return `./?${query.toString()}`;
}
