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
    if(!loginResult.called){
      login({
        variables: {
          username: event.target.username.value,
          password: event.target.password.value
        }
      });
      return <div>Attempting log in...</div>;
    }
  };

  let errorMessage = null;
  if(error) errorMessage = <p style={error.style}>{error.message}</p>;
  if(!loginResult.loading && loginResult.data){
    console.log(loginResult.data);
    return <div>Logged in...</div>;
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