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
import { useHistory } from "react-router-dom";


export default function Homepage() {
  const history= useHistory();
  useEffect(()=>
  {
    const user=JSON.parse(localStorage.getItem("UserInfo"));

    if(user)
    {
        history.push("/chats");
    }
  },[history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"90%"}
        m="30px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="3xl"
          fontFamily="Work sans"
          color={"black"}
          textAlign="center"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="90%"
        p={2}
        marginBottom="1em"
        color="black"
        borderRadius="md"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
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
