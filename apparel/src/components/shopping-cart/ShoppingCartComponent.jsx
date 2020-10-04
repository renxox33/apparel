import React from 'react'
import {connect} from 'react-redux'

import {ReactComponent as ShoppingBag} from '../../resources/shopping-cart-icon/shopping-bag.svg'
import {setCartHiddenValue} from '../../redux/cart/Actions'
import saveCartToDb from '../../utilities/saveCartItemsToDb'

import './shopping-cart.scss'


class ShoppingCartComponent extends React.Component {

    componentDidUpdate(){
        saveCartToDb(this.props.cart, this.props.currentUser)
    }

    render(){
        return(
            <div className='cart-icon' onClick={this.props.setCartHiddenValue}>
                <ShoppingBag className='shopping-icon'/>
                <span className='item-count'>{this.props.numberOfItemsInCart}</span>
            </div>
        )
    }  
}

const mapDispatchToProps = dispatch => {
    return{
        setCartHiddenValue: () => dispatch(setCartHiddenValue())
    }
}

const mapStateToProps = state => {
    return {
        numberOfItemsInCart: state.cart.cart.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0 ),
        currentUser: state.user.currentUser,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartComponent)