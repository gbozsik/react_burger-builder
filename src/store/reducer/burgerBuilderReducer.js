import * as actionTypes from '../actions/actionsTypes'
import { updateObject } from '../Utility'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState)
    // return {
    //     ...state,
    //     ingredients: {
    //         ...state.ingredients,
    //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //     },
    //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    // }
}

const removeIngredient = (state, action) => {
    const updatedIngred = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
    const updatedIngreds = updateObject(state.ingredients, updatedIngred)
    const updatedStat = {
        ingredients: updatedIngreds,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedStat)
    // return {
    //     ...state,
    //     ingredients: {
    //         ...state.ingredients,
    //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    //     },
    //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    // }
}

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false
    }
}

const fetchIngredientsFailed = (state) => {
    return updateObject(state, { error: true })
    // return {
    //     ...state,
    //     error: true
    // }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENT: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state)
        default: return state
    }
}

export default reducer