import React from 'react';
import {ChatSidebar} from '../components/chat/chat-sidebar/Sidebar';
import {ChatContent} from '../components/chat/chat-content/Content';
import {Row, Col, Container} from 'react-bootstrap';
import {ChatContext} from '../context/ChatContext';
import {useChat} from '../hooks/chat.hook';
import '../styles/auth/auth.css';
import '../styles/base/base.css';

export const MainPage = (props) => {
    const {currentChatId, getMessagesByChat, updateCurrentChatId, getChatsByUser} = useChat();
    return(
        <ChatContext.Provider value={{
            currentChatId, getMessagesByChat, updateCurrentChatId, getChatsByUser
        }}>
            <Container fluid className="chat-container">
                <Row className="chat-row">
                    <Col xs={3} className='p-0 chat-col'>
                        <ChatSidebar/>
                    </Col>
                    <Col xs={9} className='p-0 chat-col'>
                        <ChatContent/>
                    </Col>
                </Row>
            </Container>
        </ChatContext.Provider>
    )
}