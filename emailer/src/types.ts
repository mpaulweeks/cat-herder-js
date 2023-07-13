export type AwsSesConfig = {
  from: string;
  awsKey: string;
  awsSecret: string;
}
export type EnvConfig = AwsSesConfig & {
  projectId: string;
}

export type EmailArgs = {
  to: string | string[];
  subject: string;
  body: string;
}
