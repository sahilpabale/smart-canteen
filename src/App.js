import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';

import Auth from './components/Auth';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Protected from './components/Protected';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/menu" element={<Auth />} /> */}
          {/* <Route path="/menu/:id" element={<Auth />} /> -> useParam() Hook to get the param*/}
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
          {/* <Route path="/order" element={<Auth />} /> */}
        </Routes>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
