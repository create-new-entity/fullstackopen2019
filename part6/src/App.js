import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    props.store.dispatch({
      id: id,
      type: 'INCREMENT_VOTE'
    });
  }

  const create = (event) => {
    props.store.dispatch({
      type: 'CREATE_ANECDOTE',
      content: event.target.content.value
    });
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='content'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App