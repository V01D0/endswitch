import sgMail from '@sendgrid/mail';
import config from '../config/index.js';
import { createRequire } from 'module';

sgMail.setApiKey(config.sendgrid.apiKey);

export default class MailerService {
  constructor() {}

  async endSwitch() {
    const require = createRequire(import.meta.url);
    const data = require('../data/template.json');
    for (const [key, value] of Object.entries(data['users'])) {
      this.sendMail(value);
    }
  }
  async sendMail(data) {
    data['from'] = config.sendgrid.email;
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
