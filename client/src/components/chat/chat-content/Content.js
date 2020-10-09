import React, {useEffect, useContext, useState} from 'react';
import {Button} from 'react-bootstrap';
import {ChatHeader} from './Header';
import {ChatFooter} from './Footer';
import {ChatContext} from '../../../context/ChatContext';
import {AuthContext} from '../../../context/AuthContext';

export const ChatContent = (props) => {
    const [chatMessages, setChatMessages] = useState(null);
    const auth = useContext(AuthContext);
    const chat = useContext(ChatContext);

    useEffect(()=>{
        async function fetchData() {
            if(props.chatId){
                let data = await chat.getMessagesByChat(props.chatId);
                console.log(data);
                if(data !== ''){
                    setChatMessages(data)
                } else{
                    setChatMessages(null);
                }
            }
        }
        fetchData();
    }, [props.chatId])

    const ChatContentInner = ({children}) => {
        return(
            <div className='chat-content'>
                {children}
            </div>
        )
    }


    return(
        <ChatContentInner>
            <Button className='chat-content-logout' onClick={auth.logout}>Logout</Button>
            {
                !props.chatId ? 
                <div className='no-messages-yet'>Select chat for messaging</div> :
                chatMessages === null ? 
                <div className='no-messages-yet'>No messages yet</div> :
                <React.Fragment>
                    <ChatHeader/>
                    <div className='chat-content-body'>
                        {chatMessages.map((message, index)=>(
                            <div className='chat-message' key={index}>
                                <div className="chat-message-body">
                                    {message.files}
                                    {message.body}
                                </div>
                            </div>
                        ))}
                    </div>
                    <ChatFooter chatId={props.chatId}/>
                </React.Fragment>
            }
        </ChatContentInner>
    )
}