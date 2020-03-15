import express from 'express';
import passport from 'passport';
import HoursController from '../services/controllers/hours';

const router = express.Router();
// TODO Get below logic out of here.

router.post(
  '/loghours',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const result = await HoursController.logHours(
      req.user,
      new Date(req.body.startTime),
      new Date(req.body.endTime),
      req.body.eventName,
      req.body.eventDescription
    );

    if (result.success) {
      res.json(result);
    } else {
      console.log(`err: ${JSON.stringify(result.err)}`);
      res.status(400).json(result.err);
    }
  }
);

router.get(
  '/gethours',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const result = await HoursController.getHours(req.user);
    if (result.success) {
      // console.log(result);
      res.json(result);
    } else {
      console.log(`err: ${JSON.stringify(result.err)}`);
      res.status(400).json(result.err);
    }
  }
);

export default router;
