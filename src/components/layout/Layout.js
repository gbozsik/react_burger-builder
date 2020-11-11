import React, { Component } from 'react'

import classes from './Layout.css'
import Aux from '../../hoc/Aux'
import Toolbar from '../navigation/toolbar/Toolbar'
import SideDrawer from '../navigation/sideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSidDrawer = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar toggleSidDrawer={this.toggleSidDrawer}/>
                <SideDrawer 
                showDrawer={this.state.showSideDrawer} 
                closing={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        )
    }
}

export default Layout;