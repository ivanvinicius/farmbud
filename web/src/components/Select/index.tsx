/* eslint @typescript-eslint/no-explicit-any: 0 */

import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';
import { useField } from '@unform/core';

import customSelectStyle from './customSelectStyle';
import { Container } from './styles';

interface ISelectProps extends Props<OptionTypeBase> {
  name: string;
}

const Select: React.FC<ISelectProps> = ({ name, ...rest }) => {
  const selectRef = useRef<any>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFilled, setIsFilled] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,

      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },

      setValue(_, value: any) {
        if (value) {
          setSelectedValue(value);
        }
      },
    });
  }, [fieldName, registerField, rest.isMulti, selectedValue]);

  const handleInputChange = useCallback(() => {
    async function getSelectValue() {
      const { state } = await selectRef?.current;

      typeof state.value?.value !== 'undefined'
        ? setIsFilled(true)
        : setIsFilled(false);
    }

    getSelectValue();
  }, []);

  return (
    <Container isFilled={isFilled} hasError={!!error}>
      <ReactSelect
        styles={customSelectStyle}
        ref={selectRef}
        defaultValue={selectedValue}
        isClearable={false}
        isSearchable={false}
        onInputChange={handleInputChange}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'Sem opções'}
        placeholder="Selecione..."
        captureMenuScroll={false}
        {...rest}
      />
    </Container>
  );
};

export default Select;
