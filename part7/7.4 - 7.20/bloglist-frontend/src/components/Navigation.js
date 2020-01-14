import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const Navigation = (props) => {
  const style = {
    padding: 16
  };


  return (
    <div style={style}>
      <Link style={style} to="/">Blogs</Link>
      <Link style={style} to="/users">Users</Link>
      <label>{props.user.username} logged in</label>
    </div>
  );
};

export default connect(mapStateToProps)(Navigation);