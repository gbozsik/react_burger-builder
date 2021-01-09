import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Layout.css'
import Aux from '../Aux'
import Toolbar from '../../components/navigation/toolbar/Toolbar'
import SideDrawer from '../../components/navigation/sideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    toggleSidDrawer = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                toggleSidDrawer={this.toggleSidDrawer} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    showDrawer={this.state.showSideDrawer}
                    closing={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux >
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);