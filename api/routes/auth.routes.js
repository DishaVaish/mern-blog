import express from 'express';
import {signup} from '../controllers/auth.controller.js'

// ERROR: when we wrote it as : const router = express.router();
const router = express.Router();

router.post('/signup', signup);

export default router;