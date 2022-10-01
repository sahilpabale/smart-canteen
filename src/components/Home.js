import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Nav from './Navbar';
import Landing from './Landing';

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Landing />
    </ChakraProvider>
  );
}
