import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  userLogoutAction
} from './../reducers/userReducer';

import {
  clearUsersAction
} from './../reducers/usersReducer';

import {
  blogsLogoutAction
} from './../reducers/blogsReducer';


const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userLogoutAction,
  clearUsersAction,
  blogsLogoutAction
};

const Navigation = (props) => {
  const style = {
    padding: 16
  };

  const logoutHandler = () => {
    props.userLogoutAction();
    props.clearUsersAction();
    props.blogsLogoutAction();
    props.history.push('/');
  };


  return (
    <div style={style}>
      <Link style={style} to="/">Blogs</Link>
      <Link style={style} to="/users">Users</Link>
      <label style={style}>{props.user.username} logged in</label>
      <button style={style} onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));