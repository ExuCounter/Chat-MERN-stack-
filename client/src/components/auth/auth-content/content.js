import React from 'react';
import {LoginContent} from './login';
import {RegisterContent} from './register';
import {ResetPasswordContent} from './reset-password';

export const AuthContent = (props) => {
    const AuthContentInner = ({children}) => {
        return(
            <div className='auth-content'>
                {children}
            </div>
        )
    }

    switch (props.step){
        case 'login':
        return(
            <AuthContentInner>
                <LoginContent />
            </AuthContentInner>
        );
        case 'register':
        return(
            <AuthContentInner>
                <RegisterContent />
            </AuthContentInner>
        )
        case 'reset-password':
        return(
            <AuthContentInner>
                <ResetPasswordContent />
            </AuthContentInner>
        );
        default: 
        return(
            <AuthContentInner>
                <LoginContent />
            </AuthContentInner>
        )
    }
}