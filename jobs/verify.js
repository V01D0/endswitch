import VerifyService from '../services/verify.js';
import MailerService from '../services/mailer.js';

const mailerInstance = new MailerService();
const verifyInstance = new VerifyService();
try {
  if (verifyInstance.verifySwitch()) {
    // await mailerInstance.endSwitch();
    console.log('act');
  } else {
    await verifyInstance.initiateSwitch();
  }
} catch (e) {
  console.log(e);
}
