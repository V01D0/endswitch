import express from 'express';
import loaders from './loaders/index.js';
import * as routes from './routes/index.js';
import config from './config/index.js';

async function startServer() {
  const app = express();

  await loaders(app);
  routes.init(app);
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();
