import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppProviders from './context/AppProviders';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
      <ReactQueryDevtools />
    </AppProviders>
  </React.StrictMode>,
);
