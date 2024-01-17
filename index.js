require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const goalRouter = require('./routers/goalRouter');
const cors = require('cors');




// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Goals API'});
})

app.use("/api/goals", goalRouter)

// error routes
app.use((req,res) => {
    res.status(404).json({message: 'Resource not found'});
}) 

// db connections and server listening

const startServer = async () => {
    try {
await mongoose.connect(process.env.MONGO_URL, {dbName: 'goalServer'});
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
})
    } catch (error){
        console.log(error);
    } }

     startServer();