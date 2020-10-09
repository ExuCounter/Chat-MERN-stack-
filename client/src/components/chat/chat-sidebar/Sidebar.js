import React, {useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {AuthContext} from '../../../context/AuthContext';
import {ChatContext} from '../../../context/ChatContext';
import {SidebarMessage} from './Message';
import plusIcon from '../../../assets/images/plus.svg';

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

    const renderedChats = () => {
        chats.map((sidebarChat)=>{
            return(
                <SidebarMessage key={sidebarChat._id} id={sidebarChat._id} active={props.chatId == sidebarChat._id} chatName={chatOwners.username} chatText={'last message'}/>
            )
        });    
    }

    const ChatSidebarInner = ({children}) => {
        return(
            <div className='chat-sidebar'>
                {children}
            </div>
        )
    }

    if(renderedChats.length !== 0){
        
    }

    return(
        <ChatSidebarInner>
            {
                chats.length !== 0 ?
                {renderedChats} :
                <div className='no-chats-yet'>No chats yet</div>
            }
            <Link to='/create-chat' className='chat-sidebar-create-btn'>
                <img src={plusIcon} alt="Plus Icon"/>
            </Link>
        </ChatSidebarInner>
    )
}