import React from 'react';
import {SidebarMessage} from './Message';

export const ChatSidebar = () => {
    const ChatSidebarInner = ({children}) => {
        return(
            <div className='chat-sidebar'>
                {children}
            </div>
        )
    }
    return(
        <ChatSidebarInner>
            <SidebarMessage chatName={"Name"} chatText={'Small Message'}/>
        </ChatSidebarInner>
    )
}