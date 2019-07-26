const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    next();
});

app.post('/api/posts',(req, res, next)=> {
    const post = req.body;
    res.status(201).json({
        message: 'Successfully posted',
    });
});
app.get('/api/posts', (req, res, next)=> {
    const posts = [
        {
            id: 'abc22311',
            title: 'First server-side post',
            content: 'This is coming from server'
        },
        {
            id: 'asf2231',
            title: 'Second server-side post',
            content: 'This is coming from server'
        },
    ];

    res.status(200).json({
        'message': 'Post send successfully',
        'posts': posts
    });
 });

 module.exports = app;