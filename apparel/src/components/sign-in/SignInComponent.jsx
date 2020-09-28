import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sign-in.css'
import axios from 'axios'
import { setCurrentUser } from '../../redux/user/Actions'
import { connect } from 'react-redux'

class SignInComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault()

        axios({
            method: 'post',
            url:'/sign-in-with-email',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {
            const { authenticated, status, name, id } = response.data
            if(authenticated && status === 'Success'){
                const authenticatedUser = { name, id }
                this.props.setCurrentUser(authenticatedUser)
            }else{
                const errorMsg = response.data.message
                document.getElementById('sign-in-error').innerText = errorMsg
            }
        })
        
        this.setState({ email: '', password: '' })
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleGoogleSignIn = e => {

        window.open('http://apparels-web:5000/sign-in-with-google', "_self")
    }

    render(){
        return(
            <div className='sign-in-component'>
                <h2>I already have an account.</h2>
                <span>Sign in with email and password</span>

                <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Control type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />
                    
                    <Form.Control type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
                    <span id="sign-in-error"></span>
                    <Button variant='dark' className='sign-in-buttons' type='submit'> Sign In </Button>    
                    <Button variant='dark' className='sign-in-buttons' onClick={this.handleGoogleSignIn}> Sign In with Google </Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => {
            return dispatch(setCurrentUser(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(SignInComponent)