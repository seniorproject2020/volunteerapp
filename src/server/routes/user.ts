import express from 'express';
import UserController from '../controllers/user';
import passport from 'passport';

const router = express.Router();

router.post('/register', async (req, res) => {
  const result = await UserController.registerUser(req.body.email, req.body.password);
  if(result.success){
      return res.json(result);
  } else {
      return res.status(400).json(result.err);
  }
});

router.post('/login', async (req, res) => {
  const result = await UserController.loginUser(req.body.email, req.body.password);
  if(result.success){
      res.json(result);
  } else {
      res.status(404).json(result.err);
  }
})

router.get('/currentUser', passport.authenticate('jwt', {session: false}), (req, res) => {
  if(req.user){
      res.json(req.user);
  } else {
      res.json({msg: 'fail'});
  }
})

export default router;