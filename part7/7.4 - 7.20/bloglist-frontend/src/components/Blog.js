import React from 'react';
import { withRouter } from 'react-router-dom';

const Blog = (props) => {
  let deleteButton = null;
  let comments = null;

  const deleteHandler = () => {
    props.deleteHandler();
    props.history.push('/');
  };

  comments = props.blog.comments.map((comment, index) => <li key={index}>{comment}</li>);

  if(props.renderDelete) deleteButton = <button onClick={deleteHandler}>Delete</button>;
  return (
    <div>
      <p>{props.blog.title} by {props.blog.author}</p>
      <a href={props.blog.url}>URL</a>
      <p>{props.blog.likes} Like(s)</p>
      <p>Added by {props.blog.user.name}</p>
      <button onClick={props.likeHandler}>Like</button>
      {deleteButton}
      <ul>
        {comments}
      </ul>
    </div>
  );
};

export default withRouter(Blog);
