const TeleBot = require('telebot');
const config = require('./config');
const chan = config.channelName;

const adminID = config.adminlID;
const channelID = config.channelID;

const bot = new TeleBot({
  token: config.token, // Add telegram token bot here.
  sleep: 1000, // Optional. How often check updates (in ms).
  timeout: 0, // Optional. Update pulling timeout (0 - short polling).
  limit: 100, // Optional. Limits the number of updates to be retrieved.
  retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
});

// Admin Talk
bot.on('/admin', msg => {
  let adminId = adminID;
  let channelId = channelID;
  let id = msg.chat.id;
  if (adminId == msg.chat.id ){
    var getMessageRaw = JSON.stringify(msg.text);
    var obj1 = getMessageRaw.slice(7);
    obj2 = obj1.slice(0, -1);
    return bot.sendMessage(channelId, '⚠️' + obj2);
  }
});

// console logs
bot.on('text', function(msg) {
  console.log(`[Logs] ${ msg.from.first_name } ${ msg.chat.id } ${ msg.text }`);
});

// Send URL
bot.on('/url', url => {
  let [link, test] = url.text.split(' ');
  bot.sendMessage(chan, `${ link } ${ test }`);
});


// ping telechan bot
bot.on('/ping', msg => {
  bot.sendMessage(chan, `pong`);
});

// about
bot.on('/about', msg => {
  let id = msg.from.id;
  let reply = msg.message_id;
  const execSync = require('child_process').execSync;
  uptime = execSync('uptime');
  bot.sendMessage(id, `Telechan v0.1` + '\n' + uptime, { reply });

});

// ping telechan bot

bot.on('/ping' + `${ msg.text }` , msg => {
  let link = msg.text;
  // var id = msg.chat.id;
  bot.sendMessage(chan, link);
});

bot.connect();
