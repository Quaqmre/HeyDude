import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

function chatReducer(state = initialState.isGoChat, action) {
  switch (action.type) {
    case actionTypes.GO_CHAT_WITH_NAME:
      return action.payload;

    default:
      return state;
  }
}

export default chatReducer;
