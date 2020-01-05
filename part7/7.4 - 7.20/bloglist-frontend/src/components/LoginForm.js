import React from 'react';
import useField from './../hooks/index';

const LoginForm = ({ logInHandler }) => {
  const usernameHook = useField('text');
  const passwordHook = useField('password');
  return (
    <>
      <form onSubmit={logInHandler(usernameHook, passwordHook)} className='loginForm'>
        <div>
          <label>Username:</label>
          <input type={usernameHook.type} value={usernameHook.value} onChange={usernameHook.onChange}></input>
        </div>
        <div>
          <label>Password:</label>
          <input type={passwordHook.type} value={passwordHook.value} onChange={passwordHook.onChange}></input>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;