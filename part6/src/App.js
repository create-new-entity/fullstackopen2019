import React, { useEffect } from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initAnecdotesAction } from './reducers/anecdoteReducer';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  initAnecdotesAction
};

const App = (props) => {

  useEffect (() => {
    props.initAnecdotesAction();
  }, []);

  return (
    <div>
      <Notification/>
      <Filter/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App);