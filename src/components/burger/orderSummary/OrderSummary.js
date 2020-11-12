import React, { Component } from 'react'

import Aux from '../../../hoc/Aux'
import Button from '../../../UI/button/Button'

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (<li key={igKey}
            ><span style={{ textTransform: 'capitalize' }}>{igKey}: {this.props.ingredients[igKey]}</span>
            </li>)
        })
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType={'Danger'} clicked={this.props.closeModal}>CANCEL</Button>
                <Button btnType={'Success'} clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;