import mongoose, { Schema } from "mongoose";

const Order = new mongoose.Schema({
  // Your Internal Order ID
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  // Payment Gateway References
  paymentIntentId: {
    type: String,
    sparse: true // Allows null values but ensures uniqueness if present
  },
  stripeOrderId: {
    type: String,
    sparse: true
  },
  // Order Details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'usd'
  },
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  customerEmail: {
    type: String,
    required: true
  },
  // Orchestration State
  status: {
    type: String,
    required: true,
    enum: ['created', 'attempted', 'paid', 'failed', 'fulfilled', 'refunded'],
    default: 'created'
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updatedAt' field before saving
Order.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const  PaymentSchema = mongoose.model('Order', Order);



/*const BussinessLedger = new Schema({
    B_bussinessId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    

});

/*const CustomerLedger = new Schema({
    B_bussinessId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    B_customerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    B_paymentId: {
        type: Schema.Types.ObjectId,


    }
})*/


