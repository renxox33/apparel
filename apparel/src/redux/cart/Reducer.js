import cartActionTypes from './Types'

import { addItemToCart } from './Utilities'

const initialState = {
    hidden: true,
    cart: []
}

const cartReducer = (state, action) => {
    if(state === null || state === undefined){
        state = initialState
    } 
    
    switch(action.type){

        case cartActionTypes.TOGGLE_CART: {
            return {
                ...state,
                hidden: !state.hidden
            }
        }

        case cartActionTypes.ADD_ITEM_TO_CART: {
            return{
                ...state,
                // cart: [...state.cart, action.payload]
                cart: addItemToCart(state.cart, action.payload)
            }
        }

        default: return state
    }
}

export default cartReducer