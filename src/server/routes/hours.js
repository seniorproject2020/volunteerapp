import express from 'express';
import passport from 'passport';
import HoursController from '../services/controllers/hours';

const router = express.Router();
// TODO Get below logic out of here.
// TODO: Replace success logic with try-catch

router.post(
  '/loghours',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await HoursController.logHours(
        req.user,
        new Date(req.body.startTime),
        new Date(req.body.endTime),
        req.body.eventName,
        req.body.eventDescription
      );
      res.json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

router.get(
  '/gethours',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await HoursController.getHours(req.user);
      res.json(result);
    } catch (err) {
      res.statusCode(500).json(err.message);
    }
  }
);

router.put(
  '/accept/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await HoursController.handleAccept(req.user, req.params.id);
      res.status(200).end();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.put(
  '/reject/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      await HoursController.handleReject(req.user, req.params.id);
      res.status(200).end();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.get(
  '/pendinghours',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const result = await HoursController.getPendingHours(req.user);
      res.json(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
);

export default router;
