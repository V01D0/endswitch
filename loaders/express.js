import express from 'express';
import exphbs from 'express-handlebars';

export default async (app) => {
  app.engine(
    'hbs',
    exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
    }),
  );
  app.set('view engine', 'hbs');
  app.use(express.urlencoded({ extended: true }));
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  return app;
};
