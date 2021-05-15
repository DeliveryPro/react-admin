import { handleActions } from "redux-actions";

import { loginSuccess } from "redux/actions/auth-action";

const defaultState = {};

const authReducer = handleActions(
  {
    [loginSuccess]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  defaultState
);

export default authReducer;
