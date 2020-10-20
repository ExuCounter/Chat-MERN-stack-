import React,{useState, useEffect} from 'react';
import {ChatSidebar} from '../components/chat/chat-sidebar/Sidebar';
import {ChatContent} from '../components/chat/chat-content/Content';
import {ChatAction} from '../components/chat/chat-action/Action';
import {fetchChatMessages} from '../helpers/chat/chat-helpers';
import {Row, Col, Container} from 'react-bootstrap';
import {useHttp} from '../hooks/http.hook';
import io from "socket.io-client";
import '../styles/auth/auth.css';
import '../styles/base/base.css';

export const MainPage = (props) => {
    const socket = io("http://localhost:4000");
    const {request} = useHttp();
    const [chatMessages, setChatMessages] = useState(null);
    const [chats, setChats] = useState([]);
    const chatId = !!props.match ? props.match.params.id : '';
    
    socket.on('message', ()=>{
        fetchChatMessages(chatId, setChatMessages,request);
    })
    useEffect(()=>{
        fetchChatMessages(chatId, setChatMessages,request);
    }, [chatId])

    const Template = () => {
        if(chatId){
            return(
                <ChatContent chatId={chatId} socket={socket} chatMessages={chatMessages} setChatMessages={setChatMessages}/>
            )
        } else {
            return(
                <ChatAction action={props.action} />
            )
        }
    }
    return(
        <Container fluid className="chat-container">
            <Row className="chat-row">
                <Col xs={3} className='p-0 chat-col'>
                    <ChatSidebar chatId={chatId} chats={chats} setChats={setChats}/>
                </Col>
                <Col xs={9} className='p-0 chat-col'>
                    <Template />
                </Col>
            </Row>
        </Container>
    )
}