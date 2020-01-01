import _ from 'lodash';
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const incrementVoteAction = (id) => {
  return {
    id: id,
    type: 'INCREMENT_VOTE'
  };
}

export const newContentAction = (content) => {
  return {
    type: 'CREATE_ANECDOTE',
    content: content
  };
}


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesReducer = (state = initialState, action) => {
  let newState = [...state];

  switch(action.type){
    case 'INCREMENT_VOTE':
      let targetIndex = newState.findIndex(anecdote => anecdote.id === action.id);
      newState[targetIndex].votes++;
      return _.orderBy(newState, (currState) => currState.votes, ['desc']);
    case 'CREATE_ANECDOTE':
      let newContent = asObject(action.content);
      return _.orderBy(newState.concat(newContent), (currState) => currState.votes, ['desc']);
    case 'FILTER':
      return _.orderBy(newState.filter((anecdote) => anecdote.content.includes(action.content)), (currState) => currState.votes, ['desc']);
    default:
      return newState;
  }
}


export default anecdotesReducer