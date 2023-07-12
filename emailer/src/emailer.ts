import ses from 'node-ses';
import fs from 'fs';
import { AwsSesConfig, EmailArgs } from './types';

export class AwsSes {
  private readonly sesClient: ses.Client;
  constructor(private readonly config: AwsSesConfig) {
    this.sesClient = ses.createClient({
      key: config.key,
      secret: config.secret,
    });
  }

  async send(args: EmailArgs) {
    return new Promise<void>((resolve, reject) => {
      this.sesClient.sendEmail(
        {
          to: args.to,
          from: this.config.from,
          subject: args.subject,
          message: args.body,
        },
        (err, data, res) => {
          if (err) {
            // tslint:disable-next-line: no-console
            // console.log('ses err:', err);
            reject(err);
          } else {
            // tslint:disable-next-line: no-console
            // console.log('ses:', data, res);
            resolve();
          }
        },
      );
    });
  }

  // todo read from env?
  static fromFile(): AwsSes {
    const buffer = fs.readFileSync('auth.json');
    const config: AwsSesConfig = JSON.parse(buffer.toString());
    return new AwsSes(config);
  }
}
