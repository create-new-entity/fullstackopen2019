const router = require('express').Router();
const Blog = require('./../models/blog');

router.get('/', async (request, response) => {
    let blogs = await Blog.find({});
    response.json(blogs);
});

router.get('/:id', async (request, response) => {
    let found = await Blog.findById(request.params.id);
    if(found){
        response.status(200).json(found);
    }
    else response.status(404).end();
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