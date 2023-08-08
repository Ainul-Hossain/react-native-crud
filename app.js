const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Here's all the route
const usersRoute = require('./routes/users');

// Here's all the configuration
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database is connected...');
    })
    .catch((err)=>{
        console.log(err.message);
    })

// Here's all api calling
app.use('/', usersRoute);

app.listen('8000', () => {
    console.log('Server is Running...')
});