import React from 'react';
import './../index.css';


const CountryWithData = ({country}) => {
    let languages = country.languages.map((language, index) => {
        return <li key={index}>{language}</li>;
    });
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
        </>
    );
};

export default CountryWithData;