import React from 'react';
import { hideNotificationAction } from './../reducers/notificationReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
};

const mapDispatchToProps = {
  hideNotificationAction
};

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 16,
    marginBottom: 16,
    display: props.notification.display
  }

  if(style.display !== 'none'){
    setTimeout(() => {
      props.hideNotificationAction();
    }, 3500);
  }
  
  return (
    <div style={style}>
      { props.notification.content }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);