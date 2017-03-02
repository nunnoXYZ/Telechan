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

// Send URL
bot.on('/url', url => {
  let [link, test] = url.text.split(' ');
  let chan = config.channelName;
  bot.sendMessage(chan, `${ link } ${ test }!`);
});


// ping telechan bot
bot.on('/ping', msg => {
  // var id = msg.chat.id;
  var chan = config.channelName;
  console.log(chan)
  let firstName = msg.from.first_name;
  bot.sendMessage(chan, `https://desarrolloactivo.com/articulos/berryboot/`);
});

bot.on('/about', msg => {
  let id = msg.from.id;
  let reply = msg.message_id;
  const execSync = require('child_process').execSync;
  uptime = execSync('uptime');
  bot.sendMessage(id, `Telechan v0.1` + '\n' + uptime, { reply });

});

bot.connect();
