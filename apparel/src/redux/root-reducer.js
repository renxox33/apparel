import { combineReducers } from 'redux'

import userReducer from './user/Reducer'
import cartReducer from './cart/Reducer'

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})