import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {useHttp} from '../../../hooks/http.hook';
import {SidebarMessage} from './Message';

export const ChatSidebar = () => {
    const {request} = useHttp();
    const [chats, setChats] = useState([]);
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);
    
    useEffect(()=>{
        async function fetchData() {
            let data = await request('/chat', 'POST', {id: auth.userId});
            setChats(data);
        }
        fetchData()
    }, [])

    const ChatSidebarInner = ({children}) => {
        return(
            <div className='chat-sidebar'>
                {children}
            </div>
        )
    }

    const updateCurrentChatId = (id) => {
        chat.updateCurrentChatId(id);
        console.log(chats);
    }

    return(
        <ChatSidebarInner>
            {
                chats.map(chat =>(
                    <SidebarMessage key={chat._id} id={chat._id} chatName={chat.senderId} setChatId={updateCurrentChatId} chatText={'Small Message'}/>
                ))
            }
        </ChatSidebarInner>
    )
}