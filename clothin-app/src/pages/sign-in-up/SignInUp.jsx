import React from 'react'

import SignInComponent from '../../components/sign-in/SignInComponent'
import SignUpComponent from '../../components/sign-up/SignupComponent'
import './sign-in-sign-up-page.css'
import { Container, Row, Col } from 'react-bootstrap'

const SignInSignUpPage = () => {

    return(
        <Container>
            <Row>
                <Col xs={12} sm={12} md={5}>
                    <SignInComponent />
                </Col>
                <Col xs={12} sm={12} md={7}>
                    <SignUpComponent />
                </Col>
                
            </Row>
            
        </Container>
    )
}

export default SignInSignUpPage