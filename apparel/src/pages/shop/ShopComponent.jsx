import React from "react";
import {Route, withRouter} from 'react-router-dom'

import ShoppingOverviewComponent from '../../components/shopping-overview/ShoppingOverviewComponent'
import CategoryComponent from '../category/CategoryComponent'


const ShopComponent = ({ match }) =>  {

        return(
            <div className='shop-page'>
                    <Route exact path={`${match.path}`} component={ShoppingOverviewComponent} />   
                    <Route path={`${match.path}/:category`} component={CategoryComponent} />                          
            </div>
        )   
}

export default withRouter(ShopComponent)