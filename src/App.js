import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Protected from './components/Protected';
import Orders from './components/Orders';
import Order from './components/Order';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
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
          <Route
            path="/orders"
            element={
              <Protected>
                <Orders />
              </Protected>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <Protected>
                <Order />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
