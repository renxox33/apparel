import React from 'react'
import { connect } from 'react-redux'

import { addItemToCart ,removeItemFromCart, decreaseItemQuantityfromCart } from '../../redux/cart/Actions'

import './checkout-item.scss'

const CheckoutItemComponent = props => {
    const item = props.item
    console.log(props)

    return(
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={item.linkUrl} alt={item.name}/>
            </div>
            <span className='name'>
                {item.name}
            </span>
            <span className='quantity'>
                <span onClick={() => props.decreaseItemQuantityfromCart(item)}> &#10094; </span>
                {item.quantity} 
                <span onClick={() => props.addItemToCart(item)}> &#10095; </span>
            </span>
            <span className='price'>
                {item.price}
            </span>
            <div className='remove-button' onClick={() => props.removeItemFromCart(item)}>
                &#10008;
                {/* <Button variant='dark' onClick={() => props.removeItemFromCart(item)}>X</Button> */}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cart: state.cart.cart
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addItemToCart: item => dispatch(addItemToCart(item)),
        decreaseItemQuantityfromCart: item => dispatch(decreaseItemQuantityfromCart(item)),
        removeItemFromCart: item => dispatch(removeItemFromCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItemComponent)