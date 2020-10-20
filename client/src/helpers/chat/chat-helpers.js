const fetchChatMessages = async(chatId, setChatMessages, request) => {
    if (chatId) {
        const data = await request(`/chat/${chatId}`, "POST", { id: chatId });
        if (data !== '') {
            setChatMessages(data)
        } else {
            setChatMessages(null);
        }
    }
}

export {
    fetchChatMessages
}