import React, {useState, useEffect} from 'react';
import './../index.css';

import axios from './../../node_modules/axios';
import API_KEY_WEATHERSTACK from './API_KEYS';

let weatherQuery = 'http://api.weatherstack.com/current?access_key='+API_KEY_WEATHERSTACK+'&query=';


const CountryWithData = ({country}) => {
    let languages = country.languages.map((language, index) => {
        return <li key={index}>{language}</li>;
    });

    const [weather, setWeather] = useState({});

    useEffect(() => {
        console.log(weatherQuery+country.capital);
        axios
            .get(weatherQuery+country.capital)
            .then((response) => {
                console.log(response.data);
                let newWeather = {};
                newWeather.temperature = response.data.current.temperature;
                if(response.data.current.weather_icons.length){
                    newWeather.icon = response.data.current.weather_icons[0];
                }
                newWeather.windSpeed = response.data.current.wind_speed;
                newWeather.windDirection = response.data.current.wind_dir;
                setWeather(newWeather);
            });
    }, []);

    return (
        <>
            <strong><h2>{country.name}</h2></strong>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <strong><p>Languages</p></strong>
            <ul>
                {languages}
            </ul>
            <img src={`${country.flag}`} alt="Jadu"></img>
            <strong><h2>Weather in {country.capital}</h2></strong>
            <p><strong>Temperature:</strong> {weather.temperature} celsius</p>
            <img className="weatherIcon" src={weather.icon}></img>
            <p><strong>Wind:</strong> {weather.windSpeed} kph direction {weather.windDirection}</p>
        </>
    );
};

export default CountryWithData;