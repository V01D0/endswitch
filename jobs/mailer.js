import MailerService from '../services/mailer.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const data = require('../data/template.json');
const mailerInstance = new MailerService();

for (const [key, value] of Object.entries(data['users'])) {
  mailerInstance.endSwitch(value);
}
