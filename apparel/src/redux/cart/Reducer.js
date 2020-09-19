import cartActionTypes from './Types'

const initialState = {
    hidden: true
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

        default: return state
    }
}

export default cartReducer