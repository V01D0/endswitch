import express from 'express';
import cookieParser from 'cookie-parser';
import verifyController from '../services/verify.js';
import csurf from 'csurf';

let router = express.Router();

router.get('/', (req, res) => {
  res.send('Verify with endswitch!');
});

router.use(cookieParser());
router.use(csurf({ cookie: true }));

router.post('/', (req, res) => {
  res.send('Testing!');
});
