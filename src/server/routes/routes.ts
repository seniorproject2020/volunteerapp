import express from 'express';
import hours from './hours';
import user from './user'

const router = express.Router();

router.use('/user', user);

router.use('/hours', hours);

export default router;
