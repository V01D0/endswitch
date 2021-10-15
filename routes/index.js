import express from 'express';
import verifyRoute from './verify.js';

export function init(app) {
  app.get('/', function (req, res) {
    res.render('home');
  });

  app.use('/verify', verifyRoute);
}
