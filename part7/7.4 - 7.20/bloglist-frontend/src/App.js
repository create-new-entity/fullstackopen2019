import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import backEndFns from './services/blogs';
import Blogs from './components/Blogs';
import CreateNewBlog from './components/CreateNewBlog';
import Notification from './components/Notification';
import Toggle from './components/Toggle';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import User from './components/User';
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

import {
  reloadUsersAction,
  clearUsersAction
} from './reducers/usersReducer';

import {
  showNotificationAction
} from './reducers/notificationReducer';

import { connect } from 'react-redux';
import Blog from './components/Blog';


const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs,
    notification: state.notification,
    users: state.users
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
  blogsCreateAction,

  reloadUsersAction,
  clearUsersAction,

  showNotificationAction
};

const App = (props) => {

  useEffect(() => {
    props.userInititializeAction();
    props.reloadUsersAction();
    props.blogsInitializeAction();
  }, []);

  const showNotification = (newNotification) => {
    props.showNotificationAction(newNotification);
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
        props.reloadUsersAction();
        props.blogsLoginAction();
        showNotification({ message: 'Logged in successfully', type: 'positive' });
      }
      catch (error){
        showNotification({ message: 'Log in failed', type: 'negative' });
      }
    };
  };
  const loginForm = () => {
    let notificationComponent = null;
    if(props.notification.message !== '') notificationComponent = (<Notification message={props.notification.message} type={props.notification.type}></Notification>);

    return (
      <>
        {notificationComponent}
        <LoginForm logInHandler={logInHandler}></LoginForm>
      </>
    );
  };

  const logoutHandler = () => {
    props.userLogoutAction();
    props.clearUsersAction();
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
      allBlogs = <Blogs blogs={props.blogs}/>;
    }

    let notificationComponent = null;
    if(props.notification.message !== '') notificationComponent = (<Notification message={props.notification.message} type={props.notification.type}></Notification>);


    return (
      <>
        <div>
          <Router>
            <div>
              <Link to='/users'>Users</Link>
            </div>
            <Route path='/' render={() => {
              return (
                <div>
                  <h1>Logged in user: {props.user.username}</h1>
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              );
            }}/>
            <Route exact path='/' render={() => {
              return (
                <div>
                  {notificationComponent}
                  <Toggle buttonLabel="New" ref={createBlogRef}><CreateNewBlog createHandler={ createHandler }/></Toggle>
                  {allBlogs}
                </div>
              );
            }}/>
            <Route exact path='/users' render={() => {
              return (
                <Users/>
              );
            }}/>
            <Route path='/blogs/:id' render={({ match }) => {
              let blog = props.blogs.find(blog => {
                return blog.id === match.params.id;
              });
              return (
                <Blog blog={blog} likeHandler={likeHandler(blog.id)} deleteHandler={deleteHandler(blog.id)} renderDelete={props.user.id === blog.user.id}/>
              );
            }}/>
            <Route path='/users/:id' render={({ match }) => {
              let user = props.users.find(user => user.id === match.params.id);
              let addedBlogs = props.blogs.filter(blog => blog.user.id === user.id);
              return (
                <User user={user} addedBlogs={addedBlogs}/>
              );
            }}/>
          </Router>
        </div>
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
