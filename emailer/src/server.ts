import express from 'express';
import { sendForNextMonday } from './task';
import { Updater } from '@toughlovearena/updater';
import { EnvConfig } from './types';
import { EmailAuthor } from './author';
import { getNextMonday } from './date';

export class WebServer {
  readonly app = express();

  constructor(readonly updater: Updater) {
    this.app.use(express.json());
    this.setRoutes();
  }

  private setRoutes() {
    const { app } = this;
    const { updater } = this;
    app.get('/', (req, res) => {
      res.redirect(302, req.baseUrl + '/health');
    });
    app.get('/health', async (req, res) => {
      const gitHash = await updater.gitter.hash();
      const data = {
        gitHash,
        started: new Date(updater.startedAt),
        testVer: 0,
      };
      res.send(data);
    });
    app.post('/preview/:group', async (req, res, next) => {
      const { group } = req.params;
      const env = process.env as EnvConfig;
      const author = new EmailAuthor(env.projectId, group);
      const emailArgs = await author.getEmailArgs(getNextMonday(new Date));
      res.send(emailArgs);
    });
    app.post('/email/:group', async (req, res, next) => {
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
