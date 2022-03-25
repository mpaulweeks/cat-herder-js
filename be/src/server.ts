import { isMonday, RequestPost, ResponseGet } from '@mpaulweeks/cat-shared';
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
      const data = await this.manager.get(sid);
      if (!data) {
        return res.status(404).send({});
      }
      const resBody: ResponseGet = {
        data,
      };
      res.send({
        ...resBody,
        params: req.params,
        isMonday: isMonday(date),
      });
    });
    router.post('/api/:group/:date', async (req, res) => {
      const { group, date } = req.params;
      const sid = this.manager.sid(group, date);
      const reqBody: RequestPost = req.body;
      const data = await this.manager.update(sid, reqBody.user);
      if (!data) {
        return res.status(404).send({});
      }
      const resBody: ResponseGet = {
        data,
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
      const resBody: ResponseGet = {
        data,
      };
      res.send(resBody);
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
