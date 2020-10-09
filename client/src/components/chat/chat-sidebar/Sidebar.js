import React, {useEffect, useContext, useState} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {SidebarMessage} from './Message';

export const ChatSidebar = (props) => {
    const [chats, setChats] = useState([]);
    const [chatOwners, setChatOwners] = useState([]);
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);

    useEffect(()=>{
        async function fetchData() {
            let data = await chat.getChatsByUser(auth.userId);
            setChats(data);

            data.map(sidebarChat=>{
                async function fetchData() {
                    let data = await chat.getUsernameById(sidebarChat.senderId);
                    setChatOwners(data);
                }
                fetchData();
            })
        }
        fetchData()
    }, []);

    

    const renderedChats = chats.map((sidebarChat, index)=>{
        return(
            <SidebarMessage key={sidebarChat._id} id={sidebarChat._id} active={props.chatId == sidebarChat._id} chatName={chatOwners.username} chatText={'last message'}/>
        )
    });

    const ChatSidebarInner = ({children}) => {
        return(
            <div className='chat-sidebar'>
                {children}
            </div>
        )
    }
    
    return(
        <ChatSidebarInner>
            {renderedChats}
        </ChatSidebarInner>
    )
}