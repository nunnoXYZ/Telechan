const TeleBot = require('telebot');
const config = require('./config');

const bot = new TeleBot({
  token: config.token, // Add telegram token bot here.
  sleep: 1000, // Optional. How often check updates (in ms).
  timeout: 0, // Optional. Update pulling timeout (0 - short polling).
  limit: 100, // Optional. Limits the number of updates to be retrieved.
  retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
});

// console logs
bot.on('text', function(msg) {
  console.log(`[Logs] ${ msg.from.first_name } ${ msg.chat.id } ${ msg.text }`);
});

// ping telechan
bot.on('/ping', msg => {
  var id = msg.chat.id;
  // let id = @telechantesting;
  let firstName = msg.from.first_name;
  return bot.sendMessage(id, `Pong, ${ firstName }! Testing`);
});

bot.on('/about', msg => {
  let id = msg.from.id;
  let reply = msg.message_id;
  const execSync = require('child_process').execSync;
  uptime = execSync('uptime');
  return bot.sendMessage(id, `Telechan v0.1` + '\n' + uptime, { reply });

});

bot.connect();
