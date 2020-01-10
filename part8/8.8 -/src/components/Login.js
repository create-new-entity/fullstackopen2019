import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from './../queries';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginErrorHandler = () => {
    let newError = {
      message: 'Login failed',
      style: {
        display: '',
        color: 'red'
      }
    };
    setError(newError);
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  const [login, loginResult] = useMutation(LOGIN, {
    onError: loginErrorHandler
  });

  if(!props.show) return null;

  

  const loginHandler = (event) => {
    event.preventDefault();
    login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value
      }
    });
  };

  let errorMessage = null;
  if(error) errorMessage = <p style={error.style}>{error.message}</p>;
  if(loginResult.data){
    localStorage.setItem('Book-app-token', JSON.stringify(loginResult.data.login.value));
    props.setToken(loginResult.data.login.value);
    props.setPage('authors');
    loginResult.data = null;
  }

  return (
    <>
      { errorMessage }
      <form onSubmit={loginHandler}>
        <div>
        Username <input value={username} name='username' onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
        Password <input value={password} type='password' name='password' onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;