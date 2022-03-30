import { Schedule } from "@mpaulweeks/cat-shared";
import fs from 'fs';
import path from "path";

export interface IStore {
  get(sid: string): Promise<Schedule | undefined>;
  create(data: Schedule): Promise<void>;
  update(data: Schedule): Promise<void>;
}

export class LocalFileStore implements IStore {
  private readonly localFilePath = path.join(__dirname, '../tmp');
  private getPath(sid: string) {
    return `${this.localFilePath}/${sid}.json`;
  }
  private stringify(schedule: Schedule) {
    return JSON.stringify(schedule, null, 2);
  }

  async get(sid: string): Promise<Schedule | undefined> {
    try {
      const file = await fs.promises.readFile(this.getPath(sid));
      return JSON.parse(file.toString());
    } catch (err) {
      return undefined;
    }
  }
  async create(schedule: Schedule): Promise<void> {
    return this.update(schedule);
  }
  async update(schedule: Schedule): Promise<void> {
    try {
      const path = this.getPath(schedule.sid);
      await fs.promises.mkdir(path.split('/').slice(0, -1).join('/'), { recursive: true, });
      await fs.promises.writeFile(path, this.stringify(schedule));
    } catch (err) {
      throw err;
    }
  }
}
