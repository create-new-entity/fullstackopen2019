import React from 'react';
import './../index.css';


const Notification = ({message, result}) => {
    let styleClass = 'negativeNotification';
    
    if(result === 'positive') styleClass = 'positiveNotification';

    return (
        <p className={styleClass}>{message}</p>
    );
};


export default Notification;