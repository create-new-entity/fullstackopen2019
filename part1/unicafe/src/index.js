import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({text, updateCounter}) => {
    return (
        <button onClick={updateCounter}>{text}</button>
    );
};

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad;
    let average = (good-bad) / total;
    let positive = (good/total) * 100;

    let additionalStats;
    if(total) {
        additionalStats = (
            <>
                <p>All {total}</p>
                <p>Average {average}</p>
                <p>Positive {positive}</p>
            </>
        );
    }
    else {
        additionalStats = (
            <p>Press any of the buttons to interact</p>
        );
    }
    return (
        <div>
            <p>Statistics</p>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <br></br>
            {additionalStats}
        </div>
    );
};



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateBtnCounter = (feedback, feedbackStateFn) => () => feedbackStateFn(feedback+1);

  return (
    <div>
      <p>Give Feedback</p>
      <br></br>
      <Button text={'Good'} updateCounter={updateBtnCounter(good, setGood)}></Button>
      <Button text={'Neutral'} updateCounter={updateBtnCounter(neutral, setNeutral)}></Button>
      <Button text={'Bad'} updateCounter={updateBtnCounter(bad, setBad)}></Button>
      <br></br>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(<App />, document.getElementById('root'));
