import _ from 'lodash';
import backendFns from './../services/anecdotes';

export const incrementVoteAction = (id) => {
  return async (dispatch) => {
    let all = await backendFns.getAll();
    let targetAnecdote = all.find((anecdote) => anecdote.id === id);
    targetAnecdote.votes++;
    await backendFns.update(id, targetAnecdote);
    dispatch({
      id: id,
      type: 'INCREMENT_VOTE'
    });
  };
}

export const newContentAction = (anecdote) => {
  return async (dispatch) => {
    let newAnecdote = await backendFns.createNew(anecdote);
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote
    });
  };
}

export const initAnecdotesAction = () => {
  return async (dispatch) => {
    let anecdotes = await backendFns.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};


const anecdotesReducer = (state = [], action) => {
  let newState = [...state];

  switch(action.type){
    case 'INCREMENT_VOTE':
      let targetAnecdote = newState.find((anecdote) => anecdote.id === action.id);
      targetAnecdote.votes++;
      return _.orderBy(newState, (currState) => currState.votes, ['desc']);
    case 'CREATE_ANECDOTE':
      return _.orderBy(newState.concat(action.data), (currState) => currState.votes, ['desc']);
    case 'FILTER':
      return _.orderBy(newState.filter((anecdote) => anecdote.content.includes(action.content)), (currState) => currState.votes, ['desc']);
    case 'INIT_ANECDOTES':
      return _.orderBy(action.data, (currState) => currState.votes, ['desc']);
    default:
      return newState;
  }
}


export default anecdotesReducer