import { handleActions } from "redux-actions";

import { errorShow, hideError } from "redux/actions/error-action";

const defaultState = {
  error: null,
  page: "",
};

const errorReducer = handleActions(
  {
    [errorShow]: (state, { payload }) => ({
      ...state,
      error: payload,
      page: payload.page,
    }),
    [hideError]: (state) => ({
      ...state,
      ...defaultState,
    }),
  },
  defaultState
);

export default errorReducer;
