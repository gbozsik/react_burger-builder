import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/layout/Layout'
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder'
import Checkout from './containers/checkout/Checkout'
import Orders from './containers/orders/Orders'
import Auth from './containers/auth/Auth'
import Logout from './containers/auth/logout/Logout'
import * as actionCreator from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onCheckLoggedIn()
  }

  render() {
    let router = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
        {/* <Redirect to='/'/> */}
      </Switch>
    )
    
    if (this.props.isAuthenticated) {
      router = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
          {/* <Redirect to='/'/> */}
        </Switch>
      )
    }


    return (
      <div>
        <Layout>
          {router}
          {/* <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={Auth} />
          <Route path='/' component={BurgerBuilder} />
        </Switch> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckLoggedIn: () => dispatch(actionCreator.checLoggedIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
