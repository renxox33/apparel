import React from 'react'

import CollectionPreviewComponent from '../collection-preview/CollectionPreviewComponent'
import ShopDataContext from '../../context/shopDataContext'

class ShoppingOverviewComponent extends React.Component{

    static contextType = ShopDataContext
   
    render(){
        return(
            <div className='shopping-overview'>
                { Object.keys(this.context).map( categoryId => {
                        const category = this.context[categoryId]
                        return <CollectionPreviewComponent key={category.id} title={category.title} items={category.items} route={category.routeName} />
                } ) }
            </div>
        )
    }
    
}

export default (ShoppingOverviewComponent)