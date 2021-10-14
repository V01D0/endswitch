import express from 'express';

export default async (app) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(express.urlencoded({ extended: true }));
  return app;
};
