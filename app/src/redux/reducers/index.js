import { combineReducers } from "redux";

import auth from "redux/reducers/auth-reducer";
import error from 'redux/reducers/error-reducer'
import notification from 'redux/reducers/notification-reducer'
import user from 'redux/reducers/user-reducer'
import support from 'redux/reducers/support-reducer'

export default combineReducers({
  auth,
  error,
  notification,
  user,
  support
});
