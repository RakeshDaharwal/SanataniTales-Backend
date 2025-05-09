const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const Router = require('./Router/routes')

dotenv.config();

// Middleware

app.use(express.json());  // To parse incoming JSON requests
app.use(cors());
app.use('/', Router);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is Running on Port ${PORT}`)
})
