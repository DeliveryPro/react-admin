import { createSelector } from 'reselect'

const packagesState = (state) => state.packages

export const getAllPackagesSelector = createSelector(packagesState, ({ packages }) => packages)

export const isPackagesLoadingSelector = createSelector(packagesState, ({ loading }) => loading)

export const packageDataSelector = createSelector(packagesState, ({ packageData }) => packageData)
export const isPackageDataLoadingSelector = createSelector(packagesState, ({ isPackageLoading }) => isPackageLoading)
