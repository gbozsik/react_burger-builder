import React, { Component } from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/burger/Burger'

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacom: 1,
            cheese: 2,
            meat: 2  
        }
    }
    render() {
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                {/* <div>Burger</div> */}
                <div>Build Control</div>
            </Aux>
        )
    }
}

export default BurgerBuilder;