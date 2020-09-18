import React from "react";

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
        </div>
    )
} 

export default CollectionItemComponent