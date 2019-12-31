import React from 'react';
import { incrementVoteAction } from './../reducers/anecdoteReducer';

const AnecdoteList = (props) => {

  const anecdotes = props.store.getState();

  const vote = (id) => {
    props.store.dispatch(incrementVoteAction(id));
  }

  return(
    <>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default AnecdoteList;