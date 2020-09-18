import React from "react";
import SHOP_DATA from './shopData'
import CollectionPreviewComponent from '../../components/collection-preview/CollectionPreviewComponent'

class ShopComponent extends React.Component  {

    constructor(props){
        super(props)

        this.state = {
            shopData: SHOP_DATA
        }
    }

    render(){
        return(
            <div>
                { this.state.shopData.map( category => {
                    return <CollectionPreviewComponent key={category.id} title={category.title} items={category.items} />
                } ) }
            </div>
        )
    }
}

export default ShopComponent