import React from 'react';
import {AuthSidebar} from '../components/auth/auth-sidebar/sidebar';
import {AuthContent} from '../components/auth/auth-content/content';

export const AuthPage = (props) => {
    return(
        <React.Fragment>
            <AuthSidebar/>
            <AuthContent step={props.step}/>
        </React.Fragment>
    )
}