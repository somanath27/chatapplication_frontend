import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { ChatState } from "../Context/ContextProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import PropTypes from "prop-types";

ScrollableChat.propTypes = {
  messages: PropTypes.any.isRequired,
};

function ScrollableChat({ messages }) {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((mess, i) => (
          <div style={{ display: "flex" }} key={i}>
            {(isSameSender(messages, mess, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={mess.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={mess.sender.name}
                  src={mess.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  mess.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, mess, i, user._id),
                marginTop: isSameUser(messages, mess, i, user._id) ? 3 : 10,
              }}
            >
              {mess.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
