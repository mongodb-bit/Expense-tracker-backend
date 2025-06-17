import express from 'express';
import authRoutes from './authRoutes.js';
import accountRoutes from './accountRoutes.js'
import userRoutes from './userRoutes.js'
import transactionRoutes from './transactionRoutes.js'
const router = express.Router();

router.use('/transaction',transactionRoutes)
router.use('/account',accountRoutes)
router.use('/auth', authRoutes);
router.use('/user',userRoutes );

export default router;
