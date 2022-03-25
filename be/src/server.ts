import express from 'express';

interface RequestPost {

}

export class Server {
  private app = express();
  constructor() {
    const router = express.Router();

    router.get('/api', async (req, res) => {
      res.send({
        data: 'todo',
      });
    });
    router.post('/api', async (req, res) => {
      const data: RequestPost = req.body;
      console.log(data);
      // todo merge data and persist to store
    });

    this.app.use(router);
    this.app.use('/', express.static('public'))
    this.app.use(express.json);

    // todo send emails
  }

  listen(port: number) {
    this.app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`server started at http://localhost:${port}`);
    });
  }
}
