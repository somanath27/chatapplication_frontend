import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import { PRODUCTION_API_URL, LOCAL_API_URL } from '../../config/config';

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { setUser } = ChatState();

  const baseURL = process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : LOCAL_API_URL;

  const handleClick = () => {
    setShow(!show);
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      const { data } = await axios.post(
        `${baseURL}/api/user/login`,
        {
          email,
          password
        },
        config
      );
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setUser(data);
      localStorage.setItem('UserInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (err) {
      toast({
        title: 'Error Occured!',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="2px" color="white">
      <FormControl id="login-email" isRequired>
        <FormLabel fontSize="sm">Email</FormLabel>
        <Input
          fontSize="sm"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          _placeholder={{
            textColor: 'white'
          }}
          focusBorderColor='white'
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel fontSize="sm">Password</FormLabel>
        <InputGroup>
          <Input
            fontSize="sm"
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{
              textColor: 'white'
            }}
            focusBorderColor='white'
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        fontSize="larger"
        backgroundColor="white"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}>
        LogIn
      </Button>
    </VStack>
  );
}
