import { EventUpdate, FirebaseApi } from "./apiFirebase";
import { createSchedule } from "./schedule";
import { EventLookup, EventOptionData, EventScheduleData, UserData, UserDraft } from "./types";

export class EventApi {
  constructor(readonly init: EventLookup) {}

  connect(cb: EventUpdate) {
    return FirebaseApi.instance.connect(this.init, this.defaultEvent, cb);
  }
  removeUser(user: UserData) {
    return FirebaseApi.instance.removeUser(this.init, user);
  }
  updateUser(user: UserData) {
    return FirebaseApi.instance.updateUser(this.init, user);
  }
  createUser(draft: UserDraft) {
    const now = Date.now();
    const user: UserData = {
      ...draft,
      created: now,
      uid: `user-${now}`,
    };
    return this.updateUser(user);
  }

  updateOptions(options: EventOptionData[]) {
    return FirebaseApi.instance.updateOptions(this.init, options);
  }

  get defaultEvent(): EventScheduleData {
    return createSchedule(this.init);
  }
}
