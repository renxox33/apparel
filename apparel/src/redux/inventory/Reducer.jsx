const inventoryAction = require('./Types')

const initialState = {

    inventory: null
}

const inventoryReducer = (state = initialState, action) => {

    switch(action.type){

        case inventoryAction.LOAD_INVENTORY: {
            return{
                ...state,
                inventory: action.payload
            }
        }

        default: return state
    }
}

export default inventoryReducer