import React from 'react';
import { newContentAction } from './../reducers/anecdoteReducer';
import { voteOrCreateNotificationAction } from './../reducers/notificationReducer';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  newContentAction,
  voteOrCreateNotificationAction
};

const AnecdoteForm = (props) => {

  const create = (event) => {
    event.preventDefault();
    props.newContentAction(event.target.content.value);
    props.voteOrCreateNotificationAction('create', event.target.content.value);
    event.target.content.value = '';
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button>create</button>
      </form>
    </>
  );
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);