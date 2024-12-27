require('dotenv').config()
const express = require("express")
const app = express()
const moongoose = require ("mongoose")

moongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log("mongoDb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers',subscribersRouter)

app.listen(3000, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log("Server running");
    }
});

// server and database connection to make sure database is active and working 