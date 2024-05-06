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
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOCAL_API_URL, PRODUCTION_API_URL } from '../../config/config';

export default function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const baseURL = process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : LOCAL_API_URL;

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
        colorScheme: 'red'
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Password Do not match',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const userData = { name, email, password, pic };
      const response = await axios.post(`${baseURL}/api/user`, userData, config);

      const { data } = response;

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });

      localStorage.setItem('UserInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';

      toast({
        title: 'Error Occurred!',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });

      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'Chat-App');
      data.append('cloud_name', 'somanathbarik');
      fetch('https://api.cloudinary.com/v1_1/somanathbarik/image/upload', {
        method: 'post',
        body: data
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Please select an Image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="2px" color="white">
      <FormControl id="first-name" isRequired>
        <FormLabel fontSize="sm" color={'white'}>
          Name
        </FormLabel>
        <Input
          fontSize="sm"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
          _placeholder={{
            textColor: 'white'
          }}
          focusBorderColor="white"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel fontSize="sm" color={'white'}>
          Email
        </FormLabel>
        <Input
          fontSize="sm"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          _placeholder={{
            textColor: 'white'
          }}
          focusBorderColor="white"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel fontSize="sm" color={'white'}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            fontSize="sm"
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{
              textColor: 'white'
            }}
            focusBorderColor="white"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel fontSize="sm" color={'white'}>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            fontSize="sm"
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            _placeholder={{
              textColor: 'white'
            }}
            focusBorderColor="white"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel fontSize="sm" color={'white'}>
          Upload your picture
        </FormLabel>
        <Input
          fontSize="sm"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        fontSize="large"
        backgroundColor="white"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
}
