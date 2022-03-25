import { isMonday, RequestPost, ResponseGet } from '@mpaulweeks/cat-shared';
import express from 'express';

export class Server {
  private app = express();
  constructor() {
    const router = express.Router();

    router.get('/api/:group/:date', async (req, res) => {
      const { group, date } = req.params;
      const data: ResponseGet = {
        data: {
          events: [],
          users: [],
        },
      };
      res.send({
        ...data,
        params: req.params,
        isMonday: isMonday(date),
      });
    });
    router.post('/api/:group/:date', async (req, res) => {
      const data: RequestPost = req.body;
      console.log(data);
      // todo merge data and persist to store
      res.send(data);
    });
    router.delete('/api/:group/:date/:uid', async (req, res) => {
      const { group, date, uid } = req.params;
      res.send({
        params: req.params,
        data: 'todo',
      });
    });

    // first use takes priority over future ones
    this.app.use(express.json);
    this.app.use(router);
    this.app.use(express.static('public'));
    this.app.use(async (req, res) => {
      res.status(404).send({
        error: `Not found: ${req.path}`,
      });
  });

    // todo send emails
  }

  listen(port: number) {
    this.app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`server started at http://localhost:${port}`);
    });
  }
}
