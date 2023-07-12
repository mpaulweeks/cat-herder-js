export type AwsSesConfig = {
  from: string;
  key: string;
  secret: string;
}

export type EmailArgs = {
  to: string | string[];
  subject: string;
  body: string;
}
