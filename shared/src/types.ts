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
  sid: string;
  group: string;
  scheduleDate: string;
  name: string;
  description: string;
  events: EventTime[];
  users: User[];
}
export interface DraftSchedule {
  name: string;
  description: string;
  events: EventTime[];
}

// network

export interface GetScheduleResponse {
  schedule: Schedule;
}

export interface PostScheduleRequest {
  draft: DraftSchedule;
}
export interface PostScheduleResponse {
  schedule: Schedule;
}

export interface PutScheduleRequest {
  user: User;
}
export interface PutScheduleResponse {
  schedule: Schedule;
}
