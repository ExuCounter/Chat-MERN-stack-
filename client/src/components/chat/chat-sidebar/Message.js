import React from 'react';

export const SidebarMessage = (props) => {
    return(
        <div className='chat-sidebar-message'>
            <p>{props.chatName}</p>
            <span>{props.chatText}</span>
        </div>
    )
}