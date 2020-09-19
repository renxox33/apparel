import React from "react";
import Button from 'react-bootstrap/Button'

import './collection-item.scss'

const CollectionItemComponent = (props) => {

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
            <Button variant='light'>ADD TO CART</Button>
        </div>
    )
} 

export default CollectionItemComponent