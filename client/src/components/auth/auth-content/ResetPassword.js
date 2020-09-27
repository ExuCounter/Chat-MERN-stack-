import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthNavigation} from './Navigation';

export const ResetPasswordContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-content__title">
                Reset Password
            </h1>
            <Form action="/reset-password" method="POST" className='auth-form auth-form-reset'>
                <Form.Group className="reset-password-email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="example@gmail.com"/>
                </Form.Group>
                <div className="form-buttons">
                    <Button type="submit" variant="primary">
                        Please remember my password
                    </Button>
                </div>
            </Form>
            <AuthNavigation links={{
               "login": "Log In",
               "register": "Sign Up"
            }} />
        </React.Fragment>
    )
}