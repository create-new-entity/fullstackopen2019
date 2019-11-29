import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import axios from 'axios';

import Searchbox from './components/Searchbox';
import FollowUpComponent from './components/FollowUpComponent';


const App = () => {
    const [searchStr, setSearchStr] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                setCountries(response.data);
            });
    }, [searchStr]);

    const searchBoxTextHandler = (event) => {
        event.preventDefault();
        setSearchStr(event.target.value);
    };

    return (
        <div>
            Find Countries: <Searchbox currentValue={searchStr} changeHandler={searchBoxTextHandler}></Searchbox>
            <FollowUpComponent countries={countries} searchStr={searchStr}></FollowUpComponent>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
