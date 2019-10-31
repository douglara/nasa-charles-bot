const builder = require('botbuilder');

import connector from '../lib/connector';
import DialogController from '../app/controllers/DialogController';

var inMemoryStorage = new builder.MemoryBotStorage();
const bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);

new DialogController(bot);

export default bot;
