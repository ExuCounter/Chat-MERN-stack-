import React from 'react';
import {Switch, Redirect, Route, Link} from 'react-router-dom';
import {CreateChat} from './CreateChat';

export const ChatAction = (props) => {
    return(
        <Switch>
            <Route path='/create-chat'>
                <CreateChat/>
            </Route>
            <Route>
                <div className='start-action-screen'>
                    <div className='start-action-screen__text'>
                        No selected chats for now...
                    </div>
                </div>
            </Route>
        </Switch>
    )
}