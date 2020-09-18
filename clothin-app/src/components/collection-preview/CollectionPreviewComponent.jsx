import React from "react";

import './collection-preview.scss'
import CollectionItemComponent from '../../components/collection-item/CollectionItemComponent'

const CollectionPreviewComponent = (props) => {

    return(
        <div className='collection-preview'>
            <h1 className='title'> {props.title.toUpperCase()} </h1>
            <div className='preview'>
                {props.items.map((item, index) => {
                    if(index<4){
                        return <CollectionItemComponent key={item.id} linkUrl={item.imageUrl} name={item.name} price={item.price} />
                    }else{
                        return null
                    }
                    
                })}
            </div>
        </div>
    )
}

export default CollectionPreviewComponent