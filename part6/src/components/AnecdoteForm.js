import React from 'react';
import { newContentAction } from './../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {

  const create = (event) => {
    event.preventDefault();
    props.store.dispatch(newContentAction(event.target.content.value));
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

export default AnecdoteForm;