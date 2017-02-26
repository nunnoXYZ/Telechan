const TeleBot = require('telebot');
const config = require('./config');

const bot = new TeleBot({
  token: process.TOKEN, // Add telegram token bot here.
  sleep: 1000, // Optional. How often check updates (in ms).
  timeout: 0, // Optional. Update pulling timeout (0 - short polling).
  limit: 100, // Optional. Limits the number of updates to be retrieved.
  retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
});

// Logs on console
bot.on('text', function(msg) {
  console.log(`[Logs] ${ msg.from.first_name } ${ msg.chat.id } ${ msg.text }`);
});

// About = personal text + server uptime + system memory
bot.on('/about', msg => {
  let id = msg.chat.id;
  let reply = msg.message_id;
  const execSync = require('child_process').execSync;
  uptime = execSync('uptime');
  mem = execSync('cat /proc/meminfo | grep MemTotal');
  return bot.sendMessage(id, `Telechan kit v0.1` + '\n' + uptime + '\n' + temp + '\n' + mem, { reply });

});

// Bitcoin price
bot.on('/btc', msg => {
  let id = msg.chat.id;
  let reply = msg.message_id;

  const execSync = require('child_process').execSync;
  btc = execSync('btc-price'); //  npm package need (btc-price)
  return bot.sendMessage(id, btc);
});

// Random img
const API2 = 'https://source.unsplash.com/random';

bot.on(['/img'], function(msg) {

  let promise;
  let id = msg.chat.id;

  promise = bot.sendPhoto(id, API2 , { fileName: 'randompic.jpg' });


  bot.sendAction(id, 'upload_photo');

  return promise.catch(error => {
    console.log('[error]', error);

    bot.sendMessage(id, `😿 Error : ${ error }`);
  });
});

// New code here


bot.connect();
