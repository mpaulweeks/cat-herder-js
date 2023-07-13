import { Updater } from "@toughlovearena/updater";
import cron from 'node-cron';
import { WebServer } from "./server.js";
import { sendForNextMonday } from "./task.js";

const updater = new Updater();
new WebServer(updater).listen(3001);
updater.cron();

// cron
const cronName = 'CatHerderEmailer';
const cronTasks = cron.getTasks();
if (cronTasks.has(cronName)) {
  console.log('cron already scheduled:', cronName);
} else {
  console.log('scheduling cron', cronName);
  // cron.schedule('*/2 * * * *', async () => { // test with every 5 minutes
  cron.schedule('0 2 * * 6', async () => { // Saturday at 2am
    await sendForNextMonday('edh');
  }, {
    scheduled: true,
    name: cronName,
    timezone: 'America/New_York',
  });
}
