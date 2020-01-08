import React from 'react';
import { GET_ALL_AUTHORS } from './../queries';
import { useLazyQuery } from '@apollo/client';

const Authors = (props) => {
  const [ getAllAuthors, result ] = useLazyQuery(GET_ALL_AUTHORS, {
    pollInterval: 2000
  });
  
  if (!props.show) {
    return null;
  }
  
  if(!result.called) {
    getAllAuthors();
    return <div>Loading...</div>;
  };
  
  if(result.loading) return <div>Still loading...</div>;
  let authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors