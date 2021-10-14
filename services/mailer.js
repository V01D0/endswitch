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
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        });
  }
}
