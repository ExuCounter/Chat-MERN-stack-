import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import { SidebarMessage } from "./Message";
import plusIcon from "../../../assets/images/plus.svg";

export const ChatSidebar = ({ chatId, chats, setChats }) => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  // Receive all chats from the server
  useEffect(() => {
    async function fetchData() {
      const data = await request("/chat", "POST", { id: auth.userId });
      setChats(data);
    }
    fetchData();
  }, []);

  return (
    <div className="chat-sidebar">
      {(chats.length !== 0 && (
        <>
          {chats.map((sidebarChat) => {
            return <SidebarMessage chat={sidebarChat} chatId={chatId} />;
          })}
        </>
      )) || (
        <div className="no-chats-yet">
          <Link to="/create-chat" className="no-chats-yet__link">
            No chats yet
          </Link>
        </div>
      )}
      <Link to="/create-chat" className="chat-sidebar-create-btn">
        <img src={plusIcon} alt="Plus Icon" />
      </Link>
    </div>
  );
};
