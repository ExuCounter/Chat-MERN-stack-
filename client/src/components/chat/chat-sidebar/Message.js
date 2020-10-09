import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {ChatContext} from '../../../context/ChatContext';

export const SidebarMessage = (props) => {
    const [senderName, setSenderName] = useState(null);
    let active = props.active ? 'active-sidebar-message' : '';
    let chat = useContext(ChatContext);
    
    return(
        <Link to={`/chat/${props.id}`} className={'chat-sidebar-message ' + active}>
            <span className='chat-name'>{props.chatName}</span>
            <span className='chat-text'>{props.chatText}</span>
        </Link>
    )
}
