import React from 'react';
import { newFilterContentAction } from './../reducers/filterReducer';
import { connect } from 'react-redux';

const mapsStateToProps = (state) => {
  return {
    filter: state.filter
  };
};

const Filter = (props) => {
  const onChangeHandler = (event) => {
    // props.store.dispatch(newFilterContentAction('FILTER', event.target.value));
    event.target.value = '';
  };

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter <input onChange={onChangeHandler} value={props.filter}/>
    </div>
  );
};

export default connect(mapsStateToProps)(Filter);