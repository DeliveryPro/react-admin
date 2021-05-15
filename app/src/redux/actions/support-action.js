import { firebaseApp } from 'api'
import { createAction } from 'redux-actions'
import logger from 'utils/logger'

import { GET_SUPPORT_MESSAGES_START, GET_SUPPORT_MESSAGES_SUCCESS } from '../types'
import { errorHandler } from './error-action'

export const getSupportMessagesStart = createAction(GET_SUPPORT_MESSAGES_START)
export const getSupportMessagesSuccess = createAction(GET_SUPPORT_MESSAGES_SUCCESS)

const SUPPORT_PAGE = 'SUPPORT_PAGE'

export const getSupportMessagesAction = () => async (dispatch) => {
	logger('getSupportMessagesAction')
	dispatch(getSupportMessagesStart())
	try {
		const res = await firebaseApp.getSupportMessages()
		console.log('res => ', res)
		if (res) {
			dispatch(getSupportMessagesSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(SUPPORT_PAGE, e))
	}
}
