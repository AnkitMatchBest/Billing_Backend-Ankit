import dotenv from "dotenv"
import connectDB from "./config/db.config.js";
import { startServer } from "./config/app.config.js";

dotenv.config({
    path: './.env'
});


// IIFE to start everything
(async () => {
    try {
        console.log('Before db connection');
        await connectDB()
        console.log('After db connection');
        /*
        LOAD ALL DEPENDENCIES FIRST
        */
        await startServer();
        
    } catch (error) {
        console.log(`Fail to load server dependencies or Fail to load app. Check specific cause below.\n`, error)
    }
})();





























