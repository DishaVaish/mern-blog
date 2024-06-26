import express from 'express';
import {test, updateUser, deleteUser, signout, getUsers} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId',getUsers);//getUsers in place of getUser
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;
