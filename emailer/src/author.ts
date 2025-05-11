import fetch from 'node-fetch';
import { getEventID, getPrettyDate } from './date';
import { EmailArgs } from './types';

type GroupData = {
  name: string;
};

export function trimStr(str: string): string {
  return str.trim().split('\n').map(line => line.trim()).join('\n');
}

export class EmailAuthor {
  constructor(
    readonly projectId: string,
    readonly groupId: string,
  ) { }

  async getEmailArgs(date: Date): Promise<EmailArgs> {
    const groupData = await this.getGroupData();

    const prettyDate = getPrettyDate(date);
    const eventID = getEventID(date);
    return {
      to: await this.getRecipients(),
      subject: `[Cat Herder] ${groupData.name} - ${prettyDate}`,
      body: this.getEmailBody(groupData, eventID),
    };
  }

  private async getGroupData(): Promise<GroupData> {
    const groupUrl = `https://${this.projectId}-default-rtdb.firebaseio.com/group/${this.groupId}.json`;
    const resp = await fetch(groupUrl);
    if (!resp.ok) { throw new Error(resp.status + ' EmailAuthor.getGroupData()'); };
    const data = await resp.json() as GroupData;
    return data;
  }

  private async getRecipients(): Promise<string[]> {
    const emailUrl = `https://${this.projectId}-default-rtdb.firebaseio.com/email.json`;
    const resp = await fetch(emailUrl);
    if (!resp.ok) { throw new Error(resp.status + ' EmailAuthor.getRecipients()'); };
    const data = await resp.json() as Record<string, string[]>;
    const groupEmails = data[this.groupId];
    return groupEmails;
  }

  private getEmailBody(group: GroupData, eventID: string): string {
    const herderUrl = `https://cat-herder.mpaulweeks.com/${this.groupId}/${eventID}`;
    const prettyUrl = herderUrl.replace('https://', '');
    return trimStr(`
      <h1>${group.name}</h1>
      <p>RSVP here: <a
        href="${herderUrl}"
        rel="noopener noreferrer"
        target="_blank"
      >${prettyUrl}</a></p>
      <p>To unsubscribe from this list, please email mpaulweeks@gmail.com</p>
    `);
  }
}
