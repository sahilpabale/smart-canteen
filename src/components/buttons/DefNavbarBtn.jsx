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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

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
            size={'2xl'}
            src={
              user.photoURL
                ? user.photoURL
                : 'https://avatars.dicebear.com/api/male/username.svg'
            }
          />
        </Center>
        <br />
        <Center>
          <p>{user.displayName}</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem
          onClick={() => {
            navigate('/menu');
          }}
        >
          Account
        </MenuItem>
        <MenuItem>Orders</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
