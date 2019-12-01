import React from 'react';
import './../index.css';

const SearchFilter = ({filterStr, filterHandler}) => {
    return (
        <div className="ownSection">
            <p>Filter Shown With:</p>
            <input value={filterStr} onChange={filterHandler}/>
        </div>
    );
};

export default SearchFilter;