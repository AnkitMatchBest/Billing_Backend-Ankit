import express from 'express';
import {postchatbotQuery, getchatbotQuery, assignchatbotQuery} from '../controllers/billingQuery.controller.js'

const router = express.Router();



router.post('/chatbotQuery', postchatbotQuery);
router.get('/chatbotQuery', getchatbotQuery)
router.post('/assign-chatbotQuery', assignchatbotQuery)



export default router;