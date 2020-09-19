import React from "react";
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'

import './collection-item.scss'
import { addItemToCart } from '../../redux/cart/Actions'

const CollectionItemComponent = (props) => {

    const item = {
        id: props.id,
        name: props.name,
        price: props.price,
        linkUrl: props.linkUrl
    }

    return(
        <div className='collection-item'>
            <div 
                className='image'
                style={{
                    backgroundImage: `url(${props.linkUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'> {props.name} </span>
                <span className='price'> {[props.price]} </span>
            </div>
            <Button variant='light' onClick={() => props.addItemToCart(item)}>ADD TO CART</Button>
        </div>
    )
} 

const mapDispatchToProps = dispatch => {
    return{
        addItemToCart: item => {
            return dispatch(addItemToCart(item))
        }
    }
}

export default connect(null, mapDispatchToProps)(CollectionItemComponent)