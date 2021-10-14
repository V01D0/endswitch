import VerifyService from '../services/verify.js';
import bree from './index.js';

const verifyInstance = new VerifyService();
try {
  if (verifyInstance.verifySwitch()) {
  } else {
    verifyInstance.initiateSwitch();
    await bree.start('mailer');
  }
} catch (e) {
  console.log(e);
}
