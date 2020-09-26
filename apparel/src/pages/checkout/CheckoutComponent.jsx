import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { loadStripe } from '@stripe/stripe-js'

import { removeItemFromCart } from '../../redux/cart/Actions'
import CheckoutItemComponent from '../../components/checkout-item/CheckoutItemComponent'
import PaymentButtonComponent from '../../components/payment-button/PaymentButtonComponent'


import './checkout.scss'

const CheckoutComponent = (props) => {

    return(
        <div className='checkout-page'>
            {props.cartItems.length > 0 ?
                <div className='abc'>
                    <div className='checkout-header'>
                        <div className='header-title'>
                            <span>Product</span>
                        </div>
                        <div className='header-title'>
                            <span>Description</span>
                        </div>
                        <div className='header-title'>
                            <span>Quantity</span>
                        </div>
                        <div className='header-title'>
                            <span>Price</span>
                        </div>
                        <div className='header-title'>
                            <span>Remove</span>
                        </div>
                    </div>
                    
                    { props.cartItems.map(item => <CheckoutItemComponent key={item.id} item={item} />)}
                    
                    
                    <div className='total'>
                        Total : {props.totalPrice}
                    </div>
                    {/* <Link to='/checkout'> <Button variant='dark'>Checkout</Button> </Link> */}
                    <PaymentButtonComponent price={props.totalPrice} />
                </div> : 
                <div>
                    <hr/>
                    <h3>Your cart is empty.</h3>
                </div>
                
            }
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cartItems: state.cart.cart,
        totalPrice: state.cart.cart.reduce((accumulator, item) => {
            return accumulator + item.price*item.quantity
        }, 0)
    }
}

const mapDispatchToProps = dispatch => {
    return{
        removeItemFromCart: item => dispatch(removeItemFromCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutComponent)