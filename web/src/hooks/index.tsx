import React from 'react';

import { AuthProvider } from './auth';
import { TableProvider } from './table';
import { MeasureProvider } from './measure';

const AppProvider: React.FC = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <MeasureProvider>
          <TableProvider>{children}</TableProvider>
        </MeasureProvider>
      </AuthProvider>
    </>
  );
};

export default AppProvider;
