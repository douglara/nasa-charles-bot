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
    builder.Prompts.text(session, "Oi. Eu sou o Charles!\n\nMinha missão é ajudar você e sua família a viverem em segurança e o que fazer numa situação de emergência!\n\nPara receber alertas na sua região digite 1\n\nPara cadastrar um alerta digite 2");
 }, (session, results) => {
    let resposta = results.response;
    if (resposta == '1') {
        session.beginDialog("/reportIssue");
    }
    else if (resposta == '2') {
        session.beginDialog("/reportIssue");
    }
    else {
        session.beginDialog("/");
    }
 }]);
 
 bot.dialog("/reportIssue", [session => 
    {
    builder.Prompts.text(session, "Por favor envie sua localização");
    }, (session, results) => {
    let incidente = results.response;
    }
]);

 bot.dialog("/registerAlerts", [session => 
    {
    builder.Prompts.text(session, "Digite o nome do seu bairro para cadastro.");
    }, (session, results) => {
    let incidente = results.response;
    session.endDialog(`Obrigado! Qualquer situação de risco nos te avisaremos.`);
    }

]);