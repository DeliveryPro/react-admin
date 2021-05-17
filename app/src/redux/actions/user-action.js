import { Users } from 'api'
import { createAction } from 'redux-actions'
import logger from 'utils/logger'

import { GET_ALL_USER_START, GET_ALL_USER_SUCCESS, CREATE_NEW_USER_START, CREATE_NEW_USER_SUCCESS } from '../types'
import { errorHandler } from './error-action'

export const getAllUsersStart = createAction(GET_ALL_USER_START)
export const getAllUsersSuccess = createAction(GET_ALL_USER_SUCCESS)

const USERS_PAGE = 'USERS_PAGE'

export const getAllUsersAction = () => async (dispatch) => {
	logger('getAllUsers')
	try {
		const res = await Users.getUsers()
		console.log('res => ', res)
		if (res) {
			dispatch(getAllUsersSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(USERS_PAGE, e))
	}
}

export const createNewUserActionStart = createAction(CREATE_NEW_USER_START)
export const createNewUserActionSuccess = createAction(CREATE_NEW_USER_SUCCESS)

const NEW_USER_PAGE = 'NEW_USER_PAGE'

export const createNewUserAction = (data) => async (dispatch) => {
	logger('createNewUserAction')
    dispatch(createNewUserActionStart())
	try {
		const res = await Users.addNew(data)
		console.log('res => ', res)
		if (res) {
			dispatch(createNewUserActionSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(NEW_USER_PAGE, e))
	}
}
