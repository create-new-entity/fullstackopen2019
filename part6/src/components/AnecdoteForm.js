import React from 'react';
import { newContentAction } from './../reducers/anecdoteReducer';
import { voteOrCreateNotificationAction } from './../reducers/notificationReducer';
import { connect } from 'react-redux';
import backendFns from './../services/anecdotes';

const mapDispatchToProps = {
  newContentAction,
  voteOrCreateNotificationAction
};

const AnecdoteForm = (props) => {

  const create = (event) => {
    event.preventDefault();

    let newAnecdote = {
      content: event.target.content.value,
      votes: 0
    };

    props.newContentAction(newAnecdote);
    props.voteOrCreateNotificationAction('create', newAnecdote.content);
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