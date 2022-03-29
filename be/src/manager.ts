import { Schedule, User } from "@mpaulweeks/cat-shared";
import { IStore, LocalFileStore } from "./store";

export class Manager {
  constructor(
    private readonly store: IStore = new LocalFileStore(),
  ) { }

  sid(group: string, date: string) {
    return `${group}/${date}`;
  }
  async get(sid: string) {
    return this.store.get(sid);
  }
  async create(schedule: Schedule): Promise<void> {
    await this.store.create(schedule);
  }
  async update(sid: string, user: User): Promise<Schedule | void> {
    const data = await this.store.get(sid);
    if (data) {
      this.updateScheduleUser(data, user);
      await this.store.update(data);
    }
    return data;
  }
  async delete(sid: string, uid: string): Promise<Schedule | void> {
    const data = await this.store.get(sid);
    if (data) {
      this.deleteScheduleUser(data, uid);
      await this.store.update(data);
    }
    return data;
  }

  private updateScheduleUser(data: Schedule, user: User): void {
    let found = false;
    data.users.forEach(u => {
      if (u.uid === user.uid) {
        found = true;
        u.name = user.name;
        u.events = user.events;
        u.updated = user.updated;
      }
    });
    if (!found) {
      data.users.push(user);
    }
  }
  private deleteScheduleUser(data: Schedule, uid: string): void {
    data.users = data.users.filter(u => u.uid !== uid);
  }
}
