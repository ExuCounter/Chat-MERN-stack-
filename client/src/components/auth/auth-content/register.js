import React from 'react';

export const RegisterContent = () => {
    return(
        <React.Fragment>
            <h1 className="auth-sidebar__title">
                Register
            </h1>
            <form action="/register" method="POST">
                
            </form>
            <div className='auth-navigation'>
                <a href="/login">
                    Log In
                </a>
                <a href="/reset-password">
                    Forget password?
                </a>
            </div>
        </React.Fragment>
    )
}