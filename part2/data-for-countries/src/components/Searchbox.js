import React from 'react';
import './../index.css';

const Searchbox = ({currentValue, changeHandler}) => {
    return (
        <input value={currentValue} onChange={changeHandler}></input>
    );
};

export default Searchbox;