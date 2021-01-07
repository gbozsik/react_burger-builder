import axios from '../../axios-orders'
import * as actionTypes from './ActionsTypes'

export const sendOrderFailed = (error) => {
    return {
        type: actionTypes.SEND_ORDER_FAILED,
        error: error
    }
}

export const sendOrderSucces = (id, order) => {
    return {
        type: actionTypes.SEND_ORDER_SUCCESS,
        orderId: id,
        order: order
    }
}

export const sendOrderStart = () => {
    return {
        type: actionTypes.SEND_ORDER_START
    }
}

export const sendOrder = (order) => {
    return dispatch => {
        dispatch(sendOrderStart())
        axios.post('/orders.json', order).then(response => {
            // this.props.history.push('/')
            console.log(response.data)
            dispatch(sendOrderSucces(response.data.name, order))
        }).catch(error => {
            dispatch(sendOrderFailed(error))
        })
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
}

export const fetchOrdersStarted = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSucces = (id, orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        ordersId: id,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStarted())
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = []

                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSucces(res.data.name, fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFailed(err))
            });
    }
}