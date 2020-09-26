import React from 'react';
import {Form, Button} from 'react-bootstrap';

export const LoginContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Login
            </h1>
            <Form action="/login" method="POST" className='auth-form'>
                <Form.Group className="login-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email"/>
                </Form.Group>
                <div className="login-password">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" className="login-password"/>
                    </Form.Group>
                </div>
                <Button type="submit" variant="primary">
                    Go to chat
                </Button>
            </Form>
            <div className='auth-navigation'>
                <a href="/register">
                    Sign Up
                </a>
                <a href="/reset-password">
                    Forget password?
                </a>
            </div>
        </React.Fragment>
    )
}