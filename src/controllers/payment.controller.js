import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

import {OrderSchema} from "../models/orders.model.js"
import { stripe } from '../config/stripe.config.js';


export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { B_amount, B_currency = 'usd', B_planId, B_email } = req.body;

  //Need to check planId exist or not
  /*
  if doesn't exit send a response that can not proceed.
  if doesn't exit throw an error with error code 404 and msg plan doesn't exit.  
  */
  const d = Date.now()
  const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(B_amount * 100), // Convert to cents
        currency: B_currency,
        automatic_payment_methods: {
          enabled: true,
        },
  });

  //Save it on DB
  const {id, client_secret} = paymentIntent

  const order = await OrderSchema.create({
    B_bussinessEmail: B_email,
    B_planId ,
    B_amount,
    B_currency,
    B_clientSecret: client_secret,
    B_stripePaymentIntentId: id
  })

  if (!order) {
    throw new ApiError(500, `Db unable to save`)
  }


  console.log(Date.now() - d)

  return ApiResponse.send(res, `Intent created for plan with planId ${B_planId}`, 201, client_secret)

})


