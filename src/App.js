import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import Nav from './components/Navbar';
import Landing from './components/Landing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Landing />
    </ChakraProvider>
  );
}

export default App;
