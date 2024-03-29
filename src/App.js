import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { connect } from 'react-redux';
import { Route, Switch, withRouter,Redirect } from 'react-router-dom';
import Logout from './containers/Auth/logout/logout';
import * as actions from './store/actions/index';
import asyncComponent from './asyncComponent/asyncComponent';

const asyncCheckout=asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
})

const asyncOrders=asyncComponent(()=>{
  return import( './containers/Orders/Orders');
})

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Checkout" component={asyncCheckout} />
          <Route path="/Orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapStateTpProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(App));
