const express = require('express');
const app = express();

app.use('/api/posts', (req, res, next)=> {
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