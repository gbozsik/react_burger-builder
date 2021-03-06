import axios from '../../axios-orders'
import * as actionTypes from './actionsTypes'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }

}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    // return dispatch => {                                                 
    //     axios.get('https://react-burger-builder-44dfd.firebaseio.com/ingredients.json').then(respone => {                  //moved to saga
    //         dispatch(setIngredients(respone.data))
    //     }).catch(error => {
    //         dispatch(fetchIngredientsFailed())
    //     })
    // }
    return {
        type: actionTypes.INITIATE_INIT_INGREDIENTS
    }
}