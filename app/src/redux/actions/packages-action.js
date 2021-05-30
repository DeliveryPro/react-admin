import {  Packages } from 'api'
import { createAction } from 'redux-actions'
import logger from 'utils/logger'

import {
	GET_ALL_PACKAGES_START,
GET_ALL_PACKAGES_SUCCESS,
GET_PACKAGE_DATA_START,
GET_PACKAGE_DATA_SUCCESS,
UPDATE_PACKAGE_DATA_START,
UPDATE_PACKAGE_DATA_SUCCESS
} from '../types'
import { errorHandler } from './error-action'

export const getAllPackagesStart = createAction(GET_ALL_PACKAGES_START)
export const getAllPackagesSuccess = createAction(GET_ALL_PACKAGES_SUCCESS)

const PACKAGES_PAGE = 'PACKAGES_PAGE'

export const getAllPackagesAction = (packageId) => async (dispatch) => {
	logger('getAllPackagesAction')
	try {
		const res = await Packages.getPackages(packageId)
		console.log('res => ', res)
		if (res) {
			dispatch(getAllPackagesSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(PACKAGES_PAGE, e))
	}
}

export const getPackageDataStart = createAction(GET_PACKAGE_DATA_START)
export const getPackageDataSuccess = createAction(GET_PACKAGE_DATA_SUCCESS)

export const getPackageDataAction = (packageId) => async (dispatch) => {
	logger('getPackageDataAction')
	dispatch(getPackageDataStart())
	try {
		const res = await Packages.getPackage(packageId)
		console.log('res => ', res)
		if (res) {
			dispatch(getPackageDataSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(PACKAGES_PAGE, e))
	}
}

export const updatePackageStart = createAction(UPDATE_PACKAGE_DATA_START)
export const updatePackageSuccess = createAction(UPDATE_PACKAGE_DATA_SUCCESS)

export const updateUserAction = (packageId, data) => async (dispatch) => {
	logger('updateUserAction')
	dispatch(updatePackageStart())
	try {
		const res = await Packages.updatePackage(packageId, data)
		if (res) {
			dispatch(updatePackageSuccess(res))
		}
	} catch (e) {
		dispatch(errorHandler(PACKAGES_PAGE, e))
	}
}
