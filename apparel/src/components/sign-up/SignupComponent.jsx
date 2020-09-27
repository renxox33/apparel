import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './sign-up.css'
import axios from 'axios'

import ModalComponent from '../Modal/ModalComponent'

class SignUpComponent extends React.Component{

    constructor(){
        super()
        this.state = {
            show: false,
            nickName: '',
            email: '',
            password: ''
        }
    }

    handleModalClose = () => {
        this.setState({ show: false })
    }

    handleChange = e => {
        const {name, value} = e.target
        if(name === 'confirm-password'){
            document.getElementById('password-error').innerText = null
        }
        else{
            this.setState({ [name]: value })
        }
        
    }

    handlePasswordConfirmation = () => {
        const value  = document.getElementById('confirm-password').value
        if(value !== this.state.password){
            document.getElementById('password-error').innerText = 'Passwords do not match'
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.handlePasswordConfirmation()
        if(document.getElementById('password-error').innerText.length === 0 && document.getElementById('confirm-password').value === this.state.password){

            const data = {
                nickName: this.state.nickName,
                email: this.state.email,
                password: this.state.password
            }

            const response = await axios.post('/register', data)
            console.log(response.data)

            if(response.data.registration === 'success'){
                this.setState({ show: true })
            }
        }
    }

    render(){
        return(
            <div className='sign-up-component'>
                <ModalComponent show={this.state.show} handleClose={this.handleModalClose} />
                <h2>I don't have an account.</h2>
                <span>We'll only need your email and a password.</span>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Control type="text" name="nickName" placeholder="Nickname" value={this.state.nickName} onChange={this.handleChange}  required/>
                    <Form.Control type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />                     
                    <Form.Control type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
                    <Form.Control type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' onChange={this.handleChange} required />
                    <span id="password-error"></span>
                    <Button variant='dark' className='sign-in-buttons' type='submit'> Sign Up </Button>    
                </Form>
            </div>
        )
    }
}

export default SignUpComponent