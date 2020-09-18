import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'

import { HomepageComponent } from "./pages/HomepageComponent";
import ShopComponent from './pages/shop/ShopComponent'
import HeaderComponent from './components/header/HeaderComponent'
import SignInSignUp from './pages/sign-in-up/SignInUp'
import SignOutComponent from './components/sign-out/SignOutComponent'

function App() {
  return (
    <div>
      <HeaderComponent />
      <Route exact path='/' component={HomepageComponent} />
      <Route exact path='/shop' component={ShopComponent} />
      <Route exact path='/sign-in' component={SignInSignUp} /> 
      <Route exact path='/sign-out' component={SignOutComponent} /> 
    </div>
  );
}

export default App;
