import React, { Component } from 'react'
import axios from '../../axios-orders'

import withErrorHandler from '../../hoc/wthErrorHandler/withErrorHandler'
import Order from '../../components/order/Order'

class Orders extends Component {

    state = {
        fetchedOrders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, fetchedOrders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });

    }

    render() {
        return (
            <div>
                {this.state.fetchedOrders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))}
            </div>
        )
    }

}

export default withErrorHandler(Orders, axios)