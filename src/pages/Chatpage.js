 // eslint-disable-next-line
import React, { useEffect,useState } from 'react'
 // eslint-disable-next-line
import axios from 'axios'
import { ChatState } from '../Context/ContextProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';


export default function Chatpage() {
      const {user} =ChatState();
      const [fetchAgain, setFetchAgain] =useState(false);
      // console.log(user)
  return (
    <div style={{width: "100%"}}>
      { user && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent="space-between"
      w="100%"
      h="91.5vh"
      p="10px">
      {user && <MyChats fetchAgain={fetchAgain}/>}
      {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
      </Box>
    </div>
  );
}
