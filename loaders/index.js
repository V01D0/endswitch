import expressLoader from './express.js';

export default async function init(app) {
  await expressLoader(app);
  console.log('Express Initialized');
}
