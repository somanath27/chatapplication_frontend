import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FormControl } from '@chakra-ui/form-control';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import PropTypes from 'prop-types';
import { LOCAL_API_URL, PRODUCTION_API_URL } from '../../config/config';

GroupChatModal.propTypes = {
  children: PropTypes.any.isRequired
};
function GroupChatModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const baseURL = process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : LOCAL_API_URL;

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(`${baseURL}/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to load the search results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: 'Please fill all the fields',
        description: 'Failed to load the search results',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post(
        `${baseURL}/api//chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id))
        },
        config
      );

      setChats([data, ...chats]);
      onClose();
      toast({
        title: 'New Group chat Created',
        description: 'Failed to load the search results',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
    } catch (error) {
      toast({
        title: 'Failed to create the chat',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom'
      });
    }
  };

  const handleDelete = (deletedUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deletedUser._id));
  };

  const handleGroup = (userToadd) => {
    if (selectedUsers.includes(userToadd)) {
      toast({
        title: 'User Already added',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToadd]);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Jhon, piyush, jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {/* selected users */}
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u, i) => (
                <UserBadgeItem key={i} user={u} handleFunction={() => handleDelete(u)} />
              ))}
            </Box>

            {/* render searched users */}

            {loading ? (
              <div>laoding</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default GroupChatModal;
