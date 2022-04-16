import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  width: 30%;
  padding: 12px;

  background: var(--color-white);
  color: var(--color-text-complement);

  border-radius: 8px;
  border: 1px solid var(--color-line-in-white);

  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--color-purple);
      color: var(--color-purple);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--color-purple);
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    width: inherit;

    &::placeholder {
      color: var(--color-text-complement);
    }
  }

  svg {
    margin-right: 16px;
  }
`;
