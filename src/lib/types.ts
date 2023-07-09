/* VOCAB
Group = a type of gathering with its own schedule
Event = a specific combo of group and time
/*

/* Shape of DB
db: {
  [group: string]: Group
}
email: {
  [group: string]: string[]
}
*/

export type EventKey = string;
export type EventLookup = {
  group: string;
  eventID: string;
}

export type DatabaseData = Record<string, GroupData>;
export type GroupData = Record<string, EventScheduleData>;
export type EventScheduleData = {
  name: string;
  description: string;
  options: EventOptionData[];
  user: {
    [uid: string]: UserData;
  };
}
export type EventOptionData = {
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

// errors
export type ErrorMessage = string;
export type ErrorNotification = {
  created: number;
  message: ErrorMessage;
}
