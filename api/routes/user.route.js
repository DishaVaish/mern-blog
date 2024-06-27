import express from 'express';
import {test} from '../controllers/user.controller.js';
const router = express.Router();

router.get('/test', test);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId',getUser);

export default router;
