import React, {useEffect, useContext, useState} from 'react';
import {Button} from 'react-bootstrap';
import {useHttp} from '../../../hooks/http.hook';
import {ChatHeader} from './Header';
import {ChatFooter} from './Footer';
import {ChatContext} from '../../../context/ChatContext';
import {AuthContext} from '../../../context/AuthContext';

export const ChatContent = ({ chatId, chats, setChats, socket, chatMessages, setChatMessages }) => {
    const {request} = useHttp(); 
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);

    const ChatContentInner = ({children}) => {
        return(
            <div className='chat-content'>
                {children}
            </div>
        )
    }

    return(
        <ChatContentInner>
            <Button className='chat-content-logout' onClick={auth.logout}>Logout</Button>
            {
                !chatId ? 
                <div className='no-messages-yet'>Select chat for messaging</div> :
                chatMessages === null ? 
                <div className='no-messages-yet'>No messages yet</div> :
                <React.Fragment>
                    <ChatHeader chatId={chatId}/>
                    <div className='chat-content-body'>
                        {chatMessages.map((message, index)=>(
                            <div className='chat-message' key={index}>
                                <div className="chat-message-body">
                                    {message.files}
                                    {message.body}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatFooter chatId={chatId} chats={chats} setChats={setChats} socket={socket}/>
                </React.Fragment>
            }
        </ChatContentInner>
    )
}