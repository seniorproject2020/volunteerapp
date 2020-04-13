import express from 'express';
import HoursController from '../controllers/hours';
import passport from 'passport';

const router = express.Router();

router.post('/loghours', passport.authenticate('jwt', {session: false}), async (req, res) => {
  console.log(req.body.startTime);
  const result = await HoursController.logHours(req.user, new Date(req.body.startTime), new Date(req.body.endTime), req.body.eventName);
  if(result.success){
      res.json(result);
  } else {
    console.log(`err: ${JSON.stringify(result.err)}`);
      res.status(400).json(result.err);
  }
})

export default router;