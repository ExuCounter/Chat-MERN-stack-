import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SidebarMessage = ({ chat, chatId }) => {
  const { _id, interlocutor, lastMessage } = chat;
  const active = chatId === _id ? "active-sidebar-message" : "";
  return (
    <Link
      to={`/chat/${_id}`}
      className={"chat-sidebar-message " + active}
      key={_id}
    >
      <span className="chat-name">{interlocutor}</span>
      <span className="chat-text">{lastMessage}</span>
    </Link>
  );
};
