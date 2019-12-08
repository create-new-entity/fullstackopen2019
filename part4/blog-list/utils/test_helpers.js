const Blog = require('./../models/blog');


const dummyData = [
    {
        title: 'Google',
        author: 'Sergey Brinn',
        url: 'https://google.com',
        likes: 50
    },{
        title: 'Facebook',
        author: 'Mark Zuckerberg',
        url: 'https://facebook.com',
        likes: 100
    },{
        title: 'Twitter',
        author: 'Vadu',
        url: 'https://twitter.com',
        likes: 30
    }
];

const newDummy = {
    title: 'MySpace',
    author: 'Dead',
    url: 'https://myspace.com',
    likes: 1
};

const dummyWithoutLike = {
    title: 'Yahoo',
    author: 'Dead too',
    url: 'https://yahoo.com'
}

const dummyWithoutTitle = {
    author: 'Dead too',
    url: 'https://vongchong.com',
    likes: 3
}

const dummyWithoutURL = {
    title: 'Vong Chong',
    author: 'Dead too',
    likes: 3
}


const initializeDBWithDummyData = async () => {
    await Blog.deleteMany({});
    let promises = dummyData.map((blog) => new Blog(blog).save());
    await Promise.all(promises);
};

module.exports = {
    newDummy,
    dummyWithoutLike,
    dummyData,
    dummyWithoutTitle,
    dummyWithoutURL,
    initializeDBWithDummyData
};