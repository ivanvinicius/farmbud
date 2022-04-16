import styled, { css } from 'styled-components';

interface IContainerProps {
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<IContainerProps>`
  border: 1px solid var(--color-line-in-white);
  border-radius: 8px;

  ${(props) =>
    props.isFilled &&
    css`
      svg {
        color: var(--color-purple);
      }
    `}

  ${(props) =>
    props.hasError &&
    css`
      border-color: var(--color-orange);

      svg {
        color: var(--color-orange);
      }
    `}

  &:focus-within {
    border-color: var(--color-purple);

    svg {
      color: var(--color-purple);
    }
  }
`;
