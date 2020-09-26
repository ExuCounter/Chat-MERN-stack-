import React from 'react';

export const ResetPasswordContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Reset Password
            </h1>
            <form action="/reset-password" method="POST">
                
            </form>
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