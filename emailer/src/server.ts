import express from 'express';
import { sendForNextMonday } from './task';
import { Updater } from '@toughlovearena/updater';

export class WebServer {
  readonly app = express();

  constructor(readonly updater: Updater) {
    this.app.use(express.json());
    this.setRoutes();
  }

  private setRoutes() {
    const { app } = this;
    const { updater } = this;
    app.get('/health', async (req, res) => {
      const gitHash = await updater.gitter.hash();
      const data = {
        gitHash,
        started: new Date(updater.startedAt),
        testVer: 0,
      };
      res.send(data);
    });
    app.get('/email/:group', async (req, res, next) => {
      const { group } = req.params;
      try {
        const emailArgs = sendForNextMonday(group);
        res.send(emailArgs);
      } catch (err) {
        return res.status(400).send({ error: (err as Error).message, });
      }
    });
  }

  listen(port: number) {
    const { app } = this;
    app.listen(port, () => {
      console.log('Server started on port', port);
    });
  }
}
