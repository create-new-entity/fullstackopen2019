import React from 'react';
import { hideNotification } from './../reducers/notificationReducer';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 16,
    display: 'none'
    // display: props.store.getState().notification.display
  }

  if(style.display !== 'none'){
    setTimeout(() => {
      // props.store.dispatch(hideNotification());
    }, 3500);
  }
  
  return (
    <div style={style}>
      {/* { props.store.getState().notification.content } */}
    </div>
  )
}

export default Notification