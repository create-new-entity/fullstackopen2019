import _ from 'lodash';

export const incrementVoteAction = (id) => {
  return {
    id: id,
    type: 'INCREMENT_VOTE'
  };
}

export const newContentAction = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: anecdote
  };
}

export const initAnecdotesAction = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};


const anecdotesReducer = (state = [], action) => {
  let newState = [...state];

  switch(action.type){
    case 'INCREMENT_VOTE':
      let targetIndex = newState.findIndex(anecdote => anecdote.id === action.id);
      newState[targetIndex].votes++;
      return _.orderBy(newState, (currState) => currState.votes, ['desc']);
    case 'CREATE_ANECDOTE':
      return _.orderBy(newState.concat(action.data), (currState) => currState.votes, ['desc']);
    case 'FILTER':
      return _.orderBy(newState.filter((anecdote) => anecdote.content.includes(action.content)), (currState) => currState.votes, ['desc']);
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return newState;
  }
}


export default anecdotesReducer