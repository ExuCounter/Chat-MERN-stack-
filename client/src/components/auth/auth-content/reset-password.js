import React from 'react';
import {Form, Button} from 'react-bootstrap';

export const ResetPasswordContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Reset Password
            </h1>
            <Form action="/reset-password" method="POST" className='auth-form'>
                <Form.Group className="reset-password-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email"/>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Please remember my password
                </Button>
            </Form>
            <div className='auth-navigation'>
                <a href="/login">
                    Log In
                </a>
                <a href="/register">
                    Sign Up
                </a>
            </div>
        </React.Fragment>
    )
}