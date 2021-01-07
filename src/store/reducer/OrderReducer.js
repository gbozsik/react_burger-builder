import * as actionTypes from '../actions/ActionsTypes'
import { updateObject } from '../Utility'

const initialState = {
    orders: [],
    loading: false,
    purchsed: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_ORDER_START:
            return updateObject(state, { loading: true })
        case actionTypes.SEND_ORDER_SUCCESS:
            const newOrder = updateObject(action.order, { id: action.orderId })
            // const newOrder = {
            //     ...action.order,
            //     id: action.orderId,
            // }
            return updateObject(state, {
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            })
        // return {
        //     ...state,
        //     orders: state.orders.concat(newOrder),
        //     loading: false,
        //     purchased: true
        // }
        case actionTypes.SEND_ORDER_FAILED:
            return updateObject(state, {
                loading: false,
                error: action.error.message
            })
        // return {
        //     ...state,
        //     loading: false,
        //     error: action.error.message
        // }
        case actionTypes.INIT_PURCHASE:
            return updateObject(state, { purchased: false })
        // return {
        //     ...state,
        //     purchased: false
        // }
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true })
            // return {
            //     ...state,
            //     loading: true
            // }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })
            // return {
            //     ...state,
            //     orders: action.orders,
            //     loading: false
            // }
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateObject(state, {
                loading: false,
                error: action.error.message
            })
            // return {
            //     ...state,
            //     loading: false,
            //     error: action.error.message
            // }
        default: return state
    }
}

export default reducer