import { GetScheduleResponse, PostScheduleRequest, PostScheduleResponse, PutScheduleRequest, PutScheduleResponse, Schedule } from '@mpaulweeks/cat-shared';
import { Updater } from '@toughlovearena/updater';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { Manager } from './manager';

export class Server {
  private app = express();
  constructor(
    updater: Updater,
    private readonly manager = new Manager(),
  ) {
    const router = express.Router();

    router.get('/api', (req, res) => {
      res.redirect('/api/health');
    });
    router.get('/api/health', async (req, res) => {
      const gitHash = await updater.gitter.hash();
      const data = {
        gitHash,
        started: new Date(updater.startedAt),
      };
      res.send(data);
    })

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
        sid,
        group,
        scheduleDate: date,
        name: reqBody.draft.name,
        description: reqBody.draft.description,
        events: reqBody.draft.events,
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
    this.app.use(cors({
      origin: (origin, callback) => {
        const origins = [
          undefined, // npm run start
          'http://localhost:3000', // fe dev
          'http://localhost:8000', // built script
          'https://cat-herder.mpaulweeks.com',
          'https://cat-herder-js.mpaulweeks.com',
        ];
        if (origins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS: ${origin}`));
        }
      }
    }));
    this.app.use(express.json());

    // first try routes, then assets
    this.app.use(router);
    this.app.use(express.static(path.join(__dirname, '../public')));

    // catch all
    this.app.use(async (req, res) => {
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
