import { EventLookup } from ".";

export enum UrlQueryParams {
  ID = 'id',
  Category = 'category',
  Event = 'event',
};

// edh/20230710
export function parseQueryParams(urlSearch: string): Partial<EventLookup> {
  const query = new URLSearchParams(urlSearch);

  const id = query.get(UrlQueryParams.ID);
  if (id && id.split('-').length === 2) {
    const [category, eventID] = id.split('-');
    return { category, eventID };
  }

  const category = query.get(UrlQueryParams.Category);
  if (category) {
    const eventID = query.get(UrlQueryParams.Event);
    if (eventID) {
      return { category, eventID };
    }
    // else
    return { category };
  }

  return {};
}
