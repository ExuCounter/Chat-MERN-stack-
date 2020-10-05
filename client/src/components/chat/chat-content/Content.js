import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {useHttp} from '../../../hooks/http.hook';

export const ChatContent = () => {
    const [chatMessages, setChatMessages] = useState([]);
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);
    
    useEffect(()=>{
        async function fetchData() {
            const data = await request('/chat', 'POST', {id: auth.userId});
            console.log('User chats'+data);
        }
        fetchData()
    }, [])

    useEffect(()=>{
        async function fetchData() {
            let data = await chat.getMessagesByChat(chat.currentChatId);
            setChatMessages(data);
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
                chatMessages.map((message, index)=>(
                    <div key={index}>{message.body}</div>
                ))
            }
        </ChatContentInner>
    )
}