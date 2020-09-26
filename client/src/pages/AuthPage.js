import React from 'react';
import {AuthPageSidebar} from '../components/auth/sidebar';
import {AuthPageContent} from '../components/auth/index';

export const AuthPage = (props) => {
    return(
        <React.Fragment>
            <AuthPageSidebar/>
            <AuthPageContent step={props.step}/>
        </React.Fragment>
    )
}