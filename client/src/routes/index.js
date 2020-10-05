import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {AuthPage} from '../pages/AuthPage';
import {MainPage} from '../pages/MainPage';

export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated) {
        return(
            <Switch>
                <Route path='/chat' exact>
                    <MainPage/>
                </Route>
                <Route path='/chat/:id'>
                    <MainPage/>
                </Route>
            </Switch>
        )
    } else{
        return(
            <Switch>
                <Route path='/login'>
                    <AuthPage step='login'/>
                </Route>
                <Route path='/register'>
                    <AuthPage step='register'/>
                </Route>
                <Route path='/reset-password'>
                    <AuthPage step='reset-password'/>
                </Route>
            </Switch>
        )
    }
}