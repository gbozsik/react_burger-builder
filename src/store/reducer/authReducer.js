import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../Utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const authenticationSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authenticationFailed = (state, action) => {
    console.log('action in auth reducer', action.error.response)
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const logout = (state) => {
    return updateObject(state, { token: null, userId: null})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, { loading: true })
        case actionTypes.AUTH_SUCCESS: return authenticationSuccess(state, action)
        case actionTypes.AUTH_FAILED: return authenticationFailed(state, action)
        case actionTypes.LOGOUT: return logout(state)
        default: return state
    }

}

export default reducer