import { GetScheduleResponse, PostScheduleRequest, PostScheduleResponse, PutScheduleRequest, PutScheduleResponse, Schedule } from '@mpaulweeks/cat-shared';
import express from 'express';
import path from 'path';
import { Manager } from './manager';

export class Server {
  private app = express();
  constructor(
    private readonly manager = new Manager(),
  ) {
    const router = express.Router();

    router.get('/api/:group/:date', async (req, res) => {
      console.log('GET success');
      const { group, date } = req.params;
      const sid = this.manager.sid(group, date);
      const schedule = await this.manager.get(sid);
      if (!schedule) {
        return res.status(404).send({});
      }
      const resBody: GetScheduleResponse = {
        schedule,
      };
      res.send(resBody);
    });
    router.post('/api/:group/:date', async (req, res) => {
      const { group, date } = req.params;
      const sid = this.manager.sid(group, date);
      const reqBody: PostScheduleRequest = req.body;
      const schedule: Schedule = {
        ...reqBody.draft,
        sid,
        users: [],
      };
      await this.manager.create(schedule);
      const resBody: PostScheduleResponse = {
        schedule,
      };
      res.send(resBody);
    });
    router.put('/api/:group/:date', async (req, res) => {
      const { group, date } = req.params;
      const sid = this.manager.sid(group, date);
      const reqBody: PutScheduleRequest = req.body;
      const schedule = await this.manager.update(sid, reqBody.user);
      if (!schedule) {
        return res.status(404).send({});
      }
      const resBody: PutScheduleResponse = {
        schedule,
      };
      res.send(resBody);
    });
    router.delete('/api/:group/:date/:uid', async (req, res) => {
      const { group, date, uid } = req.params;
      const sid = this.manager.sid(group, date);
      const data = await this.manager.delete(sid, uid);
      if (!data) {
        return res.status(404).send({});
      }
      res.send({});
    });

    // middleware
    this.app.use((req, res, next) => {
      console.log(req.path);
      next();
    });
    this.app.use(express.json());

    // first try routes, then assets
    this.app.use(router);
    this.app.use(express.static(path.join(__dirname, 'public')));

    // catch all
    this.app.use("/*", async (req, res) => {
      res.status(404).send({
        error: `Not found: ${req.path}`,
      });
    });

    // todo cron to send emails
  }

  listen(port: number) {
    this.app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`server started at http://localhost:${port}`);
    });
  }
}
