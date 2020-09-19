import React from 'react'

import {ReactComponent as ShoppingBag} from '../../resources/shopping-cart-icon/shopping-bag.svg'
import {setCartHiddenValue} from '../../redux/cart/Actions'
import {connect} from 'react-redux'
import './shopping-cart.scss'


const ShoppingCartComponent = ({ setCartHiddenValue }) => {
    return(
        <div className='cart-icon' onClick={setCartHiddenValue}>
            <ShoppingBag className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        setCartHiddenValue: () => dispatch(setCartHiddenValue())
    }
}

export default connect(null, mapDispatchToProps)(ShoppingCartComponent)