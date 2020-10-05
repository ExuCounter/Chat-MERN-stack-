import React from 'react';
import {Link} from 'react-router-dom';

export const SidebarMessage = (props) => {
    return(
        <Link to={`/chat/${props.id}`} className='chat-sidebar-message' onClick={()=>{props.setChatId(props.id)}}>
            <span className='chat-name'>{props.chatName}</span>
            <span className='chat-text'>{props.chatText}</span>
        </Link>
    )
}
