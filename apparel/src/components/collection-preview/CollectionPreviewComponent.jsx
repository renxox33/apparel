import React from "react";
import { Link, withRouter } from 'react-router-dom'

import './collection-preview.scss'
import CollectionItemComponent from '../../components/collection-item/CollectionItemComponent'

const CollectionPreviewComponent = (props) => {

    return(
        <div className='collection-preview'>
            <h1 className='title'> 
                {props.title.toUpperCase()} 
            </h1>
            <Link className='category-link' to={`${props.route}`}>&#10132;</Link>
            <div className='preview'>
                {props.items.map((item, index) => {
                    if(index<4){
                        return <CollectionItemComponent key={item.id} linkUrl={item.imageUrl} name={item.name} price={item.price} id={item.id} />
                    }else{
                        return null
                    }
                    
                })}
            </div>
        </div>
    )
}

export default withRouter(CollectionPreviewComponent)