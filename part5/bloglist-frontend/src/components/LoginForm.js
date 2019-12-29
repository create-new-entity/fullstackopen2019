import React from 'react';

const LoginForm = ({ logInHandler, username, password, onChangeUserName, onChangePassword }) => {
  return (
    <>
      <form onSubmit={logInHandler} className='loginForm'>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={onChangeUserName}></input>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={onChangePassword}></input>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;