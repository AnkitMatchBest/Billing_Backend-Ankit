import mongoose, { Schema } from "mongoose";



const BillingQuery = new Schema({
    B_name: {
        type: String,
        required: true
    },
    B_email: {
        type: String,
        required: true
    }, 
    B_phoneNumber: {
        type: String,
        required: true
    },
    B_inquiryType: {
        type: String,
        required: true,
        enum: ['pricing', 'payment', 'billing', 'invoice', 'subscription'], // Allowed values
        default: 'pricing' // Optional: set a default value
    },
    B_billingQueryMsg: {
        type: String,
        required: true
    },
    B_queryId: {
        type: String,
        default: () => 'BQ' + Date.now()
    }

},
{
    timestamps: true
});

const AssignBillingQuery = new Schema({
    B_query: {

    },
    B_bussinessId: {

    },
    B_resolverId: {
        
    }
},
{
    timestamps: true
})


export const  BillingQuerySchema = mongoose.model('BillingQuery', BillingQuery);
export const AssignBillingQuerySchema = mongoose.model('AssignBillingQuery', AssignBillingQuery)



