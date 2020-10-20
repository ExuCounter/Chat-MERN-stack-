import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import uploadIcon from "../../../assets/images/upload.svg";
import sendIcon from "../../../assets/images/send.svg";
import { useHttp } from "../../../hooks/http.hook";
import { AuthContext } from "../../../context/AuthContext";
import io from "socket.io-client";

export const ChatFooter = ({chatId, setChatMessages}) => {
  const socket = io("http://localhost:4000");
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    body: "",
    files: [],
    chatId,
    senderId: auth.userId,
  });
  const { request } = useHttp();

  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formButtons = document.querySelector(".chat-content-footer__form");

  const uploadHandler = (e) => {
    e.preventDefault();
    document.querySelector("#upload-file").click();
  };

  async function fetchData() {
      if(chatId){
          const data = await request(`/chat/${chatId}`, "POST", { id: chatId }); 
          console.log(data);
          if(data !== ''){
              setChatMessages(data)
          } else{
              setChatMessages(null);
          }
      }
  }

  const sendHandler = async (e) => {
    e.preventDefault();
    socket.emit('message', `Message body: ${form.body}`);
    if (form.message !== "") {
      let data = await request("/chat/create-message", "PUT", { ...form });
    }
  };

  socket.on('message', ()=>{
    fetchData();
  })

  return (
    <div className="chat-content-footer">
      <Form className="chat-content-footer__form">
        <div className="chat-content-footer__files">
          <input
            type="file"
            name="files"
            className="d-none"
            id="upload-file"
            onChange={formHandler}
            multiple
          />
          <button
            className="chat-content-footer__files-button"
            onClick={uploadHandler}
          >
            <img
              src={uploadIcon}
              alt="Upload Icon"
              className="form-upload-icon"
            />
          </button>
        </div>
        <div className="chat-content-footer__textarea">
          <textarea
            placeholder="Type here..."
            name="body"
            onChange={formHandler}
          ></textarea>
        </div>
        <div className="chat-content-footer__send">
          <button
            className="chat-content-footer__send-button"
            onClick={sendHandler}
          >
            <span>Send</span>
            <img src={sendIcon} alt="Send Icon" className="form-send-icon" />
          </button>
        </div>
      </Form>
    </div>
  );
};
