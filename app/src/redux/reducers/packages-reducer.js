import { handleActions } from 'redux-actions'

import {
	getAllPackagesStart,
	getAllPackagesSuccess,
	getPackageDataStart,
	getPackageDataSuccess,
	updatePackageStart,
	updatePackageSuccess,
} from 'redux/actions/packages-action'

const defaultState = {
	packages: {},
	loading: false,
	isPackageLoading: false,
	packageData: {},
}

const packagesReducer = handleActions(
	{
		[getAllPackagesStart]: (state) => ({
			...state,
			loading: true,
		}),
		[getAllPackagesSuccess]: (state, { payload }) => ({
			...state,
			loading: false,
			packages: payload,
		}),
        [getPackageDataStart]: (state) => ({
			...state,
			isPackageLoading: true,
		}),
		[getPackageDataSuccess]: (state, { payload }) => ({
			...state,
			isPackageLoading: false,
			packageData: payload,
		}),
        [updatePackageStart]: (state) => ({
			...state,
			isPackageLoading: true,
		}),
		[updatePackageSuccess]: (state, { payload }) => ({
			...state,
			isPackageLoading: false,
			packageData: payload,
		}),
	},
	defaultState,
)

export default packagesReducer
