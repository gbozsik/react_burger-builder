import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import axios from '../../axios-orders'

import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/buildControls/BuildControls'
import Modal from '../../UI/modal/Modal'
import OrderSummary from '../../components/burger/orderSummary/OrderSummary'
import Spinner from '../../UI/spinner/Spinner'
import withErrorHandler from '../../hoc/wthErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {


    state = {
        ingredients: null,
        totalPrice: 4,
        canOrder: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-44dfd.firebaseio.com/ingredients.json').then(respone => {
            this.setState({ ingredients: respone.data })
        }).catch(error => {
            this.setState({error: true})
        })
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updateCanOrderState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updateCanOrderState(updatedIngredients)
    }

    updateCanOrderState = (ingredients) => {
        // const ingredients = {...this.state.ingredients}
        const sum = Object.keys(ingredients).map((inKey) => {
            return ingredients[inKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({ canOrder: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCanncelHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchase = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Max',
                addres: {
                    street: 'street 1',
                    zipCode: '235',
                    contry: 'Germany'
                },
                email: 'email'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({ loading: false, purchasing: false })
        }).catch(error => {
            console.log(error)
            this.setState({ loading: false, purchasing: false })
        })
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        // let allIngredientsZero = true

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
            // if (disableInfo[key] <= 0) {
            //     allIngredientsZero = false
            // }
        }

        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disable={disableInfo}
                    price={this.state.totalPrice}
                    // canOrder={allIngredientsZero}
                    canOrder={this.state.canOrder}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                closeModal={this.purchaseCanncelHandler}
                continuePurchase={this.continuePurchase}
                price={this.state.totalPrice} />
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

export default withErrorHandler(BurgerBuilder, axios);