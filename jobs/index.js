import ms from 'ms';
import Bree from 'bree';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bree = new Bree({
  jobs: [
    'verify',
    {
      name: 'verify-main',
      interval: 'every fourteen days',
      path: path.join(__dirname, './verify.js'),
    },
    {
      name: 'mailer',
    },
  ],
});

export default bree;
