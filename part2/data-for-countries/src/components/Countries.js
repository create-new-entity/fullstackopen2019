import React from 'react';
import './../index.css';

const Countries = ({countries}) => {
    let countriesJSX = countries.map((country, index) => {
        return <p key={index}>{country}</p>
    });

    return (
        <>
            {countriesJSX}
        </>
    );
};


export default Countries;