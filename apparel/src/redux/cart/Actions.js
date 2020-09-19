import cartActionTypes from './Types'

export const setCartHiddenValue = () => {
    return{
        type: cartActionTypes.TOGGLE_CART
    }
}