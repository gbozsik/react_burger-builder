import React, { Component } from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/buildControls/BuildControls'
import Modal from '../../UI/modal/Modal'
import OrderSummary from '../../components/burger/orderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuilder extends Component {


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        canOrder: false,
        purchasing: false,
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
        this.setState({purchasing: true})
    }

    purchaseCanncelHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchase = () => {
        alert('You continue')
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
        return (
            <Aux>
                <Modal show={this.state.purchasing} closeBackDrop={this.purchaseCanncelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    closeModal={this.purchaseCanncelHandler}
                    continuePurchase={this.continuePurchase}
                    price={this.state.totalPrice}/>
                </Modal>
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
        )
    }
}

export default BurgerBuilder;