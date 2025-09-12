import express from "express"
import cors from "cors"



const app = express()

app.use(cors())



// configuring, what type of date we can get and other configurations.
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

app.use(express.json())//json data from frontend(parse data from incoming body)
//app.use(express.urlencoded())//data from url
app.use(express.static("public"))//to store resources on server 

//Routes import 
import query from './routes/billingQuery.route.js'
import payment from './routes/billingPayment.route.js'

app.use('/billing/query', query)
app.use('/billing/payment', payment)



import { handleError } from "./utils/errorHandler.js"
app.use(handleError)

export {app};