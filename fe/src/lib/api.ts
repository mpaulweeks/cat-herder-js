import { Schedule } from "@mpaulweeks/cat-shared";

export class Api {
  private readonly baseUrl = 'http://localhost:8000/api';

  async get(group: string, date: string): Promise<Schedule | undefined> {
    try {
      const resp = await fetch(`${this.baseUrl}/${group}/${date}`);
      const data: Schedule = await resp.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
