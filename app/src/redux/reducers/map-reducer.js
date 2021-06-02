import {
	subscribeToCourierPositionStart,
	subscribeToCourierPositionSuccess,
	newPositionReceived,
	getAllCouriersStart,
	getAllCouriersSuccess,
	getCourierDetailerDataSuccess,
} from 'redux/actions/map-action'

import { handleActions } from 'redux-actions'

const defaultState = {
	couriers: {},
	isCouriersLoading: false,
}

const packagesReducer = handleActions(
	{
		[subscribeToCourierPositionStart]: (state) => ({
			...state,
		}),
		[subscribeToCourierPositionSuccess]: (state) => ({
			...state,
		}),
		[newPositionReceived]: (state, { payload }) => ({
			...state,
			couriers: { ...state.couriers, [payload.id]: {...state.couriers[payload.id], ...payload.data } },
		}),
		[getAllCouriersSuccess]: (state, { payload }) => ({
			...state,
			isCouriersLoading: false,
			couriers: payload,
		}),
		[getAllCouriersStart]: (state) => ({
			...state,
			isCouriersLoading: true,
		}),
		[getAllCouriersSuccess]: (state, { payload }) => ({
			...state,
			isCouriersLoading: false,
			couriers: payload,
		}),
		[getCourierDetailerDataSuccess]: (state, { payload }) => ({
			...state,
			couriers: { ...state.couriers, [payload.id]: { ...state.couriers[payload.id], ...payload } },
		}),
	},
	defaultState,
)

export default packagesReducer
