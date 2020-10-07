import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {SidebarMessage} from './Message';

export const ChatSidebar = (props) => {
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
                    <SidebarMessage key={sidebarChat._id} id={sidebarChat._id} active={props.chatId == sidebarChat._id} chatName={'1'} chatText={'1'}/>
                ))
            }
        </ChatSidebarInner>
    )
}