import React, {useEffect, useContext, useState} from 'react';
import {useHttp} from '../../../hooks/http.hook';
import {AuthContext} from '../../../context/AuthContext';

export const ChatHeader = ({chatId}) => {
    const {userId} = useContext(AuthContext);
    const {request} = useHttp();
    const [interlocutor, setInterlocutor] = useState('');
    useEffect(() =>{
        const fetchData = async () => {
            const {interlocutor} = await request('/chat/get-login', 'POST', {chatId, userId});
            setInterlocutor(interlocutor);
        }
        fetchData();
    }, [])
    return(
        <div className='chat-content-header'>
            {interlocutor}
        </div>
    )
}