import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { FirebaseConfig } from "./config";
import { EventLookup, PlanningData, UserData } from "./newTypes.ts";

export type EventUpdate = (data: PlanningData) => void;

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
    const userRef = ref(this.database, `db/${init.category}/${init.event}/user/${user.uid}`);
    await set(userRef, user);
  }

  async connect(init: EventLookup, cb: EventUpdate): Promise<void> {
    const eventRef = ref(this.database,  `db/${init.category}/${init.event}`);

    const event = await get(eventRef);
    if (!event.exists()) {
      const eventData: PlanningData = {
        options: [], // todo
        user: {},
      }
      await set(eventRef, eventData);
    }
    onValue(eventRef, snapshot => {
      cb(snapshot.val());
    });
  }
}
