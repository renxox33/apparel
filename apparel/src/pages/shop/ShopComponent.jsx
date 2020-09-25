import React from "react";
import {Route, withRouter} from 'react-router-dom'

import ShoppingOverviewComponent from '../../components/shopping-overview/ShoppingOverviewComponent'
import CategoryComponent from '../category/CategoryComponent'
import ShopDataContext from '../../context/shopDataContext'
import SHOP_DATA from '../../pages/shop/shopData'


const ShopComponent = ({ match }) =>  {

        return(
            <div className='shop-page'>

                <ShopDataContext.Provider value={SHOP_DATA}>
                    <Route exact path={`${match.path}`} component={ShoppingOverviewComponent} />   
                    <Route path={`${match.path}/:category`} component={CategoryComponent} />  
                </ShopDataContext.Provider>

                               
            </div>
        )
    
}

export default withRouter(ShopComponent)