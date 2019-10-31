const builder = require('botbuilder');

class DialogController {
  constructor(bot) {
    this.bot = bot;

    this.handleFunctions();
  }

  handleFunctions() {
    this.bot.dialog('/', [
      session => {
        builder.Prompts.text(
          session,
          'Oi! Para reportar algum incidente digite 1'
        );
      },
      (session, results) => {
        let resposta = results.response;
        if (resposta == '1') {
          session.beginDialog('/reportIssue');
        } else {
          session.beginDialog('/');
        }
      },
    ]);

    this.bot.dialog('/reportIssue', [
      session => {
        builder.Prompts.text(session, 'Por favor descreva o que ocorreu');
      },
      (session, results) => {
        let incidente = results.response;
        session.endDialog(
          `Obrigado por avisar, incidente registrado com sucesso.`
        );
      },
    ]);
  }
}

export default DialogController;
