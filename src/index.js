import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ColorModeScript initialColorMode="system" />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
