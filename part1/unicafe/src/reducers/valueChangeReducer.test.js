import deepFreeze from 'deep-freeze';
import valueChangeReducer from './valueChangeReducer';

describe('valueChangeReducer test', () => {
  let initialValues;

  beforeEach(() => {
    initialValues = {
      good: 0,
      neutral: 0,
      bad: 0
    };
  });

  test('Returns initial state when called with an undefined state', () => {
    let newState = valueChangeReducer(undefined, {});
    expect(newState).toEqual(initialValues);
  });

  test('Value of "good" incremented', () => {
    const state = initialValues;
    deepFreeze(state);
    let action = {
      type: 'INCREMENT',
      feedback: 'good'
    };
    let newState = valueChangeReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    });
  });
});