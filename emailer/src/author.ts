import fetch from 'node-fetch';
import { EmailArgs } from './types';
import { getEventID, getPrettyDate } from './date';

type GroupData = {
  name: string;
};

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
    return `
      <h1>${group.name}</h1>
      <p>RSVP here: ${herderUrl}</p>
      <p>To unsubscribe from this list, please email mpaulweeks@gmail.com</p>
    `.trim().split('\n').map(line => line.trim()).join('\n');
  }
}
