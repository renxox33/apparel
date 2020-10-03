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

export const removeItemFromCart = item => {
    return{
        type: cartActionTypes.REMOVE_ITEM_FROM_CART,
        payload: item
    }
}

export const decreaseItemQuantityfromCart = item => {
    return{
        type: cartActionTypes.DECREASE_ITEM_QUANTITY,
        payload: item
    }
}

export const loadUsersSavedCart = cart => {
    return{
        type: cartActionTypes.LOAD_USERS_SAVED_CART,
        payload: cart
    }
}