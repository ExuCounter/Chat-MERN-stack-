import React,{useEffect} from 'react';
import {ChatSidebar} from '../components/chat/chat-sidebar/Sidebar';
import {ChatContent} from '../components/chat/chat-content/Content';
import {ChatAction} from '../components/chat/chat-action/Action';
import {Row, Col, Container} from 'react-bootstrap';
import {ChatContext} from '../context/ChatContext';
import {useChat} from '../hooks/chat.hook';
import '../styles/auth/auth.css';
import '../styles/base/base.css';

export const MainPage = (props) => {
    const {getMessagesByChat, getChatsByUser, getUsernameById} = useChat();
    const chatId = !!props.match ? props.match.params.id : '';
    const Template = () => {
        if(chatId){
            return(
                <ChatContent chatId={chatId}/>
            )
        } else {
            return(
                <ChatAction action={props.action} />
            )
        }
    }
    return(
        <ChatContext.Provider value={{
            getMessagesByChat, getChatsByUser, getUsernameById
        }}>
            <Container fluid className="chat-container">
                <Row className="chat-row">
                    <Col xs={3} className='p-0 chat-col'>
                        <ChatSidebar chatId={chatId}/>
                    </Col>
                    <Col xs={9} className='p-0 chat-col'>
                        <Template />
                    </Col>
                </Row>
            </Container>
        </ChatContext.Provider>
    )
}