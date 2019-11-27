import React from 'react';

import Part from './Part';


const Content = ({parts}) => {
    let partsComponents = parts.map((part, index) => {
        return <Part key={index} part={part.name} exercises={part.exercises}></Part>   
    });
    return (
        <>
            {partsComponents}
        </>
    );
};

export default Content;