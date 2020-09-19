import React from 'react'
import Button from 'react-bootstrap/Button'

import './dropdown.scss'

const ShoppingCartDropdown = () => {
    return(
        <div className='cart-dropdown'>
            <div className='cart-items' />
            <Button variant='dark'> Checkout </Button>
        </div>
    )
}

export default ShoppingCartDropdown