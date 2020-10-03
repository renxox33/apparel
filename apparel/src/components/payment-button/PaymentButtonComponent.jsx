import React from 'react'
import StripeCheckout from 'react-stripe-checkout'


class PaymentButtonComponent extends React.Component {
 
    render(){

        const displayedPrice = this.props.price*100
        const publishableKey = 'pk_test_51HVYCMImgu9TNlMNsB8rfYBrKIDwF4GqHBCwJ5V45dOeNcWFfoexyWGNWuYMcdLNVlpWWdZK9fjjOpS9HVTALdaY00EWXmfPAQ'
    
        const onToken = token => {
            console.log(token)
        }

        return(
            <StripeCheckout 
                label='Pay now'
                currency='INR'
                name='Apparels LLC'
                description={`To pay: INR${this.props.price}`}
                amount={displayedPrice}
                token={onToken}
                panelLabel='Pay now'
                stripeKey={publishableKey}
            />
        )
    }
   
}


export default PaymentButtonComponent
