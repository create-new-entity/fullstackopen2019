import React from 'react';
import './../styles.css';

const Notification = ({ message, type }) => {
    let classes = 'notification';
    if(type === 'positive') classes += ' positive-notification';
    else if(type === 'negative') classes += ' negative-notification';

    return (
        <div className={classes}>
            <p>{message}</p>
        </div>
    );
};

export default Notification;