import React from 'react'

import {ReactComponent as ShoppingBag} from '../../resources/shopping-cart-icon/shopping-bag.svg'
import {setCartHiddenValue} from '../../redux/cart/Actions'
import {connect} from 'react-redux'
import './shopping-cart.scss'


const ShoppingCartComponent = (props) => {

    return(
        <div className='cart-icon' onClick={props.setCartHiddenValue}>
            <ShoppingBag className='shopping-icon'/>
            <span className='item-count'>{props.numberOfItemsInCart}</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        setCartHiddenValue: () => dispatch(setCartHiddenValue())
    }
}

const mapStateToProps = state => {
    return {
        numberOfItemsInCart: state.cart.cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0 )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartComponent)