export const startServer = async function () {
    //we are listening error for an event. i.e; listening after db connection and before server listening
    const { app } = await import("../app.js");
    app.on("error", (error) => {
        console.log("ERROR: Typically it is due to app.js file is unable to load due many reasons or it does not exit at all", error);
        throw error;  
    })
    
    app.listen(process.env.PORT || 9000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
    app.on("error", (error) => {
        console.log('your port is not free')
    })
};