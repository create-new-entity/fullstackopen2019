import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Button = ({text, updateCounter}) => {
    return (
        <button onClick={updateCounter}>{text}</button>
    );
};

const Statistic = ({text, value}) => {
    return (
        <>
            <td>{text}</td><td>{value}</td>
        </>
    );
};

const Statistics = ({good, neutral, bad}) => {
    let total = good + neutral + bad;
    let average = (good-bad) / total;
    let positive = (good/total) * 100;

    let additionalStats, comment;
    if(total) {
        additionalStats = (
            <>
                <tr><Statistic text={"All"} value={total}></Statistic></tr>
                <tr><Statistic text={"Average"} value={average}></Statistic></tr>
                <tr><Statistic text={"Positive"} value={positive}></Statistic></tr>
            </>
        );
    }
    else {
        comment = (
            <p>Press any of the buttons to interact</p>
        );
    }
    return (
        <>
            <table>
                <tbody>
                    <tr><Statistic text={"Good"} value={good}></Statistic></tr>
                    <tr><Statistic text={"Neutral"} value={neutral}></Statistic></tr>
                    <tr><Statistic text={"Bad"} value={bad}></Statistic></tr>
                    {additionalStats}
                </tbody>
            </table>
            {comment}
        </>
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
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(<App />, document.getElementById('root'));
