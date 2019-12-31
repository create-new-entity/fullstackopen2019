import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import { incrementVoteAction } from './reducers/anecdoteReducer';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch(incrementVoteAction(id));
  }

  

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store}/>
      <AnecdoteForm store={props.store}/>
    </div>
  )
}

export default App