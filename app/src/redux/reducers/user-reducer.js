import { handleActions } from 'redux-actions'

import {
	getAllUsersSuccess,
	getAllUsersStart,
	createNewUserActionStart,
	createNewUserActionSuccess,
} from 'redux/actions/user-action'

const defaultState = {
	users: {},
	loading: false,
	isUserLoading: false,
}

const notificationReducer = handleActions(
	{
		[getAllUsersSuccess]: (state, { payload }) => ({
			users: { ...state.users, ...payload },
			loading: false,
		}),
		[getAllUsersStart]: (state) => ({
			...state,
			loading: true,
		}),
		[createNewUserActionSuccess]: (state, { payload }) => ({
			...state,
			...payload,
			isUserLoading: false,
		}),
		[createNewUserActionStart]: (state) => ({
			...state,
			isUserLoading: true,
		}),
	},
	defaultState,
)

export default notificationReducer
