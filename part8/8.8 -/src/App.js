import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook';
import Login from './components/Login';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  let addBookButton, loginButton, logoutButton;

  const logoutHandler = () => {
    localStorage.setItem('Book-app-token', null);
    setToken(null);
  };

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