import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import valueChangeReducer from './reducers/valueChangeReducer';
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


const store = createStore(valueChangeReducer);
const App = () => {
    return (
    <div>
        <p>Give Feedback</p>
        <br></br>
        <Button text={'Good'} updateCounter={ () => store.dispatch({ type: 'INCREMENT', feedback: 'good'}) }></Button>
        <Button text={'Neutral'} updateCounter={() => store.dispatch({ type: 'INCREMENT', feedback: 'neutral'})}></Button>
        <Button text={'Bad'} updateCounter={() => store.dispatch({ type: 'INCREMENT', feedback: 'bad'})}></Button>
        <Statistics {...store.getState()}></Statistics>
    </div>
  )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
