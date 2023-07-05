import { Attendence, EventOptionData, UserData } from "./types";

export function getAttendence(event: EventOptionData, user: UserData): Attendence {
  if (user.attending.includes(event.isoStart)) { return Attendence.Yes; }
  if (user.maybe.includes(event.isoStart)) { return Attendence.Maybe; }
  return Attendence.No;
}

export function range(length: number): number[] {
  const out = [] as number[];
  for (let i = 0; i < length; i++) {
    out.push(i);
  }
  return out;
}

export function deepCopy<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
