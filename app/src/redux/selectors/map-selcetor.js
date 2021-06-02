import { createSelector } from 'reselect'

const mapState = (state) => state.map

export const getAllCourierPositionsSelector = createSelector(mapState, ({ couriers }) => couriers)
