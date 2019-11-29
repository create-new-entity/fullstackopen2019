import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import axios from 'axios';

import Searchbox from './components/Searchbox';
import FollowUpComponent from './components/FollowUpComponent';

const App = () => {
    const [searchStr, setSearchStr] = useState('');
    const [followUpComponent, setFollowUpComponent] = useState({});

    useEffect(() => {
        if(searchStr.length){
            axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                let filteredData = response.data.filter((country) => {
                    return country.name.toLowerCase().startsWith(searchStr.toLowerCase());
                });
                if(filteredData.length > 10){
                    setFollowUpComponent({message: 'Too many matches, specify another filter'});
                }
                else if(filteredData.length > 1 && filteredData.length < 10){
                    let countries = filteredData.map((country) => country.name);
                    setFollowUpComponent({countries: countries});
                }
                else if(filteredData.length === 1){
                    let country = filteredData[0];
                    setFollowUpComponent({country: {
                        name: country.name,
                        capital: country.capital,
                        population: country.population,
                        languages: country.languages.map((language) => language.name),
                        flag: country.flag
                    }});
                }
                else {
                    setFollowUpComponent({message: 'No match found.'});
                }
            });
        }
    else {
        setFollowUpComponent({message: 'Try typing country names.'});
    }
    }, [searchStr]);

    const searchBoxTextHandler = (event) => {
        event.preventDefault();
        setSearchStr(event.target.value);
    };

    return (
        <div>
            Find Countries: <Searchbox currentValue={searchStr} changeHandler={searchBoxTextHandler}></Searchbox>
            <FollowUpComponent everything={followUpComponent}></FollowUpComponent>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
