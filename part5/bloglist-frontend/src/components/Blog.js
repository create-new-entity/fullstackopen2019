import React, { useState } from 'react';

const Blog = ({ blog, likeHandler, deleteHandler, renderDelete }) => {
  let showOrHide = {
    display: 'none'
  };
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };

  let author = null;
  if(blog.user){
    author = <p>Added by {blog.user.name}</p>;
  }

  let deleteButton = null;
  if(renderDelete){
    deleteButton = <button onClick={deleteHandler}>Delete</button>;
  }
  visible ? showOrHide = { display: '' } : showOrHide = { display: 'none' };
  return (
    <div className="blog">
      <div onClick={toggle}>{blog.title}</div>
      <div style={showOrHide}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} like(s)</p><button onClick={likeHandler}>Like</button>
        <p>Creator: {blog.author}</p>
        {author}
        {deleteButton}
      </div>
    </div>
  );
};

export default Blog;