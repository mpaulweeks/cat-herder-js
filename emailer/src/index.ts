import { Updater } from "@toughlovearena/updater";
import cron from 'node-cron';
import { WebServer } from "./server.js";
import { sendForNextMonday } from "./task.js";

console.log('Hello cron!');

new WebServer(3001);
new Updater().cron();

// cron
const cronName = 'CatHerderEmailer';
const cronTasks = cron.getTasks();
if (cronTasks.has(cronName)) {
  console.log('cron already scheduled:', cronName);
} else {
  // cron.schedule('0 6 * * 6', async () => {
  cron.schedule('*/5 * * * *', async () => { // test with every 5 minutes
    await sendForNextMonday('edh');
  }, {
    scheduled: true,
    name: cronName,
    timezone: 'America/New_York',
  });
}
