import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

ChatProvider.propTypes = {
  children: PropTypes.any
};

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    if(userInfo)
    setUser(userInfo);
    if (!userInfo) navigate('/');
  },[navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
}
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
