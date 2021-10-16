import express from 'express';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { celebrate, errors, Joi, Segments } from 'celebrate';
import verifyController from '../services/verify.js';

let router = express.Router();
router.use(cookieParser());
router.use(csurf({ cookie: true }));
router.get(
  '/',
  [
    celebrate({
      [Segments.QUERY]: {
        token: Joi.string().pattern(/[^w-]+/),
      },
    }),
    errors(),
  ],
  async (req, res) => {
    let verifyInstance = new verifyController();
    if (Object.keys(req.query).length > 0) {
      if (verifyInstance.getToken() === req.query.token) {
        let time = await verifyInstance.updateTime();
        let days = await verifyInstance.calculateDate(time);

        res.status(200);
        res.render('success', {
          csrfToken: req.csrfToken(),
          error: false,
          days: 14 - days,
        });
      } else {
        res.status(403);
        res.render('success', {
          csrfToken: req.csrfToken(),
          error: true,
          days: 0,
        });
      }
    } else {
      res.status(200);
      // await verifyInstance.verifyPassword('#activateM3');
      res.render('verify', { csrfToken: req.csrfToken() });
    }
  },
);

router.post(
  '/',
  [
    celebrate({
      [Segments.BODY]: {
        pass: Joi.string().pattern(/[^w-]+/),
        _csrf: Joi.string(),
      },
    }),
    errors(),
  ],
  async (req, res) => {
    let verifyInstance = new verifyController();
    if (Object.keys(req.body).length > 0 && req.body.pass) {
      if (await verifyInstance.verifyPassword(req.body.pass)) {
        let time = await verifyInstance.updateTime();
        let days = await verifyInstance.calculateDate(time);
        console.log(days);
        res.status(200);
        res.render('success', {
          csrfToken: req.csrfToken(),
          error: false,
          days: 14 - days,
        });
      } else {
        res.status(403);
        res.render('success', {
          csrfToken: req.csrfToken(),
          error: true,
          days: 0,
        });
      }
    } else {
      res.status(403);
      res.json({ status: 403, message: 'Forbidden' });
    }
  },
);

export default router;
