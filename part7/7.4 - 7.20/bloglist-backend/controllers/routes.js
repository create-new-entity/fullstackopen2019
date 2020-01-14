const router = require('express').Router();
const Blog = require('./../models/blog');
const User = require('./../models/user');
const user_helper = require('./../utils/user_helper');
const jwt = require('jsonwebtoken');


router.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user');
    response.status(200).json(blogs);
});

router.get('/:id', async (request, response) => {
    let found = await Blog.findById(request.params.id);
    if(found){
        response.status(200).json(found);
    }
    else response.status(404).end();
});
  
router.post('/', async (request, response, next) => {
    try {
        if(!request.body.title || !request.body.url){
            response.status(400).end();
            return;
        }
        if(!request.body.hasOwnProperty('likes')) request.body.likes = 0;

        if(!request.token){
            response.status(401).json( { error: 'Invalid JWT Token' } );
            return;
        }
        let decodedObj = jwt.verify(request.token, process.env.SECRET);
        if(!decodedObj){
            response.status(401).json( { error: 'Invalid JWT Token' } );
            return;
        }

        let user = await User.findOne( { username: decodedObj.username } );
        let newBlog = await new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: user.id,
            comments: []
        }).save();
        
        user.blogs = user.blogs.concat(newBlog.toJSON().id);
        await user.save();
        
        newBlog = await Blog.findById(newBlog.id).populate('user');
        response.status(201).json(newBlog.toJSON());
    }
    catch(error) {
        next(error);
    }
});

router.put('/:id', async (request, response) => {
    let updatedObj = await Blog.findOneAndUpdate({ _id: request.params.id }, { $inc: { likes: 1 } }, { new: true });
    if(updatedObj){
        response.status(200).json(updatedObj);
    }
    else response.status(400).end();
});

router.put('/:id/comments', async (request, response) => {
    let updatedObj = await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: request.body.comment } }, { new: true });
    if(updatedObj){
        response.status(200).json(updatedObj);
    }
    else response.status(400).end();
});

router.delete('/:id', async (request, response, next) => {
    try {
        if(!request.token){
            response.status(401).json( { error: 'Invalid JWT Token' } );
            return;
        }
        let decodedObj = jwt.verify(request.token, process.env.SECRET);
        if(!decodedObj){
            response.status(401).json( { error: 'Invalid JWT Token' } );
            return;
        }
        let user = await User.findOne( { username: decodedObj.username } );
        let blog = await Blog.findOne( { _id: request.params.id });
        if(!blog){
            response.status(404).json( { error: 'Resource not found'} );
        }
        if(blog.toJSON().user.toString() === user.toJSON().id.toString()){
            await Blog.deleteOne({ _id: blog._id });
            let blogs = [...user.blogs];
            let foundIndex = blogs.findIndex((currBlog) => {
                return currBlog.id === blog.toJSON().id;
            });
            blogs.splice(foundIndex, 1);
            user.blogs = blogs;
            await user.save();
            response.status(204).end();
        }
        else {
            response.status(401).json({ error: 'User Unauthorized' });
        }
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;