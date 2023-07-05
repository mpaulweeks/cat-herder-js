import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, set, Unsubscribe } from "firebase/database";
import { FirebaseConfig } from "./config";
import { EventLookup, EventScheduleData, UserData } from "./types";

export type EventUpdate = (data: EventScheduleData) => void;

export class FirebaseApi {
  private static _instance: FirebaseApi | undefined;
  static get instance() {
    return this._instance ?? (this._instance = new FirebaseApi());
  }

  app = initializeApp(FirebaseConfig);
  analytics = getAnalytics(this.app);
  database = getDatabase(this.app);
  private constructor() {}

  async updateUser(init: EventLookup, user: UserData): Promise<void> {
    const userRef = ref(this.database, `db/${init.category}/${init.eventID}/user/${user.uid}`);
    await set(userRef, user);
  }

  async connect(init: EventLookup, defaultEvent: EventScheduleData, cb: EventUpdate): Promise<Unsubscribe> {
    const eventRef = ref(this.database,  `db/${init.category}/${init.eventID}`);

    const event = await get(eventRef);
    if (!event.exists()) {
      await set(eventRef, defaultEvent);
    }

    const unsub = onValue(eventRef, snapshot => {
      const data: EventScheduleData = snapshot.val();
      cb({
        ...defaultEvent, // prefill default incase users is empty
        ...data,
      });
    });
    return unsub;
  }
}
