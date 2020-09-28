import React from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { setCurrentUser } from '../../redux/user/Actions'

import './sign-out.css'

class SignOutComponent extends React.Component {

    componentDidMount(){
        
        setTimeout(() => {
            axios.post('/sign-out').then(response => {
                this.props.setCurrentUser(null)
            })
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

const mapStateToProps = state => {
    return{
        currentUser: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return{
        setCurrentUser: user => dispatch(setCurrentUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOutComponent)