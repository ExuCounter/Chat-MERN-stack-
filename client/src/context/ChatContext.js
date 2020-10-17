import { createContext } from 'react';

function noop() {

}

export const ChatContext = createContext({
    getMessagesByChat: noop,
    getChatsByUser: noop,
    getUsernameById: noop,
    getChatInfo: noop
})