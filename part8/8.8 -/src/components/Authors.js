import React, { useState } from 'react';
import { GET_ALL_AUTHORS, SET_BORN } from './../queries';
import { useLazyQuery, useMutation } from '@apollo/client';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [ getAllAuthors, resultAllAuthors ] = useLazyQuery(GET_ALL_AUTHORS, {
    pollInterval: 2000
  });
  const [ setBornOfAuthor, resultBornAuthor ] = useMutation(SET_BORN);

  const setBornHandler = (e) => {
    e.preventDefault();
    setBornOfAuthor({
      variables: {
        name: e.target.select.value,
        setBornTo: parseInt(e.target.born.value)
      }
    });
    setName('');
    setBorn('');
  };
  
  if (!props.show) {
    return null;
  }
  
  if(!resultAllAuthors.called) {
    getAllAuthors();
    return <div>Loading...</div>;
  };
  
  if(resultAllAuthors.loading) return <div>Still loading...</div>;
  let authors = resultAllAuthors.data.allAuthors;
  let options = authors.map((author, index) => {
    return <option key={index} value={author.name}>{author.name}</option>
  });

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
      <br/>
      <form onSubmit={setBornHandler}>
        <div>
          <select name='select'>
            {options}
          </select>
        </div>
        <div>
        born <input name="born" value={born} onChange={({target}) => setBorn(target.value)}/>
        </div>
        <button type="submit">Set Born</button>
      </form>
    </div>
  )
}

export default Authors