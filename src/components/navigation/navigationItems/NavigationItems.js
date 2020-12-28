import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './navigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems;