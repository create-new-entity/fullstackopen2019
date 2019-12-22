import React, { useState, useEffect } from 'react';
import backEndFns from './services/blogs';
import Blog from './components/Blog';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import _ from 'lodash';

const notificationTimeLength = 700;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [createNew, setCreateNew] = useState({ title: '', author: '', url: ''});
  const [notification, setNotification] = useState({message:''});

  useEffect(() => {
    let storedUser = JSON.parse(window.localStorage.getItem('user'));
    let storedUserDetail = JSON.parse(window.localStorage.getItem('userDetail'));
    if(!_.isEmpty(storedUser)){
      backEndFns.setToken(storedUser.token);
      setUser(storedUser);
      setUserDetail(storedUserDetail);
    }
  }, []);

  const showNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification({message: ''}), notificationTimeLength);
  };

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
      
      showNotification({ message: 'Logged in successfully', type: 'positive' });
    }
    catch (error){
      console.log(error);
      showNotification({ message: 'Log in failed', type: 'negative' });
    }
  };
  
  const loginForm = () => {
    let notificationComponent = null;
    if(notification.message !== '') notificationComponent = (<Notification message={notification.message} type={notification.type}></Notification>);

    return (
      <>
        {notificationComponent}
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

  const createHandler = async (event) => {
    try {
      event.preventDefault();
      let newObj = { ...createNew, title: '', author: '', url: ''};
      let hold = { ...createNew };
      setCreateNew(newObj);
      let newBlog = await backEndFns.createNewEntry(hold);
      let newUserDetail = { ...userDetail };
      newUserDetail.blogs.push(newBlog);
      setUserDetail(newUserDetail);
      showNotification({ message: `Added new blog entry: ${newBlog.title}`, type: 'positive' });
      window.localStorage.setItem('userDetail', JSON.stringify(userDetail));
    }
    catch(error){
      console.log(error);
      showNotification({ message: 'Missing Title or URL', type: 'negative' });
    }
  };

  const detailsPage = () => {
    let blogs = null;
    if(!_.isEmpty(userDetail)){
      blogs = userDetail.blogs.map((blog, index) => {
        return <Blog key={index} blog={blog}/>
      });
    }

    let notificationComponent = null;

    if(notification.message !== '') notificationComponent = (<Notification message={notification.message} type={notification.type}></Notification>);

    return (
      <>
        {notificationComponent}
        <h1>Logged in user: {user.username}</h1>
        <button onClick={logoutHandler}>Logout</button>
        <CreateNewBlog createNewInputsChangeHandler={createNewInputsChangeHandler} createNew={createNew} createHandler={createHandler}/>
        {blogs}
      </>
    );
  };

  const createNewInputsChangeHandler = (type) => {
    if(type === 'title') return (event) => {
      let newObj = { ...createNew, title: event.target.value };
      setCreateNew(newObj);
    };
    else if(type === 'author') return (event) => {
      let newObj = { ...createNew, author: event.target.value };
      setCreateNew(newObj);
    };
    else if(type === 'url') return (event) => {
      let newObj = { ...createNew, url: event.target.value };
      setCreateNew(newObj);
    };
    else console.log('Something went wrong');
  };

  return (
    <div className="App">
      { !_.isEmpty(user) ?  detailsPage() : loginForm() }
    </div>
  );
}

export default App;
