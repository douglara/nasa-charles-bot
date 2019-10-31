const builder = require('botbuilder');

import ChatConnectorConfig from '../config/ChatConnectorConfig';

const connector = new builder.ChatConnector(ChatConnectorConfig);

export default connector;
