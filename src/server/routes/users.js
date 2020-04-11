import express from 'express';
import passport from 'passport';
import UserController from '../services/controllers/user';

const router = express.Router();
// TODO Get below logic out of here.

router.post('/register', async (req, res) => {
  const result = await UserController.registerUser(req.body.email, req.body.password);
  if (result.success) {
    return res.json(result);
  }
  console.log(result.err);
  return res.status(400).json(result.err);
});

router.post('/login', async (req, res) => {
  const result = await UserController.loginUser(req.body.email, req.body.password);
  if (result.success) {
    res.json(result);
  } else {
    console.log(result.err);
    res.status(400).json(result.err);
  }
});

router.get('/currentUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ msg: 'fail' });
  }
});

export default router;
