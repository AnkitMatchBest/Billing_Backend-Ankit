/*
console.log('Befor db connection')
connectDB()
.then(async() => {
    console.log('After db connection')
    //we are listening error for an event. i.e; listening after db connection and before server listening
    
    //ONLY AFTER DB connects, dynamically import the app
    const { app } = await import("./app.js");
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error;  
    })
    
    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log('your port is not free')
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!" , err);
})





*/

