import React, { useState, useEffect } from 'react';
import backEndFns from './services/blogs';
import Blog from './components/Blog';
import _ from 'lodash';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    let storedUser = JSON.parse(window.localStorage.getItem('user'));
    let storedUserDetail = JSON.parse(window.localStorage.getItem('userDetail'));
    if(!_.isEmpty(storedUser)){
      backEndFns.setToken(storedUser.token);
      setUser(storedUser);
      setUserDetail(storedUserDetail);
    }
  }, []);

  const logInHandler = async (event) => {
    try {
      event.preventDefault();

      let newUser = await backEndFns.login(
        {
          username: username,
          password: password
        }
      );
      let newUserDetail = await backEndFns.getOneUserDetails(newUser.id);
      
      window.localStorage.setItem('user', JSON.stringify(newUser));
      window.localStorage.setItem('userDetail', JSON.stringify(newUserDetail));

      backEndFns.setToken(newUser.token);

      setUsername('');
      setPassword('');

      setUser(newUser);
      setUserDetail(newUserDetail);
    }
    catch (error){
      console.log(error);
    }
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

  const logoutHandler = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userDetail');
    setUser({});
    setUserDetail({});
  }

  const detailsPage = () => {
    let blogs = null;
    if(!_.isEmpty(userDetail)){
      blogs = userDetail.blogs.map((blog, index) => {
        return <Blog key={index} blog={blog}/>
      });
    }
      
    return (
      <>
        <h1> {user.username} Logged In!!!</h1>
        <button onClick={logoutHandler}>Logout</button>
        {blogs}
      </>
    );
  };

  return (
    <div className="App">
      { !_.isEmpty(user) ?  detailsPage() : loginForm() }
    </div>
  );
}

export default App;
