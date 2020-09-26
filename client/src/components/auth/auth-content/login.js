import React from 'react';

export const LoginContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Login
            </h1>
            <form action="/login" method="POST">
                
            </form>
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