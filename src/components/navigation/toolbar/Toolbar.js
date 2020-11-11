import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../logo/Logo';
import NavigationItems from '../navigationItems/NavigationItems'
import Menu from '../sideDrawer/drawerToggle/DrawerToggle'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.toggleSidDrawer}>MENUKE</Menu>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
)

export default toolbar;