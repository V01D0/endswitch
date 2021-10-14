import express from 'express';
import verifyRoute from './verify.js';

export function init(app) {
  app.get('/', function (req, res) {
    res.redirect('/home');
  });

  app.use('/verify', verifyRoute);
}
