import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import * as FB from "firebase/database";
import { FirebaseConfig } from "./config";
import { CategoryData, DatabaseData, EventLookup, EventOptionData, EventScheduleData, UserData } from "./types";

export type EventUpdate = (data: EventScheduleData) => void;

export class FirebaseApi {
  private static _instance: FirebaseApi | undefined;
  static get instance() {
    return this._instance ?? (this._instance = new FirebaseApi());
  }

  app = initializeApp(FirebaseConfig);
  analytics = getAnalytics(this.app);
  database = FB.getDatabase(this.app);
  private constructor() {}

  async listEmails(category: string): Promise<string[]> {
    const categoryRef = FB.ref(this.database, `email/${category}`);
    const categorySnapshot = await FB.get(categoryRef);
    const categoryData: CategoryData = await categorySnapshot.val();
    return Object.keys(categoryData);
  }

  // todo re-org db
  async listCategories(): Promise<string[]> {
    const dbRef = FB.ref(this.database, `db`);
    const dbSnapshot = await FB.get(dbRef);
    const dbData: DatabaseData = await dbSnapshot.val();
    return Object.keys(dbData);
  }

  // todo re-org db
  async listCategoryEvents(category: string): Promise<string[]> {
    const categoryRef = FB.ref(this.database, `db/${category}`);
    const categorySnapshot = await FB.get(categoryRef);
    const categoryData: CategoryData = await categorySnapshot.val();
    return Object.keys(categoryData);
  }

  async updateOptions(init: EventLookup, options: EventOptionData[]): Promise<void> {
    const optionsRef = FB.ref(this.database, `db/${init.category}/${init.eventID}/options`);
    await FB.set(optionsRef, options);
  }

  async removeUser(init: EventLookup, user: UserData): Promise<void> {
    const userRef = FB.ref(this.database, `db/${init.category}/${init.eventID}/user/${user.uid}`);
    await FB.remove(userRef);
  }

  async updateUser(init: EventLookup, user: UserData): Promise<void> {
    const userRef = FB.ref(this.database, `db/${init.category}/${init.eventID}/user/${user.uid}`);
    await FB.set(userRef, user);
  }

  async connect(init: EventLookup, defaultEvent: EventScheduleData, cb: EventUpdate): Promise<FB.Unsubscribe> {
    const eventRef = FB.ref(this.database,  `db/${init.category}/${init.eventID}`);

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
