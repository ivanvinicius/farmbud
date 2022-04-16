import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 42px;
  padding: 0 8px;
  margin-right: 16px;

  border: 0;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;

  color: var(--color-button-text);
  background: var(--color-purple);
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.2);

  transition: background 0.3s;

  &:hover {
    background: var(--color-purple-dark);
  }

  &:disabled {
    color: var(--color-text-complement);
    background-color: var(--color-table-row-even);
  }
`;
