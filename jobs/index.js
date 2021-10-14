import ms from 'ms';
import Bree from 'bree';

const bree = new Bree({
  jobs: [
    'verify',
    {
      name: 'verify',
      interval: 'every 14 days',
    },
  ],
});
