import styled, { css } from 'styled-components';

interface IContainerProps {
  hasError: boolean;
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;

  background: var(--color-white);
  color: var(--color-text-complement);

  border-radius: 8px;
  border: 1px solid;
  border-color: var(--color-line-in-white);

  ${(props) =>
    props.hasError &&
    css`
      color: var(--color-orange);
      border-color: var(--color-orange);
    `}

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

  & + & {
    margin-top: 16px;
  }
`;
