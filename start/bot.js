const builder = require('botbuilder');

import connector from '../lib/connector';
import RegistrationController from '../app/controllers/RegistrationController';

var inMemoryStorage = new builder.MemoryBotStorage();
const bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage);

new RegistrationController(bot);

export default bot;
