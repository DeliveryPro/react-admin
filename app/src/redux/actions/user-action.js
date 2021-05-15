import { firebaseApp } from 'api'
import { createAction } from 'redux-actions'
import logger from 'utils/logger'

import { GET_ALL_USER_START, GET_ALL_USER_SUCCESS } from '../types'
import { errorHandler } from './error-action'

export const getAllUsersStart = createAction(GET_ALL_USER_START)
export const getAllUsersSuccess = createAction(GET_ALL_USER_SUCCESS)

const USERS_PAGE = 'USERS_PAGE'

export const getAllUsersAction = () => async (dispatch) => {
	logger('getAllUsers')
	try {
		const res = await firebaseApp.getUsers()
		console.log('res => ', res)
		if (res) {
			dispatch(getAllUsersSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}
