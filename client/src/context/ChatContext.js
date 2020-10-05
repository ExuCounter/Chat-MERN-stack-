import { createContext } from 'react';

function noop() {

}

export const ChatContext = createContext({
    currentChatId: null,
    getMessagesByChat: noop,
    updateCurrentChatId: noop
})