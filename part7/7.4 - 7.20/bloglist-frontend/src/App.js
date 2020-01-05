import React, { useState, useEffect } from 'react';
import backEndFns from './services/blogs';
import Blog from './components/Blog';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import LoginForm from './components/LoginForm';
import _ from 'lodash';
import {
  userInititializeAction,
  userLoginAction,
  userLogoutAction
} from './reducers/userReducer';

import { connect } from 'react-redux';


const notificationTimeLength = 700;

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  userInititializeAction,
  userLoginAction,
  userLogoutAction
};

const App = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message:'' });

  useEffect(() => {
    props.userInititializeAction();
    let storedBlogs = window.localStorage.getItem('blogs');
    if(storedBlogs){
      storedBlogs = JSON.parse(storedBlogs);
      setBlogs( _.orderBy(storedBlogs, [(blog) => {
        return blog.likes;
      }], ['desc']));
    }
  }, []);

  const showNotification = (newNotification) => {
    setNotification(newNotification);
    setTimeout(() => setNotification({ message: '' }), notificationTimeLength);
  };

  const logInHandler = (userNameHook, passwordHook) => {
    return async (event) => {
      try {
        event.preventDefault();

        let newUser = await backEndFns.login(
          {
            username: userNameHook.value,
            password: passwordHook.value
          }
        );
        userNameHook.reset();
        passwordHook.reset();
        let allBlogs = await backEndFns.getAll();
        window.localStorage.setItem('blogs', JSON.stringify(allBlogs));
        backEndFns.setToken(newUser.token);
        props.userLoginAction(newUser);
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
  };
  const loginForm = () => {
    let notificationComponent = null;
    if(notification.message !== '') notificationComponent = (<Notification message={notification.message} type={notification.type}></Notification>);

    return (
      <>
        {notificationComponent}
        <LoginForm logInHandler={logInHandler}></LoginForm>
      </>
    );
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('userDetail');
    props.userLogoutAction();
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
      window.localStorage.setItem('blogs', JSON.stringify(newBlogs));
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

  const createHandler = (titleHook, authorHook, urlHook) => {
    return async (event) => {
      try {
        event.preventDefault();

        let newEntry = {
          title: titleHook.value,
          author: authorHook.value,
          url: urlHook.value
        };

        titleHook.reset();
        authorHook.reset();
        urlHook.reset();

        createBlogRef.current.toggle();

        let newBlog = await backEndFns.createNewEntry(newEntry);
        let newAllBlogs = [...blogs];
        newAllBlogs.push(newBlog);
        newAllBlogs = _.orderBy(newAllBlogs, [(blog) => {
          return blog.likes;
        }], ['desc']);
        setBlogs(newAllBlogs);
        showNotification({ message: `Added new blog entry: ${newBlog.title}`, type: 'positive' });
        window.localStorage.setItem('blogs', JSON.stringify(newAllBlogs));
      }
      catch(error){
        console.log(error);
        showNotification({ message: 'Missing Title or URL', type: 'negative' });
      }
    };
  };

  const detailsPage = () => {
    let allBlogs = null;
    if(blogs.length){
      allBlogs = blogs.map((blog, index) => {
        return <Blog key={index} blog={blog} likeHandler={likeHandler(blog.id)} deleteHandler={deleteHandler(blog.id)} renderDelete={props.user.id === blog.user.id}/>;
      });
    }

    let notificationComponent = null;
    if(notification.message !== '') notificationComponent = (<Notification message={notification.message} type={notification.type}></Notification>);


    return (
      <>
        {notificationComponent}
        <h1>Logged in user: {props.user.username}</h1>
        <button onClick={logoutHandler}>Logout</button>
        <Toggle buttonLabel="New" ref={createBlogRef}><CreateNewBlog createHandler={ createHandler }/></Toggle>
        {allBlogs}
      </>
    );
  };

  return (
    <div className="App">
      { !_.isEmpty(props.user) ?  detailsPage() : loginForm() }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
