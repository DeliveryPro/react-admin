import { handleActions } from "redux-actions";

import {
  hideNotification,
  showNotification,
} from "redux/actions/notification-action";

const defaultState = {
  notification: {},
};

const notificationReducer = handleActions(
  {
    [showNotification]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [hideNotification]: () => defaultState,
  },
  defaultState
);

export default notificationReducer;
