import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <a href={blog.url}>URL</a>
      <p>{blog.likes} Like(s)</p>
      <p>Added by {blog.user.name}</p>
    </div>
  );
};

export default Blog;
