import React, { useState } from 'react';
import './../index.css';

import CountryWithData from './CountryWithData';


const CountryWithoutData = ({country}) => {
    const [show, setShow] = useState(false);

    const showHideHandler = () => {
        setShow(!show);
    }

    let btnText = 'Show';
    if(show){
        btnText = 'Hide';
    }

    let countryWithData = null;
    if(show){
        countryWithData = (
            <CountryWithData country={country}></CountryWithData>
        );
    }

    return (
        <div>
            <p className="showHide">{country.name}</p>
            <button onClick={showHideHandler} className="showHide">{btnText}</button>
            {countryWithData}
        </div>
    );
};

export default CountryWithoutData;