import React from 'react';
import './../index.css';

import CountryWithoutData from './CountryWithoutData';

const Countries = ({countries}) => {
    let countriesJSX = countries.map((country, index) => {
        return <CountryWithoutData key={index} country={country}></CountryWithoutData>
    });

    return (
        <>
            {countriesJSX}
        </>
    );
};


export default Countries;