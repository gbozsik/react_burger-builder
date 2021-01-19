import axios from '../../axios-orders'
import { put } from 'redux-saga/effects'

import * as actions from '../actions/index'

export function* sendOrderSaga(action) {
    yield put(actions.sendOrderStart())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.order)
        yield put(actions.sendOrderSucces(response.data.name, action.order))
    } catch (error) {
        yield put(actions.sendOrderFailed(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStarted())
    if (!action.token) {
        action.token = yield localStorage.getItem('token')
    }
    try {
        const response = yield axios.get('/orders.json?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"')

        const fetchedOrders = []
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSucces(response.data.name, fetchedOrders))
    } catch (error) {
        yield put(actions.fetchOrdersFailed(error))
    }
}