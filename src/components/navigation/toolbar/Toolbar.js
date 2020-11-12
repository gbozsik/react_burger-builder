import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems'
import ToggleDrawer from '../sideDrawer/drawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <ToggleDrawer clicked={props.toggleSidDrawer}></ToggleDrawer>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;