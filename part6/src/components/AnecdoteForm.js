import React from 'react';
import { newContentAction } from './../reducers/anecdoteReducer';
import { showNotificationAction } from './../reducers/notificationReducer';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  newContentAction,
  showNotificationAction
};

const AnecdoteForm = (props) => {

  const create = (event) => {
    event.preventDefault();

    let newAnecdote = {
      content: event.target.content.value,
      votes: 0
    };

    props.newContentAction(newAnecdote);
    props.showNotificationAction('create', newAnecdote.content, 3);
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