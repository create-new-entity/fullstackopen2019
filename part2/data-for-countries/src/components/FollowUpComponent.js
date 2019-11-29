import React from 'react';
import './../index.css';

import Message from './Message';
import Countries from './Countries';
import CountryWithData from './CountryWithData';


const FollowUpComponent = ({countries, searchStr}) => {
    if(searchStr.length < 1){
        return (
            <Message message={"Try typing a country name."}></Message>
        );
    }

    let filteredData = countries.filter((country) => {
        return country.name.toLowerCase().includes(searchStr.toLowerCase());
    });
    
    if(filteredData.length > 10){
        return (
            <Message message={"Too many matches. Specify another filter."}></Message>
        );
    }
    else if(filteredData.length > 1 && filteredData.length < 10){
        let filteredCountries = filteredData.map((country) => {
            return {
                name: country.name,
                capital: country.capital,
                population: country.population,
                languages: country.languages.map((language) => language.name),
                flag: country.flag
            };
        });
        return (
            <Countries countries={filteredCountries}></Countries>
        );
    }
    else if(filteredData.length === 1){
        let country = {
            name: filteredData[0].name,
            capital: filteredData[0].capital,
            population: filteredData[0].population,
            languages: filteredData[0].languages.map((language) => language.name),
            flag: filteredData[0].flag
        };
        return (
            <CountryWithData country={country}></CountryWithData>
        );
    }
    else{
        return (
            <>
            </>
        );
    }
};


export default FollowUpComponent;