import React from 'react';
import { incrementVoteAction } from './../reducers/anecdoteReducer';
import { voteOrCreateNotificationAction } from './../reducers/notificationReducer';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  incrementVoteAction,
  voteOrCreateNotificationAction
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  if(filter.length) return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  return anecdotes;
};


const AnecdoteList = (props) => {

  const anecdotes = props.anecdotes;

  const vote = (id) => {
    let votedAnecdote = anecdotes.find(anecdote => anecdote.id === id);
    props.incrementVoteAction(id);
    props.voteOrCreateNotificationAction('vote', votedAnecdote.content);
  }

  return(
    <>
      {
        props.visibleAnecdotes.map(anecdote =>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);