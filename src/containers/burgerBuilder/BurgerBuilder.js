import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/Actions'

import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/buildControls/BuildControls'
import Modal from '../../UI/modal/Modal'
import OrderSummary from '../../components/burger/orderSummary/OrderSummary'
import Spinner from '../../UI/spinner/Spinner'
import withErrorHandler from '../../hoc/wthErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // this.setState({ ingredients: this.props.ingred})

        // axios.get('https://react-burger-builder-44dfd.firebaseio.com/ingredients.json').then(respone => {
        //     this.setState({ ingredients: respone.data })
        // }).catch(error => {
        //     this.setState({ error: true })
        // })
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
        this.setState({ purchasing: true })
    }

    purchaseCanncelHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchase = () => {
        // this.setState({ purchasing: false })

        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('totalPrice=' + this.props.totalPr)
        // const queryInString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     // search: querystring.stringify(this.state.ingredients)})
        //     search: '?' + queryInString
        // })
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {
            ...this.props.ingred
        }

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

        if (this.props.ingred) {
            burger = <Aux>
                <Burger ingredients={this.props.ingred} />
                <BuildControls
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
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ingred: state.ingredients,
        totalPr: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddingIngredient: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredient}),
        onRemoveIngredient: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredient})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));