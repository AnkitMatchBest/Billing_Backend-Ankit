import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

import { BillingQuerySchema, AssignBillingQuerySchema } from "../models/billingQueries.model.js";

export const postchatbotQuery = asyncHandler(async (req, res) => {
    const {B_name, B_email, B_phone, B_inquiryType, B_billingQueryMsg} = req.body

    if (!B_name || !B_email || !B_phone || !B_inquiryType || !B_billingQueryMsg ) {
        throw new ApiError(400, `Form deatails from frontend are missing`)
    }

    const result = await BillingQuerySchema.create({
        B_name,
        B_email,
        B_phoneNumber: B_phone,
        B_inquiryType: B_inquiryType,
        B_billingQueryMsg: B_billingQueryMsg
    });
    if (!result) {
        throw new ApiError(500, 'Something went wrong.');
    }
    console.log('Tarun')
    return ApiResponse.send(res, `query registered and your billing queryId is`, 201, result.B_queryId)
    

});

export const getchatbotQuery = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1//We get in string form url.
    const perPage = 11

    const totalLeads = await BillingQuerySchema.countDocuments()
    const totalPages = Math.ceil(totalLeads/perPage)

    if (page > totalPages) {
        
        return ApiResponse.send(res, `No more queries`, 200)
    }

    const leads = await BillingQuerySchema.find()
                                          .skip((page-1)*perPage)
                                          .limit(perPage)
                                          .exec();

    if (!leads) {
        throw new ApiError(500, `Server unable to fetch the data`)
    }
    
    console.log('Raina')


    return ApiResponse.send(res, `leads fetched for page no. ${page}`, 200, leads)

});

export const assignchatbotQuery = asyncHandler(async (req, res) => {
    const {B_query, B_bussinessId, B_resolverId} = req.body

    const result = await AssignBillingQuerySchema.create({
        B_query,
        B_bussinessId,
        B_resolverId
    })

    if (!result) {
        throw new ApiError(500, `Query not assigned please try again`)

    }
    console.log('Ayush')
    
   return ApiResponse.send(res, `Query Assigned`, 201)

})