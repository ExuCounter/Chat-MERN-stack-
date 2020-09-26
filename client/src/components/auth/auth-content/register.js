import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';

export const RegisterContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Register
            </h1>
            <Form action="/register" method="POST" className='auth-form'>
                <Form.Group className="register-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email"/>
                </Form.Group>
                <div className="register-passwords d-none">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="register-password"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Repeat password</Form.Label>
                        <Form.Control type="password" name="password" className="register-repeat-password"/>
                    </Form.Group>
                </div>
                <Button type="submit" variant="primary">
                    Register new account
                </Button>
            </Form>
            <AuthNavigation links={{
               "login": "Log In",
               "reset-password": "Forget password?"
            }} />
        </React.Fragment>
    )
}