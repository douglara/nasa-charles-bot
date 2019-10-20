const restify = require("restify");
const builder = require("botbuilder");
const axios = require('axios');

// Configuração do Server via Restify:
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log("%s Aplicação executando na porta %s", server.name, server.url);
});

// Criação do chat connector para comunicar com o serviço do Bot Framework:
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Endpoint para executar as mensagens para os usuários
server.post("/api/messages", connector.listen());
var inMemoryStorage = new builder.MemoryBotStorage();
const bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage); 



// Bloco de Dialogs: 
bot.dialog("/", [session => {
    builder.Prompts.text(session, "Oi! Para reportar algum incidente digite 1");
 }, (session, results) => {
    let resposta = results.response;
    if (resposta == '1') {
        session.beginDialog("/reportIssue");
    }
    else {
        session.beginDialog("/");
    }
 }]);
 
 bot.dialog("/reportIssue", [session => {
    builder.Prompts.text(session, "Por favor descreva o que ocorreu");
 }, (session, results) => {
    let incidente = results.response;
    session.endDialog(`Obrigado por avisar, incidente registrado com sucesso.`);
 }]);
