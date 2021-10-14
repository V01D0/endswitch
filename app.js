import express from 'express';

import loaders from './loaders/index.js';

async function startServer() {
  const app = express();

  await loaders(app);

  app.listen(1000, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();