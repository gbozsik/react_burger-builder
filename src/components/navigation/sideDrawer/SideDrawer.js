import React from 'react'

import Logo from '../../logo/Logo'
import NavigationItems from '../navigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../../UI/backDrop/BackDrop'
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.showDrawer) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.showDrawer} clicked={props.closing}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;