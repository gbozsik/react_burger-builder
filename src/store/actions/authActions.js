import * as actionTypes from './actionsTypes'

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
    // localStorage.removeItem('token') //moved to authSaga.js
    // localStorage.removeItem('expirationDate')
    // localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    // return dispatch => {     //moved to authSaga
    //     setTimeout(() => {
    //         dispatch(logout())
    //     }, expiresIn * 1000);
    // }
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expiresIn
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
    // return dispatch => {                                 // moved to saga
    //     dispatch(autStarted())
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
        
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    //     if (!isSignup) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    //     }
    //     console.log('url: ', url)
    //     axios.post(url, authData).then(response => {
    //         const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //         localStorage.setItem('token', response.data.idToken)
    //         localStorage.setItem('expirationDate', expirationDate)
    //         localStorage.setItem('userId', response.data.localId)
    //         dispatch(authSuccess(response.data.idToken, response.data.localId))
    //         dispatch(checkAuthTimeout(response.data.expiresIn))
    //     }).catch(err => {
    //         console.log('error', err.response)
    //         dispatch(authFailed(err.response.data.error))
    //     })
    // }
    return {
        type: actionTypes.AUTH_ACTION,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

export const setRouteToRedirect = (path) => {
    return {
        type: actionTypes.SET_ROUTE_TO_REDIRECT,
        path: path
    }
}

export const checLoggedIn = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token')
    //     if (!token) {
    //         dispatch(logout())
    //     } else {
    //         const exparitionDate = new Date(localStorage.getItem('expirationDate'))
    //         console.log('exparitionDate', exparitionDate)
    //         console.log('now: ', new Date())
    //         if (exparitionDate >= new Date()) {
    //             dispatch(authSuccess(token, localStorage.getItem('userId')))
    //             console.log('exparitionDate.getSeconds(): ', exparitionDate.getMilliseconds())
    //             console.log('new Date().getSeconds(): ', new Date().getMilliseconds())
    //             dispatch(checkAuthTimeout((exparitionDate.getTime() - new Date().getTime()) / 1000))
    //         } else {
    //             dispatch(logout())
    //         }
    //     }
    return {
        type: actionTypes.AUTH_CHECK_INITIAL_STATE
    }
}
