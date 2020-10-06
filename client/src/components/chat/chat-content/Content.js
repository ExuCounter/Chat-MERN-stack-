import React, {useEffect, useContext, useState} from 'react';
import {ChatHeader} from './Header';
import {ChatFooter} from './Footer';
import {ChatContext} from '../../../context/ChatContext';

export const ChatContent = () => {
    const [chatMessages, setChatMessages] = useState(null);
    const chat = useContext(ChatContext);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await chat.getMessagesByChat(chat.currentChatId);
            if(data !== ''){
                setChatMessages(data)
            } else{
                setChatMessages(null);
            }
        }
        fetchData();
    }, [chat.currentChatId])

    const ChatContentInner = ({children}) => {
        return(
            <div className='chat-content'>
                {children}
            </div>
        )
    }

    return(
        <ChatContentInner>
            {
                !chat.currentChatId ? 
                <div className='no-messages-yet'>Select chat for messaging</div> :
                chatMessages.length === 0 ? 
                <div className='no-messages-yet'>No messages yet</div> :
                <React.Fragment>
                    <ChatHeader/>
                    <div className='chat-content-body'>
                        {chatMessages.map((message, index)=>(
                            <div className='chat-message' key={index}>
                                <div className="chat-message-body">
                                    {message.body}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatFooter/>
                </React.Fragment>
            }
        </ChatContentInner>
    )
}