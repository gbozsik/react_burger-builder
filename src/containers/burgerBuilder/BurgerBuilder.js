import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actionCreator from '../../store/actions/index'

import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/buildControls/BuildControls'
import Modal from '../../UI/modal/Modal'
import OrderSummary from '../../components/burger/orderSummary/OrderSummary'
import Spinner from '../../UI/spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updateCanOrderState = (ingredients) => {
        const sum = Object.keys(ingredients).map((inKey) => {
            return ingredients[inKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetRoutToRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCanncelHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchase = () => {
        this.props.onInitPuchase()
        this.props.history.push('/checkout')
    }

    // redirectToLogin = () => {
    //     this.props.history.push('/auth')
    // }

    render() {
        const disableInfo = {
            ...this.props.ingred
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

        if (this.props.ingred) {
            burger = <Aux>
                <Burger ingredients={this.props.ingred} />
                <BuildControls
                    isAuth={this.props.isAuthenticated}
                    ingredientAdded={this.props.onAddingIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disable={disableInfo}
                    price={this.props.totalPr}
                    canOrder={this.updateCanOrderState(this.props.ingred)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ingred}
                closeModal={this.purchaseCanncelHandler}
                continuePurchase={this.continuePurchase}
                price={this.props.totalPr} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closeBackDrop={this.purchaseCanncelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingred: state.bbReducer.ingredients,
        totalPr: state.bbReducer.totalPrice,
        error: state.bbReducer.error,
        purchased: state.oReducer.purchased,
        isAuthenticated: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddingIngredient: (ingredient) => dispatch(actionCreator.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actionCreator.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actionCreator.initIngredients()),
        onInitPuchase: () => dispatch(actionCreator.initPurchase()),
        onSetRoutToRedirect: (path) => dispatch(actionCreator.setRouteToRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));