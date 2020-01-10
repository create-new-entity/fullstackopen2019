import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook';
import Login from './components/Login';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  let addBookButton, loginButton, logoutButton;

  useEffect(() => {
    console.log(localStorage.getItem('Book-app-token'));
    let storedToken = localStorage.getItem('Book-app-token');
    if(storedToken) setToken(storedToken);
  }, []);

  const logoutHandler = () => {
    console.log('destroying token');
    localStorage.removeItem('Book-app-token');
    console.log(localStorage.getItem('Book-app-token'));
    setToken(null);
    console.log();
  };

  console.log('token', token);
  console.log('typeof token', typeof token);

  if(token){
    logoutButton = <button onClick={logoutHandler}>logout</button>;
    addBookButton = <button onClick={() => setPage('add')}>add book</button>;
    loginButton = null;
  }
  else {
    logoutButton = null;
    addBookButton = null;
    loginButton = <button onClick={() => setPage('login')}>login</button>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {addBookButton}
        {loginButton}
        {logoutButton}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App