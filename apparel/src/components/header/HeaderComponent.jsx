import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import './header.scss'
import { ReactComponent as Logo } from '../../resources/header-logo/crown.svg'
import ShoppingCartComponent from '../shopping-cart/ShoppingCartComponent'
import ShoppingCartDropdown from '../shopping-cart-dropdown/DropDownComponent'

class HeaderComponent extends React.Component {

    handleUserLogout = () => {
        axios.get('/sign-out')
        axios.get('/')
    }

    render(){
        return(
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo />
                </Link>
                <div className='options'>
                    <Link className='option' to='/shop'>
                        SHOP
                    </Link>
                    { !this.props.currentUser? 
                    <Link className='option' to='/sign-in'>
                        SIGN IN
                    </Link> :
                    <Link className='option' to='/sign-out'>
                        SIGN OUT
                    </Link> }
                    <Link className='option' to='/contact'>
                        CONTACT
                    </Link>
                    <ShoppingCartComponent />
                    <a href="/sign-in-with-google">Google</a>
                </div>
                {this.props.hidden ? null : <ShoppingCartDropdown />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        hidden: state.cart.hidden
    }
}



export default connect(mapStateToProps)(HeaderComponent)