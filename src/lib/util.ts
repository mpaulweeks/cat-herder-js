import { Attendence, EventOptionData, UserData } from "./types";

export function getAttendence(option: EventOptionData, user: UserData): Attendence {
  if (user.attending.includes(option.isoStart)) { return Attendence.Yes; }
  if (user.maybe.includes(option.isoStart)) { return Attendence.Maybe; }
  return Attendence.No;
}

export function updateAttendence(
  option: EventOptionData,
  user: UserData,
  attendence: Attendence,
): UserData {
  const newUser = { ...user, };
  newUser.attending = newUser.attending.filter(iso => iso !== option.isoStart);
  newUser.maybe = newUser.maybe.filter(iso => iso !== option.isoStart);
  if (attendence === Attendence.Yes) { newUser.attending.push(option.isoStart); }
  if (attendence === Attendence.Maybe) { newUser.maybe.push(option.isoStart); }
  return newUser;
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
