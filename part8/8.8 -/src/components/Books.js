import React from 'react';
import { GET_ALL_BOOKS } from './../queries';
import { useLazyQuery } from '@apollo/client';

const Books = (props) => {
  const [ getAllBooks, result ] = useLazyQuery(GET_ALL_BOOKS, {
    pollInterval: 2000
  });

  if (!props.show) {
    return null
  }

  if(!result.called) {
    getAllBooks();
    return <div>Loading books...</div>;
  }

  if(result.loading){
    return <div>Loading books...</div>;
  }
  
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books