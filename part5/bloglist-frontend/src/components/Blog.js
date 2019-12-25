import React, { useState } from 'react';

const Blog = ({ blog, likeHandler }) => {
  let showOrHide = { display: 'none'};
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };

  let author = null;
  if(blog.user){
    author = <p>Added by {blog.user.name}</p> 
  }
  
  visible ? showOrHide = { display: ''} : showOrHide = {display: 'none'};
  return (
    <div className="blog">
      <div onClick={toggle}>{blog.title}</div>
      <div style={showOrHide}>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} like(s)</p><button onClick={likeHandler}>Like</button>
          <p>Creator: {blog.author}</p>
          {author}
      </div>
    </div>
  );
};

export default Blog