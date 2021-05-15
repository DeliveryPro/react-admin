import { handleActions } from 'redux-actions'

import { getSupportMessagesSuccess, getSupportMessagesStart } from 'redux/actions/support-action'

const defaultState = {
	messages: {},
	loading: false,
}

const notificationReducer = handleActions(
	{
		[getSupportMessagesSuccess]: (state, { payload }) => ({
			messages: { ...state.message, ...payload },
			loading: false,
		}),
		[getSupportMessagesStart]: (state, { payload }) => ({
			// messages: { ...state.message, ...payload },
			loading: true,
		}),
	},
	defaultState,
)

export default notificationReducer
