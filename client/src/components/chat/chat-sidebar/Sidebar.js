import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {SidebarMessage} from './Message';

export const ChatSidebar = () => {
    const [chats, setChats] = useState([]);
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await chat.getChatsByUser(auth.userId);
            setChats(data);
        }
        fetchData()
    }, []);

    
    const updateCurrentChatId = (id) => {
        chat.updateCurrentChatId(id);
    }

    const ChatSidebarInner = ({children}) => {
        return(
            <div className='chat-sidebar'>
                {children}
            </div>
        )
    }
    
    return(
        <ChatSidebarInner>
            {
                chats.map(sidebarChat =>(
                    <SidebarMessage key={sidebarChat._id} id={sidebarChat._id} active={chat.currentChatId == sidebarChat._id} chatName={sidebarChat.senderId} setChatId={updateCurrentChatId} chatText={'Small Message'}/>
                ))
            }
        </ChatSidebarInner>
    )
}