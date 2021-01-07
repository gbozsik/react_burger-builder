import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actionCreator from '../../store/actions/index'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Order from '../../components/order/Order'
import Spinner from '../../UI/spinner/Spinner'

class Orders extends Component {

    state = {
        fetchedOrders: [],
        loading: true
    }

    componentDidMount() {
        this.props.onOrdersFetched()
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = (
                this.props.fOrders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                )))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        fOrders: state.oReducer.orders,
        loading: state.oReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetched: () => dispatch(actionCreator.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))