const router = require('express').Router();
const Blog = require('./../models/blog');
const User = require('./../models/user');
const user_helper = require('./../utils/user_helper');
const jwt = require('jsonwebtoken');


const getTokenFromRequest = (req) => {
    return req.get('authorization').substring(7);
};


router.get('/', async (request, response) => {
    let blogs = await Blog.find({}).populate('user');
    response.json(blogs);
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

        let token = getTokenFromRequest(request);
        if(!token){
            response.status(401).json( { error: 'Invalid JWT Token' } );
            return;
        }
        let decodedObj = jwt.verify(token, process.env.SECRET);
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
            user: user.id
        }).save();
        
        user.blogs = user.blogs.concat(newBlog.toJSON().id);
        await user.save();
        
        
        response.status(201).json(newBlog.toJSON());
    }
    catch(error) {
        next(error);
    }
});

router.put('/:id', async (request, response) => {
    let updatedObj = await Blog.findOneAndUpdate({ _id: request.params.id }, { $set: { likes: request.body.likes } }, { new: true });
    if(updatedObj){
        response.status(200).json(updatedObj);
    }
    else response.status(400).end();
});

router.delete('/:id', async (request, response) => {
    try {
        let removedBlog = await Blog.findByIdAndRemove(request.params.id);
        if(removedBlog){
            response.status(204).end();
        }
        else response.end();
    }
    catch(error){
        next(error);
    }
});

module.exports = router;