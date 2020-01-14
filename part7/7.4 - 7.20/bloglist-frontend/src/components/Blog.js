import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  newCommentAction
} from './../reducers/blogReducer';


const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = {
  newCommentAction
};

const Blog = (props) => {
  let deleteButton = null;
  let commentsComponents = null;

  const deleteHandler = () => {
    props.deleteHandler();
    props.history.push('/');
  };

  const newCommentHandler = (event) => {
    event.preventDefault();
    props.newCommentAction(props.blog.id, event.target.comment.value);
    event.target.comment.value = '';
  };

  commentsComponents = props.comments.map((comment, index) => <li key={index}>{comment}</li>);

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
        {commentsComponents}
      </ul>
      <form onSubmit={newCommentHandler}>
        <input name="comment"/>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog));
