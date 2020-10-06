import React from 'react';
import {Link} from 'react-router-dom';

export const SidebarMessage = (props) => {
    let active = props.active ? 'active-sidebar-message' : '';
    return(
        <Link to={`/chat/${props.id}`} className={'chat-sidebar-message ' + active} onClick={()=>{props.setChatId(props.id)}}>
            {console.log(props.active)}
            <span className='chat-name'>{props.chatName}</span>
            <span className='chat-text'>{props.chatText}</span>
        </Link>
    )
}
