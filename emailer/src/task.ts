import 'dotenv/config';
import { EmailAuthor } from "./author";
import { getNextMonday } from "./date";
import { AwsSes } from "./emailer";
import { EmailArgs, EnvConfig } from "./types";

export async function sendForNextMonday(group: string): Promise<EmailArgs> {
  const env = process.env as EnvConfig;
  const author = new EmailAuthor(env.projectId, group);
  const emailArgs = await author.getEmailArgs(getNextMonday(new Date)); // todo
  const ses = new AwsSes(env);
  await ses.send(emailArgs);
  return emailArgs;
}
