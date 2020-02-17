import express from 'express';
import HoursController from '../controllers/hours';
import passport from 'passport';

const router = express.Router();

router.post('/loghours', passport.authenticate('jwt', {session: false}), async (req, res) => {
  console.log(req.user);
  const result = await HoursController.logHours(req.user, req.body.startDate, req.body.endDate);
  if(result.success){
      res.json(result);
  } else {
      res.status(404).json(result.err);
  }
})

export default router;