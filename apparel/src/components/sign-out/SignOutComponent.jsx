import React from 'react'
import axios from 'axios'

import './sign-out.css'

class SignOutComponent extends React.Component {

    componentDidMount(){
        axios.get('/sign-out').then(response => {
            console.log(response.data)
        })
 
        setTimeout(() => {
            window.open('/', '_self')
        }, 2000)
    }

    render(){
        return(
            <div className='sign-out'>
                <h3>You are being signed out.</h3>
            </div>
        )
    }
}

export default SignOutComponent