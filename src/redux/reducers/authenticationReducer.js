import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.payload,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      };
    case actionTypes.LOGIN_FAILURE:
      return {};
    case actionTypes.LOGOUT:
      return {};
    default:
      return false;
  }
}
