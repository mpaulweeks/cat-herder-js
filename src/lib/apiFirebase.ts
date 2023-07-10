import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import * as FB from "firebase/database";
import { FirebaseConfig } from "./config";
import { EventLookup, EventOptionData, EventScheduleData, GroupData, UserData } from "./types";

export type EventUpdate = (data: EventScheduleData) => void;

export class FirebaseApi {
  private static _instance: FirebaseApi | undefined;
  static get instance() {
    return this._instance ?? (this._instance = new FirebaseApi());
  }

  app = initializeApp(FirebaseConfig);
  analytics = getAnalytics(this.app);
  database = FB.getDatabase(this.app);
  private constructor() {
    // must use static instance
  }

  // todo move to using Google Group API? easier to manage?
  async listEmails(group: string): Promise<string[]> {
    const groupRef = FB.ref(this.database, `email/${group}`);
    const groupSnapshot = await FB.get(groupRef);
    const groupData: string[] = await groupSnapshot.val();
    return Object.values(groupData); // works on both array and record
  }

  // this loads all events for that group
  // not ideal but better than denormalizing for now
  async listGroupEvents(group: string): Promise<string[]> {
    const groupRef = FB.ref(this.database, `db/${group}`);
    const groupSnapshot = await FB.get(groupRef);
    const groupData: GroupData = await groupSnapshot.val();
    return Object.keys(groupData);
  }

  async updateOptions(init: EventLookup, options: EventOptionData[]): Promise<void> {
    const optionsRef = FB.ref(this.database, `db/${init.group}/${init.eventID}/options`);
    await FB.set(optionsRef, options);
  }

  async removeUser(init: EventLookup, user: UserData): Promise<void> {
    const userRef = FB.ref(this.database, `db/${init.group}/${init.eventID}/user/${user.uid}`);
    await FB.remove(userRef);
  }

  async updateUser(init: EventLookup, user: UserData): Promise<void> {
    const userRef = FB.ref(this.database, `db/${init.group}/${init.eventID}/user/${user.uid}`);
    await FB.set(userRef, user);
  }

  async connect(init: EventLookup, defaultEvent: EventScheduleData, cb: EventUpdate): Promise<FB.Unsubscribe> {
    const eventRef = FB.ref(this.database,  `db/${init.group}/${init.eventID}`);

    const event = await FB.get(eventRef);
    if (!event.exists()) {
      await FB.set(eventRef, defaultEvent);
    }

    const unsub = FB.onValue(eventRef, snapshot => {
      const data: EventScheduleData = snapshot.val();
      const safeEvent = {
        ...defaultEvent, // prefill default incase users is empty
        ...data,
      };
      safeEvent.options.forEach(opt => {
        opt.highlight = !!opt.highlight;
      });
      Object.values(safeEvent.user).forEach(u => {
        u.attending = u.attending ?? [];
        u.maybe = u.maybe ?? [];
      })
      cb(safeEvent);
    });
    return unsub;
  }
}
