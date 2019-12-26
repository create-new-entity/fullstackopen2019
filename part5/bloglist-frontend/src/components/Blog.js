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
      <div className='title-author' onClick={toggle}>{blog.title} {blog.author}</div>
      <div className='url-like'style={showOrHide}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} like(s)</p><button onClick={likeHandler}>Like</button>
        {author}
        {deleteButton}
      </div>
    </div>
  );
};

export default Blog;