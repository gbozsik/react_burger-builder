import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { logoutSaga, 
    checkAuthTimeoutSaga, 
    authActionSaga, 
    checLoggedInSaga, } from './authSaga'
import { initIngredientsSaga } from './burgerBuilderSaga'
import { sendOrderSaga, fetchOrdersSaga } from './orderSaga'

import * as actionTypes from '../actions/actionsTypes'

export function* watchAuth() {
yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga), 
    takeEvery(actionTypes.AUTH_ACTION, authActionSaga), 
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, checLoggedInSaga), 
])
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)            //put them intto all function above
    // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    // yield takeEvery(actionTypes.AUTH_ACTION, authActionSaga)
    // yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, checLoggedInSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INITIATE_INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrders() {
    yield takeLatest(actionTypes.SEND_ORDER, sendOrderSaga)         // after takeLatest happens, nothing will be executed (here fetchOrdersSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}