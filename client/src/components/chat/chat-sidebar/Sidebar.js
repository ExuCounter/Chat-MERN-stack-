import React from 'react';

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
            sidebar
        </ChatSidebarInner>
    )
}