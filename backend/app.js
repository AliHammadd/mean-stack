const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();

mongoose.connect('mongodb://localhost:27017/meanstack', {useNewUrlParser: true}).then(() => {
    console.log('Connected to Database');
}).catch(()=>{
    console.log('Connection failed');
});

const Post = require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

    next();
});

app.post('/api/posts',(req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then((createdPost) =>{
        res.status(201).json({
            postId: createdPost._id,
            message: 'Successfully posted',
        });
    });
});
app.get('/api/posts', (req, res, next) => {

    Post.find().then(documents => {
        res.status(200).json({
            'message': 'Post send successfully',
            'posts': documents
        });
    });
    
    
 });

 app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: 'Post deleted!' });
    });
 });

 module.exports = app;