import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks';
import Routes from './routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer autoClose={5000} />
      <GlobalStyles />
    </AppProvider>
  );
};

export default App;
