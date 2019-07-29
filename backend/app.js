const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/meanstack', {useNewUrlParser: true}).then(() => {
    console.log('Connected to Database');
}).catch(()=>{
    console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    next();
});

const postRoutes = require('./routes/posts');

app.use('/api/posts', postRoutes);

module.exports = app;