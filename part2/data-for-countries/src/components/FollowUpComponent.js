import React from 'react';
import './../index.css';

import Message from './Message';
import Countries from './Countries';
import CountryWithData from './CountryWithData';


const FollowUpComponent = ({everything}) => {
    if(!everything) return null;
    if(everything.hasOwnProperty('message')){
        return (
            <Message message={everything.message}></Message>
        );
    }
    else if(everything.hasOwnProperty('countries')){
        return (
            <Countries countries={everything.countries}></Countries>
        );
    }
    else if(everything.hasOwnProperty('country')){
        return (
            <CountryWithData country={everything.country}></CountryWithData>
        );
    }
    return (
        <p>Jadu</p>
    );
};


export default FollowUpComponent;