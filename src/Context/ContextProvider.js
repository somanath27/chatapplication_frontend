import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

ContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

const ChatContext = createContext();

function ContextProvider({children}) {
    const [user, setUser] = useState();
    const [selectedChat,setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const history = useHistory();

    useEffect(() => { 
      const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
      console.log(userInfo);
      setUser(userInfo);
      if (!userInfo) {
        // history.push("/") 
      }
    }, [history]);
  
    return (
      <ChatContext.Provider value={{ user, setUser,selectedChat,setSelectedChat,chats,setChats }}> 
        {children}
      </ChatContext.Provider>
    );
}
export const ChatState = () => {
    return useContext(ChatContext);
  };


export default ContextProvider;









