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

import {
  blogsInitializeAction,
  blogsLoginAction,
  blogsLogoutAction,
  blogsLikeAction,
  blogsDeleteAction,
  blogsCreateAction
} from './reducers/blogsReducer';

import { connect } from 'react-redux';


const notificationTimeLength = 700;

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  };
};

const mapDispatchToProps = {

  userInititializeAction,
  userLoginAction,
  userLogoutAction,

  blogsInitializeAction,
  blogsLoginAction,
  blogsLogoutAction,
  blogsLikeAction,
  blogsDeleteAction,
  blogsCreateAction

};

const App = (props) => {
  const [notification, setNotification] = useState({ message:'' });

  useEffect(() => {
    props.userInititializeAction();
    props.blogsInitializeAction();
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
        props.userLoginAction(newUser);
        props.blogsLoginAction();
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
    props.userLogoutAction();
    props.blogsLogoutAction();
  };

  let createBlogRef = React.createRef();

  const likeHandler = (id) => {
    return async () => {
      props.blogsLikeAction(id);
    };
  };

  const deleteHandler = (id) => {
    return async () => {
      props.blogsDeleteAction(id);
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

        props.blogsCreateAction(newEntry);
        showNotification({ message: `Added new blog entry: ${newEntry.title}`, type: 'positive' });
      }
      catch(error){
        console.log(error);
        showNotification({ message: 'Missing Title or URL', type: 'negative' });
      }
    };
  };

  const detailsPage = () => {
    let allBlogs = null;
    if(props.blogs.length){
      allBlogs = props.blogs.map((blog, index) => {
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
