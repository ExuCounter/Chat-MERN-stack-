import React from 'react';

export const ChatContent = () => {
    const ChatContentInner = ({children}) => {
        return(
            <div className='chat-content'>
                {children}
            </div>
        )
    }
    return(
        <ChatContentInner>
            content
        </ChatContentInner>
    )
}