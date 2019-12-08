const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (posts) => {
    return posts.reduce((acc, curr) => {
        return { likes: acc.likes + curr.likes };
    }).likes;
};

const favoriteBlog = (blogs) => {
    let topRatedPostsFromEachBlogs = blogs.map((posts) => {
        return posts.reduce((acc, curr) => {
            return acc.likes >= curr.likes ? acc : curr;
        });
    });
    
    return topRatedPostsFromEachBlogs.reduce((acc, curr) => {
        return acc.likes >= curr.likes ? acc : curr;
    });
};

const mostBlogs = (blogs) => {
    let included = [];

    const isIncluded = (author) => {
        let authors = included.map( (authorData) => authorData.author );
        return authors.includes(author);
    };

    _.forEach(blogs, (posts) => {
        _.forEach(posts, (post) => {
            if(isIncluded(post.author)){
                let found = _.find(included, (authorData) => post.author === authorData.author);
                found.blogs += 1;
                return;
            }
            let newAuthorData = {
                author: post.author,
                blogs: 1
            };
            included.push(newAuthorData);
        });
    });
    
    return _.sortBy(included, (authorData) => authorData.blogs)
    .reverse()[0];
};


const mostLikes = (blogs) => {
    let included = [];

    const isIncluded = (author) => {
        let authors = included.map( (authorData) => authorData.author );
        return authors.includes(author);
    };

    _.forEach(blogs, (posts) => {
        _.forEach(posts, (post) => {
            if(isIncluded(post.author)){
                let found = _.find(included, (authorData) => post.author === authorData.author);
                found.likes += post.likes;
                return;
            }
            let newAuthorData = {
                author: post.author,
                likes: post.likes
            };
            included.push(newAuthorData);
        });
    });
    
    return _.sortBy(included, (authorData) => authorData.likes)
    .reverse()[0];
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}