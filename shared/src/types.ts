// biz logic

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
export const AttendenceOrder = [
  Attendence.No,
  Attendence.Yes,
  Attendence.Maybe,
];
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

// network

export interface ResponseGet {
  data: Schedule;
}
export interface RequestPost {
  user: User;
}
