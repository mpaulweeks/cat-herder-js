import express from 'express';
import { EmailAuthor } from './author';
import 'dotenv/config';
import { EnvConfig } from './types';
import { AwsSes } from './emailer';
import { getNextMonday } from './date';

export class WebServer {
  app = express();

  constructor(readonly port: number) {
    this.app.use(express.json());
    this.setRoutes();
    this.listen()
  }

  private setRoutes() {
    const { app } = this;
    app.get('/email/:group', async (req, res, next) => {
      const { group } = req.params;
      const env = process.env as EnvConfig;
      try {
        const author = new EmailAuthor(env.projectId, group);
        const emailArgs = await author.getEmailArgs(getNextMonday(new Date)); // todo
        const ses = new AwsSes(env);
        await ses.send(emailArgs);
        res.send(emailArgs);
      } catch (err) {
        return res.status(400).send({ error: (err as Error).message, });
      }
    });
  }

  private listen() {
    const { app, port } = this;
    app.listen(port, () => {
      console.log('Server started on port', port);
    });
  }
}
