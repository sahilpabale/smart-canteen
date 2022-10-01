import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

import Auth from './components/Auth';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/menu" element={<Auth />} /> */}
        {/* <Route path="/menu/:id" element={<Auth />} /> -> useParam() Hook to get the param*/}
        {/* <Route path="/account" element={<Auth />} /> */}
        {/* <Route path="/order" element={<Auth />} /> */}
      </Routes>
    </ChakraProvider>
  );
}

export default App;
