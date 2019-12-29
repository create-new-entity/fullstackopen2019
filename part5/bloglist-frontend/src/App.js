import React, { useState, useEffect } from 'react';
import backEndFns from './services/blogs';
import Blog from './components/Blog';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import LoginForm from './components/LoginForm';
import _ from 'lodash';

const notificationTimeLength = 700;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [createNew, setCreateNew] = useState({ title: '', author: '', url: '' });
  const [notification, setNotification] = useState({ message:'' });

  useEffect(() => {
    let storedUser = window.localStorage.getItem('user');
    let storedBlogs = window.localStorage.getItem('blogs');

    if(storedUser){
      storedUser = JSON.parse(storedUser);
      storedBlogs = JSON.parse(storedBlogs);
      backEndFns.setToken(storedUser.token);
      setUser(storedUser);
      setBlogs(storedBlogs);
    }
  }, []);

  const showNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification({ message: '' }), notificationTimeLength);
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
      let allBlogs = await backEndFns.getAll();
      window.localStorage.setItem('user', JSON.stringify(newUser));
      window.localStorage.setItem('blogs', JSON.stringify(allBlogs));

      backEndFns.setToken(newUser.token);

      setUsername('');
      setPassword('');

      setUser(newUser);
      setBlogs(_.orderBy(allBlogs, [(blog) => {
        return blog.likes;
      }], ['desc']));
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
        <LoginForm logInHandler={logInHandler} username={username} password={password} onChangeUserName={(event) => setUsername(event.target.value)} onChangePassword={(event) => setPassword(event.target.value)}></LoginForm>
      </>
    );
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userDetail');
    setUser({});
    setBlogs([]);
  };

  let createBlogRef = React.createRef();

  const likeHandler = (id) => {
    return async () => {
      let res = await backEndFns.incrementLike(id);
      let newBlogs = [...blogs];
      let foundIndex = _.findIndex(newBlogs, (blog) => {
        return blog.id === res.id;
      });
      newBlogs[foundIndex].likes++;
      setBlogs(_.orderBy(newBlogs, [(blog) => {
        return blog.likes;
      }], ['desc']));
    };
  };

  const deleteHandler = (id) => {
    return async () => {
      let blogTitle = blogs.find((blog) => blog.id === id).title;
      let reply = window.confirm(`Delete ${blogTitle}?`);
      if(!reply) return;
      let statusCode = await backEndFns.deleteBlog(id);
      if(statusCode === 204){
        let newBlogs = [...blogs];
        setBlogs(_.orderBy(newBlogs.filter((blog) => blog.id !== id), [(blog) => blog.likes], ['desc']));
      }
    };
  };

  const createHandler = async (event) => {
    try {
      event.preventDefault();
      createBlogRef.current.toggle();
      let hold = { ...createNew };
      let newObj = { ...createNew, title: '', author: '', url: '' };
      setCreateNew(newObj);
      let newBlog = await backEndFns.createNewEntry(hold);
      let newAllBlogs = [...blogs];
      newAllBlogs.push(newBlog);
      setBlogs(_.orderBy(newAllBlogs, [(blog) => {
        return blog.likes;
      }], ['desc']));
      showNotification({ message: `Added new blog entry: ${newBlog.title}`, type: 'positive' });
      window.localStorage.setItem('blogs', JSON.stringify(newAllBlogs));
    }
    catch(error){
      console.log(error);
      showNotification({ message: 'Missing Title or URL', type: 'negative' });
    }
  };

  const detailsPage = () => {
    let allBlogs = null;
    if(blogs.length){
      allBlogs = blogs.map((blog, index) => {
        return <Blog key={index} blog={blog} likeHandler={likeHandler(blog.id)} deleteHandler={deleteHandler(blog.id)} renderDelete={user.id === blog.user.id}/>;
      });
    }

    let notificationComponent = null;
    if(notification.message !== '') notificationComponent = (<Notification message={notification.message} type={notification.type}></Notification>);


    return (
      <>
        {notificationComponent}
        <h1>Logged in user: {user.username}</h1>
        <button onClick={logoutHandler}>Logout</button>
        <Toggle buttonLabel="New" ref={createBlogRef}><CreateNewBlog createNewInputsChangeHandler={createNewInputsChangeHandler} createNew={createNew} createHandler={createHandler}/></Toggle>
        {allBlogs}
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
