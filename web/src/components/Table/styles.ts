import styled, { css } from 'styled-components';

interface ITableContentProps {
  alignTextDataToCenter: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 1270px;
  margin: 50px auto;

  border-radius: 8px;
  overflow: hidden;

  background-color: var(--color-white);
  box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.div`
  width: 100%;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  span {
    font-size: 12px;
    margin-right: 16px;
  }

  button {
    padding: 0 8px;
    height: 42px;

    margin: 0 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    border-radius: 8px;
    text-decoration: none;
    font: 700 16px Archivo;
    letter-spacing: -1px;
    text-transform: uppercase;

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
  }
`;

export const TableContent = styled.table<ITableContentProps>`
  width: 100%;

  border-collapse: collapse;
  overflow: hidden;
  text-align: left;

  thead tr {
    background-color: var(--color-purple);
    color: var(--color-white);
    font-weight: bold;
  }

  th,
  td {
    padding: 16px 8px;
  }

  tbody {
    background-color: var(--color-white);
    text-align: left;

    ${(props) =>
      props.alignTextDataToCenter &&
      css`
        text-align: center;
      `}
  }

  tbody tr:hover {
    color: var(--color-purple);
  }

  tbody tr:nth-of-type(even) {
    background-color: var(--color-table-row-even);
  }

  tbody tr:last-of-type {
    border-bottom: 2px solid var(--color-purple-dark);
  }
`;

export const TableFooter = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 16px;
`;

export const ModalContent = styled.div`
  width: 500px;
  height: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 50px;
    text-align: center;

    button {
      border: 0;
      background: transparent;
      color: var(--color-purple);
      transition: all 0.2s;

      & + button {
        margin-left: 56px;
      }

      &:hover {
        color: var(--color-orange);
      }
    }
  }
`;
