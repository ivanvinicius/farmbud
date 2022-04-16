import React, { useState, useCallback } from 'react';
import { useAsyncDebounce } from 'react-table';
import { RiSearchLine } from 'react-icons/ri';

import { Container } from './styles';

interface IGlobalFilterProps {
  globalFilter: string | undefined;
  setGlobalFilter: (filterValue: string | number | undefined) => void;
}

const GlobalInputFilter: React.FC<IGlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((eventValue) => {
    setGlobalFilter(eventValue || undefined);
  }, 200);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);
  const handleInputBlur = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsFilled(!!e.currentTarget.value);
    },
    [],
  );

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <RiSearchLine size={20} />

      <input
        value={value || ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Pesquisar..."
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default GlobalInputFilter;
