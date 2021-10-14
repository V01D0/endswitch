import sgMail from '@sendgrid/mail';
import config from '../config/index.js';

sgMail.setApiKey(config.sendgrid.apiKey);

export default class MailerService {
  constructor() {}

  async endSwitch(data) {
    (data['from'] = config.sendgrid.email),
      sgMail
        .send(data)
        .then((response) => {
          console.log(`${data['to']} : ${response[0].statusCode}`);
        })
        .catch((error) => {
          console.error(error);
        });
  }
}
