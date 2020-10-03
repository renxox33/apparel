import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { HomepageComponent } from "./pages/HomepageComponent";
import ShopComponent from './pages/shop/ShopComponent'
import HeaderComponent from './components/header/HeaderComponent'
import SignInSignUp from './pages/sign-in-up/SignInUp'
import SignOutComponent from './components/sign-out/SignOutComponent'
import CheckoutComponent from './pages/checkout/CheckoutComponent'
import { setCurrentUser } from './redux/user/Actions'
import loadInventory from './redux/inventory/Actions'
import CategoryComponent from './pages/category/CategoryComponent'

class App extends React.Component {
  

  constructor(props){
    super(props)

    this.state = {
      currentUser: this.props.currentUser
    }
  }

  checkUserLoggedIn = () => {
    axios.post('/fetchGoogleUserInfo').then(response => {
      const { authenticated, name, id } = response.data
      if(authenticated){
        this.props.setCurrentUser({ name, id })
      }
    })
  }

  fetchInventoryItems = async  () => {
    
    const response = await axios.get('/fetch-shop-items')
    this.props.setInventory(response.data.item)
  }

  componentDidMount(){
    
    this.checkUserLoggedIn()
    this.fetchInventoryItems()
    
  }

  render(){

    return (
      <div>
        <HeaderComponent />
        <Switch>
          <Route exact path='/' component={HomepageComponent} />
          <Route exact path='/shop' component={ShopComponent} /> 
          <Route exact path='/shop/:category' component={CategoryComponent} />    
          <Route exact path='/sign-in' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUp />)} /> 
          <Route exact path='/sign-out' component={SignOutComponent} /> 
          <Route exact path='/checkout' component={CheckoutComponent} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser,
    googleUser: state.user.googleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentUser: user => {
          return dispatch(setCurrentUser(user))
      },
      setInventory: item => dispatch(loadInventory(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
