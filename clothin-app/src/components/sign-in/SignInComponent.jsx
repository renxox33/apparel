import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './sign-in.css'
import axios from 'axios'

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

        const data= {
                email: this.state.email,
                password: this.state.password
        }

        axios({
            method: 'post',
            url:'/sign-in-with-email',
            data: data
        }).then(response => {
            console.log(response.data)
            if(response.data.authenticated){
                window.open('http://localhost:3000', '_self')
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

        window.open('http://localhost:5000/sign-in-with-google', "_self")
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

export default SignInComponent