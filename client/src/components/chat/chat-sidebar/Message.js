import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';

export const SidebarMessage = (props) => {
    const [currentChat, setCurrentChat] = useState(null); 
    const {request} = useHttp();
    async function fetchMessages(chatId) {
        const data = await request(`/chat/${chatId}`, "POST", {chatId});
        console.log(`Current chat messages, id: ${chatId}`+data.messages);
    }
    const getMessagesByChat = (props) => {
        fetchMessages(props.id);
    }

    return(
        <Link to={`/chat/${props.id}`} className='chat-sidebar-message' onClick={()=>(getMessagesByChat(props))}>
            <span className='chat-name'>{props.chatName}</span>
            <span className='chat-text'>{props.chatText}</span>
        </Link>
    )
}