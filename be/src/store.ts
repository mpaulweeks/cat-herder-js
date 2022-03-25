import { Schedule } from "@mpaulweeks/cat-shared";

export class Store {
  async get(sid: string): Promise<Schedule | void> {
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
