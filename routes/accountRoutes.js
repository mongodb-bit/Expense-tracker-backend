import express from 'express';
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js"
import { getAccounts,createAccount,addMoneyToAccount } from '../controllers/accountController.js';


// GET account info by ID
//router.get('/:id?',authMiddleware,getAccounts);

router.get('/', authMiddleware, getAccounts);     // Specific account


// POST create a new account
router.post('/create', authMiddleware,createAccount);

// PUT add money to an account by ID
router.put('/add-money/:id',authMiddleware,addMoneyToAccount);




export default router;