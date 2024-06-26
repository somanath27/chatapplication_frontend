import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";

UserBadgeItem.propTypes = {
  user: PropTypes.any.isRequired,
  handleFunction: PropTypes.any.isRequired,
};

function UserBadgeItem({ user, handleFunction }) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      color="white"
      backgroundColor="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
}

export default UserBadgeItem;
