import axios from 'axios'
import { put, delay, call } from 'redux-saga/effects'

import * as actions from '../actions/index'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield call([localStorage, 'removeItem'], 'userId')

    // yield localStorage.removeItem('token')               // using with call instead above, to make it mockable
    // yield localStorage.removeItem('expirationDate')
    // yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authActionSaga(action) {
    yield put(actions.autStarted())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQvD3YINkHFxGsitkwv4Ubm8CngIt_A1I'
    }

    try {
        const response = yield axios.post(url, authData)

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken)      // localDorage method execution is async anyways, so yield not a must
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFailed(error.response.data.error))
    }
}

export function* checLoggedInSaga(action) {
    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())
    } else {
        const exparitionDate = yield new Date(yield localStorage.getItem('expirationDate'))

        if (exparitionDate >= new Date()) {
            yield put(actions.authSuccess(token, yield localStorage.getItem('userId')))
            yield put(actions.checkAuthTimeout((exparitionDate.getTime() - new Date().getTime()) / 1000))
        } else {
            yield put(actions.logout())
        }
    }
}