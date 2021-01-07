import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary'
import ContactData from './contactData/ContactData'

class Checkout extends Component {

    state = {
        loading: false,

    }

    componentWillMount() {

    }

    checkoutCancelHandler = () => (
        this.props.history.goBack()
    )

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ingred) {
            const redirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {redirect}
                    <CheckoutSummary
                        purchase={this.checkoutContinueHandler}
                        goBack={this.checkoutCancelHandler}
                        ingredients={this.props.ingred}
                    />
                    <Route path={this.props.match.url + '/contact-data'}
                        render={(props) => <ContactData ingredients={this.props.ingredients} totalPrice={this.props.totalPrice} {...props} />} />
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingred: state.bbReducer.ingredients,
        totalPr: state.bbReducer.totalPrice,
        purchased: state.oReducer.purchased
    }
}

export default connect(mapStateToProps)(Checkout)