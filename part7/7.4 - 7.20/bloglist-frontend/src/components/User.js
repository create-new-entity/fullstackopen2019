import React from 'react';


const User = ({ user, addedBlogs }) => {
  let addedBlogsComponents = addedBlogs.map((blog) => <li key={blog.id}>{blog.title} by {blog.author}</li>);
  return (
    <div>
      <h2>{user.name}</h2>
      <ul>{addedBlogsComponents}</ul>
    </div>
  );
};

export default User;