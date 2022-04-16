import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 8px;
  text-decoration: none;
  font: 700 16px Archivo;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;

  color: var(--color-button-text);
  background: var(--color-purple);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);

  transition: background 0.3s;

  &:hover {
    background: var(--color-purple-dark);
  }
`;
