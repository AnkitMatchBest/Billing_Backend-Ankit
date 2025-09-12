import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { v4 as uuidv4 } from 'uuid';
import { PaymentSchema } from '../models/order.model.js'


//const StripeService = require('../services/stripeService');
//export const processPayment = (asyncHandler(async (req, res)))
export class PaymentController {
  // Create payment intent
  //static createPaymentIntent = asyncHandler(async(req, res))
  static async createPaymentIntent(req, res) {
    try {
      const { amount, currency = 'usd' } = req.body;

      const result = await StripeService.createPaymentIntent(amount, currency);

      res.json({
        success: true,
        clientSecret: result.clientSecret,
        paymentIntentId: result.paymentIntentId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Process payment
  //static async processPayment(asyncHandler)
  /*static async processPayment(req, res) {
    try {
      const { amount, currency, paymentMethod, customer } = req.body;

      // First create customer
      const customerResult = await StripeService.createCustomer(
        customer.email,
        customer.name,
        paymentMethod.id
      );

      // Then process payment
      const paymentResult = await StripeService.processPayment(
        amount,
        currency || 'usd',
        paymentMethod.id,
        {
          ...customer,
          customerId: customerResult.customerId
        }
      );

      res.json({
        success: paymentResult.success,
        status: paymentResult.status,
        paymentIntentId: paymentResult.paymentIntentId,
        message: paymentResult.message,
        customerId: customerResult.customerId
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }*/

  // Confirm payment status
  static async confirmPayment(req, res) {
    try {
      const { paymentIntentId } = req.body;

      const result = await StripeService.confirmPayment(paymentIntentId);

      res.json({
        success: result.status === 'succeeded',
        status: result.status,
        paymentIntent: result.paymentIntent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Health check
  static async healthCheck(req, res) {
    return ApiResponse.send(res, `Billing service is running`, 200)
  }
}

