import { Schedule } from "@mpaulweeks/cat-shared";

export class Store {
  async get(sid: string): Promise<Schedule | undefined> {
    // todo
    return {
      events: [],
      users: [],
    };
  }
  async update(data: Schedule): Promise<void> {
    // todo
  }
}
