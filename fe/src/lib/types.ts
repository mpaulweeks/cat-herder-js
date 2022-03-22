export type EventKey = string;
export interface EventTime {
  eid: EventKey;
  start: Date;
  durationHours: number;
}
export enum Attendence {
  No = 'n',
  Yes = 'y',
  Maybe = 'm',
  Undefined = '?',
}
export interface EventAttendence {
  event: EventKey;
  status: Attendence;
}
export interface User {
  uid: string;
  name: string;
  events: EventAttendence[];
  created: Date;
  updated: Date;
}
export interface Schedule {
  events: EventTime[];
  users: User[];
}
