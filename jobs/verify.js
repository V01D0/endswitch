import VerifyService from '../services/verify.js';
import MailerService from '../services/mailer.js';

const mailerInstance = new MailerService();
const verifyInstance = new VerifyService();

try {
  if (!verifyInstance.isEndswitchActivated()) {
    if (verifyInstance.verifySwitch()) {
      if (await mailerInstance.endSwitch()) {
        await verifyInstance.activateSwitch();
      }
    } else {
      let token = await verifyInstance.initiateSwitch();
      await mailerInstance.sendVerificationMail(token);
    }
  } else {
    process.kill(process.pid);
  }
} catch (e) {
  console.log(e);
}
