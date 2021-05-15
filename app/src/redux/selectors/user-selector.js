import { createSelector } from 'reselect'

const userState = (state) => state.user

export const getAllUsersSelector = createSelector(userState, ({ users }) => users)

export const isUsersLoadingSelector = createSelector(userState, ({ loading }) => loading)
