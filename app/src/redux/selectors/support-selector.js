import { createSelector } from 'reselect'

const supportState = (state) => state.support

export const getAllSupportMessagesSelector = createSelector(supportState, ({ messages }) => messages)

export const isSupportMessagesLoadingSelector = createSelector(supportState, ({ loading }) => loading)
