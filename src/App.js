import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/layout/Layout'
import BurgerBuilder from './containers/burgerBuilder/BurgerBuilder'
import Checkout from './containers/checkout/Checkout'
import Orders from './containers/orders/Orders'
import Auth from './containers/auth/Auth'

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/auth' component={Auth} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
