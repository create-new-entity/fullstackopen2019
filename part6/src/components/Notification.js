import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
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

  
  return (
    <div style={style}>
      { props.notification.content }
    </div>
  )
}

export default connect(mapStateToProps)(Notification);