import { ChakraProvider } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider as SupabaseProvider } from 'react-supabase';
import App from './App';
import {supabase} from './supabase';
import AuthProvider from './context/AuthProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
    <SupabaseProvider value={supabase}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </SupabaseProvider>
    </AuthProvider>
  </StrictMode>
);