import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async'
import { store } from './redux/store.ts';

import './index.css'
import AuthProvider from './components/contexts/auth-context.tsx';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </HelmetProvider>

  </React.StrictMode>
);
