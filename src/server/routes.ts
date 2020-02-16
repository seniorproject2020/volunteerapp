import * as express from 'express';
import UserController from './controllers/user';
import HoursController from './controllers/hours';
import passport from 'passport';

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('Henry');
});

router.post('/api/register', async (req, res) => {
    const result = await UserController.registerUser(req.body.email, req.body.password);
    if(result.success){
        return res.json(result);
    } else {
        return res.status(400).json(result.err);
    }
});

router.post('/api/login', async (req, res) => {
    const result = await UserController.loginUser(req.body.email, req.body.password);
    if(result.success){
        res.json(result);
    } else {
        res.status(404).json(result.err);
    }
})

router.post('/loghours', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(req.user);
    const result = await HoursController.logHours(req.user, req.body.startDate, req.body.endDate);
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