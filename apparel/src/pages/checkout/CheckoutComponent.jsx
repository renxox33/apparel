import React from 'react'
import {connect} from 'react-redux'

import { removeItemFromCart } from '../../redux/cart/Actions'
import CheckoutItemComponent from '../../components/checkout-item/CheckoutItemComponent'
import PaymentButtonComponent from '../../components/payment-button/PaymentButtonComponent'


import './checkout.scss'

class CheckoutComponent extends React.Component {

    render(){
        return(
            <div className='checkout-page'>
                {this.props.cartItems.length > 0 ?
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
                        
                        { this.props.cartItems.map(item => <CheckoutItemComponent key={item.id} item={item} />)}
                        
                        
                        <div className='total'>
                            Total : {this.props.totalPrice}
                        </div>
                        <PaymentButtonComponent price={this.props.totalPrice} />
                    </div> : 
                    <div>
                        <hr/>
                        <h3>Your cart is empty.</h3>
                    </div>
                    
                }
            </div>
        )
    }  
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