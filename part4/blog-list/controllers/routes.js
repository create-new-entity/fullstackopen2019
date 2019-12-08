const router = require('express').Router();
const Blog = require('./../models/blog');

router.get('/', async (request, response) => {
    let blogs = await Blog.find({});
    response.json(blogs);
});
  
router.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    if(!blog.title || !blog.url){
        response.status(400).end();
        return;
    }
    if(!blog.hasOwnProperty('likes')) blog.likes = 0;
    let result = await blog.save();
    
    response.status(201).json(result);
});

module.exports = router;