/* VOCAB
Category = a type of gathering with its own schedule
Event = a specific combo of category and time
/*

/* Shape of DB
db: {
  [category: string]: Category
}
email: {
  [category: string]: string[]
}
*/

export type EventKey = string;
export type EventLookup = {
  category: string;
  eventID: string;
}

export type DatabaseData = Record<string, CategoryData>;
export type CategoryData = Record<string, EventScheduleData>;
export type EventScheduleData = {
  name: string;
  description: string;
  options: EventOptionData[];
  user: {
    [uid: string]: UserData;
  };
}
export type EventOptionData = {
  label: string;
  isoStart: string;
  durationHours: number;
  highlight: boolean;
}

export type UserDraft = Omit<UserData, 'created' | 'uid'>;
export type UserData = {
  uid: string;
  created: number;
  label: string;
  attending: string[]; // matches iso
  maybe: string[]; // matches iso
}

export enum Attendence {
  No = 'n',
  Yes = 'y',
  Maybe = 'm',
  Undefined = '?',
}
export const AttendenceOrder = [
  Attendence.No,
  Attendence.Yes,
  Attendence.Maybe,
];
