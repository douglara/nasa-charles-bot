const builder = require('botbuilder');

import api from '../../lib/api';

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
          'Oi. Eu sou o Charles!\n\nMinha missão é ajudar você e sua família a viverem em segurança e saber o que fazer numa situação de emergência!😉✅\n\nEstou aprendendo a conversar mas enquanto isso você pode cadastrar regiões para receber alertas de situações de risco, basta digitar o CEP.'
        );
      },
      (session, { response }) => {
        if (response.length < 8 || isNaN(response)) {
          session.beginDialog('/invalidCEP');
        } else {
          session.beginDialog('/register');
        }
      },
    ]);

    this.bot.dialog('/invalidCEP', [
      session => {
        builder.Prompts.text(
          session,
          'Parece que você mandou um CEP no formato incorreto. Ele só pode ter números e deve conter 8 dígitos.'
        );
      },
      (session, { response }) => {
        if (response.length < 8 || isNaN(response)) {
          session.beginDialog('/invalidCEP');
        } else {
          session.beginDialog('/register');
        }
      },
    ]);

    this.bot.dialog('/register', [
      async session => {
        try {
          const { data } = await api.post('/users', {
            name: 'jean',
            number: '41997951150',
            cep: session.message.text,
          });

          if (data[0]) {
            session.endDialog(data[0].message);
          }

          const { region } = data;

          session.endDialog(
            `Cadastro para avisos no bairro ${region} criado com sucesso!`
          );
        } catch ({ response }) {
          const { data } = response;
          session.send(data.error);
          session.send('Certifique-se de informar um CEP da cidade');
          session.beginDialog('/registerRetry');
        }
      },
    ]);

    this.bot.dialog('/registerRetry', [
      session => {
        builder.Prompts.text(session, 'Vamos lá, tente enviar o CEP de novo');
      },
      (session, { response }) => {
        if (response.length < 8 || isNaN(response)) {
          session.beginDialog('/invalidCEP');
        } else {
          session.beginDialog('/register');
        }
      },
    ]);
  }
}

export default DialogController;
