import * as actionTypes from './actionTypes';

import * as httpHelper from '../../httpHelper';

export function goChat() {
  return {type: actionTypes.GO_CHAT_WITH_NAME, payload: true};
}

export function userLoginRequest(user) {
  return {type: actionTypes.LOGIN_REQUEST, payload: user};
}
export function userLoginSuccess(user) {
  return {type: actionTypes.LOGIN_SUCCESS, payload: user};
}
export function userLoginFailure(error) {
  return {type: actionTypes.LOGIN_FAILURE, payload: error};
}

export function loginUser(user) {
  return function(dispatch) {
    dispatch(userLoginRequest({user}));
    return userLoginApi(user)
      .then(
        result => {
          if (result) {
            dispatch(userLoginSuccess(user));
            //history.push("/homepage");
          } else {
            //console.log("Token is not get");
          }
        },
        error => {
          console.log(error);
          dispatch(userLoginFailure(error.toString()));
        },
      )
      .catch(() => {
        //throw error;
      });
  };
}

export function userLoginApi(user) {
  //let endPoint = 'api/users/login';
  return httpHelper.httpPost(user);
}
