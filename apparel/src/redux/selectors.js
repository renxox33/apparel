import { createSelector } from 'reselect'

const getCurrentUser = state => state.user

const getHiddenValue = state => state.cart

export const updateCurrentUser = createSelector(
    [getCurrentUser],
    (user) => user.currentUser
)

export const updateHiddenValue = createSelector(
    [getHiddenValue],
    (cart) => cart.hidden
)