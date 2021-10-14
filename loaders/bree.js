import bree from '../jobs/index.js';
import Graceful from '@ladjs/graceful';

export default async () => {
  const graceful = new Graceful({ brees: [bree] });
  graceful.listen();
  bree.start();
};
