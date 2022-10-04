import React from 'react';
import {
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Button,
  Center,
  MenuDivider,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { UserAuth } from '../../context/AuthContext';
import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NavbarBtn() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}
      >
        <Avatar
          size={'sm'}
          src={
            user.photoURL
              ? user.photoURL
              : 'https://avatars.dicebear.com/api/male/username.svg'
          }
        />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar
            size={'xl'}
            src={
              user.photoURL
                ? user.photoURL
                : 'https://avatars.dicebear.com/api/male/username.svg'
            }
          />
        </Center>
        <br />
        <VStack>
          <Text fontSize={24} fontWeight="bold">
            {user.displayName}
          </Text>
          <Text fontSize={14}>{user.email}</Text>
        </VStack>
        <br />
        <MenuDivider />
        <MenuItem>Wallet</MenuItem>
        <MenuItem as="button" onClick={() => navigate('/orders')}>
          Orders
        </MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
