const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

dotenv.config();

// Middleware

app.use(express.json());  // To parse incoming JSON requests
app.use(cors());          // To enable cross-origin requests

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port ${PORT}`)
})
