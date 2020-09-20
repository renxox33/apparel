import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'

import CartItemComponent from '../cart-item/CartItemComponent'

import './dropdown.scss'

const ShoppingCartDropdown = (props) => {

    const cartItems = props.cartItems

    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems? cartItems.map(item => {
                        console.log(item)
                        return <CartItemComponent key={item.id} cart={item} />
                    }) : null
                }
            </div>
            <Button variant='dark'> Checkout </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cart
    }
}

export default connect(mapStateToProps)(ShoppingCartDropdown)