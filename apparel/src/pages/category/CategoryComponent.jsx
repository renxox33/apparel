import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import CollectionItem from '../../components/collection-item/CollectionItemComponent'

import './category.scss'

class CategoryComponent extends React.Component {

    render(){
        const {category} = this.props.match.params
        const categoryItems = this.props.inventoryItems[category].items

        return(
            <div className='category-collection'>
                 <h1 className='title'>{category.toUpperCase()}</h1>
                 <div className='item-display'>
                    {
                        categoryItems.map(item => <CollectionItem
                                                    className='collection-item'
                                                    key={item.id} 
                                                    id={item.id}
                                                    name={item.name}
                                                    price={item.price}
                                                    linkUrl={item.imageUrl}
                                                    />)
                    }
                 </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({ inventory }) => {
    return{
        inventoryItems: inventory.inventory
    }
}


export default connect(mapStateToProps)(withRouter(CategoryComponent))