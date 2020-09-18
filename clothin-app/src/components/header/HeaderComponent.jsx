import React from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'

import './header.scss'
import { ReactComponent as Logo } from '../../resources/header-logo/crown.svg'

class HeaderComponent extends React.Component {

    constructor(){
        super()

        this.state = {
            isAuthenticated: false
        }
    }

    componentDidMount(){
        axios.post('http://localhost:5000/checkUserLoggedIn').then(response => {
            console.log(response.data)
            const { authenticated } = response.data
            this.setState({ isAuthenticated: authenticated })
        })
    }

    handleUserLogout = () => {
        axios.get('/sign-out').then(response => {
            console.log(response.data)
            const { authenticated } = response.data
            this.setState({ isAuthenticated: authenticated })
        })

        axios.get('/')
    }

    render(){
        return(
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo />
                </Link>
                <div className='options'>
                    <Link className='option' to='/shop'>
                        SHOP
                    </Link>
                    { !this.state.isAuthenticated? 
                    <Link className='option' to='/sign-in'>
                        SIGN IN
                    </Link> :
                    <Link className='option' to='/sign-out'>
                        SIGN OUT
                    </Link> }
                    <Link className='option' to='/contact'>
                        CONTACT
                    </Link>
                </div>
            </div>
        )
    }
}

export default HeaderComponent