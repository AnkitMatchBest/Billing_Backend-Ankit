import express from 'express';
const router = express.Router();




//import { PaymentController } from '../controllers/payment.controller.js';

import { validatePaymentRequest, validatePaymentConfirmation } from '../middlewares/validation.js';



// Create payment intent
//router.post('/create-intent', validatePaymentRequest, PaymentController.createPaymentIntent);

// Process payment
//router.post('/process', validatePaymentRequest, PaymentController.processPayment);
/*
// Confirm payment
router.post('/confirm', validatePaymentConfirmation, PaymentController.confirmPayment);
*/
export default router;
