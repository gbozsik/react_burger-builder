import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary'
import ContactData from '../contactData/ContactData'

class Checkout extends Component {

    state = {
        loading: false,
        // purchasing: false,
        // ingredients: null,
        // totalPrice: 0
    }

    componentWillMount() {
        // const query = new URLSearchParams(this.props.location.search)
        // const ingredients = {}
        // for (let param of query.entries()) {
        //     if (param[0] === 'totalPrice') {
        //         this.setState({ totalPrice: +param[1] })
        //     } else {
        //         ingredients[param[0]] = +param[1]
        //     }
        // }
        // this.setState({ ingredients: ingredients })
    }

    checkoutCancelHandler = () => (
        this.props.history.goBack()
    )

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    purchase={this.checkoutContinueHandler}
                    goBack={this.checkoutCancelHandler}
                    ingredients={this.props.ingred}
                />
                <Route path={this.props.match.url + '/contact-data'}
                    render={(props) => <ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} {...props}/>} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingred: state.ingredients,
        totalPr: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout)