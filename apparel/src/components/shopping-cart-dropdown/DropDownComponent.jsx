import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'


import CartItemComponent from '../cart-item/CartItemComponent'
import { setCartHiddenValue } from '../../redux/cart/Actions'

import './dropdown.scss'

const ShoppingCartDropdown = (props) => {

    const cartItems = props.cartItems

    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length > 0 ? cartItems.map(item => {
                        return <CartItemComponent key={item.id} cart={item} />
                    }) : <span className='empty-message'>Cart is empty</span>
                }
            </div>
            <Button variant='dark' onClick={
                () => {
                props.history.push('/checkout')
                props.toggleHidden()
                }
            }> Checkout </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toggleHidden: () => dispatch(setCartHiddenValue())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCartDropdown))