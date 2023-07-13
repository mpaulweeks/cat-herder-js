import express from 'express';
import { sendForNextMonday } from './task';

export class WebServer {
  readonly app = express();

  constructor(readonly port: number) {
    this.app.use(express.json());
    this.setRoutes();
    this.listen()
  }

  private setRoutes() {
    const { app } = this;
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

  private listen() {
    const { app, port } = this;
    app.listen(port, () => {
      console.log('Server started on port', port);
    });
  }
}
