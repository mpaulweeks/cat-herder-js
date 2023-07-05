import { EventUpdate, FirebaseApi } from "./apiFirebase";
import { createSchedule } from "./schedule";
import { EventLookup, EventScheduleData, UserData, UserDraft } from "./types";

export class EventApi {
  constructor(readonly init: EventLookup) {}

  connect(cb: EventUpdate) {
    return FirebaseApi.instance.connect(this.init, this.defaultEvent, cb);
  }
  update(user: UserData) {
    return FirebaseApi.instance.updateUser(this.init, user);
  }
  create(draft: UserDraft) {
    const now = Date.now();
    const user: UserData = {
      ...draft,
      created: now,
      uid: `user-${now}`,
    };
    return this.update(user);
  }

  get defaultEvent(): EventScheduleData {
    return createSchedule(this.init);
  }
}
