import { Map } from 'api'
import { createAction } from 'redux-actions'
import logger from 'utils/logger'

import {
	SUBSCRIBE_TO_COURIER_POSITION_START,
	SUBSCRIBE_TO_COURIER_POSITION_SUCCESS,
	NEW_POSITION_RECEIVED_SUCCESS,
	GET_ALL_COURIERS_START,
	GET_ALL_COURIERS_SUCCESS,
	GET_COURIER_DETAILED_DATA_START,
	GET_COURIER_DETAILED_DATA_SUCCESS,
} from '../types'
import { errorHandler } from './error-action'

export const getAllCouriersStart = createAction(GET_ALL_COURIERS_START)
export const getAllCouriersSuccess = createAction(GET_ALL_COURIERS_SUCCESS)

const MAP_PAGE = 'MAP_PAGE'

export const getAllCouriersAction = () => async (dispatch) => {
	logger('getAllCouriersAction')
	dispatch(getAllCouriersStart())
	try {
		const res = await Map.getAllCouriers()
		if (res) {
			dispatch(getAllCouriersSuccess(res))
			Object.keys(res).forEach((userId) => {
				dispatch(getCourierDataAction(userId))
				dispatch(subscribeToCourierPositionAction(userId))
			})
		}
	} catch (e) {
		dispatch(errorHandler(MAP_PAGE, e))
	}
}

export const getCourierDetailerDataStart = createAction(GET_COURIER_DETAILED_DATA_START)
export const getCourierDetailerDataSuccess = createAction(GET_COURIER_DETAILED_DATA_SUCCESS)

export const getCourierDataAction = (userId) => async (dispatch) => {
	logger('getAllCouriersAction')
	dispatch(getCourierDetailerDataStart(userId))
	try {
		const res = await Map.getCourierData(userId)
		if (res) {
			dispatch(getCourierDetailerDataSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(MAP_PAGE, e))
	}
}

export const subscribeToCourierPositionStart = createAction(SUBSCRIBE_TO_COURIER_POSITION_START)
export const subscribeToCourierPositionSuccess = createAction(SUBSCRIBE_TO_COURIER_POSITION_SUCCESS)
export const newPositionReceived = createAction(NEW_POSITION_RECEIVED_SUCCESS)

export const subscribeToCourierPositionAction = (userId) => (dispatch) => {
	logger('getAllCouriersAction')
	dispatch(subscribeToCourierPositionStart())
	try {
		const updatePosition = (data) => {
			console.log(`data`, data)
			dispatch(newPositionReceived(data))
		}
		const res = Map.getCourierPosition(userId, updatePosition)
		if (res) {
			dispatch(subscribeToCourierPositionSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(MAP_PAGE, e))
	}
}
