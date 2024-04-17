import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts } from '../contollers/post.controller.js';
const router=express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts',getposts)
router.delete('/deletepost/:postId/:useraId',verifyToken,deletepost)
router.put('/updatepost/:postId/:userId',verifyToken,updatePost)


export default router;
