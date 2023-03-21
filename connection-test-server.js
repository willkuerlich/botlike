const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const executablePath = '/usr/bin/google-chrome-stable';

const client = new Client({
  puppeteer: {
    executablePath,
    headless: true,
  },
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  // Generate and scan this code with your phone
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', (args) => {
  console.log('Auth Completed! args: ', args);
});

client.on('ready', (args) => {
  console.log('Client is ready! args: ', args);
});

client.on('message', (msg) => {
  console.log('got message: ', msg);
  if (msg.body == '!ping') {
    msg.reply('pong');
  }
});

client.initialize();
