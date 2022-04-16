/* eslint @typescript-eslint/no-explicit-any: 0 */

import React, { createContext, useContext, useCallback, useState } from 'react';

interface IContextData {
  data: Array<{}>;
  setData(fetchedData: Array<{}>): void;
}

const TableContext = createContext<IContextData>({} as IContextData);

const TableProvider: React.FC = ({ children }) => {
  const [tableData, setTableData] = useState([]);

  const setData = useCallback(async (fetchedData) => {
    setTableData(fetchedData);
  }, []);

  return (
    <TableContext.Provider value={{ data: tableData, setData }}>
      {children}
    </TableContext.Provider>
  );
};

const useTableContext = (): IContextData => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within an TableProvider');
  }

  return context;
};

export { TableProvider, useTableContext };
