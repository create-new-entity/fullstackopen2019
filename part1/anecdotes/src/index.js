
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
      0:0,
      1:0,
      2:0,
      3:0,
      4:0,
      5:0
  });

  const clickHandler = () => {
      let newOne = getRandomInt(anecdotes.length);
      setSelected(newOne);
  };

  const voteHandler = () => {
      let copyVotes = {...votes};
      copyVotes[selected]++;
      setVotes(copyVotes);
  };

  let copyVotes = {...votes};
  let keys = Object.keys(copyVotes);
  let toprated = keys.reduce((acc, curr) => {
  if(copyVotes[acc] < copyVotes[curr]) return curr;
      return acc;
  });

  return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}
        <br></br>
            This quote has {votes[selected]} votes.
        <br></br>
        <button onClick={voteHandler}>Vote</button>
        <button onClick={clickHandler}>Another One!</button>
        <br></br>
        <h1>Most popular one:</h1>
        {props.anecdotes[toprated]}
        <p>The above quote has {votes[toprated]} votes.</p>
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
