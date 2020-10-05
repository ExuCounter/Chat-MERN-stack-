import React, { useState, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';

export const useChat = () => {
    const [currentChatId, setCurrentChatId] = useState(null);
    const { request } = useHttp();

    const updateCurrentChatId = (id) => {
        setCurrentChatId(id);
        console.log('Current chat id:' + id);
    }

    const getMessagesByChat = async(id) => {
        const data = await request(`/chat/${id}`, "POST", { id });
        console.log(`Current chat messages, id: ${id}` + data.messages);
        return data;
    }

    return { currentChatId, getMessagesByChat, updateCurrentChatId };
}