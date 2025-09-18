import { createPaymentIntent } from '../controllers/payment.controller.js';

import express from 'express';
const router = express.Router();








// Create payment intent
router.post('/stripe/create-intent', createPaymentIntent)



export default router;
