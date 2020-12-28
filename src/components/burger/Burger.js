import React from 'react'
import { withRouter } from 'react-router-dom'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    console.log('withRouter: ', props)

    // const query = new URLSearchParams(props.history.location.search)

    // let ingredients = null

    // if (props.history.location.search !== "") {
    //     ingredients = {
    //         salad: +query.get('salad'),
    //         cheese: +query.get('cheese'),
    //         bacon: +query.get('bacon'),
    //         meat: +query.get('meat')
    //     }
    // } else {
    //     ingredients = props.ingredients
    // }



    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, [])
    console.log(transformedIngredients);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingerdients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default withRouter(burger);