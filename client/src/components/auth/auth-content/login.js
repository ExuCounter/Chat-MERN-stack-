import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';

export const LoginContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-content__title">
                Login
            </h1>
            <Form action="/login" method="POST" className='auth-form'>
                <Form.Group className="login-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="example@gmail.com"/>
                </Form.Group>
                <div className="login-password">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="login-password"/>
                    </Form.Group>
                </div>
                <div className="form-buttons">
                    <Button type="submit" variant="primary">
                        Go to chat
                    </Button>
                </div>
            </Form>
            <AuthNavigation links={{
               "register": "Sign Up",
               "reset-password": "Forget password ?"
            }} />
        </React.Fragment>
    )
}