import React, {useEffect, useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext';
import {useHttp} from '../../../hooks/http.hook';

export const ChatContent = () => {
    const {request} = useHttp();
    const auth = useContext(AuthContext);
    
    useEffect(()=>{
        async function fetchData() {
            const data = await request('/chat', 'POST', {id: auth.userId});
            console.log(data.chats);
        }
        fetchData()
    }, [])

    const ChatContentInner = ({children}) => {
        return(
            <div className='chat-content'>
                {children}
            </div>
        )
    }
    return(
        <ChatContentInner>
            content
        </ChatContentInner>
    )
}