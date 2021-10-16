import expressLoader from './express.js';
import breeLoader from './bree.js';

export default async function init(app) {
  await expressLoader(app);
  console.log('Express Initialized');
  await breeLoader();
  console.log('Bree Initalized');
}
