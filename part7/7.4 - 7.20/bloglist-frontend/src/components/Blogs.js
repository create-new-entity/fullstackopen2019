import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
  blogs = blogs.map((blog) => {
    return (
      <div className="blog" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    );
  });

  return (
    <div>
      { blogs }
    </div>
  );
};

export default Blogs;