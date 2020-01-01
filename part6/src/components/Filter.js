import React from 'react';
import { newFilterContentAction } from './../reducers/filterReducer';


const Filter = (props) => {
  const onChangeHandler = (event) => {
    props.store.dispatch(newFilterContentAction('FILTER', event.target.value));
    event.target.value = '';
  };

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={onChangeHandler} value={props.store.getState().filter}/>
    </div>
  );
};

export default Filter;