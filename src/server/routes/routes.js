import express from 'express';
import hours from './hours';
import user from './users';

const router = express.Router();

router.use('/users', user);

router.use('/hours', hours);

export default router;
