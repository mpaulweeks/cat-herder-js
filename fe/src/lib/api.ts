import { DraftSchedule, GetScheduleResponse, PostScheduleRequest, PostScheduleResponse, PutScheduleRequest, PutScheduleResponse, Schedule, User } from "@mpaulweeks/cat-shared";

class ApiSingleton {
  private readonly baseUrl = 'http://localhost:8000/api';

  private scheduleUrl(args: {
    group: string;
    dateStr: string;
  }) {
    return `${this.baseUrl}/${args.group}/${args.dateStr}`;
  }

  async get(args: {
    group: string;
    dateStr: string;
  }): Promise<Schedule | undefined> {
    try {
      const resp = await fetch(this.scheduleUrl(args));
      const data: GetScheduleResponse = await resp.json();
      return data.schedule;
    } catch (err) {
      console.log(err);
    }
  }

  async create(args: {
    group: string;
    dateStr: string;
    draft: DraftSchedule;
  }): Promise<Schedule> {
    const reqBody: PostScheduleRequest = { draft: args.draft, };
    const resp = await fetch(this.scheduleUrl(args), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    const data: PostScheduleResponse = await resp.json();
    return data.schedule;
  }

  async update(args: {
    group: string;
    dateStr: string;
    user: User;
  }): Promise<Schedule> {
    const reqBody: PutScheduleRequest = { user: args.user, };
    const resp = await fetch(this.scheduleUrl(args), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    const data: PutScheduleResponse = await resp.json();
    return data.schedule;
  }
}

export const API = new ApiSingleton();
