import cartActionTypes from './Types'

export const setCartHiddenValue = () => {
    return{
        type: cartActionTypes.TOGGLE_CART
    }
}

export const addItemToCart = item => {
    return{
        type: cartActionTypes.ADD_ITEM_TO_CART,
        payload: item
    }
}