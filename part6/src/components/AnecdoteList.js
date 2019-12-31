import React from 'react';
import { incrementVoteAction } from './../reducers/anecdoteReducer';
import { voteOrCreateNotification } from './../reducers/notificationReducer';

const AnecdoteList = (props) => {

  const anecdotes = props.store.getState().anecdotes;

  const vote = (id) => {
    let votedAnecdote = anecdotes.find(anecdote => anecdote.id === id);
    props.store.dispatch(incrementVoteAction(id));
    props.store.dispatch(voteOrCreateNotification('vote', votedAnecdote.content));
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