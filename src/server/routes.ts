import * as express from 'express';
import UserController from './controllers/user';
import { userInfo } from 'os';

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

router.get('/api/currentUser', (req, res) => {
    if(req.user){
        res.json(req.user);
    } else {
        res.json({msg: 'fail'});
    }
})



export default router;