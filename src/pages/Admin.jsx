import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AddMenu from '../components/AddMenu';
import NavbarBtn from '../components/buttons/ProfileNavBtn';
import LiveOrders from '../components/LiveOrders';
import Nav from '../components/Navbar';

export default function Admin() {
  return (
    <>
      <Nav title="Admin Dashboard" navBtn={<NavbarBtn />} />
      <Flex>
        <AddMenu />
        <LiveOrders />
      </Flex>
    </>
  );
}
