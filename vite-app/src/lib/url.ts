import { EventLookup } from ".";

export enum UrlQueryParams {
  ID = 'id',
  Group = 'group',
  EventID = 'event',
}

/* Examples
* ?id=edh-20201030
* ?group=edh
* ?group=edh&event=20201030
* #/edh/20201030
*/
export function parseUrl(url: string): Partial<EventLookup> {
  const urlObj = new URL(url.toLocaleLowerCase());

  const hashSlug = urlObj.hash.startsWith('#/') && urlObj.hash.slice(2);
  if (hashSlug) {
    const [group, eventID] = hashSlug.split('/');
    return {
      group: group || undefined,
      eventID: eventID || undefined,
    };
  }

  const pathSlug = urlObj.pathname.startsWith('/') && urlObj.pathname.slice(1);
  if (pathSlug) {
    const [group, eventID] = pathSlug.split('/');
    return {
      group: group || undefined,
      eventID: eventID || undefined,
    };
  }

  const query = urlObj.searchParams;
  const id = query.get(UrlQueryParams.ID);
  if (id && id.split('-').length === 2) {
    const [group, eventID] = id.split('-');
    return { group, eventID };
  }

  const group = query.get(UrlQueryParams.Group);
  if (group) {
    const eventID = query.get(UrlQueryParams.EventID);
    if (eventID) {
      return { group, eventID };
    }
    // else
    return { group };
  }

  return {};
}

export function generateUrl(eventLookup: Partial<EventLookup>): string {
  // todo if 404 routing not available, use query?
  // else
  return generatePathUrl(eventLookup);
}

export function generateQueryUrl(eventLookup: Partial<EventLookup>) {
  const query = new URLSearchParams();
  if (eventLookup.group) {
    query.append(UrlQueryParams.Group, eventLookup.group);
    if (eventLookup.eventID) {
      query.append(UrlQueryParams.EventID, eventLookup.eventID);
    }
  }
  return `./?${query.toString()}`;
}

export function generatePathUrl(eventLookup: Partial<EventLookup>) {
  const slugs = eventLookup.group ? [eventLookup.group, eventLookup.eventID] : [];
  return '/' + slugs.filter(str => str !== undefined).join('/');
}
