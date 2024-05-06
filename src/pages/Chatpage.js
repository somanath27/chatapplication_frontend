import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, Spinner } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

export default function Chatpage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false); // Set loading to false once user data is available
  }, [user]);

  if (loading) {
    return (
      <Spinner size="lg" color="white" alignItems="center" display="flex" justifyContent="center" />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <SideDrawer />
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        <MyChats fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </div>
  );
}
