import express from 'express';
import passport from 'passport';
import UserController from '../services/controllers/user';

const router = express.Router();
// TODO Get below logic out of here.
// TODO: Replace success logic with try-catch

router.post('/register', async (req, res) => {
  try {
    await UserController.registerUser(req.body.email, req.body.password);
    res.status(200).end();
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await UserController.loginUser(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get('/currentUser', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(400).json('fail');
  }
});

export default router;
