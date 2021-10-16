import sgMail from '@sendgrid/mail';
import config from '../config/index.js';
import { createRequire } from 'module';

sgMail.setApiKey(config.sendgrid.apiKey);

export default class MailerService {
  constructor() {}

  async endSwitch() {
    const require = createRequire(import.meta.url);
    const data = require('../data/template.json');
    try {
      for (const [key, value] of Object.entries(data['users'])) {
        await this.sendMail(value);
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendVerificationMail(token) {
    let data = {
      to: config.verificationEmail,
      subject: 'Please verify existence',
      text: 'Verify your existence',
      html: `Click <a href="${config.domain}/verify?token=${token}">here</a> to verify!`,
    };
    await this.sendMail(data);
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
