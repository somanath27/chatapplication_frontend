import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { useNavigate } from "react-router-dom";


export default function Homepage() {
  const navigate= useNavigate();
  useEffect(()=>
  {
    const user=JSON.parse(localStorage.getItem("UserInfo"));

    if(user)
    {
      navigate("/chats");
      
    }
  },[navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"#900C3F"}
        w={"90%"}
        m="30px 0 15px 0"
        borderRadius="lg"
      >
        <Text
          fontSize="3xl"
          fontFamily="Work sans"
          color={"white"}
          textAlign="center"
        >
          ChiT-Chatter
        </Text>
      </Box>
      <Box
        bg="#900C3F"
        w="90%"
        p={2}
        marginBottom="1em"
        color="white"
        borderRadius="md"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%" color={"wheat"} fontSize={"large"}>Login</Tab>
            <Tab width="50%" color={"wheat"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
