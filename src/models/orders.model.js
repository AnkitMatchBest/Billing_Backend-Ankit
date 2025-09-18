import mongoose, { Schema } from "mongoose";

const Order = new mongoose.Schema({
  B_bussinessId: { 
    type: String,
    default: null
  },
  B_bussinessEmail: { 
    type: String, 
    required: true 
  },
  B_planId: { 
    type: String, 
    required: true 
  },
  B_amount: {
    type: Number, 
    required: true,
  },
  B_currency: { 
    type: String, 
    required: true 
  },
  B_status: { 
    type: String, 
    enum: ['requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'succeeded', 'failed'], 
    default: 'requires_payment_method',
    required: true
  },
  B_clientSecret: { 
    type: String, 
    required: true 
  },
  B_stripePaymentIntentId: { 
    type: String, 
    required: true, 
    unique: true, 
  },
  B_stripeEventId: { 
    type: String, 
     
    unique: true, // Unique ID to ensure no duplicate processing
    default: null
  },
  B_webhookObj : [{
    type: Object
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: null   
  }

});


// Update the 'updatedAt' field before saving
Order.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const  OrderSchema = mongoose.model('Order', Order);



