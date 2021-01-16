import {combineReducers} from 'redux';
import authenticationReducer from './authenticationReducer';
import chatReducer from '../reducers/chatReducer';

const rootReducer = combineReducers({
  authenticationReducer,
  chatReducer,
});
export default rootReducer;
