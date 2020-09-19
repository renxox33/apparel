import userActionTypes from './Types'

const initialState = {
    currentUser : null
}

const userReducer = (state, action) => {

    if(state === null || state === undefined){
        state = initialState
    }

    switch(action.type){
        case(userActionTypes.SET_CURRENT_USER) : {
            return{
                ...state,
                currentUser: action.payload
            }
        }

        default: return state
    }
}

export default userReducer