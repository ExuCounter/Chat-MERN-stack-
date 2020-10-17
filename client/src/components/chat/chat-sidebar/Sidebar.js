import React, {useEffect, useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useHttp} from '../../../hooks/http.hook';
import {AuthContext} from '../../../context/AuthContext';
import {SidebarMessage} from './Message';
import plusIcon from '../../../assets/images/plus.svg';

export const ChatSidebar = (props) => {
    const [chats, setChats] = useState([]);
    const [list, setList] = useState([]);
    const auth = useContext(AuthContext);
    const {request} = useHttp();

    // Receive all chats from the server
    useEffect(()=>{
        async function fetchData() { 
            const data = await request('/chat', "POST", {id: auth.userId});
            return data;
        }
        fetchData()
            .then(data=>{setChats(data)});
    }, [])
    
    // Add to chat objects property username
    useEffect(()=>{
        if(!chats) return 'no data';
        const updatedChats = chats.map(async(sidebarChat)=>{
            async function fetchData() { 
                const data = await request('/chat/get-login', "POST", {chatId: sidebarChat._id, id: auth.userId});
                return data;
            }
            let updatedChat = await fetchData()
                .then(data=>{
                    return sidebarChat = {
                        ...sidebarChat,
                        username: data.username
                    }
            });
            return await updatedChat;
        })
        setList(updatedChats);
    }, [chats])

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
                list.length !== 0 ?
                <div>
                    {list.map((sidebarChat)=>{
                        return <SidebarMessage key={sidebarChat._id} id={sidebarChat._id} active={props.chatId == sidebarChat._id} chatName={sidebarChat.username} chatText={'last message'}/>
                    })}
                </div> :
                <div className='no-chats-yet'>
                    <Link to='/create-chat' className="no-chats-yet__link">
                        No chats yet
                    </Link>
                </div>
            }
            <Link to='/create-chat' className='chat-sidebar-create-btn'>
                <img src={plusIcon} alt="Plus Icon"/>
            </Link>
        </ChatSidebarInner>
    )
}