import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = asyncHandler(async (req, res, next) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    throw ApiError(404)
  }
  
  

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: false,
      },
    });

    console.log(paymentIntent)
    

    const result = {
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id
    }

    return new ApiResponse.send(res, ``, 200, paymentIntent)


    /*
    const { amount, currency, items, customerEmail } = req.body;


    // 1. CREATE INTERNAL ORDER RECORD (in your database)
    // This is a placeholder. You would call your database here.
    const newOrder = new Order(amount, currency, items[0].id);
    newOrder.status = 'created';
    orders[newOrder.id] = newOrder; // Save it. In reality: await newOrder.save();

    // 2. CREATE PAYMENT INTENT ON STRIPE
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: newOrder.id // 🔗 CRITICAL: Link Stripe to your internal order
      },
      receipt_email: customerEmail, // Orchestrating customer communication
    });

    // 3. UPDATE YOUR ORDER WITH PAYMENT GATEWAY INFO
    newOrder.paymentIntentId = paymentIntent.id;
    newOrder.status = 'attempted'; // Update status
    // await newOrder.save(); // Save updates to database

    // 4. SEND NECESSARY DATA BACK TO CLIENT
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderId: newOrder.id // Send your internal order ID back to the frontend
    });
    
    */
    

})     



export class StripeService {
  // Create payment intent
  static async createPaymentIntent(amount, currency = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      };
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  // Confirm payment
  static async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return {
        success: true,
        status: paymentIntent.status,
        paymentIntent
      };
    } catch (error) {
      throw new Error(`Failed to confirm payment: ${error.message}`);
    }
  }

  // Create customer
  static async createCustomer(email, name, paymentMethodId) {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      return {
        success: true,
        customerId: customer.id
      };
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  // Process payment
  static async processPayment(amount, currency, paymentMethodId, customerDetails) {
    try {
      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        payment_method: paymentMethodId,
        confirm: true,
        customer: customerDetails.customerId,
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        metadata: {
          customer_name: customerDetails.name,
          customer_email: customerDetails.email
        }
      });

      return {
        success: paymentIntent.status === 'succeeded',
        status: paymentIntent.status,
        paymentIntentId: paymentIntent.id,
        message: this.getStatusMessage(paymentIntent.status)
      };
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  }

  static getStatusMessage(status) {
    const messages = {
      'succeeded': 'Payment successful',
      'processing': 'Payment processing',
      'requires_payment_method': 'Payment requires payment method',
      'requires_action': 'Payment requires additional action',
      'requires_confirmation': 'Payment requires confirmation'
    };
    return messages[status] || 'Unknown payment status';
  }
}

    
    


