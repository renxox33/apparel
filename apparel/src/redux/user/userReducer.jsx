import userActionTypes from './userActionTypes'

const initiaState = {
    currentUser : null
}

const userReducer = (state, action) => {

    if(state === null || state === undefined){
        state = initiaState
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