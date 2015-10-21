import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expect from 'expect';

const middlewares = [thunk];

/**
 * Creates a mock of Redux store with middleware.
 * From: https://rackt.github.io/redux/docs/recipes/WritingTests.html
 * Basically you pass the actions you expect and it will compared them
 * to the actual ones that get dispatched
 */

export default (getState, expectedActions, onLastAction, debug=false) => {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();

        if (debug) {
          console.log('action', action);
          console.log('expectedAction', expectedAction);
        }

        expect(action).toEqual(expectedAction);
        if (onLastAction && !expectedActions.length) {
          onLastAction();
        }
        return action;
      }
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
};
