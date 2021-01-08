import * as actionTypes from './actionsTypes'
import axios from 'axios'

export const autStarted = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const logoutExpiresIn = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000);
    }
}

export const authFailed = (error) => {
    // const myError = { config: error.config, response: error.response } // this is only because redux devtools do not see response in error otherwise
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    if (!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    }
    return dispatch => {
        dispatch(autStarted())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        console.log('url: ', url)
        axios.post(url, authData).then(response => {
            console.log('response: ', response.data)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(logoutExpiresIn(response.data.expiresIn))
        }).catch(err => {
            console.log('error', err.response)
            dispatch(authFailed(err.response.data.error))
        })
    }
}