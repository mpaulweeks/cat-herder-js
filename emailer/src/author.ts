import fetch from 'node-fetch';
import { EmailArgs } from './types';

type EventData = {
  name: string;
  description: string;
};

export class EmailAuthor {
  constructor(
    readonly projectId: string,
    readonly group: string,
  ) { }

  async getEmailArgs(eventID: string): Promise<EmailArgs> {
    const dataUrl = `https://${this.projectId}-default-rtdb.firebaseio.com/db/${this.group}/${eventID}.json`;
    const resp = await fetch(dataUrl);
    const data = await resp.json() as EventData;

    return {
      to: await this.getRecipients(),
      subject: [data.name, data.description].join(' - '),
      body: this.getEmailBody(eventID, data),
    };
  }

  private async getRecipients(): Promise<string[]> {
    const emailUrl = `https://${this.projectId}-default-rtdb.firebaseio.com/email.json`;
    const resp = await fetch(emailUrl);
    const data = await resp.json() as Record<string, string[]>;
    const groupEmails = data[this.group];
    console.log('emails', groupEmails);
    // todo for temp testing
    return ['mpaulweeks@gmail.com'];
  }

  private getEmailBody(eventID: string, data: EventData): string {
    const eventUrl = `https://cat-herder-js.mpaulweeks.com/${this.group}/${eventID}.json`;
    return `
<h1>${data.name}</h1>

${data.description}

${eventUrl}

To unsubscribe from this list, please email mpaulweeks@gmail.com
    `.trim();
  }
}
