import React from 'react'

import './cart-item.scss'

const CartItemComponent = (props) => {

    return(
        <div className='cart-item'>
            <img src={props.cart.linkUrl} alt={props.cart.name}/>
            <div className='item-details'>
                <span className='name'>{props.cart.name}</span>
                <span className='price'>{props.cart.quantity} x {props.cart.price}</span>
            </div>
        </div>
    )
}

export default CartItemComponent