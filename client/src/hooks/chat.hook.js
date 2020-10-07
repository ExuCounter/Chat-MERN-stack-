import { useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export const useChat = () => {
    const { request } = useHttp();

    const getMessagesByChat = async(id) => {
        const data = await request(`/chat/${id}`, "POST", { id });
        console.log(`Current chat messages, id: ${id} ` + data === undefined ? 'No messages' : 'Count of messages in current chat: ' + data.length);
        return data;
    }

    const getChatsByUser = async(id) => {
        const data = await request(`/chat`, "POST", { id });
        console.log(`Current chats by user, id: ${id}` + data === undefined ? 'No chats' : 'Count of chats of this user: ' + data.length);
        return data;
    }

    const getUsernameById = async(id) => {
        const data = await request(`/chat/user/get-login-by-id`, "PUT", { id });
        console.log(data);
        return data;
    }

    return { getMessagesByChat, getChatsByUser, getUsernameById };
}