/* eslint @typescript-eslint/no-explicit-any: 0 */

import React, { createContext, useState, useContext, useCallback } from 'react';

import api from '../services/api';
import ISelectOption from '../dtos/ISelectOption';
import IMeasureProps from '../dtos/IMeasureProps';

interface IContextData {
  measures: ISelectOption[];
  getMeasures(): void;
}

const MeasureContext = createContext<IContextData>({} as IContextData);

const MeasureProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ISelectOption[]>([]);

  const getMeasures = useCallback(() => {
    if (data.length === 0 || !data) {
      const formattedMeasures: ISelectOption[] = [];

      api.get(`/measures`).then((response: any) => {
        response.data.map(({ id, name }: IMeasureProps) => {
          return formattedMeasures.push({ value: id, label: name });
        });

        setData(formattedMeasures);
      });
    }
  }, [data]);

  return (
    <MeasureContext.Provider value={{ measures: data, getMeasures }}>
      {children}
    </MeasureContext.Provider>
  );
};

const useMeasureContext = (): IContextData => {
  const context = useContext(MeasureContext);

  if (!context) {
    throw new Error('useMeasureContext must be used within an MeasureProvider');
  }

  return context;
};

export { MeasureProvider, useMeasureContext };
