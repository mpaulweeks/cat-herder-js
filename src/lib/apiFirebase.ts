import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import * as FB from "firebase/database";
import { FirebaseConfig } from "./config";
import { CategoryData, EventLookup, EventOptionData, EventScheduleData, UserData } from "./types";

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
    const categoryData: string[] = await categorySnapshot.val();
    return Object.values(categoryData); // works on both array and record
  }

  // this loads all events for that category
  // not ideal but better than denormalizing for now
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
