import { handleActions } from 'redux-actions'

import { getAllUsersSuccess, getAllUsersStart } from 'redux/actions/user-action'

const defaultState = {
	users: {},
	loading: false,
}

const notificationReducer = handleActions(
	{
		[getAllUsersSuccess]: (state, { payload }) => ({
			users: { ...state.users, ...payload },
			loading: false,
		}),
		[getAllUsersStart]: (state, { payload }) => ({
			...state,
			loading: true,
		}),
	},
	defaultState,
)

export default notificationReducer
