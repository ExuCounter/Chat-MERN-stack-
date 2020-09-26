import React from 'react';

export const AuthPage = (props) => {
    let step = props.step;
    switch(step){
        case 'login': 
        return(
            AuthPageContent('login')
        )
        case 'register': 
        return(
            AuthPageContent('register')
        )
        case 'reset-password': 
        return(
            AuthPageContent('reset-password')
        )
    }
}