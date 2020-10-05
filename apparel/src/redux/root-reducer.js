import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/Reducer'
import cartReducer from './cart/Reducer'
import inventoryReducer from './inventory/Reducer'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    inventory: inventoryReducer
})

export default persistReducer(persistConfig, rootReducer)