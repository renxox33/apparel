import React from 'react'
import { connect } from 'react-redux'

import CollectionPreviewComponent from '../collection-preview/CollectionPreviewComponent'

class ShoppingOverviewComponent extends React.Component{
   
    render(){

        return(
            <div className='shopping-overview'>
                {
                    this.props.inventoryItems ? 
                    Object.keys(this.props.inventoryItems).map((inventoryItemCategory, index) => {
                        if(index !== 0){
                            const category = this.props.inventoryItems[inventoryItemCategory]
                            return <CollectionPreviewComponent  key={category.id} title={category.title} items={category.items} route={category.routeName} />
                        }
                        return null
                        
                    }) 
                    : <h1 className='loading-message'>LOADING</h1>

                    
                }
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    return{
        inventoryItems: state.inventory.inventory
    }
}

export default connect(mapStateToProps)(ShoppingOverviewComponent)