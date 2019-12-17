import React, { useState, useEffect } from 'react';
import backEndFns from './services/blogs';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(user){
      backEndFns.setToken(user.token);
    }
  }, []);

  const logInHandler = async (event) => {
    event.preventDefault();
    let newUser = await backEndFns.login(
      {
        username: username,
        password: password
      }
    );
    setUser(newUser);
  };
  
  const loginForm = () => {
    return (
      <>
        <form onSubmit={logInHandler}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}></input>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  };


  return (
    <div className="App">
      { user ?  (<h1> {user.username} Logged In!!!</h1>) : loginForm() }
    </div>
  );
}

export default App;
