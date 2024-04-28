import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

ChatProvider.propTypes = {
  children: PropTypes.any
};

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
    setUser(userInfo);
    if (!userInfo) history.push("/");
  }, [history]);

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
