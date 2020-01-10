import React, { useState } from 'react';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if(!props.show) return null;

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(event.target.username.value);
    console.log(event.target.password.value);
  };

  return (
    <form onSubmit={loginHandler}>
      Username <input value={username} name='username' onChange={(event) => setUsername(event.target.value)}/>
      Password <input value={password} type='password' name='password' onChange={(event) => setPassword(event.target.value)}/>
      <button>login</button>
    </form>
  );
};

export default Login;