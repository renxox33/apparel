import { combineReducers } from 'redux'

import userReducer from './user/Reducer'
import cartReducer from './cart/Reducer'
import inventoryReducer from './inventory/Reducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    inventory: inventoryReducer
})