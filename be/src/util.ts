import { Attendence, EventTime, User } from "./types";

export function getAttendence(event: EventTime, user: User): Attendence {
  return user.events.filter(e => e.event === event.eid)[0]?.status ?? Attendence.Undefined;
}

export function range(length: number): number[] {
  const out = [] as number[];
  for (let i = 0; i < length; i++) {
    out.push(i);
  }
  return out;
}
